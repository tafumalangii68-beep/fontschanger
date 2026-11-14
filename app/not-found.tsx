import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import { fontPages } from "@/data/font-pages";
import { upsideDown } from "@/lib/fonts";

// Next.js adds a noindex robots tag to not-found responses automatically.
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container className="py-16">
      <p className="glyph text-4xl text-muted" aria-hidden="true">
        {upsideDown("404")}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">
        This page does not exist or has moved. You can go back to the font generator or pick a style below.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent-strong dark:hover:bg-[#8455f5]"
      >
        Go to Fonts Changer
      </Link>
      <ul className="mt-10 grid gap-2 sm:grid-cols-2">
        {fontPages.map((p) => (
          <li key={p.slug}>
            <Link href={`/fonts/${p.slug}`} className="text-accent-strong underline underline-offset-2 hover:text-ink">
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
