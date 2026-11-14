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
  layout?: "grid" | "list";
};

function HeartButton({ style, isSaved, className = "" }: { style: FontStyle; isSaved: boolean; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => toggleSavedStyle(style.id)}
      aria-pressed={isSaved}
      aria-label={isSaved ? `Remove ${style.name} from saved styles` : `Save ${style.name} style`}
      className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors hover:bg-accent-soft ${
        isSaved ? "text-rose-500" : "text-muted hover:text-ink"
      } ${className}`}
    >
      <Heart className="size-[1.1rem]" fill={isSaved ? "currentColor" : "none"} aria-hidden="true" />
    </button>
  );
}

const copyBtn = (isCopied: boolean) =>
  `inline-flex items-center justify-center gap-1.5 rounded-xl text-sm font-bold transition-colors ${
    isCopied
      ? "bg-accent text-white"
      : "bg-accent-soft text-accent hover:bg-accent hover:text-white dark:text-accent-strong dark:hover:text-white"
  }`;

/** One styled-text preview with a favorite (heart) toggle and a Copy button. */
export default function FontCard({ style, output, isSaved, isCopied, onCopy, layout = "grid" }: Props) {
  const frame = `group relative rounded-[var(--radius-card)] border bg-surface shadow-sm transition-all ${
    isCopied ? "border-accent ring-2 ring-accent/20" : "border-line hover:border-accent/50 hover:shadow-[var(--shadow-card)]"
  }`;

  if (layout === "list") {
    return (
      <li className={`${frame} flex items-center gap-2 p-2 sm:gap-3 sm:p-2.5`}>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy text in ${style.name} style`}
          className="flex min-w-0 flex-1 cursor-copy flex-col items-start gap-0.5 rounded-xl px-3 py-2 text-left transition-colors group-hover:bg-accent-soft/60 sm:flex-row sm:items-center sm:gap-4"
        >
          <span className="w-36 shrink-0 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">{style.name}</span>
          <span className="glyph min-w-0 text-lg text-ink sm:text-xl">{output}</span>
        </button>
        <HeartButton style={style} isSaved={isSaved} />
        <button type="button" onClick={onCopy} aria-label={`Copy ${style.name}`} className={`${copyBtn(isCopied)} shrink-0 px-3.5 py-2`}>
          {isCopied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          <span className="hidden sm:inline">{isCopied ? "Copied!" : "Copy"}</span>
        </button>
      </li>
    );
  }

  return (
    <li className={`${frame} flex flex-col p-2.5 hover:-translate-y-0.5 sm:p-3`}>
      <HeartButton style={style} isSaved={isSaved} className="absolute right-2 top-2 z-10" />
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy text in ${style.name} style`}
        className="flex min-h-24 flex-1 cursor-copy flex-col items-center justify-center rounded-xl px-2 pb-1 pt-6 text-center transition-colors group-hover:bg-accent-soft/60"
      >
        <span className={`glyph text-ink ${previewClass(style)}`}>{output}</span>
        <span className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">{style.name}</span>
      </button>
      <button type="button" onClick={onCopy} aria-label={`Copy ${style.name}`} className={`${copyBtn(isCopied)} mt-2 py-2.5`}>
        {isCopied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </li>
  );
}
