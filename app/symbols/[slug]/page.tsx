import { notFound } from "next/navigation";
import LandingView from "@/components/landing/LandingView";
import { SYMBOLS_SECTION as section } from "@/data/landing/symbols";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return section.pages.map((p) => ({ slug: p.slug }));
}

function find(slug: string) {
  return section.pages.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const page = find((await params).slug);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `${section.basePath}/${page.slug}`,
    absoluteTitle: true,
  });
}

export default async function SectionPage({ params }: { params: Promise<Params> }) {
  const page = find((await params).slug);
  if (!page) notFound();
  return <LandingView section={section} page={page} />;
}
