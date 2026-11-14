"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { Check, Copy, Shuffle, UserRound } from "lucide-react";
import { PLATFORMS, VIBES, charCount, generateBios, type Platform, type Vibe } from "@/lib/bio";
import { useCopy } from "@/lib/use-copy";

const input =
  "block w-full rounded-xl border border-line bg-paper px-3.5 py-3 text-ink placeholder:text-muted/80 focus:border-accent focus:bg-surface focus:outline-none";

export default function BioGenerator() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [cta, setCta] = useState("");
  const [vibe, setVibe] = useState<Vibe>("aesthetic");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [seed, setSeed] = useState(0);
  const { copiedId, status, copy } = useCopy();
  const id = useId();
  const dName = useDeferredValue(name);
  const dAbout = useDeferredValue(about);
  const dCta = useDeferredValue(cta);
  const limit = PLATFORMS.find((p) => p.id === platform)!;

  const bios = useMemo(
    () =>
      generateBios({
        name: dName || "Your Name",
        about: dAbout || "coffee lover, photographer, dreamer",
        cta: dCta,
        vibe,
        seed,
      }),
    [dName, dAbout, dCta, vibe, seed],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSeed((s) => s + 1);
        }}
        className="space-y-4 rounded-[1.5rem] border border-line bg-surface p-5 shadow-sm sm:p-6"
      >
        <div>
          <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm font-semibold text-ink">
            Name
          </label>
          <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder="Your Name" className={input} />
        </div>
        <div>
          <label htmlFor={`${id}-about`} className="mb-1.5 block text-sm font-semibold text-ink">
            About you <span className="font-normal text-muted">(separate with commas)</span>
          </label>
          <input
            id={`${id}-about`}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            maxLength={90}
            placeholder="coffee lover, photographer, dreamer"
            className={input}
          />
        </div>
        <div>
          <label htmlFor={`${id}-cta`} className="mb-1.5 block text-sm font-semibold text-ink">
            Link or call to action <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={`${id}-cta`} value={cta} onChange={(e) => setCta(e.target.value)} maxLength={40} placeholder="DM for collabs" className={input} />
        </div>
        <fieldset className="min-w-0">
          <legend className="mb-1.5 text-sm font-semibold text-ink">Vibe</legend>
          <div className="flex flex-wrap gap-2">
            {VIBES.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-pressed={vibe === v.id}
                onClick={() => setVibe(v.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  vibe === v.id ? "border-accent bg-accent text-white" : "border-line bg-surface text-ink hover:bg-accent-soft"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor={`${id}-platform`} className="mb-1.5 block text-sm font-semibold text-ink">
            Check length for
          </label>
          <select id={`${id}-platform`} value={platform} onChange={(e) => setPlatform(e.target.value as Platform)} className={input}>
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label} {p.field} ({p.limit} characters)
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white transition-colors hover:bg-accent-strong dark:hover:bg-[#8455f5]"
        >
          <Shuffle className="size-4" aria-hidden="true" />
          Shuffle bios
        </button>
      </form>

      <div>
        <p className="mb-3 text-sm text-muted" aria-live="polite">
          {name ? `${bios.length} bios for ${name}` : "Showing examples. Type your name to make them yours."}
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {bios.map((bio, i) => {
            const key = `bio-${i}`;
            const count = charCount(bio);
            const over = count > limit.limit;
            return (
              <li key={bio} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-4 shadow-sm">
                <p className="glyph flex-1 whitespace-pre-line text-ink">{bio}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className={`text-xs font-semibold ${over ? "text-rose-600 dark:text-rose-400" : "text-muted"}`}>
                    {count}/{limit.limit}
                    {over && " · too long"}
                  </span>
                  <button
                    type="button"
                    onClick={() => copy(key, "Bio", bio)}
                    aria-label={`Copy bio ${i + 1}`}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
                      copiedId === key
                        ? "bg-accent text-white"
                        : "bg-accent-soft text-accent hover:bg-accent hover:text-white dark:text-accent-strong dark:hover:text-white"
                    }`}
                  >
                    {copiedId === key ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                    {copiedId === key ? "Copied!" : "Copy"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <UserRound className="size-3.5" aria-hidden="true" />
          Bios are built in your browser. Nothing you type is sent or saved.
        </p>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
