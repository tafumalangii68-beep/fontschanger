import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleHelp, Frame, Shuffle, UserRound, type LucideIcon } from "lucide-react";
import Container from "@/components/Container";
import FaqList from "@/components/FaqList";
import FontGenerator from "@/components/FontGenerator";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Artwork from "@/components/Artwork";
import { StylesIllustration } from "@/components/PageIllustrations";
import { CATEGORY_ART } from "@/lib/art";
import { fontPages, getFontPage } from "@/data/font-pages";
import { FONT_STYLES } from "@/lib/fonts";
import { buildMetadata, faqJsonLd, webPageJsonLd } from "@/lib/seo";

type Params = { slug: string };

const MORE_TOOLS: { href: string; icon: LucideIcon; title: string; text: string }[] = [
  { href: "/text-decorator", icon: Frame, title: "Text Decorator", text: "Add wings, stars, borders and brackets around your text." },
  { href: "/#bio-generator", icon: UserRound, title: "Bio Generator", text: "Build a styled bio for Instagram, TikTok or Discord." },
  { href: "/#text-generator", icon: Shuffle, title: "Symbol Text Generator", text: "Mix letter styles with hearts, flowers and other symbols." },
  { href: "/faq", icon: CircleHelp, title: "Fancy Text FAQ", text: "Why some characters show as boxes, and where styled text works." },
];

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
  const art = CATEGORY_ART[page.slug];
  const related = page.related.map(getFontPage).filter((p) => p !== undefined);

  return (
    <>
      <JsonLd data={[webPageJsonLd(page.metaTitle, page.metaDescription, path), faqJsonLd(page.faqs)]} />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Font Styles", path: "/fonts" },
          { name: page.name, path },
        ]}
        title={page.h1}
        intro={page.intro}
        illustration={art ? <Artwork art={art} sizes="(min-width: 1024px) 336px, 288px" /> : <StylesIllustration className="w-full" />}
        illustrationClassName={art ? "w-72 lg:w-[21rem]" : undefined}
      />
      <Container className="pt-6">

      <FontGenerator initialFilter={page.category} sample={page.sample} />

      <section aria-labelledby="examples" className="mt-14">
        <h2 id="examples" className="text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
          Examples
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.examples.map((ex) => {
            const style = FONT_STYLES.find((s) => s.id === ex.styleId);
            return (
              <li key={ex.label} className="rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-sm">
                <p className="text-[0.7rem] font-bold uppercase tracking-wider text-accent dark:text-accent-strong">{ex.label}</p>
                <p className="glyph mt-2 text-2xl text-ink">{style ? style.transform(ex.plain) : ex.plain}</p>
                <p className="mt-2 text-sm text-muted">{style?.name}</p>
              </li>
            );
          })}
        </ul>
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
        <h2 id="faq" className="mb-4 text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
          {page.name}: common questions
        </h2>
        <FaqList faqs={page.faqs} />
      </section>

      <section aria-labelledby="more" className="mt-12 max-w-3xl">
        <h2 id="more" className="text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
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
          with all {FONT_STYLES.length} styles, or browse every{" "}
          <Link href="/fonts" className="text-accent-strong underline underline-offset-2">
            font style category
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="tools" className="mt-12">
        <h2 id="tools" className="text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
          More free tools
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MORE_TOOLS.map(({ href, icon: Icon, title, text }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[var(--shadow-card)]"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-accent-soft">
                  <Icon className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
                </span>
                <span className="mt-3 font-bold text-ink">{title}</span>
                <span className="mt-1 text-sm leading-relaxed text-muted">{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      </Container>
    </>
  );
}
