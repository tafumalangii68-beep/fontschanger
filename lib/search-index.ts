/** Builds the site search index on the server: pages, tools, posts and every font style. */
import type { SearchItem } from "@/components/nav/SiteSearch";
import { BLOG_POSTS } from "@/data/blog";
import { fontPages } from "@/data/font-pages";
import { FONT_STYLES } from "@/lib/fonts";
import { EXPLORE_GROUPS, FONT_LINKS, TEXT_TOOL_LINKS } from "@/lib/navigation";

const PAGES: SearchItem[] = [
  { title: "Font Generator", href: "/", group: "Tool", keywords: "fancy text home generate fonts copy paste" },
  { title: "All Font Styles", href: "/fonts", group: "Page", keywords: "styles categories browse" },
  { title: "Blog", href: "/blog", group: "Page", keywords: "articles guides" },
  { title: "FAQ", href: "/faq", group: "Page", keywords: "questions help" },
  { title: "About", href: "/about", group: "Page", keywords: "ali khan founder" },
  { title: "Contact", href: "/contact", group: "Page", keywords: "email message feedback bug" },
  { title: "Privacy Policy", href: "/privacy-policy", group: "Page" },
  { title: "Terms and Conditions", href: "/terms-and-conditions", group: "Page" },
  { title: "Cookie Policy", href: "/cookie-policy", group: "Page" },
  { title: "Disclaimer", href: "/disclaimer", group: "Page" },
];

let cache: SearchItem[] | null = null;

export function getSearchIndex(): SearchItem[] {
  if (cache) return cache;
  const items: SearchItem[] = [...PAGES];

  for (const l of TEXT_TOOL_LINKS) items.push({ title: l.label, href: l.href, group: "Tool", keywords: l.description });
  for (const p of fontPages) items.push({ title: p.name, href: `/fonts/${p.slug}`, group: "Fonts", keywords: p.metaTitle });
  for (const l of FONT_LINKS) items.push({ title: l.label, href: l.href, group: "Fonts" });
  for (const g of EXPLORE_GROUPS) {
    if (g.href && !g.hubSoon) items.push({ title: g.label, href: g.href, group: "Section" });
    for (const l of g.links) if (!l.soon) items.push({ title: l.label, href: l.href, group: g.label });
  }
  for (const p of BLOG_POSTS) items.push({ title: p.title, href: `/blog/${p.slug}`, group: "Blog", keywords: p.tags.join(" ") });

  // Each font style points to the category page that features it.
  for (const s of FONT_STYLES) {
    const page = fontPages.find((p) => s.categories.includes(p.category));
    items.push({ title: s.name, href: page ? `/fonts/${page.slug}` : "/fonts", group: "Font style", keywords: s.categories.join(" ") });
  }

  // Drop duplicates (same title and link).
  const seen = new Set<string>();
  cache = items.filter((i) => {
    const key = `${i.title.toLowerCase()}|${i.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return cache;
}
