/**
 * Header navigation: dropdowns, the Explore mega menu and the Popular Tools bar.
 * Every link already has its final URL. Items marked `soon` are pages that are not
 * written yet: menus show them with a "Soon" label and do not link them, so nobody
 * lands on a 404. When a page goes live, delete its `soon: true`.
 */
import {
  ArrowUpDown,
  BookOpen,
  Bold,
  Crown,
  Feather,
  Frame,
  Gamepad2,
  Heart,
  LayoutGrid,
  type LucideIcon,
  Shuffle,
  Smartphone,
  Sparkles,
  Type,
  UserRound,
  WandSparkles,
  Zap,
} from "lucide-react";

export type NavLink = { label: string; href: string; soon?: boolean; description?: string };
export type NavGroup = {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Hub page for the whole group, when there is one. */
  href?: string;
  hubSoon?: boolean;
  description: string;
  links: NavLink[];
};

export const FONT_LINKS: NavLink[] = [
  { label: "Cursive Fonts", href: "/fonts/cursive-fonts" },
  { label: "Bold Text", href: "/fonts/bold-text" },
  { label: "Aesthetic Fonts", href: "/fonts/aesthetic-fonts" },
  { label: "Small Text", href: "/fonts/small-text" },
  { label: "Glitch Text", href: "/fonts/glitch-text" },
  { label: "Upside Down Text", href: "/fonts/upside-down-text" },
  { label: "Instagram Fonts", href: "/fonts/instagram-fonts" },
  { label: "All Font Styles", href: "/fonts" },
];

export const TEXT_TOOL_LINKS: NavLink[] = [
  { label: "Font Generator", href: "/", description: "Type once, see every style" },
  { label: "Text Decorator", href: "/text-decorator", description: "Frames, wings and symbols" },
  { label: "Bio Generator", href: "/#bio-generator", description: "Ready-made styled bios" },
  { label: "Symbol Text Generator", href: "/#text-generator", description: "Mix styles with symbols" },
  { label: "Saved Styles", href: "/#saved", description: "Styles you hearted" },
];

export const GAMING: NavGroup = {
  id: "gaming",
  label: "Gaming Names",
  icon: Gamepad2,
  href: "/gaming-names",
  description: "Stylish names and symbols for games",
  links: [
    { label: "Free Fire Stylish Name", href: "/gaming-names/free-fire" },
    { label: "PUBG / BGMI Names", href: "/gaming-names/pubg-bgmi" },
    { label: "Roblox Stylish Names", href: "/gaming-names/roblox" },
    { label: "Fortnite Usernames", href: "/gaming-names/fortnite" },
    { label: "Minecraft Name Generator", href: "/gaming-names/minecraft" },
    { label: "COD & Valorant Names", href: "/gaming-names/cod-valorant" },
  ],
};

export const SOCIAL: NavGroup = {
  id: "social",
  label: "Social Media Fonts",
  icon: Smartphone,
  href: "/social-media",
  description: "Fonts for every app you post on",
  links: [
    { label: "WhatsApp Stylish Text", href: "/social-media/whatsapp" },
    { label: "Facebook Fonts & Bio", href: "/social-media/facebook" },
    { label: "YouTube Channel Fonts", href: "/social-media/youtube" },
    { label: "Twitter (X) Fonts", href: "/social-media/twitter-x" },
    { label: "Snapchat & Telegram Fonts", href: "/social-media/snapchat-telegram" },
    { label: "LinkedIn Bold & Italic Text", href: "/social-media/linkedin" },
  ],
};

