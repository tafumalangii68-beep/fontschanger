import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

type Props = {
  title: string;
  description: string;
  path: string;
  showUpdated?: boolean;
  children: ReactNode;
};

/** Shared layout for About, Contact, FAQ and legal pages. */
export default function InfoPage({ title, description, path, showUpdated, children }: Props) {
  const updated = new Date(`${siteConfig.legalUpdated}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
      />
      <JsonLd data={webPageJsonLd(title, description, path)} />
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
      {showUpdated && (
        <p className="mt-2 text-sm text-muted">
          Last updated: <time dateTime={siteConfig.legalUpdated}>{updated}</time>
        </p>
      )}
      <div className="prose-fc mt-6 max-w-3xl">{children}</div>
    </Container>
  );
}
