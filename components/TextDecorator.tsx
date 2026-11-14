"use client";

import { useDeferredValue, useId, useRef, useState } from "react";
import { Check, Copy, Frame, PenLine, ShieldCheck, Sparkles, X } from "lucide-react";
import { DECORATIONS, DECORATION_GROUPS, decorate, type DecorationGroup } from "@/lib/decorations";
import { FONT_STYLES } from "@/lib/fonts";
import { useCopy } from "@/lib/use-copy";

/** Decorations add many characters, so the decorator keeps input short. */
export const DECORATOR_MAX = 300;
const SAMPLE = "Your Text";

const BASE_IDS = ["plain", "bold-cursive", "bold-sans", "old-english-bold", "small-caps", "aesthetic-wide", "double-struck"];
const BASES = BASE_IDS.map((id) =>
  id === "plain" ? { id, name: "Plain", transform: (t: string) => t } : FONT_STYLES.find((s) => s.id === id)!,
);

export default function TextDecorator() {
  const [text, setText] = useState("");
  const [baseId, setBaseId] = useState("plain");
  const [group, setGroup] = useState<DecorationGroup>("borders");
  const { copiedId, status, setStatus, copy } = useCopy();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const ids = { input: useId(), help: useId(), tabs: useId() };
  const deferred = useDeferredValue(text);
  const base = BASES.find((b) => b.id === baseId) ?? BASES[0];
  const styled = base.transform(deferred.trim() || SAMPLE);
  const items = DECORATIONS.filter((d) => d.group === group);
  const groupInfo = DECORATION_GROUPS.find((g) => g.id === group)!;

  function decorateNow() {
    if (!text.trim()) {
      inputRef.current?.focus();
      setStatus("Type some text first. The previews show a sample.");
      return;
    }
    resultsRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    resultsRef.current?.focus({ preventScroll: true });
    setStatus(`${items.length} ${groupInfo.label.toLowerCase()} ready to copy.`);
  }

  function clear() {
    setText("");
    inputRef.current?.focus();
  }

  return (
    <div>
      <section
        aria-label="Text decorator"
        className="rounded-[1.5rem] border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-7"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <label htmlFor={ids.input} className="flex items-center gap-2 text-base font-bold text-ink sm:text-lg">
            <PenLine className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
            Enter your text
          </label>
          <span className="shrink-0 text-sm tabular-nums text-muted" aria-live="polite">
            {text.length}/{DECORATOR_MAX}
          </span>
        </div>
        <textarea
          ref={inputRef}
          id={ids.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={DECORATOR_MAX}
          rows={3}
          placeholder="Type your text here…"
          aria-describedby={ids.help}
          spellCheck={false}
          className="block min-h-24 w-full resize-y rounded-2xl border-2 border-line bg-paper px-4 py-3.5 text-lg text-ink transition-colors placeholder:text-muted/80 focus:border-accent focus:bg-surface focus:outline-none"
        />

        <fieldset className="mt-4 min-w-0">
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

        <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={decorateNow}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-7 py-3.5 text-base font-bold text-white shadow-[0_10px_24px_-10px_rgb(100_37_232/0.8)] transition-colors hover:bg-accent-strong dark:hover:bg-[#8455f5]"
          >
            Decorate Text
            <Sparkles className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={clear}
            disabled={!text}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-accent/50 bg-surface px-7 py-3 text-base font-bold text-accent transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-50 dark:text-accent-strong"
          >
            <X className="size-4" aria-hidden="true" />
            Clear
          </button>
        </div>
        <p id={ids.help} className="mt-4 flex items-start justify-center gap-1.5 text-center text-sm text-muted">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent dark:text-accent-strong" aria-hidden="true" />
          Decorations are added in your browser. Nothing is sent to a server.
        </p>
      </section>

      <section aria-labelledby="decorated-heading" className="mt-10">
        <h2
          id="decorated-heading"
          ref={resultsRef}
          tabIndex={-1}
          className="flex scroll-mt-24 items-center gap-2.5 text-2xl font-extrabold tracking-tight text-ink focus:outline-none sm:text-[1.75rem]"
        >
          <Frame className="size-6 text-accent dark:text-accent-strong" aria-hidden="true" />
          Decoration Styles
        </h2>

        <div
          role="tablist"
          aria-label="Decoration categories"
          className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
        >
          {DECORATION_GROUPS.map((g) => {
            const active = g.id === group;
            return (
              <button
                key={g.id}
                type="button"
                role="tab"
                id={`${ids.tabs}-${g.id}`}
                aria-selected={active}
                aria-controls={`${ids.tabs}-panel`}
                onClick={() => setGroup(g.id)}
                className={`shrink-0 rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
                  active ? "bg-accent text-white shadow-[0_6px_16px_-8px_rgb(100_37_232/0.8)]" : "bg-accent-soft/60 text-accent hover:bg-accent-soft dark:text-accent-strong"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>
        <p className="mb-4 mt-3 text-sm text-muted">{groupInfo.hint} · tap a preview or Copy</p>

        <ul
          id={`${ids.tabs}-panel`}
          role="tabpanel"
          aria-labelledby={`${ids.tabs}-${group}`}
          className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {items.map((d) => {
            const value = decorate(styled, d);
            const isCopied = copiedId === d.id;
            return (
              <li
                key={d.id}
                className={`flex flex-col rounded-[var(--radius-card)] border bg-surface p-3 shadow-sm transition-all ${
                  isCopied ? "border-accent ring-2 ring-accent/20" : "border-line hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[var(--shadow-card)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => copy(d.id, `${d.name} decoration`, value)}
                  aria-label={`Copy text with ${d.name} decoration`}
                  className="flex min-h-20 flex-1 cursor-copy flex-col items-center justify-center rounded-xl px-2 py-2 text-center transition-colors hover:bg-accent-soft/60"
                >
                  <span className="glyph text-lg text-ink sm:text-xl">{value}</span>
                  <span className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">{d.name}</span>
                </button>
                <button
                  type="button"
                  onClick={() => copy(d.id, `${d.name} decoration`, value)}
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
