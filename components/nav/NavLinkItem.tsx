import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { NavLink } from "@/lib/navigation";

/** One menu link. Pages that are not written yet show a "Soon" label and are not clickable. */
export default function NavLinkItem({
  link,
  onNavigate,
  compact = false,
}: {
  link: NavLink;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  const base = `group flex items-center gap-2 rounded-lg ${compact ? "px-2 py-1.5" : "px-2.5 py-2"} text-[0.92rem]`;
  if (link.soon) {
    return (
      <span aria-disabled="true" className={`${base} cursor-default text-muted`}>
        <ChevronRight className="size-3.5 shrink-0 opacity-50" aria-hidden="true" />
        <span className="flex-1">{link.label}</span>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-accent dark:text-accent-strong">
          Soon
        </span>
      </span>
    );
  }
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className={`${base} font-medium text-ink transition-colors hover:bg-accent-soft hover:text-accent dark:hover:text-accent-strong`}
    >
      <ChevronRight className="size-3.5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 dark:text-accent-strong" aria-hidden="true" />
      <span className="flex-1">{link.label}</span>
      {link.description && <span className="hidden text-xs text-muted 2xl:inline">{link.description}</span>}
    </Link>
  );
}
