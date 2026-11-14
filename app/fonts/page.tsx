import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import FontStylesBrowser from "@/components/FontStylesBrowser";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { StylesIllustration } from "@/components/PageIllustrations";
import { fontPages } from "@/data/font-pages";
import { FONT_STYLES } from "@/lib/fonts";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";

const count = FONT_STYLES.length;
const title = "Explore All Fancy Font Styles to Copy and Paste";
const description = `Browse all ${count} fancy font styles in one place: cursive, bold, aesthetic, fancy, small, glitch and upside down. Search, save favorites and copy with one click.`;

export const metadata = buildMetadata({ title, description, path: "/fonts" });

function preview(id: string, text: string) {
  return FONT_STYLES.find((s) => s.id === id)?.transform(text) ?? text;
}

export default function FontsIndexPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, "/fonts", "CollectionPage")} />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Font Styles", path: "/fonts" },
        ]}
        title="Explore All Fancy Font Styles"
        intro={`Browse ${count} stylish font styles and find the perfect look for your text. Copy with one click and use it anywhere.`}
        illustration={<StylesIllustration className="w-full" />}
      />

      <Container className="pt-6">
        <FontStylesBrowser />

        <section aria-labelledby="guides-heading" className="mt-16">
          <h2 id="guides-heading" className="text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
            Font style guides
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Each guide opens a generator set to that style, with tips on where it works best. To type your own text in
            every style at once, use the <Link href="/" className="font-semibold text-accent underline-offset-2 hover:underline dark:text-accent-strong">Fonts Changer generator</Link>.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fontPages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/fonts/${p.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[var(--shadow-card)]"
                >
                  <span className="glyph text-2xl text-ink">{preview(p.examples[0].styleId, p.examples[0].plain)}</span>
                  <span className="mt-4 flex items-center justify-between text-lg font-bold text-ink">
                    {p.name}
                    <ArrowRight
                      className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 text-sm leading-relaxed text-muted">{p.metaDescription.split(".")[0]}.</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
