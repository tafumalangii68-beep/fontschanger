/**
 * Public site configuration. Edit these values before launch.
 * No environment variables are used anywhere in this project.
 */
export const siteConfig = {
  name: "Fonts Changer",
  /** Canonical domain, no trailing slash. Replace if you launch on a different domain. */
  url: "https://fontschanger.app",
  primaryKeyword: "Fonts Changer",
  /** Site author, shown in the header profile and on blog posts. */
  author: "Ali Khan",
  tagline: "Change your text into fancy fonts you can copy and paste",
  description:
    "Fonts Changer turns plain text into 50+ fancy Unicode font styles (cursive, bold, aesthetic, small text and more) that you can copy and paste into Instagram, TikTok, WhatsApp, Discord and other apps.",
  language: "en",
  locale: "en_US",
  /**
   * LAUNCH REQUIREMENT: set the owner's real contact email.
   * While empty, the contact page shows a notice instead of a mailto link.
   */
  contactEmail: "worldwebsites906@gmail.com",
  /** Date the legal pages were last reviewed (YYYY-MM-DD). */
  legalUpdated: "2026-11-14",
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Font Styles", href: "/fonts" },
  { label: "Text Decorator", href: "/text-decorator" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
];

export const legalNav: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function absoluteUrl(path = "/"): string {
  // Next.js normalizes the homepage canonical to the bare origin, so use that everywhere.
  if (path === "/" || path === "") return siteConfig.url;
  return siteConfig.url + (path.startsWith("/") ? path : `/${path}`);
}
