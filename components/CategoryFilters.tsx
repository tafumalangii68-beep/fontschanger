"use client";

import {
  ArrowUpDown,
  Bold,
  Crown,
  Feather,
  Flame,
  Heart,
  LayoutGrid,
  Sparkles,
  Strikethrough,
  Type,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { CATEGORY_LABELS, type FontCategory } from "@/lib/fonts";

export type Filter = FontCategory | "all" | "saved";

export const FILTERS: { id: Filter; icon: LucideIcon; tint: string }[] = [
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
  value: Filter;
  onChange: (f: Filter) => void;
  savedCount: number;
  /** Negative margins let the row scroll edge to edge inside a padded panel. */
  bleedClass?: string;
};

/** Pill-shaped category buttons. Scrolls horizontally on small screens, wraps on large ones. */
export default function CategoryFilters({ value, onChange, savedCount, bleedClass = "" }: Props) {
  return (
    <div
      role="group"
      aria-label="Filter font styles"
      className={`no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible ${bleedClass}`}
    >
      {FILTERS.map(({ id, icon: Icon, tint }) => {
        const active = id === value;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(id)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              active
                ? "border-accent bg-accent text-white shadow-[0_6px_16px_-8px_rgb(100_37_232/0.8)]"
                : "border-line bg-surface text-ink hover:-translate-y-px hover:border-accent/60 hover:bg-accent-soft"
            }`}
          >
            {id !== "all" && <Icon className={`size-4 ${active ? "text-white" : tint}`} aria-hidden="true" />}
            {CATEGORY_LABELS[id]}
            {id === "saved" && savedCount > 0 && (
              <span className={`text-xs ${active ? "text-white/85" : "text-muted"}`}>({savedCount})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
