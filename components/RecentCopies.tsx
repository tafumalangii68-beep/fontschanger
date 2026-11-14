"use client";

import { Check, Copy, History, Trash2 } from "lucide-react";
import { FONT_STYLES } from "@/lib/fonts";
import { recent, recordRecent, studio, useStore } from "@/lib/stores";
import { useCopy } from "@/lib/use-copy";

/** Styles the visitor copied recently on this device (style names only, never the text). */
export default function RecentCopies() {
  const ids = useStore(recent);
  const { text } = useStore(studio);
  const { copiedId, status, copy } = useCopy();
  const source = text.trim() || "Fonts Changer";
  const styles = ids.map((id) => FONT_STYLES.find((s) => s.id === id)).filter((s) => s !== undefined);

  return (
    <section aria-labelledby="recent-heading" className="flex h-full flex-col rounded-[1.5rem] border border-line bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 id="recent-heading" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-ink">
          <History className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
          Recent Copies
        </h2>
        {styles.length > 0 && (
          <button
            type="button"
            onClick={() => recent.set([])}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-muted hover:bg-sand hover:text-ink"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Clear
          </button>
        )}
      </div>
      <p className="mt-1 text-sm text-muted">Styles you copied lately, shown with your current text.</p>

      {styles.length === 0 ? (
        <div className="mt-4 flex flex-1 items-center justify-center rounded-2xl border border-dashed border-line-strong px-4 py-8 text-center text-sm text-muted">
          Nothing copied yet. Copy any style and it will appear here for quick reuse.
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {styles.map((s) => {
            const value = s.transform(source);
            const done = copiedId === s.id;
            return (
              <li key={s.id} className="flex items-center gap-3 rounded-xl border border-line bg-paper py-2 pl-3.5 pr-2">
                <div className="min-w-0 flex-1">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted">{s.name}</p>
                  <p className="glyph truncate text-lg text-ink">{value}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    copy(s.id, s.name, value);
                    recordRecent(s.id);
                  }}
                  aria-label={`Copy ${s.name} again`}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
                    done ? "bg-accent text-white" : "bg-accent-soft text-accent hover:bg-accent hover:text-white dark:text-accent-strong dark:hover:text-white"
                  }`}
                >
                  {done ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                  {done ? "Copied" : "Copy"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <p className="mt-3 text-xs text-muted">Kept only in this browser. Your text is never saved.</p>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
