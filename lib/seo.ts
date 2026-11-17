import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of appending the site name. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
  /** Page-specific share image; defaults to the site image. */
  image?: { url: string; width: number; height: number; alt: string };
};

/** Shared social image, generated once at build time by app/opengraph-image.tsx. */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Fonts Changer: fancy text you can copy and paste",
} as const;

export function buildMetadata({ title, description, path, absoluteTitle, noIndex, image = OG_IMAGE }: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    // Page-level openGraph replaces the layout's, so the image must be repeated here.
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

const ORG_ID = `${absoluteUrl("/")}#organization`;
const SITE_ID = `${absoluteUrl("/")}#website`;

export type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage";

export function webPageJsonLd(name: string, description: string, path: string, type: PageType = "WebPage") {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: siteConfig.language,
    isPartOf: { "@id": SITE_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** Site-wide identity: who publishes the site and its logo. Rendered on the homepage. */
export function organizationJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG_ID,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo-mark-512.png"), width: 512, height: 512 },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": SITE_ID,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      inLanguage: siteConfig.language,
      publisher: { "@id": ORG_ID },
    },
  ];
}

/** Article markup for a blog post. */
export function blogPostingJsonLd(post: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated?: string;
  author: string;
  image?: string;
}) {
  const url = absoluteUrl(post.path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    inLanguage: siteConfig.language,
    image: absoluteUrl(post.image ?? OG_IMAGE.url),
    author: { "@type": "Person", name: post.author, url: absoluteUrl("/about") },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
