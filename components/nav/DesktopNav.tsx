"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Zap } from "lucide-react";
import NavLinkItem from "@/components/nav/NavLinkItem";
import stylesArt from "@/public/images/font-styles.webp";
import socialArt from "@/public/images/instagram-fonts.webp";
import heartArt from "@/public/images/menu-heart.webp";
import guidesArt from "@/public/images/terms.webp";
import gamingArt from "@/public/images/menu-gaming.webp";
import namesArt from "@/public/images/menu-names.webp";
import {
  FONT_LINKS,
  HEADER_LINKS,
  POPULAR_TOOLS,
  TEXT_TOOL_LINKS,
  isCurrent,
  liveGroups,
  liveLinks,
  type NavGroup,
  type NavLink,
} from "@/lib/navigation";

type MenuId = "fonts" | "tools" | "explore";

/** 3D artwork per Explore card; cards without one show a glossy icon tile. */
const CARD_ART: Record<string, StaticImageData> = {
  gaming: gamingArt,
  social: socialArt,
  styles: stylesArt,
  names: namesArt,
  symbols: heartArt,
  guides: guidesArt,
};

const topLink =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-[0.95rem] font-semibold transition-colors";

/** Purple pill: the current page and open menus always, every other item on hover. */
const pillOn =
  "bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white shadow-[0_8px_20px_-8px_rgb(168_85_247/0.9)]";
const pillOff =
  "text-white/85 hover:bg-gradient-to-r hover:from-[#6d28d9] hover:to-[#9333ea] hover:text-white hover:shadow-[0_8px_20px_-10px_rgb(168_85_247/0.9)]";

