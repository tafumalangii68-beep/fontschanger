/** Blog posts, newest first. Each post's body lives in app/blog/<slug>/page.tsx. */
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
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-fancy-font-generators-work",
    title: "How Do Fancy Font Generators Work? (Unicode Explained Simply)",
    description:
      "Fancy text is not a font. Learn how generators swap letters for Unicode characters, why the style survives copy and paste, and why boxes appear.",
    published: "2026-11-15",
    readingMinutes: 7,
    tags: ["Unicode", "How it works"],
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
