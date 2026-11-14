import Link from "next/link";
import AuthorProfile from "@/components/AuthorProfile";
import HeaderActions from "@/components/HeaderActions";
import Logo from "@/components/Logo";
import SiteNav from "@/components/SiteNav";
import { mainNav } from "@/lib/site-config";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6">
        <Link href="/" className="shrink-0 rounded-xl" aria-label="Fonts Changer home">
          <Logo />
        </Link>
        <SiteNav items={mainNav} />
        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          {/* Phones show the author in the menu instead; the header has no room there. */}
          <AuthorProfile className="hidden sm:flex" />
          <span aria-hidden="true" className="mx-1.5 hidden h-6 w-px bg-line sm:block" />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}
