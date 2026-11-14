import type { ReactNode } from "react";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { webPageJsonLd, type PageType } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

type Props = {
  title: string;
  description: string;
  path: string;
  intro?: ReactNode;
  illustration?: ReactNode;
  showUpdated?: boolean;
  /** Set to false when the page lays out its own content instead of long-form prose. */
  prose?: boolean;
  /** Schema.org page type for structured data. */
  schemaType?: PageType;
  children: ReactNode;
};

export function formatUpdated(): string {
  return new Date(`${siteConfig.legalUpdated}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Shared layout for About, Contact, FAQ and legal pages. */
export default function InfoPage({ title, description, path, intro, illustration, showUpdated, prose = true, schemaType = "WebPage", children }: Props) {
  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, path, schemaType)} />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
        title={title}
        intro={intro ?? description}
        illustration={illustration}
      >
        {showUpdated && (
          <p className="mt-3 text-sm text-muted">
            Last updated: <time dateTime={siteConfig.legalUpdated}>{formatUpdated()}</time>
          </p>
        )}
      </PageHero>
      <Container className="pb-4 pt-6">
        {prose ? <div className="prose-fc max-w-3xl">{children}</div> : children}
      </Container>
    </>
  );
}
