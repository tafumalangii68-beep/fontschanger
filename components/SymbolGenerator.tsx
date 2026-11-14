"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { Check, Copy, Shuffle } from "lucide-react";
import { SYMBOL_THEMES, generateCombos, type SymbolTheme } from "@/lib/symbol-combos";
import { studio, useStore } from "@/lib/stores";
import { useCopy } from "@/lib/use-copy";

/** Generates symbol + letter style combinations. Uses the generator text unless you type something here. */
export default function SymbolGenerator() {
  const { text: studioText } = useStore(studio);
  const [text, setText] = useState("");
  const [theme, setTheme] = useState<SymbolTheme>("stars");
  const [seed, setSeed] = useState(0);
  const { copiedId, status, copy } = useCopy();
  const id = useId();
  const deferred = useDeferredValue(text || studioText);
  const combos = useMemo(() => generateCombos(deferred, theme, seed), [deferred, theme, seed]);

  return (
    <div className="rounded-[1.5rem] border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor={`${id}-text`} className="mb-1.5 block text-sm font-semibold text-ink">
            Text
          </label>
          <input
            id={`${id}-text`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={60}
            placeholder={studioText.trim() ? `Using “${studioText.trim().slice(0, 30)}” from above` : "Type a word or name…"}
            className="block w-full rounded-xl border border-line bg-paper px-3.5 py-3 text-ink placeholder:text-muted/80 focus:border-accent focus:bg-surface focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white transition-colors hover:bg-accent-strong dark:hover:bg-[#8455f5]"
        >
          <Shuffle className="size-4" aria-hidden="true" />
          Generate new mix
        </button>
      </div>

      <div role="group" aria-label="Symbol theme" className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {SYMBOL_THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={theme === t.id}
            onClick={() => setTheme(t.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              theme === t.id ? "border-accent bg-accent text-white" : "border-line bg-surface text-ink hover:bg-accent-soft"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {combos.map((c) => {
          const done = copiedId === c.id;
          return (
            <li key={c.id} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-3">
              <button
                type="button"
                onClick={() => copy(c.id, c.label, c.value)}
                aria-label={`Copy ${c.label}`}
                className="flex min-h-16 flex-1 cursor-copy flex-col items-center justify-center rounded-xl px-2 py-2 text-center transition-colors hover:bg-accent-soft/60"
              >
                <span className="glyph text-lg text-ink">{c.value}</span>
                <span className="mt-1 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">{c.label}</span>
              </button>
              <button
                type="button"
                onClick={() => copy(c.id, c.label, c.value)}
                className={`mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-bold transition-colors ${
                  done ? "bg-accent text-white" : "bg-accent-soft text-accent hover:bg-accent hover:text-white dark:text-accent-strong dark:hover:text-white"
                }`}
              >
                {done ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                {done ? "Copied!" : "Copy"}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
