import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, Lightbulb, UserRound, WandSparkles } from "lucide-react";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { formatPostDate, getPost } from "@/data/blog";
import { FONT_STYLES, bold, bubbles, doubleStruck, fraktur, italic, script, smallCaps, upsideDown, vaporwave } from "@/lib/fonts";
import { blogPostingJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import beforeYouUse from "@/public/images/blog/before-you-use.webp";
import copyPaste from "@/public/images/blog/copy-paste.webp";
import fontsVsCharacters from "@/public/images/blog/fonts-vs-characters.webp";
import generatorMachine from "@/public/images/blog/generator-machine.webp";
import lookalikeAlphabets from "@/public/images/blog/lookalike-alphabets.webp";
import missingLetters from "@/public/images/blog/missing-letters.webp";
import tofuBoxes from "@/public/images/blog/tofu-boxes.webp";
import unicodeLibrary from "@/public/images/blog/unicode-library.webp";

const SLUG = "how-fancy-font-generators-work";
const post = getPost(SLUG);
const path = `/blog/${SLUG}`;

export const metadata = post
  ? buildMetadata({
      title: post.title,
      description: post.description,
      path,
      absoluteTitle: true,
      image: post.shareImage ? { url: post.shareImage, width: 1200, height: 630, alt: post.coverAlt ?? post.title } : undefined,
    })
  : {};

/** An illustration inside the article, full width of the text column. */
function Figure({ src, alt, priority }: { src: StaticImageData; alt: string; priority?: boolean }) {
  return (
    <figure className="not-prose my-7">
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        priority={priority}
        sizes="(min-width: 800px) 768px, 100vw"
        className="h-auto w-full rounded-[1.25rem] border border-line shadow-[var(--shadow-card)]"
      />
    </figure>
  );
}

/** "U+1D407" style label for the first character of a string. */
function cp(ch: string): string {
  return "U+" + ch.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0");
}

const STRIKE = "̶"; // COMBINING LONG STROKE OVERLAY

const STYLE_SOURCES: { style: string; sample: string; source: string }[] = [
  { style: "Bold", sample: bold("Hello"), source: "Mathematical Alphanumeric Symbols" },
  { style: "Script (cursive)", sample: script("Hello"), source: "Mathematical Alphanumeric Symbols" },
  { style: "Old English", sample: fraktur("Hello"), source: "Mathematical Alphanumeric Symbols (Fraktur)" },
  { style: "Double-struck", sample: doubleStruck("Hello"), source: "Mathematical Alphanumeric Symbols" },
  { style: "Wide (vaporwave)", sample: vaporwave("Hello"), source: "Halfwidth and Fullwidth Forms" },
  { style: "Bubbles", sample: bubbles("Hello"), source: "Enclosed Alphanumerics" },
  { style: "Small caps", sample: smallCaps("Hello"), source: "Letters made for phonetic transcription" },
  { style: "Strikethrough", sample: Array.from("Hello").map((c) => c + STRIKE).join(""), source: "Combining Diacritical Marks" },
  { style: "Upside down", sample: upsideDown("Hello"), source: "Turned letters from phonetic alphabets and look-alikes" },
];

const HI_ROWS = [
  { plain: "H", fancy: bold("H") },
  { plain: "i", fancy: bold("i") },
];

const GAPS = [
  { style: "Italic", letter: "h", fancy: italic("h"), name: "PLANCK CONSTANT" },
  { style: "Script", letter: "B", fancy: script("B"), name: "SCRIPT CAPITAL B" },
  { style: "Old English", letter: "C", fancy: fraktur("C"), name: "BLACK-LETTER CAPITAL C" },
  { style: "Double-struck", letter: "R", fancy: doubleStruck("R"), name: "DOUBLE-STRUCK CAPITAL R" },
];

const CODE = `const BOLD_CAPITAL_A = 0x1D400; // 𝐀
const BOLD_SMALL_A = 0x1D41A;   // 𝐚

function toBold(text) {
  return Array.from(text, (ch) => {
    if (ch >= "A" && ch <= "Z") {
      return String.fromCodePoint(BOLD_CAPITAL_A + ch.charCodeAt(0) - 65);
    }
    if (ch >= "a" && ch <= "z") {
      return String.fromCodePoint(BOLD_SMALL_A + ch.charCodeAt(0) - 97);
    }
    return ch; // spaces, emoji, accented letters stay as they are
  }).join("");
}

toBold("Hi"); // "𝐇𝐢"`;

function Callout({ icon: Icon, title, children }: { icon: typeof Lightbulb; title: string; children: React.ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-[var(--radius-card)] border border-accent/30 bg-accent-soft/60 p-5">
      <p className="flex items-center gap-2 font-bold text-ink">
        <Icon className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
        {title}
      </p>
      <div className="mt-2 leading-relaxed text-body">{children}</div>
    </aside>
  );
}

const table = "not-prose my-6 overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface";
const th = "px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-muted";
const td = "px-4 py-3 text-left align-top";

export default function FancyFontGeneratorsPost() {
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={blogPostingJsonLd({
          title: post.title,
          description: post.description,
          path,
          published: post.published,
          updated: post.updated,
          author: siteConfig.author,
          image: post.shareImage,
        })}
      />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: "How fancy font generators work", path },
        ]}
        title={post.title}
        intro="Fancy text is not a font. Here is what actually happens when you turn plain letters into 𝓼𝓽𝔂𝓵𝓲𝓼𝓱 text, explained without jargon."
      >
        <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="size-4" aria-hidden="true" />
            By <span className="font-semibold text-ink">{siteConfig.author}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden="true" />
            <time dateTime={post.published}>{formatPostDate(post.published)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden="true" />
            {post.readingMinutes} min read
          </span>
        </p>
      </PageHero>

      <Container className="pt-6">
        <article className="prose-fc max-w-3xl">
          {post.cover && <Figure src={post.cover} alt={post.coverAlt ?? ""} priority />}
          <p>
            You type <code>Hello</code>, press a button, and get <span className="glyph">{script("Hello")}</span>. You paste it
            into your Instagram bio and it still looks fancy. It feels like you changed the font, but you didn&apos;t. Apps
            like Instagram, TikTok and WhatsApp don&apos;t let you pick a font at all. So what is going on?
          </p>

          <Callout icon={Lightbulb} title="The short answer">
            A fancy font generator swaps each of your letters for a <strong>different character</strong> that already looks
            styled. Those characters are part of <strong>Unicode</strong>, the worldwide standard that every phone and
            computer uses for text. Because they are real characters, not a font setting, they keep their look wherever you
            paste them.
          </Callout>

          <h2 id="fonts-vs-characters">Fonts and characters are not the same thing</h2>
          <Figure src={fontsVsCharacters} alt="One plain letter H on a card, with an arrow to three paint brushes drawing the same H in bold, italic and cursive styles" />
          <p>
            A <strong>character</strong> is the idea of a letter: &ldquo;capital H&rdquo;. A <strong>font</strong> is a
            particular way of drawing it, like Arial or Times New Roman. When you send a message, you only send the
            characters. The app on the other end decides which font to draw them with.
          </p>
          <p>
            That is why you can&apos;t send &ldquo;bold&rdquo; in a plain-text bio: the formatting isn&apos;t part of the text,
            so it gets lost. But if the <em>character itself</em> is a bold-looking H, there is nothing to lose. The style is
            baked into the letter.
          </p>

          <h2 id="what-is-unicode">What is Unicode?</h2>
          <Figure src={unicodeLibrary} alt="A shelf of tiles holding letters, emoji, music notes, math symbols and Asian characters, with one A tile pulled out and tagged U+0041" />
          <p>
            Computers store text as numbers. <a href="https://home.unicode.org/">Unicode</a> is the agreement that says which
            number means which character, so that a message written on an iPhone reads the same on Android or Windows. Each
            character gets its own number, called a <strong>code point</strong>, written like <code>U+0048</code>.
          </p>
          <ul>
            <li>
              <code>H</code> is {cp("H")}
            </li>
            <li>
              <code>é</code> is {cp("é")}
            </li>
            <li>
              <span className="glyph">😀</span> is {cp("😀")}
            </li>
          </ul>
          <p>
            Unicode now has close to 160,000 characters: letters from almost every writing system, emoji, arrows, math
            symbols and much more. And hidden among them are whole alphabets that happen to look like styled versions of A
            to Z.
          </p>

          <h2 id="lookalike-alphabets">The secret: look-alike alphabets</h2>
          <Figure src={lookalikeAlphabets} alt="Five tiles each showing the letter H in a different style, with a magnifying glass over the Old English H showing it is its own character" />
          <p>
            Most fancy styles come from a block called{" "}
            <a href="https://www.unicode.org/charts/PDF/U1D400.pdf">Mathematical Alphanumeric Symbols</a>, added in 2001.
            Mathematicians use different letter styles to mean different things (a bold <strong>v</strong> is often a
            vector), so Unicode gave them complete styled alphabets: bold, italic, script, Fraktur (Old English),
            double-struck, sans-serif and monospace.
          </p>
          <p>
            To a computer, <span className="glyph">{bold("H")}</span> isn&apos;t a bold H. It is a separate character with
            its own number, {cp(bold("H"))}, officially named &ldquo;MATHEMATICAL BOLD CAPITAL H&rdquo;. Other styles borrow
            from other corners of Unicode:
          </p>
          <div className={table}>
            <table className="w-full min-w-[34rem] text-sm">
              <thead className="bg-accent-soft/60">
                <tr>
                  <th scope="col" className={th}>Style</th>
                  <th scope="col" className={th}>Looks like</th>
                  <th scope="col" className={th}>Where the characters come from</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-body">
                {STYLE_SOURCES.map((s) => (
                  <tr key={s.style}>
                    <th scope="row" className={`${td} font-semibold text-ink`}>{s.style}</th>
                    <td className={`${td} glyph text-lg text-ink`}>{s.sample}</td>
                    <td className={td}>{s.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The wide &ldquo;vaporwave&rdquo; letters were made for Chinese, Japanese and Korean text, where each character
            fills a square. Small caps come from alphabets linguists use to write down pronunciation. Strikethrough is
            different again: it adds a <strong>combining mark</strong> after each letter, a special character that draws on
            top of the one before it. Glitch (&ldquo;zalgo&rdquo;) text stacks many combining marks on every letter.
          </p>

          <h2 id="step-by-step">How a generator converts your text, step by step</h2>
          <Figure src={generatorMachine} alt="A small machine where plain H and i tiles drop into a funnel and come out as bold italic tiles on a conveyor belt" />
          <p>Say you type <code>Hi</code> and pick bold. The generator:</p>
          <ol>
            <li>Splits your text into single characters: H and i.</li>
            <li>Looks each one up in its table for the bold style.</li>
            <li>Swaps it for the matching character, and leaves anything it doesn&apos;t know (spaces, emoji, é) unchanged.</li>
            <li>Joins the result back together, ready to copy.</li>
          </ol>
          <div className={table}>
            <table className="w-full text-sm">
              <thead className="bg-accent-soft/60">
                <tr>
                  <th scope="col" className={th}>You type</th>
                  <th scope="col" className={th}>Code point</th>
                  <th scope="col" className={th}>Bold version</th>
                  <th scope="col" className={th}>Code point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-body">
                {HI_ROWS.map((r) => (
                  <tr key={r.plain}>
                    <td className={`${td} text-lg text-ink`}>{r.plain}</td>
                    <td className={`${td} font-mono`}>{cp(r.plain)}</td>
                    <td className={`${td} glyph text-lg text-ink`}>{r.fancy}</td>
                    <td className={`${td} font-mono`}>{cp(r.fancy)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Because the bold alphabet is stored in order, A to Z then a to z, the &ldquo;lookup&rdquo; is just a bit of
            arithmetic. Here is the whole idea in a few lines of JavaScript:
          </p>
          <pre>
            <code>{CODE}</code>
          </pre>
          <p>
            That&apos;s really all there is to it. Fonts Changer does the same thing for {" "}
            <Link href="/fonts">every style</Link>, right in your browser, so your text is never sent anywhere.
          </p>

          <h2 id="missing-letters">The missing letters</h2>
          <Figure src={missingLetters} alt="A row of letter tiles A, B, D and E with an empty dashed slot, and a hand placing a golden C tile into the gap" />
          <p>
            There is one twist. A few styled letters existed in Unicode before the math block was created, for example ℎ
            (the Planck constant from physics) and ℝ (the symbol for real numbers). To avoid duplicates, Unicode left those
            spots in the math alphabets <strong>empty</strong>, and a good generator has to fill the holes with the older
            characters:
          </p>
          <div className={table}>
            <table className="w-full min-w-[30rem] text-sm">
              <thead className="bg-accent-soft/60">
                <tr>
                  <th scope="col" className={th}>Style</th>
                  <th scope="col" className={th}>Letter</th>
                  <th scope="col" className={th}>Character used</th>
                  <th scope="col" className={th}>Official name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-body">
                {GAPS.map((g) => (
                  <tr key={g.style}>
                    <th scope="row" className={`${td} font-semibold text-ink`}>{g.style}</th>
                    <td className={`${td} text-lg text-ink`}>{g.letter}</td>
                    <td className={`${td} glyph text-lg text-ink`}>
                      {g.fancy} <span className="ml-1 font-mono text-sm text-muted">{cp(g.fancy)}</span>
                    </td>
                    <td className={`${td} text-xs`}>{g.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            If a generator forgets this, one letter in your word suddenly shows up as an empty box or a question mark.
          </p>

          <h2 id="why-copy-paste-works">Why the style survives copy and paste</h2>
          <Figure src={copyPaste} alt="Two phones with copy and paste icons, and the word Hello in cursive travelling from one phone to the other looking exactly the same" />
          <p>
            When you copy fancy text, your phone copies the characters, not a font. When you paste, the app draws those
            characters with whatever font it has that contains them. Most modern phones and computers ship fonts with the
            math alphabets, so the text looks right almost everywhere: bios, captions, comments, display names and chat
            messages.
          </p>

          <h2 id="boxes">Why you sometimes see boxes instead</h2>
          <Figure src={tofuBoxes} alt="A phone showing a row of letters where two have turned into empty boxes with question marks, next to a confused cursor character" />
          <p>
            If a device has <em>no</em> font containing a character, it draws a placeholder instead, often an empty box
            (people call it &ldquo;tofu&rdquo;) or a question mark. This mostly happens on older phones and computers, or
            with rarer styles. Bold, italic and cursive have the widest support, so they are the safest choice for something
            important like your name.
          </p>

          <h2 id="before-you-use-it">What to know before you use fancy text</h2>
          <Figure src={beforeYouUse} alt="A checklist surrounded by four icons: headphones for screen readers, a magnifying glass for search, a 100 counter for character limits and a padlock for usernames" />
          <ul>
            <li>
              <strong>Screen readers.</strong> Tools that read text aloud may say &ldquo;mathematical bold capital H&rdquo;
              for every letter, or skip the word entirely. Unicode&apos;s own{" "}
              <a href="https://www.unicode.org/reports/tr25/">technical report on math characters</a> says they are not meant
              to replace normal styled text.
            </li>
            <li>
              <strong>Search.</strong> Search boxes treat <span className="glyph">{bold("cat")}</span> and cat as different
              words, so people may not find you by your styled name.
            </li>
            <li>
              <strong>Character limits.</strong> Most math letters need two units of storage instead of one, so some apps
              count each of them as two characters and you hit a bio limit sooner.
            </li>
            <li>
              <strong>Usernames and passwords.</strong> These usually only accept basic letters and numbers, so fancy
              characters are rejected there.
            </li>
          </ul>
          <p>
            A good rule: style one short line, like your name or a heading, and keep important information in plain text.
          </p>

          <h2 id="summary">In one sentence</h2>
          <p>
            Fancy font generators don&apos;t change fonts at all: they translate your letters into look-alike Unicode
            characters, and because those characters are part of the text itself, the style goes wherever the text goes.
          </p>
        </article>

        <aside className="mt-10 max-w-3xl rounded-[1.5rem] bg-navy p-6 text-white sm:p-8">
          <p className="flex items-center gap-2 text-xl font-extrabold">
            <WandSparkles className="size-5 text-[#c4abff]" aria-hidden="true" />
            Try it yourself
          </p>
          <p className="mt-2 text-white/80">
            Type your name and see it in {FONT_STYLES.length} styles at once. It all runs in your browser.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white transition-colors hover:bg-[#7a45f0]"
          >
            Open the font generator
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </aside>

        <nav aria-labelledby="keep-reading" className="mt-10 max-w-3xl">
          <h2 id="keep-reading" className="text-lg font-bold text-ink">
            Keep exploring
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/fonts/cursive-fonts", label: "Cursive font generator" },
              { href: "/fonts/bold-text", label: "Bold text generator" },
              { href: "/fonts/glitch-text", label: "Glitch (zalgo) text generator" },
              { href: "/text-decorator", label: "Text Decorator: symbols and frames" },
              { href: "/faq", label: "Fancy text FAQ" },
              { href: "/blog", label: "All blog posts" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 font-semibold text-ink shadow-sm transition-colors hover:border-accent"
                >
                  {l.label}
                  <ArrowRight className="size-4 text-muted group-hover:text-accent" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </>
  );
}
