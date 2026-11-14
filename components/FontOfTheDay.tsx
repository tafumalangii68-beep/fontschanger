"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { CalendarDays, Check, Copy, Eye, Heart } from "lucide-react";
import { getSavedServerSnapshot, getSavedSnapshot, subscribeSaved, toggleSavedStyle } from "@/lib/browser-store";
import { ART } from "@/lib/art";
import { FONT_STYLES } from "@/lib/fonts";
import { fontOfDayIndex } from "@/lib/font-of-day";
import { goToGenerator, recordRecent, studio, useStore } from "@/lib/stores";
import { useCopy } from "@/lib/use-copy";

const noop = () => () => {};
// The pick depends on the visitor's local date, so it is chosen in the browser.
const getIndex = () => fontOfDayIndex(new Date(), FONT_STYLES.length);
const getServerIndex = () => -1;

export default function FontOfTheDay() {
  const index = useSyncExternalStore(noop, getIndex, getServerIndex);
  const { text } = useStore(studio);
  const saved = useSyncExternalStore(subscribeSaved, getSavedSnapshot, getSavedServerSnapshot);
  const { copiedId, status, copy } = useCopy();

  const style = index >= 0 ? FONT_STYLES[index] : null;
  const output = style ? style.transform(text.trim() || "Fonts Changer") : "";
  const isSaved = style ? saved.includes(style.id) : false;
  const today = index >= 0 ? new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "";

  return (
    <section
      aria-labelledby="fotd-heading"
      className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-accent to-[#4d16c4] p-6 text-white shadow-[var(--shadow-card)]"
    >
      <Image src={ART.fontOfDayBg.src} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
      {/* Darkens the artwork slightly so white text stays readable. */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#4d16c4]/55 via-[#4d16c4]/35 to-[#2a0d7a]/70" />
      <p className="relative flex items-center gap-2 text-sm font-semibold text-white/85">
        <CalendarDays className="size-4" aria-hidden="true" />
        {today || "Today"}
      </p>
      <h2 id="fotd-heading" className="relative mt-1 text-2xl font-extrabold tracking-tight">
        Font of the Day
      </h2>
      <div className="relative mt-4 flex min-h-28 flex-1 items-center justify-center rounded-2xl bg-white/15 px-4 py-5 text-center ring-1 ring-white/25 backdrop-blur-sm">
        {style ? (
          <span className="glyph text-2xl sm:text-3xl">{output}</span>
        ) : (
          <span className="h-8 w-48 animate-pulse rounded-lg bg-white/20" aria-hidden="true" />
        )}
      </div>
      <p className="relative mt-3 text-sm text-white/90">
        {style ? (
          <>
            Today&apos;s pick is <strong className="font-bold text-white">{style.name}</strong>. A new style is featured every
            day.
          </>
        ) : (
          "Loading today's pick…"
        )}
      </p>
      {style && (
        <div className="relative mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              copy(style.id, style.name, output);
              recordRecent(style.id);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-accent transition-colors hover:bg-white/90"
          >
            {copiedId === style.id ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
            {copiedId === style.id ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            onClick={() => toggleSavedStyle(style.id)}
            aria-pressed={isSaved}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-white/30 transition-colors hover:bg-white/25"
          >
            <Heart className="size-4" fill={isSaved ? "currentColor" : "none"} aria-hidden="true" />
            {isSaved ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => {
              studio.set((s) => ({ ...s, activeId: style.id }));
              goToGenerator();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-white/30 transition-colors hover:bg-white/25"
          >
            <Eye className="size-4" aria-hidden="true" />
            Use in preview
          </button>
        </div>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