function ViewAll({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  // Groups without a hub page yet get no "View All" link.
  if (!group.href || group.hubSoon) return null;
  return (
    <Link
      href={group.href}
      onClick={onNavigate}
      className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-bold text-accent shadow-sm transition-colors hover:bg-accent hover:text-white dark:text-accent-strong dark:hover:text-white"
    >
      View All
      <ArrowRight className="size-3.5" aria-hidden="true" />
    </Link>
  );
}

function GroupCard({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const Icon = group.icon;
  return (
    <section aria-labelledby={`mm-${group.id}`} className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="flex items-center gap-2.5 bg-gradient-to-r from-accent-soft to-accent-soft/40 px-4 py-3">
        <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-[#9b5cff] text-white shadow-sm">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 id={`mm-${group.id}`} className="flex-1 text-[1.02rem] font-extrabold tracking-tight text-ink">
          {group.label}
        </h3>
        <ViewAll group={group} onNavigate={onNavigate} />
      </div>
      {/* Decorative 3D artwork on the right side of the card, like the reference design. */}
      {CARD_ART[group.id] ? (
        <Image
          src={CARD_ART[group.id]}
          alt=""
          aria-hidden="true"
          sizes="112px"
          loading="eager"
          className="pointer-events-none absolute bottom-5 right-9 h-auto w-24 opacity-95 drop-shadow-[0_10px_18px_rgb(100_37_232/0.25)]"
        />
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 right-10 grid size-20 place-items-center rounded-[1.5rem] bg-gradient-to-br from-[#c4b5fd] via-[#a78bfa] to-[#7c3aed] text-white opacity-60 shadow-[0_14px_28px_-12px_rgb(100_37_232/0.7)] ring-4 ring-white/50"
        >
          <Icon className="size-10" strokeWidth={1.6} />
        </span>
      )}
      <ul className="relative space-y-0.5 p-2 [@media(max-height:860px)]:[&_a]:py-1">
        {group.links.map((l) => (
          <li key={l.href}>
            <NavLinkItem link={l} onNavigate={onNavigate} compact trailing />
          </li>
        ))}
      </ul>
    </section>
  );
}

function SimpleList({ links, onNavigate }: { links: NavLink[]; onNavigate: () => void }) {
  return (
    <ul className="space-y-0.5">
      {links.map((l) => (
        <li key={l.href + l.label}>
          <NavLinkItem link={l} onNavigate={onNavigate} />
        </li>
      ))}
    </ul>
  );
}

/** Desktop navigation (xl and up): dropdowns plus the Explore mega menu. */
export default function DesktopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuId | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const baseId = useId();
  const close = useCallback(() => setOpen(null), []);

  // Close on route change, outside click and Escape.
  useEffect(() => close(), [pathname, close]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const trigger = document.getElementById(`${baseId}-${open}-btn`);
        close();
        trigger?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, baseId]);
  useEffect(() => () => void (hoverTimer.current && clearTimeout(hoverTimer.current)), []);

  // Optional hover opening for mouse users; clicks always work.
  const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hoverOpen = (id: MenuId) => {
    if (!canHover()) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(id), 120);
  };
  const hoverClose = () => {
    if (!canHover()) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(null), 220);
  };

  const trigger = (id: MenuId, label: string) => {
    const isOpen = open === id;
    return (
      <button
        type="button"
        id={`${baseId}-${id}-btn`}
        aria-expanded={isOpen}
        aria-controls={`${baseId}-${id}`}
        onClick={() => setOpen(isOpen ? null : id)}
        className={`${topLink} ${isOpen ? pillOn : pillOff}`}
      >
        {label}
        <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
    );
  };

  const panel = (id: MenuId, children: ReactNode, className: string) =>
    open === id ? (
      <div
        id={`${baseId}-${id}`}
        role="region"
        aria-labelledby={`${baseId}-${id}-btn`}
        className={`fc-menu-panel absolute top-[calc(100%+0.6rem)] z-50 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain [scrollbar-width:thin] rounded-[1.5rem] border border-line bg-paper p-3 shadow-[0_30px_70px_-25px_rgb(23_20_59/0.55)] ${className}`}
      >
        {children}
      </div>
    ) : null;

  const item = (id: MenuId, label: string, content: ReactNode, panelClass: string) => (
    <li className={id === "explore" ? "" : "relative"} onMouseEnter={() => hoverOpen(id)} onMouseLeave={hoverClose}>
      {trigger(id, label)}
      {panel(id, content, panelClass)}
    </li>
  );

  const groups = liveGroups();

  return (
    <nav aria-label="Main" ref={rootRef} className="hidden xl:block">
      <ul className="flex items-center gap-0.5">
        <li>
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`${topLink} ${pathname === "/" ? pillOn : pillOff}`}
          >
            Home
          </Link>
        </li>
        {item("fonts", "Fonts", <div className="w-64"><SimpleList links={liveLinks(FONT_LINKS)} onNavigate={close} /></div>, "left-0")}
        {item("tools", "Text Tools", <div className="w-72"><SimpleList links={liveLinks(TEXT_TOOL_LINKS)} onNavigate={close} /></div>, "left-0")}
        {item(
          "explore",
          "Explore",
          <div>
            {/* Only categories with written pages appear; new pages show up here automatically. */}
            <div className={`grid gap-3 ${groups.length >= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
              {groups.map((g) => (
                <GroupCard key={g.id} group={g} onNavigate={close} />
              ))}
            </div>
            <div className="sticky bottom-0 z-10 mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-surface p-2.5 shadow-[0_-10px_24px_-14px_rgb(23_20_59/0.35)]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-[#9b5cff] px-4 py-2 text-sm font-bold text-white">
                <Zap className="size-4" aria-hidden="true" />
                Popular Tools:
              </span>
              {POPULAR_TOOLS.map(({ icon: Icon, ...l }) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  aria-current={isCurrent(pathname, l.href) ? "page" : undefined}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-accent hover:bg-accent-soft"
                >
                  <Icon className="size-4 text-accent dark:text-accent-strong" aria-hidden="true" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>,
          "left-0 right-0",
        )}
        {HEADER_LINKS.map((l) => {
          const current = isCurrent(pathname, l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={current ? "page" : undefined}
                className={`${topLink} ${current ? pillOn : pillOff}`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
