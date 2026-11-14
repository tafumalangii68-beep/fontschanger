"use client";

import { useDeferredValue, useId, useRef, useState } from "react";
import { Check, Copy, PenLine, ShieldCheck, X } from "lucide-react";
import { DECORATIONS, decorate } from "@/lib/decorations";
import { FONT_STYLES, MAX_INPUT_LENGTH } from "@/lib/fonts";
import { copyText } from "@/lib/clipboard";

const BASE_IDS = ["plain", "bold-cursive", "bold-sans", "old-english-bold", "small-caps", "aesthetic-wide", "double-struck"];
const BASES = BASE_IDS.map((id) =>
  id === "plain"
    ? { id, name: "Plain", transform: (t: string) => t }
    : FONT_STYLES.find((s) => s.id === id)!,
);

export default function TextDecorator() {
  const [text, setText] = useState("");
  const [baseId, setBaseId] = useState("bold-cursive");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputId = useId();
  const deferred = useDeferredValue(text);
  const base = BASES.find((b) => b.id === baseId) ?? BASES[0];
  const styled = base.transform(deferred || "Fonts Changer");

  async function copy(id: string, name: string, value: string) {
    await copyText(value);
    setCopiedId(id);
    setStatus(`${name} decoration copied.`);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiedId(null), 1600);
  }

  return (
    <div>
      <section aria-label="Text decorator" className="rounded-[1.5rem] border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-7">
        <div className="mb-3 flex items-center justify-between gap-3">
          <label htmlFor={inputId} className="flex items-center gap-2 text-base font-bold text-ink sm:text-lg">
            <PenLine className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
            Type the text you want to decorate
          </label>
          <span className="shrink-0 text-sm tabular-nums text-muted">
            {text.length}/{MAX_INPUT_LENGTH}
          </span>
        </div>
        <div className="relative">
          <input
            id={inputId}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={MAX_INPUT_LENGTH}
            placeholder="Your name or a short phrase…"
            className="block w-full rounded-2xl border-2 border-line bg-paper px-4 py-3.5 pr-11 text-lg text-ink placeholder:text-muted/80 focus:border-accent focus:bg-surface focus:outline-none"
          />
          {text && (
            <button
              type="button"
              onClick={() => setText("")}
              className="absolute right-2.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-sand hover:text-ink"
              aria-label="Clear text"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <p className="mt-3 flex items-start gap-1.5 text-sm text-muted">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent dark:text-accent-strong" aria-hidden="true" />
          Decorations are added in your browser. Nothing is sent to a server.
        </p>

        <fieldset className="mt-5">
          <legend className="mb-2 text-sm font-semibold text-ink">Letter style</legend>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-7 sm:px-7 lg:mx-0 lg:flex-wrap lg:px-0">
            {BASES.map((b) => {
              const active = b.id === baseId;
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setBaseId(b.id)}
                  className={`glyph shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    active ? "border-accent bg-accent text-white" : "border-line bg-surface text-ink hover:border-accent/60 hover:bg-accent-soft"
                  }`}
                >
                  {b.id === "plain" ? "Plain" : b.transform(b.name)}
                  {b.id !== "plain" && <span className="sr-only"> ({b.name})</span>}
                </button>
              );
            })}
          </div>
        </fieldset>
      </section>

      <section aria-labelledby="decorated-heading" className="mt-10">
        <h2 id="decorated-heading" className="mb-5 text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
          Decorated text
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {DECORATIONS.map((d) => {
            const value = decorate(styled, d);
            const isCopied = copiedId === d.id;
            return (
              <li
                key={d.id}
                className={`flex flex-col rounded-[var(--radius-card)] border bg-surface p-3 shadow-sm transition-all ${
                  isCopied ? "border-accent ring-2 ring-accent/20" : "border-line hover:border-accent/50 hover:shadow-[var(--shadow-card)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => copy(d.id, d.name, value)}
                  aria-label={`Copy text with ${d.name} decoration`}
                  className="flex min-h-20 flex-1 cursor-copy flex-col items-center justify-center rounded-xl px-2 py-2 text-center hover:bg-accent-soft/60"
                >
                  <span className="glyph text-lg text-ink sm:text-xl">{value}</span>
                  <span className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">{d.name}</span>
                </button>
                <button
                  type="button"
                  onClick={() => copy(d.id, d.name, value)}
                  aria-label={`Copy ${d.name}`}
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
          })}
        </ul>
        <p className="sr-only" role="status" aria-live="polite">
          {status}
        </p>
      </section>
    </div>
  );
}
