import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import PageIntro from "@/components/PageIntro";
import { fontPages } from "@/data/font-pages";
import { FONT_STYLES } from "@/lib/fonts";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";

const title = "Font Styles: Cursive, Bold, Aesthetic, Small and More";
const description =
  "Browse every text style category in Fonts Changer, from cursive and bold to aesthetic, small, glitch and upside down text. Pick a style and copy it in seconds.";

export const metadata = buildMetadata({ title, description, path: "/fonts" });

function preview(id: string, text: string) {
  return FONT_STYLES.find((s) => s.id === id)?.transform(text) ?? text;
}

export default function FontsIndexPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Font Styles", path: "/fonts" },
        ]}
      />
      <JsonLd data={webPageJsonLd(title, description, "/fonts")} />
      <PageIntro title="Font styles">
        <p>
          Every category below opens a page with the generator set to that style, plus tips on where it works best. All{" "}
          {FONT_STYLES.length} styles are also on the <Link href="/" className="text-accent-strong underline underline-offset-2">Fonts Changer homepage</Link>.
        </p>
      </PageIntro>

      <ul className="grid gap-4 sm:grid-cols-2">
        {fontPages.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/fonts/${p.slug}`}
              className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <span className="glyph text-2xl text-ink">{preview(p.examples[0].styleId, p.examples[0].plain)}</span>
              <span className="mt-3 flex items-center justify-between text-lg font-medium text-ink">
                {p.name}
                <ArrowRight className="size-4 text-muted group-hover:text-accent" aria-hidden="true" />
              </span>
              <span className="mt-1 text-sm leading-relaxed text-muted">{p.intro}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
