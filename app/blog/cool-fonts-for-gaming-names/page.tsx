import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CalendarDays, Clock, Gamepad2, Lightbulb, UserRound } from "lucide-react";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { formatPostDate, getPost } from "@/data/blog";
import { boldFraktur, boldScript, doubleStruck, sansBold, smallCaps, vaporwave } from "@/lib/fonts";
import { blogPostingJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import gamesArt from "@/public/images/blog/gaming-games.webp";
import stepsArt from "@/public/images/blog/gaming-steps.webp";
import stylesArt from "@/public/images/blog/gaming-styles.webp";
import symbolsArt from "@/public/images/blog/gaming-symbols.webp";

const SLUG = "cool-fonts-for-gaming-names";
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

/** A ready-made name people can copy, shown as a small card. */
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

const STYLES: { name: string; sample: string; vibe: string }[] = [
  { name: "Bold sans", sample: sansBold("GHOST"), vibe: "Clean and strong, works almost everywhere" },
  { name: "Old English", sample: boldFraktur("Viper"), vibe: "Dark and fierce" },
  { name: "Bold cursive", sample: boldScript("Raja"), vibe: "Royal and flashy" },
  { name: "Double struck", sample: doubleStruck("TITAN"), vibe: "Sharp, techy outline" },
  { name: "Small caps", sample: smallCaps("shadow"), vibe: "Calm and pro" },
  { name: "Wide", sample: vaporwave("BLAZE"), vibe: "Big and loud, best for short names" },
];

const SYMBOLS: { symbols: string; use: string }[] = [
  { symbols: "꧁ ꧂  ·  ༺ ༻", use: "Wings around your name" },
  { symbols: "亗  ·  彡  ·  ツ", use: "Short, sharp marks for Free Fire style names" },
  { symbols: "『 』  ·  【 】", use: "Brackets for clan tags" },
  { symbols: "♛  ·  ♚  ·  ☠", use: "Crowns and skulls for a boss or danger look" },
  { symbols: "▄︻デ══━一", use: "Sniper rifle, for snipers (long, so keep the name short)" },
  { symbols: "ᴹᴿ᭄  ·  ×͜×", use: "Small prefix or a cheeky face" },
];

export default function GamingNamesPost() {
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
          { name: "Cool fonts for gaming names", path },
        ]}
        title={post.title}
        intro="A good gamer name gets noticed in the lobby and remembered after the match. Here is how to style yours with cool fonts and symbols for PUBG, Free Fire and Fortnite, with names you can copy."
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
            In a battle royale, your name is the first thing other players see: on the kill feed, in the squad list and
            on the winner screen. A plain name like <code>player123</code> is easy to forget. A styled one, like{" "}
            <span className="glyph">꧁{boldFraktur("Viper")}꧂</span>, looks like it belongs to someone who knows what
            they are doing.
          </p>

          <Callout icon={Lightbulb} title="The short answer">
            Type your name in a{" "}
            <Link href="/gaming-names">gaming name generator</Link>, copy a style you like and paste it into the rename box
            in your game. Keep the name short, add one symbol on each side, and check the in-game preview before you
            spend a rename card or diamonds.
          </Callout>

          <h2 id="what-makes-a-cool-name">What makes a gaming name look cool?</h2>
          <p>Most of the names you see on top players follow a few simple habits:</p>
          <ul>
            <li>
              <strong>A short core word</strong> that is easy to say in voice chat, like Ghost, Blaze or Raja.
            </li>
            <li>
              <strong>One letter style</strong> for the whole word, such as bold or Old English.
            </li>
            <li>
              <strong>A symbol on each side</strong>, like wings ꧁ ꧂ or 亗, instead of symbols between every letter.
            </li>
            <li>
              <strong>A clan tag</strong> in brackets, if you play in a team.
            </li>
          </ul>
          <p>
            The fancy letters are not a real font. They are special Unicode characters that look like styled letters,
            which is why they stay styled when you paste them into a game. Our guide on{" "}
            <Link href="/blog/how-fancy-font-generators-work">how fancy font generators work</Link> explains this
            simply.
          </p>

          <h2 id="best-styles">The best font styles for gaming names</h2>
          <Figure
            src={stylesArt}
            alt="Six glowing glass tiles showing the letter G in bold white, gold Old English, pink cursive, neon blue outline, silver serif and purple italic styles"
            caption={
              <>
                Try every style in the <Link href="/">font generator</Link>
              </>
            }
          />
          <p>These styles look good in game lobbies and are supported on most phones:</p>
          <div className={table}>
            <table className="w-full text-[0.9rem] sm:text-[0.95rem]">
              <thead className="border-b border-line bg-paper">
                <tr>
                  <th className={th}>Style</th>
                  <th className={th}>Example</th>
                  <th className={th}>Vibe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {STYLES.map((s) => (
                  <tr key={s.name}>
                    <td className={`${td} font-semibold text-ink`}>{s.name}</td>
                    <td className={`${td} text-ink`}>
                      <span className="glyph text-lg">{s.sample}</span>
                    </td>
                    <td className={`${td} text-body`}>{s.vibe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Bold and small caps use the most common characters, so they are the safest choice when a game is strict.
            Try all of them, and dozens more, in the <Link href="/">font generator</Link>.
          </p>

          <h2 id="symbols">Popular symbols for gamer names</h2>
          <Figure
            src={symbolsArt}
            alt="Three glass panels of gaming symbols: golden wings and brackets, crowns around a silver skull with a lightning bolt, and a purple sniper rifle with gold stars"
            caption={
              <>
                Add wings, crowns and frames with the <Link href="/text-decorator">text decorator</Link>
              </>
            }
          />
          <p>Symbols are what turn a styled word into a real gamer tag. These are the ones players use most:</p>
          <div className={table}>
            <table className="w-full text-[0.9rem] sm:text-[0.95rem]">
              <thead className="border-b border-line bg-paper">
                <tr>
                  <th className={th}>Symbols</th>
                  <th className={th}>Use them for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {SYMBOLS.map((s) => (
                  <tr key={s.use}>
                    <td className={`${td} whitespace-nowrap text-ink`}>
                      <span className="glyph text-lg">{s.symbols}</span>
                    </td>
                    <td className={`${td} text-body`}>{s.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Want a crown for a king or queen name? See <Link href="/symbols/crowns">crown symbols</Link>. For stars and
            arrows, try <Link href="/symbols/stars-arrows">star and arrow symbols</Link>. The{" "}
            <Link href="/text-decorator">text decorator</Link> can also wrap your name in frames and wings for you.
          </p>

          <h2 id="pubg">Stylish names for PUBG Mobile and BGMI</h2>
          <Figure
            src={gamesArt}
            alt="Three crowned game cards with golden winged name banners: a parachute over an island with a helmet, a purple and gold flame, and a tall wooden build with a pickaxe"
            caption={
              <>
                Names for <Link href="/gaming-names/pubg-bgmi">PUBG</Link>,{" "}
                <Link href="/gaming-names/free-fire">Free Fire</Link> and{" "}
                <Link href="/gaming-names/fortnite">Fortnite</Link>
              </>
            }
          />
          <p>
            PUBG names show up in the squad list, on the kill feed and above your character. Short names with a clan tag
            work best, because teammates call them out in voice chat. A few ideas:
          </p>
          <Example>『{sansBold("TX")}』{boldFraktur("Mortal")}</Example>
          <Example>▄︻デ{sansBold("SCOUT")}══━一</Example>
          <Example>꧁{boldScript("Phantom")}꧂</Example>
          <Example>♛ {doubleStruck("HYDRA")} ♛</Example>
          <p>
            To rename, use a rename card from your inventory, paste the name and confirm. Rename cards are limited, so
            test first. Get more styles in the{" "}
            <Link href="/gaming-names/pubg-bgmi">PUBG and BGMI name generator</Link>.
          </p>

          <h2 id="free-fire">Stylish names for Free Fire</h2>
          <p>
            Free Fire is famous for its decorated names. Symbols like 亗, 彡 and ツ are everywhere in the lobby, and wings
            are very popular. Try these:
          </p>
          <Example>亗{boldFraktur("Killer")}亗</Example>
          <Example>ᴹᴿ᭄{sansBold("Blaze")}×͜×</Example>
          <Example>꧁༺{boldScript("Rider")}༻꧂</Example>
          <Example>彡{smallCaps("toxic")}彡</Example>
          <p>
            Free Fire names have a short character limit, and each symbol takes up room, so keep the core word short.
            Changing your name usually costs a name change card or diamonds. Find more ideas in the{" "}
            <Link href="/gaming-names/free-fire">Free Fire stylish name generator</Link>.
          </p>

          <h2 id="fortnite">Stylish names for Fortnite</h2>
          <p>
            Fortnite uses your Epic Games display name, and Epic is stricter than mobile games. Many symbols are
            rejected, so simple letter styles are the way to go:
          </p>
          <Example>{sansBold("Frost")}</Example>
          <Example>{smallCaps("nova")}</Example>
          <Example>{doubleStruck("Blitz")}</Example>
          <p>
            Change the name in your Epic account settings. There is a waiting period between changes, so choose
            carefully. If Epic rejects a styled name, use plain letters and save the fancy version for your Discord or
            social profiles. See more in <Link href="/gaming-names/fortnite">Fortnite username ideas</Link>.
          </p>

          <h2 id="how-to">How to make your gaming name, step by step</h2>
          <Figure
            src={stepsArt}
            alt="Three steps on glowing purple panels: hands typing a name on a keyboard, a finger tapping a copy button, and a winged name banner with a green check mark"
            caption={
              <>
                Type, copy and paste with the <Link href="/gaming-names">gaming name generator</Link>
              </>
            }
          />
          <ol>
            <li>
              Open the <Link href="/gaming-names">gaming name generator</Link> and pick your game.
            </li>
            <li>Type your name. Every style appears below, ready to copy.</li>
            <li>Tap the copy button on the style you like.</li>
            <li>Open the rename box in your game and paste.</li>
            <li>Check the preview. If you see boxes or question marks, try another style before you confirm.</li>
          </ol>

          <h2 id="problems">Common problems and fixes</h2>
          <Callout icon={AlertTriangle} title="If your name doesn't work">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>Boxes or question marks:</strong> your phone or the game has no font for that character. Remove
                the symbol or switch to bold or small caps.
              </li>
              <li>
                <strong>&ldquo;Invalid name&rdquo;:</strong> the game blocks that character. Try a simpler style or
                fewer symbols.
              </li>
              <li>
                <strong>Name too long:</strong> some symbols count as two characters. Shorten the core word or drop one
                symbol.
              </li>
              <li>
                <strong>Name already taken:</strong> change one symbol or the letter style to make it unique.
              </li>
              <li>
                <strong>Friends can&apos;t find you:</strong> people search in plain letters. Tell your squad your name, or
                keep it close to the plain spelling.
              </li>
            </ul>
          </Callout>

          <h2 id="tips">Tips for a name people remember</h2>
          <ul>
            <li>Use the same name in every game so friends can find you.</li>
            <li>Decorate the edges, not every letter. It stays readable on the kill feed.</li>
            <li>Don&apos;t copy a famous player, streamer or team name. It can get your account reported.</li>
            <li>Keep it clean. Games filter rude words, even in fancy letters.</li>
          </ul>
          <p>
            Need a word to start with? Browse <Link href="/names/boys">stylish names for boys</Link>,{" "}
            <Link href="/names/attitude">attitude names</Link> or <Link href="/names/royal">royal names</Link>. To
            match your gamer tag with your Instagram or TikTok profile, read{" "}
            <Link href="/blog/aesthetic-fonts-for-names-bios-captions">aesthetic fonts for names, bios and captions</Link>.
          </p>

          <h2 id="summary">Quick recap</h2>
          <ul>
            <li>A cool gaming name is a short word, one letter style and a symbol on each side.</li>
            <li>PUBG and Free Fire accept many symbols. Fortnite is stricter, so use simple styles there.</li>
            <li>Bold and small caps are the safest styles when a game rejects your name.</li>
            <li>Always check the in-game preview before you spend a rename card or diamonds.</li>
          </ul>
        </article>

        <aside className="mt-10 max-w-3xl rounded-[1.5rem] bg-navy p-6 text-white sm:p-8">
          <p className="flex items-center gap-2 text-xl font-extrabold">
            <Gamepad2 className="size-5 text-[#c4abff]" aria-hidden="true" />
            Make your own gaming name
          </p>
          <p className="mt-2 text-white/80">Type your name and copy it with wings, crowns and fancy letters.</p>
          <Link
            href="/gaming-names"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white transition-colors hover:bg-[#7a45f0]"
          >
            Open gaming names
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </aside>

        <nav aria-labelledby="keep-reading" className="mt-10 max-w-3xl">
          <h2 id="keep-reading" className="text-lg font-bold text-ink">
            Keep exploring
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/gaming-names/pubg-bgmi", label: "PUBG and BGMI names" },
              { href: "/gaming-names/free-fire", label: "Free Fire stylish names" },
              { href: "/gaming-names/fortnite", label: "Fortnite usernames" },
              { href: "/names/attitude", label: "Attitude names" },
              { href: "/text-decorator", label: "Text decorator" },
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
