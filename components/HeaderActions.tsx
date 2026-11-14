"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { Heart, Moon, Sun } from "lucide-react";
import {
  SHOW_SAVED_EVENT,
  getSavedServerSnapshot,
  getSavedSnapshot,
  setTheme,
  subscribeSaved,
} from "@/lib/browser-store";

export default function HeaderActions() {
  const pathname = usePathname();
  const saved = useSyncExternalStore(subscribeSaved, getSavedSnapshot, getSavedServerSnapshot);

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark")}
        className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-sand"
        aria-label="Switch between light and dark mode"
      >
        <Moon className="size-5 dark:hidden" aria-hidden="true" />
        <Sun className="hidden size-5 dark:block" aria-hidden="true" />
      </button>
      <span aria-hidden="true" className="mx-0.5 hidden h-6 w-px bg-line sm:block" />
      <Link
        href="/#saved"
        onClick={(e) => {
          if (pathname === "/") {
            e.preventDefault();
            window.dispatchEvent(new Event(SHOW_SAVED_EVENT));
          }
        }}
        className="flex h-10 items-center gap-1.5 rounded-full border border-line bg-surface pl-3 pr-1.5 text-ink shadow-sm transition-colors hover:border-accent"
        aria-label={`Saved font styles: ${saved.length}`}
      >
        <Heart className="size-[1.15rem] text-accent" fill={saved.length ? "currentColor" : "none"} aria-hidden="true" />
        <span className="grid min-w-6 place-items-center rounded-full bg-navy px-1.5 py-0.5 text-xs font-bold text-white dark:bg-accent">
          {saved.length}
        </span>
      </Link>
    </div>
  );
}
