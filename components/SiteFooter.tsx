import Link from "next/link";
import {
  Bold,
  Bookmark,
  Camera,
  ChevronRight,
  CircleHelp,
  Cookie,
  FileText,
  Info,
  Layers,
  type LucideIcon,
  Mail,
  Newspaper,
  RotateCcw,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Strikethrough,
  TriangleAlert,
  Type,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import Logo from "@/components/Logo";
import { fontPages } from "@/data/font-pages";
import { legalNav, siteConfig } from "@/lib/site-config";

/** An icon is either a lucide icon or a short Unicode glyph that shows the style itself. */
type RowIcon = LucideIcon | string;

const tools: { label: string; href: string; icon: RowIcon }[] = [
  { label: "Font Generator", href: "/", icon: Settings },
  { label: "All Font Styles", href: "/fonts", icon: Layers },
  { label: "Text Decorator", href: "/text-decorator", icon: Type },
  { label: "Bio Generator", href: "/#bio-generator", icon: "Ⓑ" },
  { label: "Symbol Text Generator", href: "/#text-generator", icon: Star },
  { label: "Saved Styles", href: "/#saved", icon: Bookmark },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "FAQ", href: "/faq", icon: CircleHelp },
];

const FONT_ICONS: Record<string, RowIcon> = {
  "instagram-fonts": Camera,
  "cursive-fonts": "𝒜",
  "bold-text": Bold,
  "aesthetic-fonts": Sparkles,
  "small-text": "Aa",
  "glitch-text": Zap,
  "upside-down-text": RotateCcw,
  "strikethrough-text": Strikethrough,
  "old-english-font": "𝕭",
  "bubble-letters": "ⓑ",
  "double-struck": "𝔹",
};

const LEGAL_ICONS: Record<string, LucideIcon> = {
  "/about": Users,
  "/contact": Mail,
  "/privacy-policy": ShieldCheck,
  "/terms-and-conditions": FileText,
  "/cookie-policy": Cookie,
  "/disclaimer": TriangleAlert,
};

const rowClass =
  "group flex w-full items-center gap-3 border-b border-white/[0.08] py-1 text-left text-sm leading-[1.2rem] text-white/80 transition-colors hover:text-white";

function RowContent({ icon: Icon, label }: { icon: RowIcon; label: string }) {
  return (
    <>
      <span className="grid w-5 shrink-0 place-items-center text-white/85" aria-hidden="true">
        {typeof Icon === "string" ? (
          <span className="text-base leading-none font-semibold">{Icon}</span>
        ) : (
          <Icon className="size-[1.05rem]" strokeWidth={1.75} />
        )}
      </span>
      <span className="flex-1">{label}</span>
      <ChevronRight
        className="size-4 shrink-0 text-[#a78bfa] transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </>
  );
}

function Card({
  title,
  icon: Icon,
  tone,
  className = "",
  children,
}: {
  title: string;
  icon: LucideIcon | string;
  tone: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <nav
      aria-label={title}
      className={`overflow-hidden rounded-[1.25rem] border border-[#8b5cf6]/45 bg-white/[0.03] shadow-[0_0_28px_-10px_rgb(139_92_246/0.65),inset_0_1px_0_rgb(255_255_255/0.06)] ${className}`}
    >
      <div className={`flex items-center gap-3 rounded-br-[2rem] py-1.5 pr-6 pl-2.5 ${tone}`}>
        <span className="grid size-7 place-items-center rounded-lg bg-white/15 text-white ring-1 ring-white/25">
          {typeof Icon === "string" ? (
            <span className="text-lg leading-none font-bold">{Icon}</span>
          ) : (
            <Icon className="size-[1.1rem]" aria-hidden="true" />
          )}
        </span>
        <p className="text-base font-bold text-white">{title}</p>
      </div>
      <ul className="px-4 pt-1 pb-2 [&>li:last-child>*]:border-b-0">{children}</ul>
    </nav>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative mt-14 overflow-hidden bg-[#110d2b] text-white dark:bg-[#0a0819]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_70%_0%,rgb(124_58_237/0.18),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl gap-5 px-4 pt-6 pb-3 sm:grid-cols-2 sm:items-start sm:px-6 lg:grid-cols-3 xl:grid-cols-[1.05fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-3 lg:flex lg:flex-wrap lg:items-center lg:gap-x-8 lg:gap-y-3 xl:col-span-1 xl:block xl:pt-2">
          <Link href="/" className="inline-block rounded-xl" aria-label="Fonts Changer home">
            <Logo inverted />
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75 lg:mt-0 xl:mt-3">
            A free, browser-based font generator that turns plain text into fancy Unicode styles you can copy and paste.
          </p>
          <p className="mt-4 inline-flex items-center gap-2.5 lg:mt-0 xl:mt-4 rounded-full border border-[#8b5cf6]/60 bg-[#7c3aed]/15 px-4 py-2 text-sm text-white/90 shadow-[0_0_20px_-8px_rgb(139_92_246/0.9)]">
            <ShieldCheck className="size-4 shrink-0 text-[#c4abff]" aria-hidden="true" />
            Your text stays on your device.
          </p>
        </div>

        <Card title="Font Styles" icon="A" tone="bg-gradient-to-r from-[#6d28d9] to-[#a855f7]" className="sm:row-span-2 lg:row-span-1">
          {fontPages.map((p) => (
            <li key={p.slug}>
              <Link href={`/fonts/${p.slug}`} className={rowClass}>
                <RowContent icon={FONT_ICONS[p.slug] ?? Type} label={p.name} />
              </Link>
            </li>
          ))}
        </Card>

        <Card title="Tools" icon={WandSparkles} tone="bg-gradient-to-r from-[#4f46e5] to-[#7c3aed]">
          {tools.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className={rowClass}>
                <RowContent icon={t.icon} label={t.label} />
              </Link>
            </li>
          ))}
        </Card>

        <Card title="Information" icon={Info} tone="bg-gradient-to-r from-[#7c3aed] to-[#c026d3]">
          {legalNav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={rowClass}>
                <RowContent icon={LEGAL_ICONS[l.href] ?? FileText} label={l.label} />
              </Link>
            </li>
          ))}
          <li>
            <CookieSettingsButton className={`${rowClass} cursor-pointer`}>
              <RowContent icon={Settings} label="Cookie Settings" />
            </CookieSettingsButton>
          </li>
        </Card>
      </div>

      <svg
        className="relative block h-4 w-full"
        viewBox="0 0 1440 16"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="footer-wave" x1="0" x2="1">
            <stop offset="0" stopColor="#a855f7" />
            <stop offset="0.5" stopColor="#6d28d9" stopOpacity="0.5" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <path d="M0 3 C 240 15, 480 15, 720 9 S 1200 1, 1440 7" fill="none" stroke="url(#footer-wave)" strokeWidth="2" />
      </svg>

      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-3 text-xs leading-relaxed text-white/55 sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}. Not affiliated with Instagram, TikTok, Meta, Discord or any other
          platform named on this site.
        </p>
      </div>
    </footer>
  );
}
