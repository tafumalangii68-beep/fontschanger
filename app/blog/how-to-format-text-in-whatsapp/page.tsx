import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CalendarDays, Clock, Lightbulb, UserRound, WandSparkles } from "lucide-react";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { formatPostDate, getPost } from "@/data/blog";
import { bold, italic, script } from "@/lib/fonts";
import { blogPostingJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import menuArt from "@/public/images/blog/whatsapp-menu.webp";
import profileArt from "@/public/images/blog/whatsapp-profile.webp";
import spacesArt from "@/public/images/blog/whatsapp-spaces.webp";
import symbolsArt from "@/public/images/blog/whatsapp-symbols.webp";

const SLUG = "how-to-format-text-in-whatsapp";
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
const th = "px-3 py-2.5 sm:px-4 text-left text-xs font-bold uppercase tracking-wider text-muted";
const td = "px-3 py-3 sm:px-4 text-left align-top";
const typed = "rounded-md bg-paper px-1.5 py-0.5 font-mono text-[0.95rem] text-ink";

const FORMATS: { name: string; type: string; result: React.ReactNode }[] = [
  { name: "Bold", type: "*Hello*", result: <strong>Hello</strong> },
  { name: "Italic", type: "_Hello_", result: <em>Hello</em> },
  { name: "Strikethrough", type: "~Hello~", result: <s>Hello</s> },
  { name: "Monospace", type: "```Hello```", result: <span className="font-mono">Hello</span> },
  { name: "Inline code", type: "`Hello`", result: <code>Hello</code> },
];

export default function WhatsAppFormattingPost() {
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
          { name: "Format text in WhatsApp", path },
        ]}
        title={post.title}
        intro="WhatsApp has no font menu, but a few simple symbols turn your words bold, italic or crossed out. Here is every trick, with examples you can copy."
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
            You want one word in your message to stand out: a time, a price, or a big <strong>NO</strong>. WhatsApp
            doesn&apos;t show a bold button in the chat box, so most people never find out it can do this. It can, and it
            only takes one symbol on each side of a word.
          </p>

          <Callout icon={Lightbulb} title="The short answer">
            Put <code>*stars*</code> around text for <strong>bold</strong>, <code>_underscores_</code> for{" "}
            <em>italic</em> and <code>~tildes~</code> for <s>strikethrough</s>. WhatsApp formats it as soon as you send. The
            symbols must touch the text: <code>*yes*</code> works, <code>* yes *</code> does not.
          </Callout>

          <h2 id="cheat-sheet">The WhatsApp formatting cheat sheet</h2>
          <Figure src={symbolsArt} alt="Three purple keys with an asterisk, an underscore and a tilde, each above a chat bubble showing bold, slanted and crossed-out text" />
          <p>Type the text in the middle column exactly as shown. After you send it, the chat shows the result.</p>
          <div className={table}>
            <table className="w-full text-[0.9rem] sm:text-[0.95rem]">
              <thead className="border-b border-line bg-paper">
                <tr>
                  <th className={th}>Style</th>
                  <th className={th}>Type this</th>
                  <th className={th}>You get</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {FORMATS.map((f) => (
                  <tr key={f.name}>
                    <td className={`${td} font-semibold text-ink`}>{f.name}</td>
                    <td className={td}>
                      <span className={typed}>{f.type}</span>
                    </td>
                    <td className={`${td} text-ink`}>{f.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Monospace uses <strong>three</strong> backticks on each side. On most phone keyboards the backtick (`) is on the
            symbols page, often next to the tilde (~).
          </p>

          <h2 id="bold">How to write bold text in WhatsApp</h2>
          <p>
            Put an asterisk right before the first letter and right after the last one: <code>*See you at 8*</code>. You can
            bold one word or a whole sentence. Bold works well for times, prices, names and anything people must not miss.
          </p>

          <h2 id="italic">How to write italic text</h2>
          <p>
            Use an underscore on each side: <code>_just kidding_</code> becomes <em>just kidding</em>. Italic is handy for
            a soft tone, a quote or the name of a film or book.
          </p>

          <h2 id="strikethrough">How to write strikethrough text</h2>
          <p>
            Use a tilde on each side: <code>~10:00~ 11:00</code> shows <s>10:00</s> 11:00. Crossing something out is a
            clear way to correct yourself, update a list, or make a joke like <s>diet</s> pizza night.
          </p>

          <h2 id="menu">Format text without typing symbols</h2>
          <Figure src={menuArt} alt="A finger selecting text in a WhatsApp chat on a phone, with a pop-up menu offering bold, italic, strikethrough and monospace buttons" />
          <p>If you don&apos;t want to remember the symbols, WhatsApp also has a menu for them:</p>
          <ul>
            <li>
              <strong>Android:</strong> type your message, press and hold a word to select it, drag the handles to cover the
              text, then tap <strong>⋮</strong> (more) and choose Bold, Italic, Strikethrough or Monospace.
            </li>
            <li>
              <strong>iPhone:</strong> select the text, then tap <strong>Format</strong> in the menu that appears (tap the
              arrow if you don&apos;t see it) and pick a style.
            </li>
            <li>
              <strong>WhatsApp Web and Desktop:</strong> type the symbols yourself, or try the keyboard shortcuts. Press{" "}
              <strong>Ctrl + /</strong> (Cmd + / on a Mac) in WhatsApp Desktop to see the shortcuts your version supports.
            </li>
          </ul>
          <p>The menu simply adds the same symbols for you, so the result is identical.</p>

          <h2 id="combine">Combine styles</h2>
          <p>
            Styles can be stacked. Put one pair of symbols inside another, and close them in the reverse order you opened
            them:
          </p>
          <ul>
            <li>
              <code>*_important_*</code> gives{" "}
              <strong>
                <em>important</em>
              </strong>{" "}
              (bold and italic).
            </li>
            <li>
              <code>~*sold out*~</code> gives{" "}
              <s>
                <strong>sold out</strong>
              </s>{" "}
              (bold and crossed out).
            </li>
          </ul>

          <h2 id="lists-and-quotes">Lists, quotes and inline code</h2>
          <p>Newer versions of WhatsApp also understand a few line formats. Start a new line with:</p>
          <ul>
            <li>
              <code>*</code> or <code>-</code> and a space for a bulleted list
            </li>
            <li>
              <code>1.</code> and a space for a numbered list
            </li>
            <li>
              <code>&gt;</code> and a space to show the line as a quote
            </li>
          </ul>
          <p>
            A single backtick on each side, like <code>`order 1234`</code>, gives inline code. If these don&apos;t work for
            you, update WhatsApp from your app store.
          </p>

          <h2 id="not-working">Why your formatting isn&apos;t working</h2>
          <Figure src={spacesArt} alt="Two chat bubbles: one with a gap between the asterisks and the text marked with a red cross, and one with the asterisks touching the text marked with a green check" />
          <Callout icon={AlertTriangle} title="Check these first">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>A space inside the symbols.</strong> <code>* hi *</code> stays plain. Remove the spaces:{" "}
                <code>*hi*</code>.
              </li>
              <li>
                <strong>A missing closing symbol.</strong> Every opening <code>*</code>, <code>_</code> or <code>~</code>{" "}
                needs a matching one at the end.
              </li>
              <li>
                <strong>Symbols in the middle of a word.</strong> Formatting is most reliable around whole words, so{" "}
                <code>un*believ*able</code> may not change.
              </li>
              <li>
                <strong>The wrong place.</strong> These symbols format chat messages. Your profile name and About line may
                show them as plain symbols instead.
              </li>
            </ul>
          </Callout>

          <h2 id="name-and-about">Bold or fancy text in your name and About</h2>
          <Figure src={profileArt} alt="A phone profile screen with a decorated golden name bar and a copy button beside it" />
          <p>
            For your profile name, About line or a status, use Unicode styled letters instead of symbols. They are real
            characters, so they keep their look anywhere you paste them: <span className="glyph">{bold("Ali")}</span>,{" "}
            <span className="glyph">{italic("Ali")}</span> or <span className="glyph">{script("Ali")}</span>. Our{" "}
            <Link href="/social-media/whatsapp">WhatsApp stylish text</Link> page and{" "}
            <Link href="/fonts/bold-text">bold text generator</Link> make these for you.
          </p>
          <p>
            Two things to know: some apps count each styled letter as two characters, and screen readers may not read them
            clearly. Keep styled text short and put important details in plain text. To learn why this works, read{" "}
            <Link href="/blog/how-fancy-font-generators-work">how fancy font generators work</Link>.
          </p>

          <h2 id="summary">Quick recap</h2>
          <ul>
            <li>
              <code>*bold*</code>, <code>_italic_</code>, <code>~strikethrough~</code>, <code>```monospace```</code>
            </li>
            <li>The symbols must touch the text, with no spaces inside.</li>
            <li>Select text and use the menu if you prefer not to type symbols.</li>
            <li>For your name and About, copy Unicode styled text instead.</li>
          </ul>
        </article>

        <aside className="mt-10 max-w-3xl rounded-[1.5rem] bg-navy p-6 text-white sm:p-8">
          <p className="flex items-center gap-2 text-xl font-extrabold">
            <WandSparkles className="size-5 text-[#c4abff]" aria-hidden="true" />
            Make your WhatsApp name stand out
          </p>
          <p className="mt-2 text-white/80">Type your name and copy it in bold, cursive and many more styles.</p>
          <Link
            href="/social-media/whatsapp"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white transition-colors hover:bg-[#7a45f0]"
          >
            Open WhatsApp stylish text
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </aside>

        <nav aria-labelledby="keep-reading" className="mt-10 max-w-3xl">
          <h2 id="keep-reading" className="text-lg font-bold text-ink">
            Keep exploring
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/social-media/whatsapp", label: "WhatsApp stylish text" },
              { href: "/fonts/bold-text", label: "Bold text generator" },
              { href: "/fonts/strikethrough-text", label: "Strikethrough text generator" },
              { href: "/fonts/cursive-fonts", label: "Cursive font generator" },
              { href: "/blog/how-fancy-font-generators-work", label: "How fancy font generators work" },
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
