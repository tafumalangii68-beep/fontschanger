"use client";

import { useDeferredValue, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { LayoutGrid, PenLine, ShieldCheck, Sparkles, WandSparkles, X } from "lucide-react";
import CategoryFilters, { type Filter } from "@/components/CategoryFilters";
import FontCard from "@/components/FontCard";
import SearchInput from "@/components/SearchInput";
import { CATEGORY_LABELS, FONT_STYLES, MAX_INPUT_LENGTH } from "@/lib/fonts";
import { SHOW_SAVED_EVENT, getSavedServerSnapshot, getSavedSnapshot, subscribeSaved } from "@/lib/browser-store";
import { useCopy } from "@/lib/use-copy";

/** Cards shown under "All" before the visitor asks for the full list. */
const PREVIEW_COUNT = 16;

type Props = {
  initialFilter?: Filter;
  sample?: string;
  inputLabel?: string;
  resultsHeading?: string;
};

export default function FontGenerator({
  initialFilter = "all",
  sample = "Fonts Changer",
  inputLabel = "Type the text you want to change",
  resultsHeading = "Your Text in Different Fonts",
}: Props) {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const { copiedId, status, setStatus, copy } = useCopy();
  const saved = useSyncExternalStore(subscribeSaved, getSavedSnapshot, getSavedServerSnapshot);
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const ids = { input: useId(), help: useId(), results: useId() };
  const deferredText = useDeferredValue(text);
  const source = deferredText || sample;

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

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FONT_STYLES.filter((s) => {
      const inFilter = filter === "all" || (filter === "saved" ? saved.includes(s.id) : s.categories.includes(filter));
      return inFilter && (!q || s.name.toLowerCase().includes(q));
    });
  }, [filter, query, saved]);

  // The full "All" list is long, so show a preview first to keep the page scannable.
  const collapsed = filter === "all" && !query.trim() && !showAll && visible.length > PREVIEW_COUNT;
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

  const emptyMessage =
    filter === "saved" && !query
      ? "No saved styles yet. Tap the heart on any style to keep it here."
      : "No styles match your search. Try another word or choose All.";

  return (
    <div>
      {/* Input panel */}
      <section
        id="fc-top"
        aria-label="Font generator"
        className="relative rounded-[1.5rem] border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-7"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <label htmlFor={ids.input} className="flex items-center gap-2 text-base font-bold text-ink sm:text-lg">
            <PenLine className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
            {inputLabel}
          </label>
          <span className="shrink-0 text-sm tabular-nums text-muted" aria-live="polite">
            {text.length}/{MAX_INPUT_LENGTH}
          </span>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
          <div className="relative flex-1">
            <textarea
              ref={inputRef}
              id={ids.input}
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={MAX_INPUT_LENGTH}
              rows={3}
              placeholder="Type or paste your text here…"
              aria-describedby={ids.help}
              spellCheck={false}
              className="block min-h-24 w-full resize-y rounded-2xl border-2 border-line bg-paper px-4 py-3.5 pr-11 text-lg text-ink transition-colors placeholder:text-muted/80 focus:border-accent focus:bg-surface focus:outline-none sm:min-h-28"
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
          <button
            type="button"
            onClick={generate}
            className="inline-flex items-center justify-center gap-2 self-stretch rounded-2xl bg-accent px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_24px_-10px_rgb(100_37_232/0.8)] transition-colors hover:bg-accent-strong dark:hover:bg-[#8455f5] md:self-center md:py-4"
          >
            <WandSparkles className="size-5" aria-hidden="true" />
            Generate Fonts
          </button>
        </div>

        <p id={ids.help} className="mt-3 flex items-start gap-1.5 text-sm text-muted">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent dark:text-accent-strong" aria-hidden="true" />
          Your text is converted live in your browser. It is never sent to a server or saved.
        </p>

        <div className="mt-5">
          <CategoryFilters
            value={filter}
            onChange={setFilter}
            savedCount={saved.length}
            bleedClass="-mx-4 px-4 sm:-mx-7 sm:px-7 lg:mx-0 lg:px-0"
          />
        </div>
      </section>

      {/* Results */}
      <section aria-labelledby={ids.results} className="mt-10">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id={ids.results}
            ref={resultsRef}
            tabIndex={-1}
            className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-ink focus:outline-none sm:text-[1.75rem]"
          >
            <Sparkles className="size-6 text-accent dark:text-accent-strong" aria-hidden="true" />
            {resultsHeading}
          </h2>
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Search font styles"
            placeholder="Search font style…"
            className="sm:w-72"
          />
        </div>

        <p className="mb-4 text-sm text-muted">
          {visible.length > 0
            ? `${visible.length} ${filter === "all" ? "" : CATEGORY_LABELS[filter].toLowerCase() + " "}styles · tap a preview or Copy`
            : emptyMessage}
        </p>

        <ul className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((s) => (
            <FontCard
              key={s.id}
              style={s}
              output={outputs[s.id]}
              isSaved={saved.includes(s.id)}
              isCopied={copiedId === s.id}
              onCopy={() => copy(s.id, s.name, outputs[s.id])}
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
