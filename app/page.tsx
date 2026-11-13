import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Container from "@/components/Container";
import FaqList from "@/components/FaqList";
import FontGenerator from "@/components/FontGenerator";
import JsonLd from "@/components/JsonLd";
import { fontPages } from "@/data/font-pages";
import { homeFaqs } from "@/data/faqs";
import { FONT_STYLES } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

const title = "Fonts Changer: Fancy Text Generator to Copy and Paste";
const description =
  "Fonts Changer turns your text into 50+ fancy fonts: cursive, bold, aesthetic, small, glitch and more. Copy and paste them into Instagram, TikTok, WhatsApp or Discord. Free, no sign-up.";

export const metadata = buildMetadata({ title, description, path: "/", absoluteTitle: true });

const styleCount = FONT_STYLES.length;

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            inLanguage: siteConfig.language,
          },
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            description,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any (runs in a web browser)",
            isAccessibleForFree: true,
            browserRequirements: "Requires JavaScript",
          },
        ]}
      />

      <section className="border-b border-line bg-surface/60 pb-12 pt-8 sm:pt-12">
        <Container>
          <div className="mb-6 max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-[2.6rem] sm:leading-tight">
              Fonts Changer: fancy text you can copy and paste
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Type once and see your words in {styleCount} styles, including cursive, bold, aesthetic, small and glitch.
              Tap any result to copy it.
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted">
              <ShieldCheck className="size-4 text-accent" aria-hidden="true" />
              Free, no account needed. Your text stays on your device.
            </p>
          </div>
          <FontGenerator inputLabel="Type the text you want to change" />
        </Container>
      </section>

      <Container className="py-12">
        <div className="prose-fc max-w-3xl">
          <h2>What Fonts Changer does</h2>
          <p>
            Most apps, including Instagram, TikTok, WhatsApp and X, do not let you choose a font for your posts or profile.
            Fonts Changer gets around that by converting your letters into special Unicode characters that already look
            bold, curly, wide or decorated. Because they are characters rather than a font setting, they keep their style
            when you paste them into another app.
          </p>

          <h2>How to use it</h2>
          <ol>
            <li>Type or paste your text into the box at the top of the page.</li>
            <li>
              Browse the results, or use the filter buttons (Cursive, Bold, Aesthetic and more) or the search box to narrow
              them down.
            </li>
            <li>Tap a result or its Copy button. A check mark shows that it was copied.</li>
            <li>Open your app, press and hold in a text field, and choose Paste.</li>
            <li>
              Optional: tap the star on any style to save it. Saved styles appear under the Saved filter next time you visit
              in this browser.
            </li>
          </ol>

          <h2>Where you can paste the text</h2>
          <p>
            The text works almost anywhere that accepts emoji. Common uses include social media bios and display names,
            captions and comments, chat messages, gaming nicknames, and stream or channel titles. It does not work in
            fields that only accept basic letters, such as most usernames, email addresses and passwords.
          </p>

          <h2>How the conversion works</h2>
          <p>
            Unicode, the standard that defines the characters computers use, contains many letter variants. For example,
            the <a href="https://www.unicode.org/charts/PDF/U1D400.pdf">Mathematical Alphanumeric Symbols</a> block has
            complete bold, italic, script, Fraktur (Old English) and double-struck alphabets made for mathematical writing.
            Other blocks contain <a href="https://www.unicode.org/charts/PDF/U2460.pdf">circled letters</a>,{" "}
            <a href="https://www.unicode.org/charts/PDF/UFF00.pdf">fullwidth letters</a> and{" "}
            <a href="https://www.unicode.org/charts/PDF/U0300.pdf">combining marks</a> such as strikethrough lines.
          </p>
          <p>
            For each style, Fonts Changer looks up every letter you type and swaps it for the matching character. Letters
            without a match, such as accented letters, emoji and other alphabets, are left unchanged. The whole process
            runs in your browser, so results appear as you type.
          </p>

          <h2>Font style categories</h2>
          <p>Each category has its own page with tips, examples and answers to common questions:</p>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {fontPages.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/fonts/${p.slug}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent"
              >
                <span className="flex items-center justify-between font-medium text-ink">
                  {p.name}
                  <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                </span>
                <span className="mt-1 text-sm leading-relaxed text-muted">{p.metaDescription.split(".")[0]}.</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="prose-fc max-w-3xl">
          <h2>What affects how your text looks</h2>
          <ul>
            <li>
              <strong>The device and app.</strong> Each system draws these characters with its own fonts, so the same text
              can look slightly different on Android, iPhone, Windows and macOS.
            </li>
            <li>
              <strong>Missing characters.</strong> Older devices may lack fonts for rarer characters and show empty boxes
              instead. The bold, italic and cursive styles have the widest support.
            </li>
            <li>
              <strong>Platform filters.</strong> Some apps remove combining marks or limit them, which affects glitch and
              strikethrough styles.
            </li>
          </ul>

          <h2>Limitations to keep in mind</h2>
          <p>Styled Unicode text is fun, but it is not the same as normal text:</p>
          <ul>
            <li>
              <strong>Accessibility.</strong> Screen readers may read styled letters by their technical names or skip them.
              The Unicode Consortium&apos;s{" "}
              <a href="https://www.unicode.org/reports/tr25/">report on mathematics</a> notes that the math alphabets are
              not intended as a replacement for regular styled text.
            </li>
            <li>
              <strong>Search.</strong> Search inside apps and search engines usually treats styled letters as different
              characters, so people may not find words written in them.
            </li>
            <li>
              <strong>Incomplete alphabets.</strong> Some styles are missing certain letters and use lookalikes instead,
              and only basic Latin letters A to Z and digits are converted.
            </li>
            <li>
              <strong>Character limits.</strong> Many styled characters take more space in storage than normal letters, so
              you may reach a bio or name limit sooner.
            </li>
          </ul>
          <p>
            A good rule: style a short line, like your name or a heading, and keep important details in plain text.
          </p>

          <h2>Frequently asked questions</h2>
        </div>

        <div className="mt-6 max-w-3xl">
          <FaqList faqs={homeFaqs} />
          <p className="mt-4 text-sm text-muted">
            More answers on the{" "}
            <Link href="/faq" className="text-accent-strong underline underline-offset-2">
              full FAQ page
            </Link>
            .
          </p>
        </div>

        <div className="prose-fc max-w-3xl">
          <h2>Ready to try it?</h2>
          <p>
            Scroll back up, type your name or a short phrase, and copy the style you like. If you want a specific look,
            start with the <Link href="/fonts/cursive-fonts">cursive styles</Link> or the{" "}
            <Link href="/fonts/instagram-fonts">styles that work well in an Instagram bio</Link>.
          </p>
        </div>
        <a
          href="#fc-input"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-black"
        >
          Start changing your font
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </Container>
    </>
  );
}
