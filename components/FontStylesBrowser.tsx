"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Bold, Crown, Feather, Flame, Sparkles, type LucideIcon } from "lucide-react";
import CategoryFilters, { type Filter } from "@/components/CategoryFilters";
import FontCard from "@/components/FontCard";
import SearchInput from "@/components/SearchInput";
import { CATEGORY_LABELS, FONT_STYLES, type FontCategory } from "@/lib/fonts";
import { getSavedServerSnapshot, getSavedSnapshot, subscribeSaved } from "@/lib/browser-store";
import { useCopy } from "@/lib/use-copy";

const SAMPLE = "Fonts Changer";
const PER_SECTION = 6;

const SECTIONS: { id: FontCategory; title: string; icon: LucideIcon; tint: string; guide?: string }[] = [
  { id: "popular", title: "Popular Font Styles", icon: Flame, tint: "text-orange-500" },
  { id: "cursive", title: "Cursive Fonts", icon: Feather, tint: "text-accent dark:text-accent-strong", guide: "/fonts/cursive-fonts" },
  { id: "bold", title: "Bold Fonts", icon: Bold, tint: "text-accent dark:text-accent-strong", guide: "/fonts/bold-text" },
  { id: "aesthetic", title: "Aesthetic Fonts", icon: Sparkles, tint: "text-fuchsia-500", guide: "/fonts/aesthetic-fonts" },
  { id: "fancy", title: "Fancy Fonts", icon: Crown, tint: "text-amber-500" },
];

/** Searchable, filterable catalogue of every style, grouped into sections by default. */
export default function FontStylesBrowser() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const { copiedId, status, copy } = useCopy();
  const saved = useSyncExternalStore(subscribeSaved, getSavedSnapshot, getSavedServerSnapshot);
  const topRef = useRef<HTMLDivElement>(null);

  const outputs = useMemo(() => {
    const map: Record<string, string> = {};
    for (const s of FONT_STYLES) map[s.id] = s.transform(SAMPLE);
    return map;
  }, []);

  const q = query.trim().toLowerCase();
  const grouped = filter === "all" && !q;
  const flat = useMemo(
    () =>
      FONT_STYLES.filter((s) => {
        const inFilter = filter === "all" || (filter === "saved" ? saved.includes(s.id) : s.categories.includes(filter));
        return inFilter && (!q || s.name.toLowerCase().includes(q) || s.categories.some((c) => c.includes(q)));
      }),
    [filter, q, saved],
  );

  function showCategory(id: FontCategory) {
    setFilter(id);
    setQuery("");
    topRef.current?.scrollIntoView({ block: "start" });
  }

  const card = (s: (typeof FONT_STYLES)[number]) => (
    <FontCard
      key={s.id}
      style={s}
      output={outputs[s.id]}
      isSaved={saved.includes(s.id)}
      isCopied={copiedId === s.id}
      onCopy={() => copy(s.id, s.name, outputs[s.id])}
    />
  );
  const grid = "grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 lg:grid-cols-3";

  return (
    <div ref={topRef} className="scroll-mt-24">
      <div className="space-y-4">
        <SearchInput value={query} onChange={setQuery} label="Search font styles" placeholder="Search font styles…" size="lg" />
        <CategoryFilters value={filter} onChange={setFilter} savedCount={saved.length} bleedClass="-mx-4 px-4 sm:mx-0 sm:px-0" />
      </div>

      {grouped ? (
        <div className="mt-10 space-y-12">
          {SECTIONS.map(({ id, title, icon: Icon, tint, guide }) => {
            const styles = FONT_STYLES.filter((s) => s.categories.includes(id));
            return (
              <section key={id} aria-labelledby={`sec-${id}`}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 id={`sec-${id}`} className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                    <Icon className={`size-6 ${tint}`} aria-hidden="true" />
                    {title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => showCategory(id)}
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-accent hover:underline dark:text-accent-strong"
                  >
                    View all {styles.length}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <ul className={grid}>{styles.slice(0, PER_SECTION).map(card)}</ul>
                {guide && (
                  <Link href={guide} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-ink hover:underline">
                    Type your own text in the {title.toLowerCase()} generator
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                )}
              </section>
            );
          })}
          <p className="text-muted">
            Looking for small, line, glitch or upside-down styles? Use the filters above to see every one of the{" "}
            {FONT_STYLES.length} styles.
          </p>
        </div>
      ) : (
        <section aria-labelledby="sec-results" className="mt-8">
          <h2 id="sec-results" className="mb-1 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
            {q ? `Results for “${query.trim()}”` : `${CATEGORY_LABELS[filter]} styles`}
          </h2>
          <p className="mb-4 text-sm text-muted">
            {flat.length > 0
              ? `${flat.length} styles · tap a preview or Copy`
              : filter === "saved" && !q
                ? "No saved styles yet. Tap the heart on any style to keep it here."
                : "No styles match. Try another word or choose All."}
          </p>
          <ul className={grid}>{flat.map(card)}</ul>
        </section>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
