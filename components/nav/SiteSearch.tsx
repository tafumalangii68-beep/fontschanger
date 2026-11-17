"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, FileText, Search, X } from "lucide-react";

export type SearchItem = { title: string; href: string; group: string; keywords?: string };

/** Ranks matches: title starts with the query, then a word in the title, then anywhere. */
function rank(item: SearchItem, q: string): number {
  const t = item.title.toLowerCase();
  if (t.startsWith(q)) return 0;
  if (t.split(/\s+/).some((w) => w.startsWith(q))) return 1;
  if (t.includes(q)) return 2;
  if (item.keywords?.toLowerCase().includes(q)) return 3;
  return -1;
}

const SUGGESTED = ["Cursive", "Bold", "Text Decorator", "Bio Generator", "Glitch", "Blog"];

/**
 * Site search in a dialog. The index (pages, tools, posts and font styles) is built on
 * the server and passed in, so nothing is fetched and the search works offline.
 */
export default function SiteSearch({ items, variant = "header" }: { items: SearchItem[]; variant?: "header" | "menu" }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const ids = { title: useId(), list: useId() };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.filter((i) => SUGGESTED.some((s) => i.title.startsWith(s))).slice(0, 6);
    return items
      .map((i) => ({ i, r: rank(i, q) }))
      .filter((x) => x.r >= 0)
      .sort((a, b) => a.r - b.r || a.i.title.length - b.i.title.length)
      .slice(0, 8)
      .map((x) => x.i);
  }, [items, query]);

  function openSearch() {
    setQuery("");
    setActive(0);
    dialogRef.current?.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }
  function go(item: SearchItem | undefined) {
    if (!item) return;
    dialogRef.current?.close();
    router.push(item.href);
  }

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search the site"
        aria-haspopup="dialog"
        className={
          variant === "header"
            ? "grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
            : "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink hover:bg-accent-soft"
        }
      >
        <Search className="size-[1.15rem]" aria-hidden="true" />
        {variant === "menu" && "Search"}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={ids.title}
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        className="fc-author-dialog mx-auto mt-[12vh] w-[calc(100%-2rem)] max-w-xl rounded-[1.5rem] bg-transparent p-0"
      >
        <div className="overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-[0_30px_80px_-20px_rgb(23_20_59/0.45)]">
          <h2 id={ids.title} className="sr-only">
            Search Fonts Changer
          </h2>
          <div className="flex items-center gap-3 border-b border-line px-4">
            <Search className="size-5 shrink-0 text-accent dark:text-accent-strong" aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, results.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  go(results[active]);
                }
              }}
              placeholder="Search fonts, tools, guides…"
              aria-label="Search fonts, tools and guides"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls={ids.list}
              aria-activedescendant={results[active] ? `${ids.list}-${active}` : undefined}
              className="h-14 flex-1 bg-transparent text-base text-ink placeholder:text-muted focus:outline-none focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close search"
              className="grid size-8 place-items-center rounded-full text-muted hover:bg-sand hover:text-ink"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <p className="px-5 pb-1 pt-3 text-xs font-bold uppercase tracking-wider text-muted">
            {query.trim() ? (results.length ? "Results" : "No results") : "Popular"}
          </p>
          <ul id={ids.list} role="listbox" aria-label="Search results" className="max-h-[50vh] overflow-y-auto px-2 pb-3">
            {results.map((r, i) => (
              <li
                key={r.href + r.title}
                id={`${ids.list}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${i === active ? "bg-accent-soft" : ""}`}
              >
                <FileText className="size-4 shrink-0 text-accent dark:text-accent-strong" aria-hidden="true" />
                <span className="flex-1 truncate font-medium text-ink">{r.title}</span>
                <span className="shrink-0 text-xs text-muted">{r.group}</span>
                {i === active && <CornerDownLeft className="size-3.5 shrink-0 text-muted" aria-hidden="true" />}
              </li>
            ))}
            {query.trim() && results.length === 0 && (
              <li className="px-3 py-4 text-sm text-muted">Nothing found. Try “cursive”, “bold” or “symbols”.</li>
            )}
          </ul>
        </div>
      </dialog>
    </>
  );
}
