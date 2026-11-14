"use client";

import { useId } from "react";
import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder: string;
  className?: string;
  size?: "md" | "lg";
};

/** Search field with a visible icon, an accessible label and a clear button. */
export default function SearchInput({ value, onChange, label, placeholder, className = "", size = "md" }: Props) {
  const id = useId();
  const big = size === "lg";
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted ${big ? "left-4 size-5" : "left-3.5 size-4"}`}
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-line bg-surface text-ink shadow-sm placeholder:text-muted focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:hidden ${
          big ? "py-3.5 pl-12 pr-11 text-base" : "py-2.5 pl-10 pr-9 text-sm"
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-sand hover:text-ink"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
