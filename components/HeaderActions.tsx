"use client";

import { Moon, Sun } from "lucide-react";
import { setTheme } from "@/lib/browser-store";

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark")}
        className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
        aria-label="Switch between light and dark mode"
      >
        <Moon className="size-5 dark:hidden" aria-hidden="true" />
        <Sun className="hidden size-5 dark:block" aria-hidden="true" />
      </button>
    </div>
  );
}
