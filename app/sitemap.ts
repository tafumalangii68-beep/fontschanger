import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { fontPages } from "@/data/font-pages";
import { absoluteUrl } from "@/lib/site-config";

export const dynamic = "force-static";

/** Only canonical, indexable pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const core: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/fonts", priority: 0.8 },
    { path: "/text-decorator", priority: 0.7 },
    { path: "/blog", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
    { path: "/about", priority: 0.4 },
    { path: "/contact", priority: 0.3 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/terms-and-conditions", priority: 0.2 },
    { path: "/cookie-policy", priority: 0.2 },
    { path: "/disclaimer", priority: 0.2 },
  ];
  return [
    ...core.map((c) => ({ url: absoluteUrl(c.path), priority: c.priority })),
    ...fontPages.map((p) => ({ url: absoluteUrl(`/fonts/${p.slug}`), priority: 0.8 })),
    ...BLOG_POSTS.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: p.updated ?? p.published, priority: 0.6 })),
  ];
}
