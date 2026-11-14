"use client";

import { ArrowRight, Gamepad2, Palette, Smartphone, Sparkles, type LucideIcon } from "lucide-react";
import { COLLECTIONS, type CollectionId } from "@/lib/collections";
import { FONT_STYLES } from "@/lib/fonts";
import { goToResults, studio, useStore } from "@/lib/stores";

const ICONS: Record<CollectionId, { icon: LucideIcon; tint: string }> = {
  gaming: { icon: Gamepad2, tint: "bg-navy dark:bg-[#2d2763]" },
  social: { icon: Smartphone, tint: "bg-gradient-to-br from-fuchsia-500 to-orange-400" },
  aesthetic: { icon: Sparkles, tint: "bg-gradient-to-br from-violet-400 to-accent" },
  creative: { icon: Palette, tint: "bg-gradient-to-br from-sky-400 to-accent" },
};

/** Curated style sets. "Use collection" filters the generator results above. */
export default function FontCollections() {
  const { text, collection } = useStore(studio);
  const source = text.trim() || "Fonts Changer";

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {COLLECTIONS.map((c) => {
        const { icon: Icon, tint } = ICONS[c.id];
        const samples = c.styleIds
          .slice(0, 3)
          .map((id) => FONT_STYLES.find((s) => s.id === id))
          .filter((s) => s !== undefined);
        const active = collection === c.id;
        return (
          <li
            key={c.id}
            className={`flex flex-col rounded-[var(--radius-card)] border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] ${
              active ? "border-accent ring-2 ring-accent/20" : "border-line"
            }`}
          >
            <span className={`grid size-11 place-items-center rounded-xl ${tint}`}>
              <Icon className="size-5 text-white" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-ink">{c.name} fonts</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{c.description}</p>
            <ul className="mt-4 flex-1 space-y-1.5" aria-label={`${c.name} examples`}>
              {samples.map((s) => (
                <li key={s.id} className="glyph truncate rounded-lg bg-paper px-3 py-2 text-ink">
                  {s.transform(source)}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                studio.set((st) => ({ ...st, collection: c.id }));
                goToResults();
              }}
              aria-pressed={active}
              className={`mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                active
                  ? "bg-accent text-white"
                  : "bg-accent-soft text-accent hover:bg-accent hover:text-white dark:text-accent-strong dark:hover:text-white"
              }`}
            >
              {active ? "Showing in results" : `Use all ${c.styleIds.length} styles`}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
