/* Run with: npm test */
import { test } from "node:test";
import assert from "node:assert/strict";
import { FONT_STYLES } from "../lib/fonts.ts";
import { COLLECTIONS } from "../lib/collections.ts";
import { dayNumber, fontOfDayIndex } from "../lib/font-of-day.ts";
import { charCount, generateBios, splitAbout } from "../lib/bio.ts";
import { generateCombos } from "../lib/symbol-combos.ts";

const ids = new Set(FONT_STYLES.map((s) => s.id));

test("every collection style id exists", () => {
  for (const c of COLLECTIONS) {
    for (const id of c.styleIds) assert.ok(ids.has(id), `${c.id}: unknown style ${id}`);
    assert.equal(new Set(c.styleIds).size, c.styleIds.length, `${c.id} has duplicates`);
  }
});

test("new filter categories are populated", () => {
  assert.ok(FONT_STYLES.filter((s) => s.categories.includes("decorated")).length >= 10);
  assert.ok(FONT_STYLES.filter((s) => s.categories.includes("enclosed")).length >= 5);
});

test("font of the day is stable within a day and covers every style", () => {
  const morning = new Date(2026, 10, 14, 8);
  const night = new Date(2026, 10, 14, 23, 59);
  assert.equal(fontOfDayIndex(morning, 56), fontOfDayIndex(night, 56));
  const seen = new Set<number>();
  const start = dayNumber(new Date(2026, 0, 1));
  for (let d = 0; d < 56; d++) seen.add(((start + d) * 7919) % 56);
  assert.equal(seen.size, 56);
});

test("bio generator uses the name, parts and call to action", () => {
  assert.deepEqual(splitAbout("photographer, traveler · coffee"), ["photographer", "traveler", "coffee"]);
  const bios = generateBios({ name: "Maya", about: "artist, dreamer", cta: "DM me", vibe: "minimal", seed: 0 });
  assert.equal(bios.length, 6);
  assert.equal(new Set(bios).size, 6);
  for (const b of bios) assert.ok(b.endsWith("DM me"), b);
  // Shuffling changes the output.
  const next = generateBios({ name: "Maya", about: "artist, dreamer", cta: "DM me", vibe: "minimal", seed: 1 });
  assert.notDeepEqual(bios, next);
});

test("charCount counts code points, not UTF-16 units", () => {
  assert.equal(charCount("𝐀𝐁"), 2);
});

test("symbol combos use theme symbols and have unique ids", () => {
  const combos = generateCombos("Hi", "hearts", 0);
  assert.equal(combos.length, 9);
  assert.equal(new Set(combos.map((c) => c.id)).size, 9);
  assert.ok(combos.every((c) => /[♡♥❥]/.test(c.value)));
});