export const EXPLORE_GROUPS: NavGroup[] = [
  GAMING,
  SOCIAL,
  {
    id: "styles",
    label: "Text Styles & Generators",
    icon: Type,
    href: "/fonts",
    description: "Special letter styles to copy",
    links: [
      { label: "Strikethrough Text Generator", href: "/fonts/strikethrough-text" },
      { label: "Old English (Gothic) Font", href: "/fonts/old-english-font" },
      { label: "Bubble Letters Generator", href: "/fonts/bubble-letters" },
      { label: "Double Struck Letters", href: "/fonts/double-struck" },
      { label: "Small Caps Generator", href: "/fonts/small-text" },
      { label: "Zalgo & Glitch Text", href: "/fonts/glitch-text" },
    ],
  },
  {
    id: "names",
    label: "Stylish Name Ideas",
    icon: UserRound,
    href: "/names",
    description: "Ready names you can copy",
    links: [
      { label: "Stylish Names for Boys", href: "/names/boys" },
      { label: "Stylish Names for Girls", href: "/names/girls" },
      { label: "Attitude Name Generator", href: "/names/attitude" },
      { label: "Aesthetic Username Generator", href: "/names/aesthetic-usernames" },
      { label: "Royal & Unique Names", href: "/names/royal" },
      { label: "Couple Name Generator", href: "/names/couple" },
    ],
  },
  {
    id: "symbols",
    label: "Symbols & Characters",
    icon: Heart,
    href: "/symbols",
    description: "Symbols for names, bios and chats",
    links: [
      { label: "Heart Symbols", href: "/symbols/hearts" },
      { label: "Crown Symbols", href: "/symbols/crowns" },
      { label: "Star & Arrow Symbols", href: "/symbols/stars-arrows" },
      { label: "Butterfly & Flower Symbols", href: "/symbols/butterflies-flowers" },
      { label: "Kaomoji (Text Faces)", href: "/symbols/kaomoji" },
      { label: "Invisible Character (Blank Name)", href: "/symbols/invisible-character" },
    ],
  },
  {
    id: "guides",
    label: "Learn & Guides",
    icon: BookOpen,
    href: "/blog",
    description: "How fancy text and Unicode work",
    links: [
      { label: "How Fancy Font Generators Work", href: "/blog/how-fancy-font-generators-work" },
      { label: "What Is Unicode?", href: "/blog/how-fancy-font-generators-work#what-is-unicode" },
      { label: "Look-alike Alphabets", href: "/blog/how-fancy-font-generators-work#lookalike-alphabets" },
      { label: "Why Fancy Text Shows Boxes", href: "/blog/how-fancy-font-generators-work#boxes" },
      { label: "Why Copy and Paste Works", href: "/blog/how-fancy-font-generators-work#why-copy-paste-works" },
      { label: "WhatsApp Bold, Italic & Strikethrough", href: "/blog/how-to-format-text-in-whatsapp" },
      { label: "Aesthetic Fonts for Names & Bios", href: "/blog/aesthetic-fonts-for-names-bios-captions" },
    ],
  },
];

export const POPULAR_TOOLS: (NavLink & { icon: LucideIcon })[] = [
  { label: "Text Decorator", href: "/text-decorator", icon: Frame },
  { label: "Bio Generator", href: "/#bio-generator", icon: WandSparkles },
  { label: "Cursive Fonts", href: "/fonts/cursive-fonts", icon: Feather },
  { label: "Bold Fonts", href: "/fonts/bold-text", icon: Bold },
  { label: "Aesthetic Fonts", href: "/fonts/aesthetic-fonts", icon: Sparkles },
  { label: "Upside Down Text", href: "/fonts/upside-down-text", icon: ArrowUpDown },
];

/** Icons for the simple dropdowns. */
export const MENU_ICONS = { fonts: LayoutGrid, tools: Shuffle, explore: Zap, crown: Crown } as const;

/** Only links whose page exists. Unwritten pages (`soon`) are hidden from menus entirely. */
export function liveLinks(links: NavLink[]): NavLink[] {
  return links.filter((l) => !l.soon);
}

/** Explore groups that have at least one live page, with their unwritten pages removed. */
export function liveGroups(groups: NavGroup[] = EXPLORE_GROUPS): NavGroup[] {
  return groups.map((g) => ({ ...g, links: liveLinks(g.links) })).filter((g) => g.links.length > 0);
}

/** Plain links in the header bar, after the Explore menu. */
export const HEADER_LINKS: NavLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/** True when a nav link points at the current page (ignores #hash links to the homepage). */
export function isCurrent(pathname: string, href: string): boolean {
  const path = href.split("#")[0] || "/";
  if (href.includes("#")) return false;
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(path + "/");
}
