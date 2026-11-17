import Link from "next/link";
import AuthorProfile from "@/components/AuthorProfile";
import HeaderActions from "@/components/HeaderActions";
import Logo from "@/components/Logo";
import DesktopNav from "@/components/nav/DesktopNav";
import MobileNav from "@/components/nav/MobileNav";
import SiteSearch from "@/components/nav/SiteSearch";
import { getSearchIndex } from "@/lib/search-index";

export default function SiteHeader() {
  const searchItems = getSearchIndex();
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[linear-gradient(100deg,#1c0a4a_0%,#2b0f6b_45%,#3a1590_100%)] shadow-[0_8px_30px_-18px_rgb(23_20_59/0.8)] dark:bg-[linear-gradient(100deg,#0f0726_0%,#1a0b45_50%,#26106a_100%)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6">
        <Link href="/" className="shrink-0 rounded-xl" aria-label="Fonts Changer home">
          <Logo inverted />
        </Link>
        <DesktopNav />
        <div className="ml-auto flex items-center gap-1.5 xl:ml-0">
          {/* Phones show the author in the menu instead; the header has no room there. */}
          <AuthorProfile className="hidden sm:flex" tone="dark" />
          <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-white/20 sm:block" />
          <div className="hidden xl:block">
            <SiteSearch items={searchItems} />
          </div>
          <HeaderActions />
          <MobileNav search={<SiteSearch items={searchItems} variant="menu" />} />
        </div>
      </div>
    </header>
  );
}
