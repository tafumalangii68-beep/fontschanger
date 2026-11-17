"use client";

import { useDeferredValue, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { LayoutGrid, List, PenLine, ShieldCheck, SlidersHorizontal, Sparkles, WandSparkles, X } from "lucide-react";
import CategoryFilters, { type Filter } from "@/components/CategoryFilters";
import FontCard from "@/components/FontCard";
import LivePreview from "@/components/LivePreview";
import SearchInput from "@/components/SearchInput";
import { COLLECTIONS, getCollection, type CollectionId } from "@/lib/collections";
import { CATEGORY_LABELS, FONT_STYLES, MAX_INPUT_LENGTH } from "@/lib/fonts";
import { SHOW_SAVED_EVENT, getSavedServerSnapshot, getSavedSnapshot, subscribeSaved } from "@/lib/browser-store";
import { recordRecent, studio, useStore, view as viewStore } from "@/lib/stores";
import { useCopy } from "@/lib/use-copy";

/** Cards shown under "All" before the visitor asks for the full list. */
const PREVIEW_COUNT = 16;

type Sort = "default" | "name" | "shortest";
const SORTS: { id: Sort; label: string }[] = [
  { id: "default", label: "Recommended" },
  { id: "name", label: "Name (A to Z)" },
  { id: "shortest", label: "Shortest result first" },
];

type Props = {
  initialFilter?: Filter;
  /** Starts the results filtered to a curated collection (cleared when the page unmounts). */
  initialCollection?: CollectionId;
  sample?: string;
  inputLabel?: string;
  resultsHeading?: string;
};

export default function FontGenerator({
  initialFilter = "all",
  initialCollection,
  sample = "Fonts Changer",
  inputLabel = "Type the text you want to change",
  resultsHeading = "Your Text in Different Fonts",
}: Props) {
  const { text, collection } = useStore(studio);
  const layout = useStore(viewStore);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("default");
  const [showAll, setShowAll] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { copiedId, status, setStatus, copy } = useCopy();
  const saved = useSyncExternalStore(subscribeSaved, getSavedSnapshot, getSavedServerSnapshot);
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const ids = { input: useId(), help: useId(), more: useId() };
  const deferredText = useDeferredValue(text);
  const source = deferredText || sample;
  const setText = (value: string) => studio.set((s) => ({ ...s, text: value }));
  const setCollection = (value: string) =>
    studio.set((s) => ({ ...s, collection: getCollection(value)?.id ?? "all" }));

  useEffect(() => {
    if (!initialCollection) return;
    studio.set((s) => ({ ...s, collection: initialCollection }));
    return () => studio.set((s) => ({ ...s, collection: "all" }));
  }, [initialCollection]);

  // Header heart button and "/#saved" links open the Saved filter.
  useEffect(() => {
    const showSaved = () => {
      setFilter("saved");
      setQuery("");
      resultsRef.current?.scrollIntoView({ block: "start" });
    };
    if (window.location.hash === "#saved") showSaved();
    const onHash = () => window.location.hash === "#saved" && showSaved();
    window.addEventListener(SHOW_SAVED_EVENT, showSaved);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener(SHOW_SAVED_EVENT, showSaved);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const activeCollection = collection === "all" ? undefined : getCollection(collection);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const inCollection = activeCollection ? new Set(activeCollection.styleIds) : null;
    const list = FONT_STYLES.filter((s) => {
      const inFilter = filter === "all" || (filter === "saved" ? saved.includes(s.id) : s.categories.includes(filter));
      const matches = !q || s.name.toLowerCase().includes(q) || s.categories.some((c) => c.includes(q));
      return inFilter && matches && (!inCollection || inCollection.has(s.id));
    });
    if (sort === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "shortest") {
      const len = (s: (typeof list)[number]) => Array.from(s.transform(source)).length;
      return [...list].sort((a, b) => len(a) - len(b));
    }
    return list;
  }, [filter, query, saved, activeCollection, sort, source]);

  // The full "All" list is long, so show a preview first to keep the page scannable.
  const collapsed =
    filter === "all" && !query.trim() && !activeCollection && !showAll && visible.length > PREVIEW_COUNT;
  const shown = useMemo(() => (collapsed ? visible.slice(0, PREVIEW_COUNT) : visible), [collapsed, visible]);

  const outputs = useMemo(() => {
    const map: Record<string, string> = {};
    for (const s of shown) map[s.id] = s.transform(source);
    return map;
  }, [shown, source]);

  function generate() {
    if (!text.trim()) {
      inputRef.current?.focus();
      setStatus("Type some text first. The results below show a sample.");
      return;
    }
    resultsRef.current?.scrollIntoView({ block: "start" });
    resultsRef.current?.focus({ preventScroll: true });
    setStatus(`${visible.length} font styles ready.`);
  }

  function resetFilters() {
    setFilter("all");
    setQuery("");
    setSort("default");
    setCollection("all");
  }

  const advancedCount = (activeCollection ? 1 : 0) + (sort !== "default" ? 1 : 0);
  const filtered = filter !== "all" || query.trim() !== "" || advancedCount > 0;
  const emptyMessage =
    filter === "saved" && !query
      ? "No saved styles yet. Tap the heart on any style to keep it here."
      : "No styles match these filters. Try another word or reset the filters.";
  const select =
    "w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm font-semibold text-ink focus:border-accent focus:outline-none";

  return (
    <div>
      {/* Input panel */}
      <section
        id="fc-top"
        aria-label="Font generator"
        className="relative scroll-mt-24 rounded-[1.5rem] border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-7"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col">
            <div className="mb-3 flex items-center justify-between gap-3">
              <label htmlFor={ids.input} className="flex items-center gap-2 text-base font-bold text-ink sm:text-lg">
                <PenLine className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
                {inputLabel}
              </label>
              <span className="shrink-0 text-sm tabular-nums text-muted" aria-live="polite">
                {text.length}/{MAX_INPUT_LENGTH}
              </span>
            </div>
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                id={ids.input}
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={MAX_INPUT_LENGTH}
                rows={4}
                placeholder="Type or paste your text here…"
                aria-describedby={ids.help}
                spellCheck={false}
                className="block h-full min-h-28 w-full resize-y rounded-2xl border-2 border-line bg-paper px-4 py-3.5 pr-11 text-lg text-ink transition-colors placeholder:text-muted/80 focus:border-accent focus:bg-surface focus:outline-none"
              />
              {text && (
                <button
                  type="button"
                  onClick={() => {
                    setText("");
                    inputRef.current?.focus();
                  }}
                  className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full text-muted hover:bg-sand hover:text-ink"
                  aria-label="Clear text"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={generate}
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-accent px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_24px_-10px_rgb(100_37_232/0.8)] transition-colors hover:bg-accent-strong dark:hover:bg-[#8455f5]"
              >
                <WandSparkles className="size-5" aria-hidden="true" />
                Generate Fonts
              </button>
              <p id={ids.help} className="flex items-start gap-1.5 text-sm text-muted">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent dark:text-accent-strong" aria-hidden="true" />
                Converted live in your browser. Never sent to a server or saved.
              </p>
            </div>
          </div>
          <LivePreview source={source} visible={visible} announce={setStatus} />
        </div>

        <div className="mt-6">
          <CategoryFilters
            value={filter}
            onChange={setFilter}
            savedCount={saved.length}
            bleedClass="-mx-4 px-4 sm:-mx-7 sm:px-7 lg:mx-0 lg:px-0"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            aria-controls={ids.more}
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-accent/50 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent-soft dark:text-accent-strong"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            More filters{advancedCount > 0 && ` (${advancedCount})`}
          </button>
          {activeCollection && (
            <button
              type="button"
              onClick={() => setCollection("all")}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3.5 py-2 text-sm font-semibold text-ink hover:bg-line"
              aria-label={`Remove ${activeCollection.name} collection filter`}
            >
              Collection: {activeCollection.name}
              <X className="size-3.5" aria-hidden="true" />
            </button>
          )}
          {filtered && (
            <button type="button" onClick={resetFilters} className="px-2 py-2 text-sm font-semibold text-muted underline-offset-2 hover:text-ink hover:underline">
              Reset all filters
            </button>
          )}
        </div>
        {moreOpen && (
          <div id={ids.more} className="mt-3 grid gap-3 rounded-2xl border border-line bg-paper p-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${ids.more}-col`} className="mb-1.5 block text-sm font-semibold text-ink">
                Collection
              </label>
              <select id={`${ids.more}-col`} value={collection} onChange={(e) => setCollection(e.target.value)} className={select}>
                <option value="all">All collections</option>
                {COLLECTIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.styleIds.length})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${ids.more}-sort`} className="mb-1.5 block text-sm font-semibold text-ink">
                Sort by
              </label>
              <select id={`${ids.more}-sort`} value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={select}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </section>

      {/* Results */}
      <section aria-labelledby="fc-results" className="mt-10">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="fc-results"
            ref={resultsRef}
            tabIndex={-1}
            className="flex scroll-mt-24 items-center gap-2.5 text-2xl font-extrabold tracking-tight text-ink focus:outline-none sm:text-[1.75rem]"
          >
            <Sparkles className="size-6 text-accent dark:text-accent-strong" aria-hidden="true" />
            {resultsHeading}
          </h2>
          <div className="flex items-center gap-2">
            <div role="group" aria-label="Result layout" className="flex shrink-0 rounded-xl border border-line bg-surface p-1 shadow-sm">
              {(
                [
                  ["grid", LayoutGrid, "Grid view"],
                  ["list", List, "List view"],
                ] as const
              ).map(([id, Icon, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={layout === id}
                  aria-label={label}
                  title={label}
                  onClick={() => viewStore.set(id)}
                  className={`grid size-8 place-items-center rounded-lg transition-colors ${
                    layout === id ? "bg-accent text-white" : "text-muted hover:bg-accent-soft hover:text-ink"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </button>
              ))}
            </div>
            <SearchInput value={query} onChange={setQuery} label="Search font styles" placeholder="Search font style…" className="flex-1 sm:w-64" />
          </div>
        </div>

        <p className="mb-4 text-sm text-muted">
          {visible.length > 0
            ? `${visible.length} ${filter === "all" ? "" : CATEGORY_LABELS[filter].toLowerCase() + " "}styles · tap a preview or Copy`
            : emptyMessage}
        </p>

        <ul
          className={
            layout === "list"
              ? "flex flex-col gap-2"
              : "grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
          }
        >
          {shown.map((s) => (
            <FontCard
              key={s.id}
              style={s}
              output={outputs[s.id]}
              layout={layout}
              isSaved={saved.includes(s.id)}
              isCopied={copiedId === s.id}
              onCopy={() => {
                copy(s.id, s.name, outputs[s.id]);
                recordRecent(s.id);
                studio.set((st) => ({ ...st, activeId: s.id }));
              }}
            />
          ))}
        </ul>
        {collapsed && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-bold text-ink shadow-sm transition-colors hover:border-accent hover:bg-accent-soft"
            >
              <LayoutGrid className="size-4 text-accent dark:text-accent-strong" aria-hidden="true" />
              Show all {visible.length} styles
            </button>
          </div>
        )}
        <p className="sr-only" role="status" aria-live="polite">
          {status}
        </p>
      </section>
    </div>
  );
}
