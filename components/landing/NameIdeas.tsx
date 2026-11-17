"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { Check, Copy, PenLine, ShieldCheck } from "lucide-react";
import { FONT_STYLES } from "@/lib/fonts";
import { COUPLE_JOINERS, RECIPES, type NameRecipe, type RecipeSet } from "@/lib/name-recipes";
import { useCopy } from "@/lib/use-copy";

function apply(recipe: NameRecipe, name: string): string {
  const style = recipe.style ? FONT_STYLES.find((s) => s.id === recipe.style) : undefined;
  return `${recipe.left ?? ""}${style ? style.transform(name) : name}${recipe.right ?? ""}`;
}

/**
 * Name generator: type a name (or two, for couples) and see it in every recipe.
 * With nothing typed it shows the example names so the page is never empty.
 */
export default function NameIdeas({
  recipeSet,
  examples,
  couple = false,
  label = "Type your name",
}: {
  recipeSet: RecipeSet;
  examples: string[];
  couple?: boolean;
  label?: string;
}) {
  const [name, setName] = useState("");
  const [partner, setPartner] = useState("");
  const dName = useDeferredValue(name.trim());
  const dPartner = useDeferredValue(partner.trim());
  const { copiedId, status, copy } = useCopy();
  const id = useId();
  const recipes = RECIPES[recipeSet];

  const results = useMemo(() => {
    if (couple) {
      const a = dName || "Ali";
      const b = dPartner || "Sara";
      return recipes.flatMap((r, i) => {
        const joiner = COUPLE_JOINERS[i % COUPLE_JOINERS.length];
        return [apply(r, `${a}${joiner}${b}`), apply(r, `${b}${joiner}${a}`)];
      });
    }
    if (dName) return recipes.map((r) => apply(r, dName));
    return examples.map((n, i) => apply(recipes[i % recipes.length], n));
  }, [couple, dName, dPartner, recipes, examples]);

  const input =
    "block w-full rounded-2xl border-2 border-line bg-paper px-4 py-3.5 text-lg text-ink placeholder:text-muted/80 focus:border-accent focus:bg-surface focus:outline-none";

  return (
    <section aria-label="Name generator" className="rounded-[1.5rem] border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-7">
      <div className={`grid gap-3 ${couple ? "sm:grid-cols-2" : ""}`}>
        <div>
          <label htmlFor={`${id}-a`} className="mb-2 flex items-center gap-2 font-bold text-ink">
            <PenLine className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
            {couple ? "First name" : label}
          </label>
          <input id={`${id}-a`} value={name} onChange={(e) => setName(e.target.value)} maxLength={24} placeholder={couple ? "Ali" : "Type a name…"} className={input} />
        </div>
        {couple && (
          <div>
            <label htmlFor={`${id}-b`} className="mb-2 flex items-center gap-2 font-bold text-ink">
              <PenLine className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
              Second name
            </label>
            <input id={`${id}-b`} value={partner} onChange={(e) => setPartner(e.target.value)} maxLength={24} placeholder="Sara" className={input} />
          </div>
        )}
      </div>
      <p className="mt-3 flex items-start gap-1.5 text-sm text-muted">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent dark:text-accent-strong" aria-hidden="true" />
        {dName || couple ? "Tap any name to copy it." : "Showing examples. Type a name to see it in every style."} Everything runs in your browser.
      </p>

      <ul className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3">
        {results.map((value, i) => {
          const key = `n-${i}`;
          const done = copiedId === key;
          return (
            <li key={key} className={`flex items-center gap-2 rounded-2xl border bg-paper p-2 pl-4 ${done ? "border-accent ring-2 ring-accent/20" : "border-line"}`}>
              <button
                type="button"
                onClick={() => copy(key, "Name", value)}
                className="glyph min-w-0 flex-1 cursor-copy truncate py-2 text-left text-lg text-ink"
                aria-label={`Copy ${value}`}
              >
                {value}
              </button>
              <button
                type="button"
                onClick={() => copy(key, "Name", value)}
                aria-label="Copy"
                className={`grid size-10 shrink-0 place-items-center rounded-xl transition-colors ${
                  done ? "bg-accent text-white" : "bg-accent-soft text-accent hover:bg-accent hover:text-white dark:text-accent-strong dark:hover:text-white"
                }`}
              >
                {done ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
