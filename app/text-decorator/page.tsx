import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
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
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Text Decorator", path },
        ]}
      />
      <JsonLd data={[webPageJsonLd(title, description, path), faqJsonLd(faqs)]} />
      <header className="mb-7 max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-[2.6rem] sm:leading-tight">
          Text <span className="text-accent dark:text-accent-strong">Decorator</span>
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          Frame your name or a short phrase with symbols. Choose a letter style, then copy any of the {DECORATIONS.length}{" "}
          decorations.
        </p>
      </header>

      <TextDecorator />

      <div className="prose-fc mt-4 max-w-3xl">
        <h2>How to decorate your text</h2>
        <ol>
          <li>Type your name or a short phrase in the box.</li>
          <li>Pick a letter style, or Plain to keep your normal letters.</li>
          <li>Tap any decorated result to copy it, then paste it into your app.</li>
        </ol>
        <h2>Tips for good-looking decorations</h2>
        <ul>
          <li>Short text works best. Most decorations add four to twelve extra characters.</li>
          <li>Match the mood: Royal and Crown suit gaming names, while Flowers, Ribbon and Sparkles suit soft, aesthetic bios.</li>
          <li>Keep anything people need to search for, like your real name or business, outside the decoration in plain text.</li>
        </ul>
        <p>
          Want more letter styles? Open the <Link href="/">Fonts Changer generator</Link> or browse all{" "}
          <Link href="/fonts">font styles</Link>.
        </p>
        <h2>Text Decorator questions</h2>
      </div>
      <div className="mt-5 max-w-3xl">
        <FaqList faqs={faqs} />
      </div>
    </Container>
  );
}
