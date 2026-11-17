import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import FaqList from "@/components/FaqList";
import FontGenerator from "@/components/FontGenerator";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import NameIdeas from "@/components/landing/NameIdeas";
import SymbolGrid from "@/components/landing/SymbolGrid";
import type { LandingPage, LandingSection } from "@/data/landing/types";
import { faqJsonLd, webPageJsonLd } from "@/lib/seo";
import type { ContentSection } from "@/types/content";

export function Prose({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="prose-fc max-w-3xl">
      {sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          {s.paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
          {s.list && (
            <ul>
              {s.list.map((li) => (
                <li key={li.slice(0, 48)}>{li}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

const card =
  "group flex h-full items-center justify-between gap-3 rounded-xl border border-line bg-surface p-4 font-semibold text-ink shadow-sm transition-colors hover:border-accent";

/** One landing page: hero, the page's tool, guide sections, FAQ and related links. */
export default function LandingView({ section, page }: { section: LandingSection; page: LandingPage }) {
  const path = `${section.basePath}/${page.slug}`;
  const related = page.related.map((s) => section.pages.find((p) => p.slug === s)).filter((p) => p !== undefined);
  const tool = page.tool;

  return (
    <>
      <JsonLd data={[webPageJsonLd(page.metaTitle, page.metaDescription, path), faqJsonLd(page.faqs)]} />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: section.name, path: section.basePath },
          { name: page.name, path },
        ]}
        title={page.h1}
        intro={page.intro}
      />
      <Container className="pt-6">
        {tool.type === "generator" && <FontGenerator sample={tool.sample} initialFilter={tool.filter} initialCollection={tool.collection} />}
        {tool.type === "names" && <NameIdeas recipeSet={tool.recipeSet} examples={tool.examples} couple={tool.couple} label={tool.label} />}
        {tool.type === "symbols" && <SymbolGrid groups={tool.groups} />}

        <div className="mt-12">
          <Prose sections={page.sections} />
        </div>

        <section aria-labelledby="faq" className="mt-12 max-w-3xl">
          <h2 id="faq" className="mb-4 text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
            {page.name}: common questions
          </h2>
          <FaqList faqs={page.faqs} />
        </section>

        <section aria-labelledby="more" className="mt-12">
          <h2 id="more" className="text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
            More {section.name.toLowerCase()}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`${section.basePath}/${r.slug}`} className={card}>
                  {r.name}
                  <ArrowRight className="size-4 text-muted group-hover:text-accent" aria-hidden="true" />
                </Link>
              </li>
            ))}
            <li>
              <Link href={section.basePath} className={card}>
                All {section.name.toLowerCase()}
                <ArrowRight className="size-4 text-muted group-hover:text-accent" aria-hidden="true" />
              </Link>
            </li>
            {(page.seeAlso ?? []).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={card}>
                  {l.label}
                  <ArrowRight className="size-4 text-muted group-hover:text-accent" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}

/** Hub page listing every page in a section. */
export function HubView({ section }: { section: LandingSection }) {
  return (
    <>
      <JsonLd data={webPageJsonLd(section.hubMetaTitle, section.hubDescription, section.basePath, "CollectionPage")} />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: section.name, path: section.basePath },
        ]}
        title={section.hubTitle}
        intro={section.hubIntro}
      />
      <Container className="pt-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {section.pages.map((p) => (
            <li key={p.slug}>
              <Link
                href={`${section.basePath}/${p.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[var(--shadow-card)]"
              >
                <span className="flex items-center justify-between text-lg font-bold text-ink">
                  {p.name}
                  <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted">{p.metaDescription}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Prose sections={section.hubSections} />
        </div>
      </Container>
    </>
  );
}
