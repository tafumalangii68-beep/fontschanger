"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Search, Star, X } from "lucide-react";
import { CATEGORY_LABELS, FONT_STYLES, MAX_INPUT_LENGTH, type FontCategory } from "@/lib/fonts";

type Filter = FontCategory | "all" | "saved";

const FILTERS: Filter[] = ["all", "popular", "saved", "cursive", "bold", "aesthetic", "fancy", "small", "lines", "glitch", "flip"];
const SAVED_KEY = "fc-saved-styles";

type Props = {
  initialFilter?: Filter;
  sample?: string;
  inputLabel?: string;
};

function legacyCopy(text: string) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(ta);
  }
}

export default function FontGenerator({ initialFilter = "all", sample = "Fonts Changer", inputLabel = "Type your text" }: Props) {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deferredText = useDeferredValue(text);
  const source = deferredText || sample;

  // Saved styles are stored only after the visitor taps the star button.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setSaved(parsed.filter((x): x is string => typeof x === "string"));
    } catch {
      /* ignore */
    }
    return () => {
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

  const outputs = useMemo(() => {
    const map: Record<string, string> = {};
    for (const s of visible) map[s.id] = s.transform(source);
    return map;
  }, [visible, source]);

  function toggleSaved(id: string) {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  async function copy(id: string, name: string) {
    const value = outputs[id];
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else legacyCopy(value);
    } catch {
      legacyCopy(value);
    }
    setCopiedId(id);
    setStatus(`${name} copied to clipboard.`);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiedId(null), 1500);
  }

  const emptyMessage =
    filter === "saved" && !query
      ? "No saved styles yet. Tap the star on any style to keep it here."
      : "No styles match your search. Try another word or choose All.";

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-surface shadow-[0_1px_2px_rgb(36_34_31/0.05),0_8px_24px_-12px_rgb(36_34_31/0.12)]">
      <div className="border-b border-line p-4 sm:p-5">
        <label htmlFor="fc-input" className="mb-2 block text-sm font-medium text-ink">
          {inputLabel}
        </label>
        <div className="relative">
          <textarea
            id="fc-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={MAX_INPUT_LENGTH}
            rows={2}
            placeholder="Type or paste your text here…"
            className="block w-full resize-y rounded-lg border border-line-strong bg-paper px-3.5 py-3 pr-11 text-lg text-ink placeholder:text-muted/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
            aria-describedby="fc-input-help"
            spellCheck={false}
          />
          {text && (
            <button
              type="button"
              onClick={() => setText("")}
              className="absolute right-2 top-2 rounded-md p-1.5 text-muted hover:bg-sand hover:text-ink"
              aria-label="Clear text"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <p id="fc-input-help" className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs text-muted">
          <span>Your text is converted in your browser and is never sent to a server.</span>
          <span aria-live="polite">
            {text.length}/{MAX_INPUT_LENGTH}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-3 border-b border-line p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter font styles" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0">
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-line bg-surface text-ink hover:border-line-strong hover:bg-sand"
                }`}
              >
                {f === "saved" && <Star className="size-3.5" aria-hidden="true" />}
                {CATEGORY_LABELS[f]}
                {f === "saved" && saved.length > 0 && <span className="text-xs opacity-80">({saved.length})</span>}
              </button>
            );
          })}
        </div>
        <div className="relative lg:w-56">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <label htmlFor="fc-search" className="sr-only">
            Search font styles
          </label>
          <input
            id="fc-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search styles"
            className="w-full rounded-lg border border-line-strong bg-surface py-2 pl-9 pr-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
          />
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <p className="mb-3 text-sm text-muted">
          {visible.length > 0 ? `${visible.length} styles. Tap a result to copy it.` : emptyMessage}
        </p>
        <ul className="grid gap-3 md:grid-cols-2">
          {visible.map((s) => {
            const isSaved = saved.includes(s.id);
            const isCopied = copiedId === s.id;
            return (
              <li
                key={s.id}
                className={`group flex flex-col rounded-xl border bg-surface p-3.5 transition-colors ${
                  isCopied ? "border-accent bg-accent-soft" : "border-line hover:border-line-strong"
                }`}
              >
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted">{s.name}</span>
                  <button
                    type="button"
                    onClick={() => toggleSaved(s.id)}
                    aria-pressed={isSaved}
                    aria-label={isSaved ? `Remove ${s.name} from saved styles` : `Save ${s.name} style`}
                    className={`rounded-md p-1 hover:bg-sand ${isSaved ? "text-accent" : "text-muted"}`}
                  >
                    <Star className="size-4" fill={isSaved ? "currentColor" : "none"} aria-hidden="true" />
                  </button>
                </div>
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => copy(s.id, s.name)}
                    aria-label={`Copy text in ${s.name} style`}
                    className="glyph min-h-11 flex-1 cursor-copy rounded-md text-left text-xl leading-snug text-ink"
                  >
                    {outputs[s.id]}
                  </button>
                  <button
                    type="button"
                    onClick={() => copy(s.id, s.name)}
                    aria-label={`Copy ${s.name}`}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      isCopied
                        ? "border-accent bg-accent text-white"
                        : "border-line-strong text-ink hover:border-accent hover:text-accent-strong"
                    }`}
                  >
                    {isCopied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                    <span>{isCopied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="sr-only" role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </div>
  );
}
