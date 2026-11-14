"use client";

import { useId, useState } from "react";
import { Camera, Check, Copy, Gamepad2, Music2, type LucideIcon } from "lucide-react";
import { charCount } from "@/lib/bio";
import { FONT_STYLES } from "@/lib/fonts";
import { recordRecent, studio, useStore } from "@/lib/stores";
import { useCopy } from "@/lib/use-copy";

type Platform = "instagram" | "discord" | "tiktok";

const TABS: { id: Platform; label: string; icon: LucideIcon; note: string }[] = [
  { id: "instagram", label: "Instagram bio", icon: Camera, note: "Instagram bios allow up to 150 characters." },
  { id: "discord", label: "Discord profile", icon: Gamepad2, note: "Discord's About Me allows up to 190 characters." },
  { id: "tiktok", label: "TikTok caption", icon: Music2, note: "Long styled captions can be cut off with “more” on the video." },
];

/** Simplified, unbranded mockups that show how styled text sits in each layout. */
function Mockup({ platform, value, initial }: { platform: Platform; value: string; initial: string }) {
  if (platform === "instagram") {
    return (
      <div className="mx-auto w-full max-w-sm rounded-3xl border border-line bg-surface p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-accent p-[3px]">
            <span className="grid size-full place-items-center rounded-full bg-surface text-xl font-extrabold text-ink">{initial}</span>
          </span>
          <div className="grid flex-1 grid-cols-3 gap-2" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="flex flex-col items-center gap-1">
                <span className="h-3 w-8 rounded bg-line-strong" />
                <span className="h-2 w-10 rounded bg-line" />
              </span>
            ))}
          </div>
        </div>
        <p className="glyph mt-4 font-bold text-ink">{value}</p>
        <p className="glyph mt-1 whitespace-pre-line text-sm text-body">{value}</p>
        <div className="mt-4 grid grid-cols-2 gap-2" aria-hidden="true">
          <span className="h-8 rounded-lg bg-line" />
          <span className="h-8 rounded-lg bg-line" />
        </div>
      </div>
    );
  }
  if (platform === "discord") {
    return (
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl bg-[#232136] text-[#e6e4f0] shadow-sm">
        <div className="h-20 bg-gradient-to-r from-accent to-fuchsia-500" />
        <div className="px-5 pb-5">
          <span className="-mt-9 grid size-[4.5rem] place-items-center rounded-full border-[6px] border-[#232136] bg-accent text-2xl font-extrabold text-white">
            {initial}
          </span>
          <div className="mt-2 rounded-xl bg-[#1a1828] p-4">
            <p className="glyph text-lg font-bold text-white">{value}</p>
            <span className="mt-1 block h-2.5 w-24 rounded bg-white/15" aria-hidden="true" />
            <hr className="my-3 border-white/10" />
            <p className="text-[0.7rem] font-bold uppercase tracking-wider text-white/60">About me</p>
            <p className="glyph mt-1 whitespace-pre-line text-sm">{value}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative mx-auto aspect-[9/14] w-full max-w-[17rem] overflow-hidden rounded-3xl bg-gradient-to-b from-[#2a2350] via-[#17143b] to-black text-white shadow-sm">
      <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
        <span className="grid size-14 place-items-center rounded-full bg-white/15">
          <span className="ml-1 size-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white/80" />
        </span>
      </div>
      <div className="absolute right-3 top-1/3 flex flex-col gap-4" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-9 rounded-full bg-white/20" />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-16">
        <p className="text-sm font-bold">@{initial.toLowerCase()}…</p>
        <p className="glyph mt-1 line-clamp-3 whitespace-pre-line text-sm">{value}</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-white/75">
          <Music2 className="size-3.5" aria-hidden="true" /> original sound
        </p>
      </div>
    </div>
  );
}

export default function PlatformPreview() {
  const { text, activeId } = useStore(studio);
  const [platform, setPlatform] = useState<Platform>("instagram");
  const { copiedId, status, copy } = useCopy();
  const ids = useId();
  const style = FONT_STYLES.find((s) => s.id === activeId) ?? FONT_STYLES[0];
  const source = text.trim() || "Fonts Changer";
  const value = style.transform(source);
  const initial = (source.match(/[A-Za-z0-9]/)?.[0] ?? "F").toUpperCase();
  const tab = TABS.find((t) => t.id === platform)!;

  return (
    <section aria-labelledby="platform-heading" className="rounded-[1.5rem] border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-accent dark:text-accent-strong">Platform preview</p>
          <h2 id="platform-heading" className="mt-2 text-[1.75rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[2.1rem]">
            See it before you paste it
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            Preview your text in a profile or caption layout. It uses the text from the generator above.
          </p>

          <div role="tablist" aria-label="Platform layout" className="mt-6 flex flex-wrap gap-2">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`${ids}-${id}`}
                aria-selected={platform === id}
                aria-controls={`${ids}-panel`}
                onClick={() => setPlatform(id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                  platform === id ? "bg-accent text-white" : "bg-accent-soft/70 text-accent hover:bg-accent-soft dark:text-accent-strong"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          <label htmlFor={`${ids}-style`} className="mt-6 block text-sm font-semibold text-ink">
            Font style
          </label>
          <select
            id={`${ids}-style`}
            value={style.id}
            onChange={(e) => studio.set((s) => ({ ...s, activeId: e.target.value }))}
            className="mt-1.5 w-full max-w-xs rounded-xl border border-line bg-surface px-3 py-2.5 text-sm font-semibold text-ink focus:border-accent focus:outline-none"
          >
            {FONT_STYLES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                copy(style.id, style.name, value);
                recordRecent(style.id);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white transition-colors hover:bg-accent-strong dark:hover:bg-[#8455f5]"
            >
              {copiedId === style.id ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
              {copiedId === style.id ? "Copied!" : "Copy this text"}
            </button>
            <span className="text-sm text-muted">{charCount(value)} characters</span>
          </div>
          <p className="mt-2 text-sm text-muted">{tab.note}</p>
        </div>

        <div id={`${ids}-panel`} role="tabpanel" aria-labelledby={`${ids}-${platform}`} className="rounded-[1.25rem] bg-accent-soft/50 p-4 sm:p-6">
          <Mockup platform={platform} value={value} initial={initial} />
          <p className="mt-3 text-center text-xs text-muted">Simplified mockup. Real apps may render characters slightly differently.</p>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
