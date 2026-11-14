"use client";

import { Check, Copy, Heart } from "lucide-react";
import { toggleSavedStyle } from "@/lib/browser-store";
import type { FontStyle } from "@/lib/fonts";

/** Gives cards different rhythm depending on the kind of style. */
export function previewClass(s: FontStyle): string {
  if (s.categories.includes("glitch")) return "text-lg leading-[2.3] py-2";
  if (s.categories.includes("small")) return "text-xl sm:text-2xl";
  if (s.categories.includes("lines")) return "text-lg sm:text-xl tracking-wide";
  if (s.categories.includes("cursive")) return "text-xl sm:text-[1.6rem]";
  return "text-lg sm:text-[1.4rem]";
}

type Props = {
  style: FontStyle;
  output: string;
  isSaved: boolean;
  isCopied: boolean;
  onCopy: () => void;
};

/** One styled-text preview with a favorite (heart) toggle and a Copy button. */
export default function FontCard({ style, output, isSaved, isCopied, onCopy }: Props) {
  return (
    <li
      className={`group relative flex flex-col rounded-[var(--radius-card)] border bg-surface p-2.5 shadow-sm transition-all sm:p-3 ${
        isCopied
          ? "border-accent ring-2 ring-accent/20"
          : "border-line hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[var(--shadow-card)]"
      }`}
    >
      <button
        type="button"
        onClick={() => toggleSavedStyle(style.id)}
        aria-pressed={isSaved}
        aria-label={isSaved ? `Remove ${style.name} from saved styles` : `Save ${style.name} style`}
        className={`absolute right-2 top-2 z-10 grid size-8 place-items-center rounded-full transition-colors hover:bg-accent-soft ${
          isSaved ? "text-rose-500" : "text-muted hover:text-ink"
        }`}
      >
        <Heart className="size-[1.1rem]" fill={isSaved ? "currentColor" : "none"} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy text in ${style.name} style`}
        className="flex min-h-24 flex-1 cursor-copy flex-col items-center justify-center rounded-xl px-2 pb-1 pt-6 text-center transition-colors group-hover:bg-accent-soft/60"
      >
        <span className={`glyph text-ink ${previewClass(style)}`}>{output}</span>
        <span className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">{style.name}</span>
      </button>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${style.name}`}
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
}
