import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { fontPages } from "@/data/font-pages";
import { legalNav, siteConfig } from "@/lib/site-config";

const linkClass = "text-muted hover:text-ink hover:underline";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-semibold text-ink">{siteConfig.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            A free, browser-based tool that turns plain text into Unicode font styles you can copy and paste.
          </p>
        </div>
        <nav aria-label="Font styles">
          <p className="text-sm font-semibold text-ink">Font styles</p>
          <ul className="mt-3 space-y-2 text-sm">
            {fontPages.map((p) => (
              <li key={p.slug}>
                <Link href={`/fonts/${p.slug}`} className={linkClass}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Site information">
          <p className="text-sm font-semibold text-ink">Information</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/faq" className={linkClass}>
                FAQ
              </Link>
            </li>
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className={`${linkClass} text-left`} />
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-5xl px-4 py-5 text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}. Not affiliated with Instagram, TikTok, Meta, Discord or any other
          platform named on this site.
        </p>
      </div>
    </footer>
  );
}
