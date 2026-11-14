import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of appending the site name. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

/** Shared social image, generated once at build time by app/opengraph-image.tsx. */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Fonts Changer: fancy text you can copy and paste",
} as const;

export function buildMetadata({ title, description, path, absoluteTitle, noIndex }: MetaInput): Metadata {
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
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
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
      logo: { "@type": "ImageObject", url: absoluteUrl("/apple-icon"), width: 180, height: 180 },
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
