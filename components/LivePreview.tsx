"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, ChevronLeft, ChevronRight, ClipboardList, Copy, Download, Eye, Heart, Share2 } from "lucide-react";
import { getSavedServerSnapshot, getSavedSnapshot, subscribeSaved, toggleSavedStyle } from "@/lib/browser-store";
import { copyText } from "@/lib/clipboard";
import { FONT_STYLES, type FontStyle } from "@/lib/fonts";
import { recordRecent, studio, useStore } from "@/lib/stores";

type Props = {
  source: string;
  /** Styles currently shown by the filters; used by Copy All and Download. */
  visible: FontStyle[];
  announce: (message: string) => void;
};

type Done = "copy" | "share" | "download" | "copyAll" | null;

/** Large preview of one style plus quick actions: Save, Share, Download, Copy All. */
export default function LivePreview({ source, visible, announce }: Props) {
  const { activeId } = useStore(studio);
  const saved = useSyncExternalStore(subscribeSaved, getSavedSnapshot, getSavedServerSnapshot);
  const [done, setDone] = useState<Done>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const index = Math.max(0, FONT_STYLES.findIndex((s) => s.id === activeId));
  const style = FONT_STYLES[index];
  const output = style.transform(source);
  const isSaved = saved.includes(style.id);

  function flash(kind: Done, message: string) {
    setDone(kind);
    announce(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(null), 1800);
  }

  function step(delta: number) {
    const next = FONT_STYLES[(index + delta + FONT_STYLES.length) % FONT_STYLES.length];
    studio.set((s) => ({ ...s, activeId: next.id }));
  }

  async function copyOne() {
    await copyText(output);
    recordRecent(style.id);
    flash("copy", `${style.name} copied to clipboard.`);
  }

  async function share() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ text: output });
        recordRecent(style.id);
        flash("share", "Shared.");
        return;
      } catch (e) {
        // The visitor closed the share sheet: nothing to do.
        if ((e as DOMException)?.name === "AbortError") return;
        // Otherwise sharing is blocked or unsupported here, so fall back to copying.
      }
    }
    await copyText(output);
    recordRecent(style.id);
    flash("share", "Sharing is not available in this browser, so the text was copied instead.");
  }

  function listText() {
    return visible.map((s) => `${s.name}: ${s.transform(source)}`).join("\n");
  }

  function download() {
    const blob = new Blob([`Fonts Changer: "${source}" in ${visible.length} styles\n\n${listText()}\n`], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fonts-changer-styles.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    flash("download", `Downloaded ${visible.length} styles as a text file.`);
  }

  async function copyAll() {
    await copyText(listText());
    flash("copyAll", `${visible.length} styles copied to clipboard.`);
  }

  const action =
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-line bg-surface px-2.5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-accent/60 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-50";
  const icon = (kind: Done, Icon: typeof Copy) =>
    done === kind ? <Check className="size-4 text-accent" aria-hidden="true" /> : <Icon className="size-4 text-accent dark:text-accent-strong" aria-hidden="true" />;

  return (
    <section aria-label="Live preview" className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-accent-soft/50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-ink">
          <Eye className="size-4 text-accent dark:text-accent-strong" aria-hidden="true" />
          Live preview
        </p>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => step(-1)} aria-label="Previous style" className="grid size-8 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink">
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <label htmlFor="fc-preview-style" className="sr-only">
            Preview style
          </label>
          <select
            id="fc-preview-style"
            value={style.id}
            onChange={(e) => studio.set((s) => ({ ...s, activeId: e.target.value }))}
            className="w-36 min-w-0 rounded-lg border border-line bg-surface px-2 py-1.5 text-sm font-semibold text-ink focus:border-accent focus:outline-none"
          >
            {FONT_STYLES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => step(1)} aria-label="Next style" className="grid size-8 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink">
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={copyOne}
        aria-label={`Copy preview in ${style.name} style`}
        className="mt-3 flex min-h-24 flex-1 cursor-copy items-center justify-center rounded-xl bg-surface px-4 py-4 text-center shadow-sm transition-colors hover:bg-surface/70"
      >
        <span className="glyph text-2xl text-ink sm:text-[1.75rem]" aria-live="polite">
          {output}
        </span>
      </button>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-4">
        <button type="button" onClick={() => toggleSavedStyle(style.id)} aria-pressed={isSaved} className={action}>
          <Heart className={`size-4 ${isSaved ? "text-rose-500" : "text-accent dark:text-accent-strong"}`} fill={isSaved ? "currentColor" : "none"} aria-hidden="true" />
          {isSaved ? "Saved" : "Save"}
        </button>
        <button type="button" onClick={share} className={action}>
          {icon("share", Share2)}
          Share
        </button>
        <button type="button" onClick={download} disabled={!visible.length} className={action}>
          {icon("download", Download)}
          Download
        </button>
        <button type="button" onClick={copyAll} disabled={!visible.length} className={action}>
          {icon("copyAll", ClipboardList)}
          Copy All
        </button>
      </div>
      <button
        type="button"
        onClick={copyOne}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-strong dark:hover:bg-[#8455f5]"
      >
        {done === "copy" ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        {done === "copy" ? "Copied!" : `Copy ${style.name}`}
      </button>
    </section>
  );
}
