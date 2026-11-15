import Link from "next/link";
import { Mail } from "lucide-react";
import Container from "@/components/Container";
import FaqSearch from "@/components/FaqSearch";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Artwork from "@/components/Artwork";
import { ART } from "@/lib/art";
import { generalFaqs, homeFaqs, introFaqs } from "@/data/faqs";
import { FONT_STYLES } from "@/lib/fonts";
import { buildMetadata, faqJsonLd, webPageJsonLd } from "@/lib/seo";

const title = "Frequently Asked Questions";
const description =
  "Answers about Fonts Changer and copy-and-paste fonts: where they work, whether they are free, privacy, accessibility and why some characters show as boxes.";
const path = "/faq";

export const metadata = buildMetadata({ title, description, path });

// The intro list already covers "is it free" and "do you store my text", so skip those duplicates.
const SKIP = new Set(["Is Fonts Changer free?", "Do you see or store the text I type?"]);
const faqs = [...introFaqs(FONT_STYLES.length), ...homeFaqs.filter((f) => !SKIP.has(f.question)), ...generalFaqs];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd(title, description, path), faqJsonLd(faqs)]} />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "FAQ", path },
        ]}
        title={title}
        intro="Find quick answers to common questions about Fonts Changer, its features and how it works."
        illustration={<Artwork art={ART.faq} sizes="(min-width: 1024px) 336px, 288px" />}
        illustrationClassName="w-72 lg:w-[21rem]"
      />
      <Container className="pt-6">
        <div className="max-w-4xl">
          <FaqSearch faqs={faqs} />
          <div className="mt-10 flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-ink">Still have a question?</h2>
              <p className="mt-1 text-muted">
                See the <Link href="/fonts" className="font-semibold text-accent hover:underline dark:text-accent-strong">font style guides</Link>, read{" "}
                <Link href="/blog/how-fancy-font-generators-work" className="font-semibold text-accent hover:underline dark:text-accent-strong">
                  how fancy font generators work
                </Link>{" "}
                or send us a message.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white transition-colors hover:bg-accent-strong dark:hover:bg-[#8455f5]"
            >
              <Mail className="size-4" aria-hidden="true" />
              Contact us
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
