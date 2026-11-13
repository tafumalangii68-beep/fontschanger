import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { mainNav, siteConfig } from "@/lib/site-config";

export default function SiteHeader() {
  return (
    <header className="relative border-b border-line bg-surface">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-ink">
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-lg bg-ink font-serif text-base italic text-white">
            Aa
          </span>
          {siteConfig.name}
        </Link>
        <SiteNav items={mainNav} />
      </div>
    </header>
  );
}
