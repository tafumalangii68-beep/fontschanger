"use client";

import { Check, Copy } from "lucide-react";
import { useCopy } from "@/lib/use-copy";

export type SymbolItem = { char: string; name: string; /** Shown instead of the character (for invisible ones). */ display?: string };
export type SymbolGroup = { title: string; symbols: SymbolItem[] };

/** Tap-to-copy grid of symbols, grouped, with a "copy all" per group. */
export default function SymbolGrid({ groups }: { groups: SymbolGroup[] }) {
  const { copiedId, status, copy } = useCopy();
  return (
    <div className="space-y-6">
      {groups.map((g, gi) => {
        const allKey = `all-${gi}`;
        return (
          <section key={g.title} aria-labelledby={`sg-${gi}`} className="rounded-[1.5rem] border border-line bg-surface p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 id={`sg-${gi}`} className="text-lg font-extrabold tracking-tight text-ink">
                {g.title}
              </h2>
              {!g.symbols.some((s) => s.display) && (
                <button
                  type="button"
                  onClick={() => copy(allKey, g.title, g.symbols.map((s) => s.char).join(" "))}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3.5 py-2 text-sm font-bold text-accent hover:bg-accent hover:text-white dark:text-accent-strong dark:hover:text-white"
                >
                  {copiedId === allKey ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                  {copiedId === allKey ? "Copied!" : "Copy all"}
                </button>
              )}
            </div>
            <ul className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
              {g.symbols.map((s, si) => {
                const key = `${gi}-${si}`;
                const done = copiedId === key;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => copy(key, s.name, s.char)}
                      aria-label={`Copy ${s.name}`}
                      title={s.name}
                      className={`flex h-full w-full cursor-copy flex-col items-center justify-center gap-1 rounded-2xl border px-2 py-3 transition-colors ${
                        done ? "border-accent bg-accent text-white" : "border-line bg-paper text-ink hover:border-accent/60 hover:bg-accent-soft"
                      }`}
                    >
                      <span className={`glyph leading-none ${s.display ? "text-sm font-semibold" : "text-2xl"}`}>{s.display ?? s.char}</span>
                      <span className={`line-clamp-1 text-[0.68rem] font-semibold ${done ? "text-white/90" : "text-muted"}`}>
                        {done ? "Copied!" : s.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
