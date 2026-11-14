"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { OPEN_SETTINGS_EVENT, readConsent, writeConsent, type OptionalCategory } from "@/lib/consent";

type Choice = Record<OptionalCategory, boolean>;

const btnPrimary =
  "rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-strong dark:hover:bg-[#8455f5] focus-visible:outline-offset-2";
const btnSecondary =
  "rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:bg-sand";

const OPTIONAL: { key: OptionalCategory; title: string; text: string }[] = [
  {
    key: "analytics",
    title: "Analytics",
    text: "Would help the site owner understand how pages are used. No analytics service is installed on this site right now, so turning this on loads nothing.",
  },
  {
    key: "marketing",
    title: "Marketing",
    text: "Would allow advertising or marketing services. No marketing or advertising scripts are installed on this site right now, so turning this on loads nothing.",
  },
];

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [draft, setDraft] = useState<Choice>({ analytics: false, marketing: false });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const bannerTitleId = useId();

  const openSettings = useCallback(() => {
    const current = readConsent();
    setDraft({ analytics: current?.analytics ?? false, marketing: current?.marketing ?? false });
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    setShowBanner(readConsent() === null);
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, [openSettings]);

  function save(choice: Choice) {
    writeConsent(choice);
    setShowBanner(false);
    dialogRef.current?.close();
  }

  return (
    <>
      {showBanner && (
        <section
          aria-labelledby={bannerTitleId}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface shadow-[0_-8px_24px_-12px_rgb(36_34_31/0.2)]"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div className="text-sm leading-relaxed text-muted">
              <h2 id={bannerTitleId} className="mb-1 font-semibold text-ink">
                Cookies and browser storage
              </h2>
              <p>
                We use browser storage only to remember this choice and any font styles you save. We do not use
                analytics or advertising cookies. Read our{" "}
                <Link href="/privacy-policy" className="text-accent-strong underline underline-offset-2">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/cookie-policy" className="text-accent-strong underline underline-offset-2">
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button type="button" className={btnSecondary} onClick={openSettings}>
                Cookie Settings
              </button>
              <button type="button" className={btnSecondary} onClick={() => save({ analytics: false, marketing: false })}>
                Reject Optional
              </button>
              <button type="button" className={btnPrimary} onClick={() => save({ analytics: true, marketing: true })}>
                Accept All
              </button>
            </div>
          </div>
        </section>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-[var(--radius-card)] border border-line bg-surface p-0 text-ink shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div>
            <h2 id={titleId} className="text-lg font-semibold">
              Cookie settings
            </h2>
            <p className="mt-1 text-sm text-muted">Choose which optional categories you allow. You can change this at any time.</p>
          </div>
          <button
            type="button"
            className="rounded-md p-1.5 text-muted hover:bg-sand hover:text-ink"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close cookie settings"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[60vh] space-y-3 overflow-y-auto p-5">
          <div className="rounded-xl border border-line bg-paper p-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-medium">Necessary storage</h3>
              <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium text-muted">Always active</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Remembers your cookie choice and the font styles you save with the heart button. This stays in your browser
              and is never sent to us. It cannot be switched off here, but you can clear it in your browser settings.
            </p>
          </div>

          {OPTIONAL.map((cat) => {
            const inputId = `consent-${cat.key}`;
            return (
              <div key={cat.key} className="rounded-xl border border-line p-4">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor={inputId} className="font-medium">
                    {cat.title} <span className="text-sm font-normal text-muted">(optional)</span>
                  </label>
                  <input
                    id={inputId}
                    type="checkbox"
                    role="switch"
                    checked={draft[cat.key]}
                    onChange={(e) => setDraft((d) => ({ ...d, [cat.key]: e.target.checked }))}
                    aria-describedby={`${inputId}-desc`}
                    className="size-5 accent-[var(--color-accent)]"
                  />
                </div>
                <p id={`${inputId}-desc`} className="mt-2 text-sm leading-relaxed text-muted">
                  {cat.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-line p-5">
          <button type="button" className={btnSecondary} onClick={() => save({ analytics: false, marketing: false })}>
            Reject Optional
          </button>
          <button type="button" className={btnSecondary} onClick={() => save({ analytics: true, marketing: true })}>
            Accept All
          </button>
          <button type="button" className={btnPrimary} onClick={() => save(draft)}>
            Save Preferences
          </button>
        </div>
      </dialog>
    </>
  );
}
