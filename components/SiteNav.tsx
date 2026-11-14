"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import AuthorProfile from "@/components/AuthorProfile";
import type { NavItem } from "@/lib/site-config";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export default function SiteNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav aria-label="Main" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-4 py-2.5 text-[0.95rem] font-semibold transition-colors ${
                    active ? "bg-accent text-white shadow-sm" : "text-ink hover:bg-sand"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        className="order-last grid size-10 place-items-center rounded-full text-ink hover:bg-sand lg:hidden"
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
          className="absolute inset-x-0 top-full z-40 border-b border-line bg-surface shadow-[var(--shadow-card)] lg:hidden"
        >
          {/* On phones the header has no room for the author, so it sits at the top of the menu. */}
          <AuthorProfile className="mx-auto flex max-w-6xl px-8 pt-4 sm:hidden" nameFrom="always" />
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold ${
                      active ? "bg-accent-soft text-accent-strong" : "text-ink hover:bg-sand"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}
