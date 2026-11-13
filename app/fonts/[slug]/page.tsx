import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import FaqList from "@/components/FaqList";
import FontGenerator from "@/components/FontGenerator";
import JsonLd from "@/components/JsonLd";
import { fontPages, getFontPage } from "@/data/font-pages";
import { FONT_STYLES } from "@/lib/fonts";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return fontPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getFontPage(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/fonts/${page.slug}`,
    absoluteTitle: true,
  });
}

export default async function FontCategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getFontPage(slug);
  if (!page) notFound();

  const path = `/fonts/${page.slug}`;
  const related = page.related.map(getFontPage).filter((p) => p !== undefined);

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Font Styles", path: "/fonts" },
          { name: page.name, path },
        ]}
      />
      <JsonLd data={webPageJsonLd(page.metaTitle, page.metaDescription, path)} />

      <header className="mb-6 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{page.h1}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{page.intro}</p>
      </header>

      <FontGenerator initialFilter={page.category} sample={page.sample} />

      <section aria-labelledby="examples" className="mt-12 max-w-3xl">
        <h2 id="examples" className="text-2xl font-semibold tracking-tight">
          Examples
        </h2>
        <div className="mt-4 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand text-muted">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-medium">
                  Use
                </th>
                <th scope="col" className="px-4 py-2.5 font-medium">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {page.examples.map((ex) => {
                const style = FONT_STYLES.find((s) => s.id === ex.styleId);
                return (
                  <tr key={ex.label}>
                    <th scope="row" className="px-4 py-3 align-top font-normal text-muted">
                      {ex.label}
                      <span className="block text-xs">{style?.name}</span>
                    </th>
                    <td className="glyph px-4 py-3 text-lg text-ink">{style ? style.transform(ex.plain) : ex.plain}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <article className="prose-fc max-w-3xl">
        {page.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            {s.list && (
              <ul>
                {s.list.map((li) => (
                  <li key={li.slice(0, 40)}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      <section aria-labelledby="faq" className="mt-12 max-w-3xl">
        <h2 id="faq" className="mb-4 text-2xl font-semibold tracking-tight">
          {page.name}: common questions
        </h2>
        <FaqList faqs={page.faqs} />
      </section>

      <section aria-labelledby="more" className="mt-12 max-w-3xl">
        <h2 id="more" className="text-2xl font-semibold tracking-tight">
          Try other styles
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/fonts/${r.slug}`}
                className="flex h-full items-center justify-between rounded-xl border border-line bg-surface p-4 font-medium text-ink hover:border-accent"
              >
                {r.name}
                <ArrowRight className="size-4 text-muted" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-muted">
          Want to compare everything at once? Open the{" "}
          <Link href="/" className="text-accent-strong underline underline-offset-2">
            full Fonts Changer generator
          </Link>{" "}
          with all {FONT_STYLES.length} styles.
        </p>
      </section>
    </Container>
  );
}
