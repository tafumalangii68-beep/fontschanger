import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import Logo from "@/components/Logo";
import { fontPages } from "@/data/font-pages";
import { legalNav, siteConfig } from "@/lib/site-config";

const linkClass = "text-white/70 transition-colors hover:text-white";

const tools = [
  { label: "Font Generator", href: "/" },
  { label: "All Font Styles", href: "/fonts" },
  { label: "Text Decorator", href: "/text-decorator" },
  { label: "Saved Styles", href: "/#saved" },
  { label: "FAQ", href: "/faq" },
];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title}>
      <p className="text-sm font-bold uppercase tracking-wider text-white">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </nav>
  );
}

export default function SiteFooter() {
  return (
    <footer className="mt-20 bg-navy text-white dark:bg-[#0a0819]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-block rounded-xl" aria-label="Fonts Changer home">
            <Logo inverted />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            A free, browser-based font generator that turns plain text into fancy Unicode styles you can copy and paste.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-white/70">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#c4abff]" aria-hidden="true" />
            Your text stays on your device.
          </p>
        </div>
        <Column title="Font styles">
          {fontPages.map((p) => (
            <li key={p.slug}>
              <Link href={`/fonts/${p.slug}`} className={linkClass}>
                {p.name}
              </Link>
            </li>
          ))}
        </Column>
        <Column title="Tools">
          {tools.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className={linkClass}>
                {t.label}
              </Link>
            </li>
          ))}
        </Column>
        <Column title="Information">
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
        </Column>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs leading-relaxed text-white/55 sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}. Not affiliated with Instagram, TikTok, Meta, Discord or any other
          platform named on this site.
        </p>
      </div>
    </footer>
  );
}
