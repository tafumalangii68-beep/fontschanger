"use client";

import { useId, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import authorPhoto from "@/public/images/author.webp";
import authorPhotoLarge from "@/public/images/author-large.webp";

export const AUTHOR_NAME = "Ali Khan";
const AUTHOR_TITLE = "Founder & Creator of Fonts Changer";

/**
 * Small round photo plus name in the header. Clicking it opens a profile popup.
 * The name shows from `nameFrom` up and stays readable to screen readers below it.
 */
export default function AuthorProfile({ className = "", nameFrom = "lg" }: { className?: string; nameFrom?: "lg" | "always" }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-haspopup="dialog"
        aria-label={`About ${AUTHOR_NAME}`}
        className={`cursor-pointer items-center gap-2 rounded-full text-left ${className}`}
      >
        <Image
          src={authorPhoto}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full object-cover ring-2 ring-accent/60 ring-offset-2 ring-offset-paper"
        />
        <span
          className={`whitespace-nowrap text-sm font-semibold text-ink ${nameFrom === "lg" ? "sr-only lg:not-sr-only" : ""}`}
        >
          {AUTHOR_NAME}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        // Clicking the dimmed area outside the card closes the popup.
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        className="fc-author-dialog m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-[1.75rem] bg-transparent p-0 text-left"
      >
        <div className="overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[0_30px_80px_-20px_rgb(23_20_59/0.45)]">
          <div className="relative h-28 bg-gradient-to-br from-accent via-[#8b5cf6] to-[#ec4899]">
            <Sparkles className="absolute left-6 top-5 size-5 text-white/60" aria-hidden="true" />
            <Sparkles className="absolute bottom-6 right-20 size-4 text-white/50" aria-hidden="true" />
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close profile"
              className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/35"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="px-6 pb-7 sm:px-8">
            <Image
              src={authorPhotoLarge}
              alt={`Photo of ${AUTHOR_NAME}`}
              width={112}
              height={112}
              className="relative z-10 -mt-14 size-28 rounded-full border-4 border-surface object-cover shadow-[var(--shadow-card)] ring-2 ring-accent/60"
            />
            <h2 id={titleId} className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
              {AUTHOR_NAME}
            </h2>
            <p className="mt-0.5 text-sm font-semibold text-accent dark:text-accent-strong">{AUTHOR_TITLE}</p>

            <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-muted">About {AUTHOR_NAME}</h3>
            <p className="mt-2 leading-relaxed text-body">
              Hi, I&apos;m {AUTHOR_NAME}, the creator of Fonts Changer. I built this site to make it easy for anyone to turn
              plain text into stylish fonts for Instagram, TikTok, Discord and more. No apps, no sign-up, just copy and
              paste.
            </p>

            <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-muted">What I Do</h3>
            <p className="mt-2 leading-relaxed text-body">
              I design and build simple, fast web tools that solve everyday problems. I keep Fonts Changer free, add new
              font styles regularly, and improve it based on user feedback. Have an idea or found a bug? Use the{" "}
              <Link
                href="/contact"
                onClick={() => dialogRef.current?.close()}
                className="font-semibold text-accent underline underline-offset-2 dark:text-accent-strong"
              >
                contact form
              </Link>
              , and I read every message.
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
