/**
 * Blog posts, newest first. Each post has its own page in app/blog/<slug>/page.tsx.
 */
import type { StaticImageData } from "next/image";
import aestheticCover from "@/public/images/blog/aesthetic-cover.webp";
import fancyFontsCover from "@/public/images/blog/fancy-fonts-cover.webp";
import whatsappCover from "@/public/images/blog/whatsapp-cover.webp";

export type BlogPost = {
  slug: string;
  title: string;
  /** Used for the meta description and the card on /blog. */
  description: string;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  updated?: string;
  readingMinutes: number;
  tags: string[];
  cover?: StaticImageData;
  coverAlt?: string;
  /** 1200x630 JPEG in /public used when the post is shared on social media. */
  shareImage?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "aesthetic-fonts-for-names-bios-captions",
    title: "Aesthetic Fonts for Stylish Names, Bios and Captions",
    description:
      "How to use aesthetic fonts in your name, bio and captions: the best soft styles, ideas to copy, symbol tips and how to keep it readable.",
    published: "2026-11-23",
    readingMinutes: 6,
    tags: ["Aesthetic", "Instagram"],
    cover: aestheticCover,
    coverAlt:
      "A lilac phone showing a profile with a golden name bar and a crown, surrounded by pink lilies, clouds, a golden moon, a heart and sparkles",
    shareImage: "/images/blog/aesthetic-og.jpg",
  },
  {
    slug: "how-to-format-text-in-whatsapp",
    title: "How to Format Text in WhatsApp: Bold, Italic, Strikethrough",
    description:
      "Write bold, italic, strikethrough and monospace text in WhatsApp with simple symbols or the menu. Plus lists, quotes and fixes when it doesn't work.",
    published: "2026-11-20",
    readingMinutes: 5,
    tags: ["WhatsApp", "How to"],
    cover: whatsappCover,
    coverAlt:
      "A purple phone showing WhatsApp chat bubbles with bold, italic and crossed-out text, surrounded by a golden asterisk, underscore and tilde",
    shareImage: "/images/blog/whatsapp-og.jpg",
  },
  {
    slug: "how-fancy-font-generators-work",
    title: "How Do Fancy Font Generators Work? (Unicode Explained Simply)",
    description:
      "Fancy text is not a font. Learn how generators swap letters for Unicode characters, why the style survives copy and paste, and why boxes appear.",
    published: "2026-11-15",
    readingMinutes: 7,
    tags: ["Unicode", "How it works"],
    cover: fancyFontsCover,
    coverAlt:
      "A large purple letter A on a stand, with the same letter shown in bold, cursive, Old English, double-struck and circled styles along a glowing line",
    shareImage: "/images/blog/fancy-fonts-og.jpg",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
