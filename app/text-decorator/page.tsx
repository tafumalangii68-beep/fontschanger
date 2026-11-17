import Link from "next/link";
import Container from "@/components/Container";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Artwork from "@/components/Artwork";
import { ART } from "@/lib/art";
import TextDecorator from "@/components/TextDecorator";
import { DECORATIONS } from "@/lib/decorations";
import { buildMetadata, faqJsonLd, webPageJsonLd } from "@/lib/seo";
import type { Faq } from "@/types/content";
const title = "Text Decorator: Add Symbols and Frames Around Your Text";
const description =
  "Decorate your name or text with symbol frames like ꧁༺ ༻꧂, ★彡 and 【 】. Pick a letter style, then copy and paste. Free and runs in your browser.";
const path = "/text-decorator";

const faqs: Faq[] = [
  {
    question: "What is the difference between the Text Decorator and the font generator?",
    answer:
      "The font generator changes the letters themselves. The Text Decorator keeps your chosen letter style and adds symbols before and after the text, such as wings, stars or brackets.",
  },
  {
    question: "Why do some decorations look different on my phone?",
    answer:
      "Symbols such as 🌸 or ⚡ are drawn by your device. Some show as colorful emoji and others as plain symbols, depending on the system and app.",
  },
  {
    question: "Can I use decorated text as a game or social media name?",
    answer:
      "Often, yes, for display names. Many games and apps limit name length or only allow certain characters, and decorations add several characters. If a name is rejected, try a shorter decoration such as Hearts or Crown.",
  },
];

export const metadata = buildMetadata({ title, description, path, absoluteTitle: true });

export default function TextDecoratorPage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd(title, description, path), faqJsonLd(faqs)]} />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Text Decorator", path },
        ]}
        title="Text Decorator"
        intro={`Add stylish symbols, borders and decorations to make your text stand out. Choose from ${DECORATIONS.length} decorations, perfect for bios, posts and profiles.`}
        illustration={<Artwork art={ART.textDecorator} sizes="(min-width: 1024px) 336px, 288px" />}
        illustrationClassName="w-72 lg:w-[21rem]"
      />

      <Container className="pt-6">
        <TextDecorator />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="prose-fc">
            <h2>How to decorate your text</h2>
            <ol>
              <li>Type your name or a short phrase in the box.</li>
              <li>Pick a letter style, or Plain to keep your normal letters.</li>
              <li>Choose Borders, Symbols, Separators or Brackets.</li>
              <li>Tap any decorated result to copy it, then paste it into your app.</li>
            </ol>
            <h2>Tips for good-looking decorations</h2>
            <ul>
              <li>Short text works best. Most decorations add four to twelve extra characters.</li>
              <li>Match the mood: Royal and Crown suit gaming names, while Flowers, Ribbon and Sparkles suit soft, aesthetic bios.</li>
              <li>Separators make tidy section headings in long captions and channel descriptions.</li>
              <li>Keep anything people need to search for, like your real name or business, outside the decoration in plain text.</li>
            </ul>
            <p>
              Want more letter styles? Open the <Link href="/">Fonts Changer generator</Link> or browse all{" "}
              <Link href="/fonts">font styles</Link>. Need a full profile line? The <Link href="/#bio-generator">bio generator</Link> combines styles and symbols for you.
              To learn why these symbols and letter styles work in almost any app, read{" "}
              <Link href="/blog/how-fancy-font-generators-work">how fancy font generators work</Link>.
            </p>
          </div>
          <section aria-labelledby="decorator-faq">
            <h2 id="decorator-faq" className="mb-5 text-[1.6rem] font-extrabold leading-tight tracking-tight text-ink">
              Text Decorator questions
            </h2>
            <FaqList faqs={faqs} />
          </section>
        </div>
      </Container>
    </>
  );
}
