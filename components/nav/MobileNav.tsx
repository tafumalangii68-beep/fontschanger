"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LayoutGrid, Menu, Shuffle, X, Zap, type LucideIcon } from "lucide-react";
import AuthorProfile from "@/components/AuthorProfile";
import NavLinkItem from "@/components/nav/NavLinkItem";
import {
  FONT_LINKS,
  HEADER_LINKS,
  POPULAR_TOOLS,
  TEXT_TOOL_LINKS,
  isCurrent,
  liveGroups,
  liveLinks,
  type NavLink,
} from "@/lib/navigation";

function Section({ icon: Icon, title, links, onNavigate }: { icon: LucideIcon; title: string; links: NavLink[]; onNavigate: () => void }) {
  return (
    <details className="group rounded-2xl border border-line bg-surface">
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl px-4 py-3.5 font-bold text-ink [&::-webkit-details-marker]:hidden">
        <span className="grid size-8 place-items-center rounded-lg bg-accent-soft">
          <Icon className="size-4 text-accent dark:text-accent-strong" aria-hidden="true" />
        </span>
        <span className="flex-1">{title}</span>
        <ChevronDown className="size-5 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <ul className="space-y-0.5 px-2 pb-3">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <NavLinkItem link={l} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </details>
  );
}

/** Hamburger menu below xl: accordion sections with every menu link. */
export default function MobileNav({ search }: { search: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="order-last grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 xl:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fc-menu-panel absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-line bg-paper shadow-[var(--shadow-card)] xl:hidden"
        >
          <div className="mx-auto max-w-3xl space-y-2.5 px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              {/* On phones the header has no room for the author, so it sits at the top of the menu. */}
              <AuthorProfile className="flex sm:hidden" nameFrom="always" />
              <div className="ml-auto">{search}</div>
            </div>
            {[{ label: "Home", href: "/" }, ...HEADER_LINKS].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                aria-current={isCurrent(pathname, l.href) ? "page" : undefined}
                className="block rounded-2xl border border-line bg-surface px-4 py-3.5 font-bold text-ink hover:bg-accent-soft"
              >
                {l.label}
              </Link>
            ))}
            <Section icon={LayoutGrid} title="Fonts" links={liveLinks(FONT_LINKS)} onNavigate={close} />
            <Section icon={Shuffle} title="Text Tools" links={liveLinks(TEXT_TOOL_LINKS)} onNavigate={close} />
            {/* Explore categories; only pages that exist are listed. */}
            {liveGroups().map((g) => (
              <Section
                key={g.id}
                icon={g.icon}
                title={g.label}
                links={g.href && !g.hubSoon ? [...g.links, { label: `All ${g.label}`, href: g.href }] : g.links}
                onNavigate={close}
              />
            ))}
            <div className="rounded-2xl border border-line bg-surface p-3">
              <p className="mb-2 flex items-center gap-1.5 px-1 text-sm font-bold text-ink">
                <Zap className="size-4 text-accent dark:text-accent-strong" aria-hidden="true" />
                Popular Tools
              </p>
              <ul className="flex flex-wrap gap-2">
                {POPULAR_TOOLS.map(({ icon: Icon, ...l }) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={close}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 py-2 text-sm font-semibold text-ink hover:bg-accent-soft"
                    >
                      <Icon className="size-4 text-accent dark:text-accent-strong" aria-hidden="true" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
