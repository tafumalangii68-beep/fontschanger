import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Frame, Home, LayoutGrid } from "lucide-react";
import Container from "@/components/Container";
import { fontPages } from "@/data/font-pages";
import { upsideDown } from "@/lib/fonts";

// Next.js adds a noindex robots tag to not-found responses automatically.
export const metadata: Metadata = {
  title: "Page not found",
};

const shortcuts = [
  { href: "/", label: "Font generator", icon: Home },
  { href: "/fonts", label: "All font styles", icon: LayoutGrid },
  { href: "/text-decorator", label: "Text Decorator", icon: Frame },
];

export default function NotFound() {
  return (
    <section className="bg-gradient-to-b from-accent-soft/70 to-paper">
      <Container className="py-16 text-center sm:py-20">
        <p className="glyph text-6xl font-extrabold text-accent dark:text-accent-strong" aria-hidden="true">
          {upsideDown("404")}
        </p>
        <h1 className="mt-4 text-[2rem] font-extrabold tracking-tight text-ink sm:text-[2.6rem]">Page not found</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
          This page does not exist or has moved. Head back to the generator or pick a font style below.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {shortcuts.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold transition-colors ${
                  href === "/"
                    ? "bg-accent text-white hover:bg-accent-strong dark:hover:bg-[#8455f5]"
                    : "border border-line bg-surface text-ink hover:border-accent hover:bg-accent-soft"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mt-12 text-sm font-bold uppercase tracking-wider text-muted">Popular font styles</h2>
        <ul className="mx-auto mt-4 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
          {fontPages.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/fonts/${p.slug}`}
                className="group flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 font-semibold text-ink shadow-sm transition-colors hover:border-accent"
              >
                {p.name}
                <ArrowRight className="size-4 text-muted group-hover:text-accent" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
