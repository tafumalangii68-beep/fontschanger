"use client";

import { useDeferredValue, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowUpDown,
  Bold,
  Check,
  Copy,
  Crown,
  Feather,
  Flame,
  Heart,
  LayoutGrid,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  Strikethrough,
  Type,
  WandSparkles,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { CATEGORY_LABELS, FONT_STYLES, MAX_INPUT_LENGTH, type FontCategory, type FontStyle } from "@/lib/fonts";
import {
  SHOW_SAVED_EVENT,
  getSavedServerSnapshot,
  getSavedSnapshot,
  subscribeSaved,
  toggleSavedStyle,
} from "@/lib/browser-store";
import { copyText } from "@/lib/clipboard";

type Filter = FontCategory | "all" | "saved";

/** Cards shown under "All" before the visitor asks for the full list. */
const PREVIEW_COUNT = 16;

const FILTERS: { id: Filter; icon: LucideIcon; tint: string }[] = [
  { id: "all", icon: LayoutGrid, tint: "" },
  { id: "popular", icon: Flame, tint: "text-orange-500" },
  { id: "saved", icon: Heart, tint: "text-rose-500" },
  { id: "cursive", icon: Feather, tint: "text-accent dark:text-accent-strong" },
  { id: "bold", icon: Bold, tint: "text-accent dark:text-accent-strong" },
  { id: "aesthetic", icon: Sparkles, tint: "text-fuchsia-500" },
  { id: "fancy", icon: Crown, tint: "text-amber-500" },
  { id: "small", icon: Type, tint: "text-accent dark:text-accent-strong" },
  { id: "lines", icon: Strikethrough, tint: "text-accent dark:text-accent-strong" },
  { id: "glitch", icon: Zap, tint: "text-violet-500" },
  { id: "flip", icon: ArrowUpDown, tint: "text-sky-500" },
];

type Props = {
  initialFilter?: Filter;
  sample?: string;
  inputLabel?: string;
  resultsHeading?: string;
};

/** Gives cards different rhythm depending on the kind of style. */
function previewClass(s: FontStyle): string {
  if (s.categories.includes("glitch")) return "text-lg leading-[2.3] py-2";
  if (s.categories.includes("small")) return "text-xl sm:text-2xl";
  if (s.categories.includes("lines")) return "text-lg sm:text-xl tracking-wide";
  if (s.categories.includes("cursive")) return "text-xl sm:text-[1.6rem]";
  return "text-lg sm:text-[1.4rem]";
}

export default function FontGenerator({
  initialFilter = "all",
  sample = "Fonts Changer",
  inputLabel = "Type the text you want to change",
  resultsHeading = "Your Text in Different Fonts",
}: Props) {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [showAll, setShowAll] = useState(false);
  const saved = useSyncExternalStore(subscribeSaved, getSavedSnapshot, getSavedServerSnapshot);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const ids = { input: useId(), help: useId(), search: useId(), results: useId() };
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
      if (timer.current) clearTimeout(timer.current);
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

  async function copy(s: FontStyle) {
    await copyText(outputs[s.id]);
    setCopiedId(s.id);
    setStatus(`${s.name} copied to clipboard.`);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiedId(null), 1600);
  }

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

        <div
          role="group"
          aria-label="Filter font styles"
          className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-7 sm:px-7 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
        >
          {FILTERS.map(({ id, icon: Icon, tint }) => {
            const active = id === filter;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? "border-accent bg-accent text-white shadow-[0_6px_16px_-8px_rgb(100_37_232/0.8)]"
                    : "border-line bg-surface text-ink hover:-translate-y-px hover:border-accent/60 hover:bg-accent-soft"
                }`}
              >
                {id !== "all" && <Icon className={`size-4 ${active ? "text-white" : tint}`} aria-hidden="true" />}
                {CATEGORY_LABELS[id]}
                {id === "saved" && saved.length > 0 && (
                  <span className={`text-xs ${active ? "text-white/85" : "text-muted"}`}>({saved.length})</span>
                )}
              </button>
            );
          })}
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
          <div className="relative sm:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <label htmlFor={ids.search} className="sr-only">
              Search font styles
            </label>
            <input
              id={ids.search}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search font style…"
              className="w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-3 text-sm text-ink shadow-sm placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <p className="mb-4 text-sm text-muted">
          {visible.length > 0
            ? `${visible.length} ${filter === "all" ? "" : CATEGORY_LABELS[filter].toLowerCase() + " "}styles · tap a preview or Copy`
            : emptyMessage}
        </p>

        <ul className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((s) => {
            const isSaved = saved.includes(s.id);
            const isCopied = copiedId === s.id;
            return (
              <li
                key={s.id}
                className={`group relative flex flex-col rounded-[var(--radius-card)] border bg-surface p-2.5 shadow-sm transition-all sm:p-3 ${
                  isCopied
                    ? "border-accent ring-2 ring-accent/20"
                    : "border-line hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[var(--shadow-card)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleSavedStyle(s.id)}
                  aria-pressed={isSaved}
                  aria-label={isSaved ? `Remove ${s.name} from saved styles` : `Save ${s.name} style`}
                  className={`absolute right-2 top-2 z-10 grid size-8 place-items-center rounded-full transition-colors hover:bg-accent-soft ${
                    isSaved ? "text-rose-500" : "text-muted hover:text-ink"
                  }`}
                >
                  <Heart className="size-[1.1rem]" fill={isSaved ? "currentColor" : "none"} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => copy(s)}
                  aria-label={`Copy text in ${s.name} style`}
                  className="flex min-h-24 flex-1 cursor-copy flex-col items-center justify-center rounded-xl px-2 pb-1 pt-6 text-center transition-colors group-hover:bg-accent-soft/60"
                >
                  <span className={`glyph text-ink ${previewClass(s)}`}>{outputs[s.id]}</span>
                  <span className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">{s.name}</span>
                </button>
                <button
                  type="button"
                  onClick={() => copy(s)}
                  aria-label={`Copy ${s.name}`}
                  className={`mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-bold transition-colors ${
                    isCopied
                      ? "bg-accent text-white"
                      : "bg-accent-soft text-accent hover:bg-accent hover:text-white dark:text-accent-strong dark:hover:text-white"
                  }`}
                >
                  {isCopied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </li>
            );
          })}
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
