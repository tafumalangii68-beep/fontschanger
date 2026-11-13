/* Run with: npm test  (uses Node's built-in test runner and type stripping) */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  FONT_STYLES,
  bold,
  script,
  doubleStruck,
  fraktur,
  smallCaps,
  bubbles,
  vaporwave,
  upsideDown,
  backwards,
  glitch,
  superscript,
} from "../lib/fonts.ts";

test("bold maps letters and digits", () => {
  assert.equal(bold("Ab9"), "\u{1D400}\u{1D41B}\u{1D7D7}");
});

test("script uses the reserved letterlike exceptions", () => {
  assert.equal(script("BEe"), "ℬℰℯ");
  assert.equal(script("A"), "\u{1D49C}");
});

test("double struck and fraktur exceptions", () => {
  assert.equal(doubleStruck("CRZ1"), "ℂℝℤ𝟙");
  assert.equal(fraktur("HI"), "ℌℑ");
});

test("non-latin characters, emoji and spaces pass through unchanged", () => {
  assert.equal(bold("hi 😀 ñ!"), "\u{1D421}\u{1D422} 😀 ñ!");
});

test("small caps, bubbles, vaporwave", () => {
  assert.equal(smallCaps("Hello"), "ʜᴇʟʟᴏ");
  assert.equal(bubbles("Ab0"), "Ⓐⓑ⓪");
  assert.equal(vaporwave("Hi!"), "Ｈｉ！");
  assert.equal(superscript("x2"), "ˣ²");
});

test("upside down flips and reverses", () => {
  assert.equal(upsideDown("hello!"), "¡ollǝɥ");
  assert.equal(backwards("abc"), "cba");
});

test("glitch is deterministic and keeps the base letters", () => {
  const g = glitch(4);
  assert.equal(g("hey"), g("hey"));
  assert.equal(g("hey").replace(/[̀-ͯ]/g, ""), "hey");
});

test("every style returns a non-empty string and has a unique id", () => {
  const ids = new Set<string>();
  for (const s of FONT_STYLES) {
    assert.ok(s.transform("Fonts Changer 123").length > 0, s.name);
    assert.ok(!ids.has(s.id), `duplicate id ${s.id}`);
    ids.add(s.id);
    assert.ok(s.categories.length > 0);
  }
  assert.ok(FONT_STYLES.length >= 50);
});

test("empty input gives empty output for plain transforms", () => {
  assert.equal(bold(""), "");
  assert.equal(upsideDown(""), "");
});
