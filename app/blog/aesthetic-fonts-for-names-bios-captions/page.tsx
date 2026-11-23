import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CalendarDays, Clock, Lightbulb, UserRound, WandSparkles } from "lucide-react";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { formatPostDate, getPost } from "@/data/blog";
import { bubbles, sansItalic, script, smallCaps, superscript, vaporwave } from "@/lib/fonts";
import { blogPostingJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import biosArt from "@/public/images/blog/aesthetic-bios.webp";
import stylesArt from "@/public/images/blog/aesthetic-styles.webp";
import symbolsArt from "@/public/images/blog/aesthetic-symbols.webp";

const SLUG = "aesthetic-fonts-for-names-bios-captions";
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
function Figure({
  src,
  alt,
  priority,
  caption,
}: {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  caption?: React.ReactNode;
}) {
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
      {caption && (
        <figcaption className="mt-2.5 text-center text-sm text-muted [&_a]:font-semibold [&_a]:text-accent-strong [&_a]:underline [&_a]:underline-offset-2">
          {caption}
        </figcaption>
      )}
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

/** A ready-made line people can copy, shown as a small card. */
function Example({ children }: { children: React.ReactNode }) {
  return (
    <p className="not-prose my-2 rounded-xl border border-line bg-surface px-4 py-3 text-ink">
      <span className="glyph">{children}</span>
    </p>
  );
}

const table = "not-prose my-6 overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface";
const th = "px-3 py-2.5 sm:px-4 text-left text-xs font-bold uppercase tracking-wider text-muted";
const td = "px-3 py-3 sm:px-4 text-left align-top";

const STYLES: { name: string; sample: string; mood: string }[] = [
  { name: "Cursive script", sample: script("Luna"), mood: "Soft and elegant, great for names" },
  { name: "Small caps", sample: smallCaps("soft days"), mood: "Calm and easy to read" },
  { name: "Vaporwave", sample: vaporwave("dream"), mood: "Wide and retro, best for one word" },
  { name: "Sans italic", sample: sansItalic("slow mornings"), mood: "Clean and modern" },
  { name: "Bubble letters", sample: bubbles("cute"), mood: "Playful and round" },
  { name: "Tiny text", sample: superscript("hello"), mood: "Small and light, for short extras" },
];

export default function AestheticFontsPost() {
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
          { name: "Aesthetic fonts for names and bios", path },
        ]}
        title={post.title}
        intro="Soft letters, small symbols and a little space can make a plain profile look calm and pretty. Here is how to use aesthetic fonts in names, bios and captions, with ideas you can copy."
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
            You have seen them on Instagram and TikTok: names written in thin cursive, bios in small capitals, and
            captions with tiny stars and flowers. That soft, tidy look is what people call <em>aesthetic</em>. You
            don&apos;t need a special app or a new keyboard to get it. You only need the right letters and a few symbols.
          </p>

          <Callout icon={Lightbulb} title="The short answer">
            Type your text in an{" "}
            <Link href="/fonts/aesthetic-fonts">aesthetic font generator</Link>, copy the style you like and paste it into
            your name, bio or caption. Use one soft style, add one or two small symbols, and keep important words in plain
            letters so everyone can read them.
          </Callout>

          <h2 id="what-are-aesthetic-fonts">What are aesthetic fonts?</h2>
          <p>
            &ldquo;Aesthetic&rdquo; is a mood, not one font. It usually means text that looks calm, dreamy or cute. A few
            habits create that feel:
          </p>
          <ul>
            <li>Soft letter shapes, like cursive or small capitals.</li>
            <li>Lowercase words instead of shouting in capitals.</li>
            <li>Extra space, either between letters or around the text.</li>
            <li>Small symbols such as ✿, ♡, ☾ or ⋆｡°✩.</li>
          </ul>
          <p>
            These styles are not real fonts. They are special Unicode characters that look like styled letters, which is
            why they keep their look when you paste them into an app. Read{" "}
            <Link href="/blog/how-fancy-font-generators-work">how fancy font generators work</Link> if you want the full
            story.
          </p>

          <h2 id="best-styles">The best aesthetic styles to try</h2>
          <Figure src={stylesArt} alt="Six glass tiles showing the letter A in different styles: gold cursive, plain bold, a pink bubble, a small lowercase a, a thin slanted A and a classic serif A"
            caption={
              <>
                Try every style in the <Link href="/fonts/aesthetic-fonts">aesthetic font generator</Link>
              </>
            }
          />
          <p>These styles work well in most apps. Pick one and use it the same way across your profile.</p>
          <div className={table}>
            <table className="w-full text-[0.9rem] sm:text-[0.95rem]">
              <thead className="border-b border-line bg-paper">
                <tr>
                  <th className={th}>Style</th>
                  <th className={th}>Example</th>
                  <th className={th}>Feels like</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {STYLES.map((s) => (
                  <tr key={s.name}>
                    <td className={`${td} font-semibold text-ink`}>{s.name}</td>
                    <td className={`${td} text-ink`}>
                      <span className="glyph text-lg">{s.sample}</span>
                    </td>
                    <td className={`${td} text-body`}>{s.mood}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            You can make all of these, and many more, on our <Link href="/fonts/aesthetic-fonts">aesthetic fonts</Link>{" "}
            page. Type once and every style appears ready to copy.
          </p>

          <h2 id="names">Aesthetic names</h2>
          <p>
            Your display name is the first thing people see, so keep it short and easy to recognise. A soft style with a
            symbol on each side is usually enough:
          </p>
          <Example>⋆｡° {script("Luna")} °｡⋆</Example>
          <Example>✿ {smallCaps("sara")} ✿</Example>
          <Example>☾ {sansItalic("noor")} ☁︎</Example>
          <Example>♡ {script("Aiza")} ♡</Example>
          <p>
            Keep two names apart. Your <strong>display name</strong> can use styled letters and symbols. Your{" "}
            <strong>username</strong> (the @ handle) usually accepts only plain letters, numbers, dots and underscores, so
            make it something like <code>luna.dreams</code> or <code>soft_sara</code>. For more ideas, try the{" "}
            <Link href="/names/aesthetic-usernames">aesthetic username generator</Link>.
          </p>

          <h2 id="bios">Aesthetic bios</h2>
          <Figure src={biosArt} alt="A phone profile with three decorated bio lines marked by a coffee cup, a flower and a moon, next to a sunset photo post with a decorated caption bar"
            caption={
              <>
                Build a full bio with the <Link href="/#bio-generator">bio generator</Link>
              </>
            }
          />
          <p>
            A good aesthetic bio is short, has a little rhythm, and uses one or two symbols per line. Here are a few
            layouts to copy and change:
          </p>
          <Example>
            {smallCaps("slow mornings & coffee")} ☕
            <br />
            {sansItalic("collecting little moments")} ✿
          </Example>
          <Example>
            ☾ {script("dreamer")} · {smallCaps("artist")} · {smallCaps("cat person")}
          </Example>
          <Example>
            ⋆｡° {vaporwave("stay soft")} °｡⋆
            <br />
            {smallCaps("karachi")} ✈︎ {smallCaps("everywhere")}
          </Example>
          <p>Bios have length limits, so plan for them:</p>
          <ul>
            <li>
              <strong>Instagram:</strong> up to 150 characters.
            </li>
            <li>
              <strong>TikTok:</strong> up to 80 characters.
            </li>
          </ul>
          <p>
            Some apps count a styled letter as two characters, so a styled bio can run out of room sooner than you expect.
            Want more ready-made lines? Our <Link href="/#bio-generator">bio generator</Link> builds full bios for you.
          </p>

          <h2 id="captions">Aesthetic captions</h2>
          <p>
            In captions, style should support your words, not replace them. Style one short line, like a title or a mood,
            and write the rest in plain text:
          </p>
          <Example>{smallCaps("golden hour")} ☀︎ the sky did all the work today.</Example>
          <Example>{script("sunday reset")} ✿ clean room, fresh sheets, no plans.</Example>
          <Example>
            {vaporwave("night drive")} ☾ windows down, playlist on.
          </Example>
          <p>
            Always write <strong>hashtags in plain letters</strong>. A hashtag in styled letters is a different word to
            the app, so it won&apos;t link to the normal tag and people searching for it won&apos;t find your post.
          </p>

          <h2 id="symbols">Add symbols the right way</h2>
          <Figure src={symbolsArt} alt="Three glass trays of 3D symbols: flowers and butterflies, hearts in pink, gold, crystal and pearl, and gold and lilac stars with crescent moons"
            caption={
              <>
                Copy <Link href="/symbols/butterflies-flowers">flowers</Link>, <Link href="/symbols/hearts">hearts</Link>{" "}
                and <Link href="/symbols/stars-arrows">stars</Link>
              </>
            }
          />
          <p>
            Symbols are what make aesthetic text feel finished. Pick one small family and repeat it instead of mixing
            everything:
          </p>
          <ul>
            <li>
              Flowers and butterflies: ✿ ❀ ❁ 🦋. See{" "}
              <Link href="/symbols/butterflies-flowers">butterfly and flower symbols</Link>.
            </li>
            <li>
              Hearts: ♡ ❥ ღ. See <Link href="/symbols/hearts">heart symbols</Link>.
            </li>
            <li>
              Stars and moons: ⋆ ✩ ☾ ✧. See <Link href="/symbols/stars-arrows">star and arrow symbols</Link>.
            </li>
          </ul>
          <p>
            Some symbols look like colourful emoji on one phone and plain black shapes on another. That is normal: each
            device draws them with its own fonts.
          </p>

          <h2 id="how-to">How to use aesthetic fonts, step by step</h2>
          <ol>
            <li>
              Open the <Link href="/fonts/aesthetic-fonts">aesthetic fonts</Link> page and type your name, bio line or
              caption.
            </li>
            <li>Scroll through the styles and tap the copy button on the one you like.</li>
            <li>Open your app, go to Edit profile (or start a new post) and paste.</li>
            <li>Add a symbol or two, check how it looks, then save.</li>
          </ol>

          <h2 id="readability">Keep it readable</h2>
          <Callout icon={AlertTriangle} title="A few things to watch">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>Search:</strong> people searching for your plain name may not find a styled one. Keep your real
                name or brand somewhere in plain letters.
              </li>
              <li>
                <strong>Screen readers:</strong> styled letters may be read out strangely or skipped. Put important
                details, like contact info, in plain text.
              </li>
              <li>
                <strong>Boxes:</strong> on older phones a few styles can show as empty boxes. Test your text on another
                device if you can.
              </li>
              <li>
                <strong>Less is more:</strong> one style and one symbol family look more aesthetic than five of each.
              </li>
            </ul>
          </Callout>

          <h2 id="summary">Quick recap</h2>
          <ul>
            <li>Aesthetic text is a mood: soft letters, lowercase words, space and small symbols.</li>
            <li>Use styled letters in your display name, plain letters in your @ username.</li>
            <li>Keep bios short and remember styled letters can use more of the character limit.</li>
            <li>Style one line of a caption and keep hashtags plain.</li>
            <li>Pick one style and one symbol family, and keep important words readable.</li>
          </ul>
        </article>

        <aside className="mt-10 max-w-3xl rounded-[1.5rem] bg-navy p-6 text-white sm:p-8">
          <p className="flex items-center gap-2 text-xl font-extrabold">
            <WandSparkles className="size-5 text-[#c4abff]" aria-hidden="true" />
            Make your own aesthetic text
          </p>
          <p className="mt-2 text-white/80">Type a name or a line and copy it in soft, dreamy styles.</p>
          <Link
            href="/fonts/aesthetic-fonts"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white transition-colors hover:bg-[#7a45f0]"
          >
            Open aesthetic fonts
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </aside>

        <nav aria-labelledby="keep-reading" className="mt-10 max-w-3xl">
          <h2 id="keep-reading" className="text-lg font-bold text-ink">
            Keep exploring
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/fonts/aesthetic-fonts", label: "Aesthetic font generator" },
              { href: "/names/aesthetic-usernames", label: "Aesthetic username generator" },
              { href: "/fonts/cursive-fonts", label: "Cursive font generator" },
              { href: "/fonts/small-text", label: "Small text generator" },
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
