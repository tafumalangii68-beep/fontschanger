import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Gamepad2,
  Music2,
  Heart,
  Layers,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Artwork from "@/components/Artwork";
import Container from "@/components/Container";
import FaqList from "@/components/FaqList";
import BioGenerator from "@/components/BioGenerator";
import FontCollections from "@/components/FontCollections";
import FontGenerator from "@/components/FontGenerator";
import FontOfTheDay from "@/components/FontOfTheDay";
import PlatformPreview from "@/components/PlatformPreview";
import RecentCopies from "@/components/RecentCopies";
import SymbolGenerator from "@/components/SymbolGenerator";
import TypographyBackground from "@/components/TypographyBackground";
import JsonLd from "@/components/JsonLd";
import { BLOG_POSTS } from "@/data/blog";
import { homeFaqs } from "@/data/faqs";
import { ART, STEP_ART } from "@/lib/art";
import { FONT_STYLES } from "@/lib/fonts";
import { buildMetadata, faqJsonLd, organizationJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

const styleCount = FONT_STYLES.length;

const title = "Fonts Changer: Fancy Text Generator to Copy and Paste";
const description = `Turn your text into ${styleCount} fancy fonts: cursive, bold, aesthetic and more. Copy and paste them into Instagram, TikTok or Discord. Free, no sign-up.`;

export const metadata = buildMetadata({ title, description, path: "/", absoluteTitle: true });

function styled(id: string, text: string): string {
  const style = FONT_STYLES.find((s) => s.id === id);
  return style ? style.transform(text) : text;
}

const popular: { id: string; label: string; href: string; note: string }[] = [
  { id: "bold-cursive", label: "Cursive", href: "/fonts/cursive-fonts", note: "Elegant handwriting for names and bios" },
  { id: "bold-sans", label: "Bold", href: "/fonts/bold-text", note: "Make one line stand out in a caption" },
  { id: "aesthetic-wide", label: "Aesthetic", href: "/fonts/aesthetic-fonts", note: "Wide, airy letters with a retro feel" },
  { id: "small-caps", label: "Small text", href: "/fonts/small-text", note: "Quiet, tidy capitals for subtitles" },
  { id: "glitch", label: "Glitch", href: "/fonts/glitch-text", note: "Creepy, distorted text for gaming" },
  { id: "upside-down", label: "Upside down", href: "/fonts/upside-down-text", note: "Flipped text for jokes and puzzles" },
];

const platformLinks: { href: string; icon: LucideIcon; title: string; text: string; tint: string }[] = [
  { href: "#instagram", icon: Camera, title: "For Instagram", text: "Stylish bios and captions", tint: "bg-gradient-to-br from-fuchsia-500 to-orange-400" },
  { href: "#discord", icon: Gamepad2, title: "For Discord", text: "Unique nicknames and channels", tint: "bg-accent" },
  { href: "#tiktok", icon: Music2, title: "For TikTok", text: "Trendy profile text", tint: "bg-navy dark:bg-[#2d2763]" },
];

// Each step's picture comes from STEP_ART in the same order.
const steps: { title: string; text: string }[] = [
  { title: "Type your text", text: "Write a name, a bio line or a short message in the box at the top." },
  { title: "Find a style", text: "Use the category filters or search to narrow the list down." },
  { title: "Tap to copy", text: "Tap a preview or its Copy button. A check mark confirms it." },
  { title: "Paste anywhere", text: "Press and hold in any text field in your app and choose Paste." },
];

const reasons: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Zap, title: "Results as you type", text: `Every one of the ${styleCount} styles updates instantly. There is no waiting and no extra click.` },
  { icon: ShieldCheck, title: "Private by design", text: "Conversion happens in your browser. Your text never reaches a server and is never stored." },
  { icon: Heart, title: "Keep your favorites", text: "Tap the heart on a style to save it. Saved styles stay in this browser for your next visit." },
  { icon: Layers, title: "Sorted by mood", text: "Cursive, bold, aesthetic, small, lines and glitch filters help you find a look quickly." },
  { icon: Smartphone, title: "Made for phones", text: "Big tap targets, a scrollable filter row and a compact grid make it easy on small screens." },
  { icon: Sparkles, title: "Free, no sign-up", text: "No account, no limits and no watermark. Open the page, type and copy." },
];

function SectionHeading({ eyebrow, title, intro, id }: { eyebrow: string; title: string; intro?: string; id: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-bold uppercase tracking-wider text-accent dark:text-accent-strong">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-[1.75rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[2.1rem]">
        {title}
      </h2>
      {intro && <p className="mt-3 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

/** A plain mock "post" used to show how styled text looks in a feed or chat. */
function Mockup({ lines, caption }: { lines: { label: string; text: string; muted?: boolean }[]; caption: string }) {
  return (
    <figure className="rounded-[1.5rem] border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
      <div className="space-y-3">
        {lines.map((l) => (
          <div key={l.label} className="rounded-2xl bg-paper px-4 py-3">
            <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">{l.label}</p>
            <p className={`glyph mt-1 text-lg ${l.muted ? "text-body" : "text-ink"}`}>{l.text}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          ...organizationJsonLd(),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            description,
            publisher: { "@id": `${absoluteUrl("/")}#organization` },
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any (runs in a web browser)",
            isAccessibleForFree: true,
            browserRequirements: "Requires JavaScript",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          faqJsonLd(homeFaqs),
        ]}
      />

      {/* Hero + generator */}
      <section className="fc-type-hero relative overflow-hidden pb-14 pt-8 sm:pt-12">
        <TypographyBackground />
        <Container className="relative z-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-sm font-semibold text-ink">
                <Sparkles className="size-4 text-accent dark:text-accent-strong" aria-hidden="true" />
                Free Online Font Generator
              </p>
              <h1 className="mt-4 text-[2.1rem] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl sm:leading-[1.08]">
                Fonts Changer: Fancy Text You Can{" "}
                <span className="relative inline-block text-accent dark:text-accent-strong">
                  Copy and Paste
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 14"
                    preserveAspectRatio="none"
                    className="absolute -bottom-2 left-[4%] h-3 w-[92%] text-accent dark:text-accent-strong"
                  >
                    <path d="M3 10C80 2 200 1 297 7" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                Turn simple text into stylish, unique fonts in seconds. Choose from {styleCount} styles including bold,
                cursive, aesthetic, small and glitch, then paste them into your bio, captions or chats.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {[
                  { icon: Zap, label: `${styleCount} Font Styles` },
                  { icon: Layers, label: "Instant Copy" },
                  { icon: ShieldCheck, label: "100% Free" },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 rounded-full border border-line bg-surface py-2 pl-2.5 pr-4 text-sm font-semibold text-ink shadow-sm"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-accent-soft">
                      <Icon className="size-4 text-accent dark:text-accent-strong" aria-hidden="true" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <Artwork art={ART.homeHero} sizes="(min-width: 1152px) 540px, 45vw" className="hidden max-w-xl justify-self-center lg:block" />
          </div>

          <div className="mt-8 lg:mt-4">
            <FontGenerator inputLabel="Type the text you want to change" />
          </div>

          <div className="mt-10 grid items-center gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Artwork art={ART.platforms} sizes="(min-width: 1024px) 640px, 100vw" />
          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {platformLinks.map(({ href, icon: Icon, title: linkTitle, text, tint }) => (
              <li key={href}>
                <a
                  href={href}
                  className="group flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[var(--shadow-card)]"
                >
                  <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tint}`}>
                    <Icon className="size-5 text-white" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold text-ink">{linkTitle}</span>
                    <span className="block text-sm text-muted">{text}</span>
                  </span>
                  <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          </div>
        </Container>
      </section>

      {/* Daily pick + recent copies */}
      <Container className="pb-4">
        <div className="grid gap-5 lg:grid-cols-2">
          <FontOfTheDay />
          <RecentCopies />
        </div>
        <div className="mt-12">
          <PlatformPreview />
        </div>
      </Container>

      {/* Collections */}
      <section aria-labelledby="collections-heading" className="fc-band mt-16 py-16">
        <Container>
          <SectionHeading
            id="collections-heading"
            eyebrow="Font collections"
            title="Curated sets for every vibe"
            intro="Hand-picked styles for gaming, social media, aesthetic and creative use. Choose a collection to filter the results above."
          />
          <div className="mt-8">
            <FontCollections />
          </div>
          <div className="mt-8">
            <p className="text-sm font-semibold text-ink">Popular style guides</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {popular.map((p) => (
                <li key={p.id}>
                  <Link
                    href={p.href}
                    title={p.note}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-accent hover:bg-accent-soft"
                  >
                    <span className="glyph text-accent dark:text-accent-strong">{styled(p.id, "Aa")}</span>
                    {p.label} fonts
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/fonts"
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-accent hover:underline dark:text-accent-strong"
                >
                  All font styles
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Bio + symbol text generators */}
      <Container className="space-y-20 pt-20">
        <section aria-labelledby="bio-heading" id="bio-generator" className="scroll-mt-24">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <SectionHeading
              id="bio-heading"
              eyebrow="Bio generator"
              title="Create a stylish social media bio"
              intro="Add your name and a few words about you, pick a vibe, and get ready-made bios with styled letters and symbols. Each one shows its length against the platform limit."
            />
            <Artwork art={ART.bioGenerator} sizes="(min-width: 1024px) 384px, 320px" className="hidden w-80 md:block lg:w-96" />
          </div>
          <div className="mt-8">
            <BioGenerator />
          </div>
        </section>

        <section aria-labelledby="symbols-heading" id="text-generator" className="scroll-mt-24">
          <SectionHeading
            id="symbols-heading"
            eyebrow="Text generator"
            title="Decorative text and symbol combinations"
            intro="Mix letter styles with stars, hearts, flowers and more. Pick a theme, then press Generate new mix to try different combinations."
          />
          <div className="mt-8">
            <SymbolGenerator />
          </div>
        </section>
      </Container>

      {/* Platform sections */}
      <Container className="space-y-20 py-20">
        <section id="instagram" aria-labelledby="instagram-heading" className="scroll-mt-24 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="instagram-heading" eyebrow="Instagram" title="Fancy Fonts for Instagram" />
            <div className="prose-fc mt-4">
              <p>
                Instagram does not let you pick a font for your bio, name or captions, but it does accept Unicode
                characters. That is why styled text copied from Fonts Changer keeps its look after you paste it into the
                app.
              </p>
              <ul>
                <li>Use one styled line, such as your name or a short tagline, and keep contact details in plain text.</li>
                <li>Cursive and bold styles are the easiest to read in a small profile header.</li>
                <li>Decorated styles like wings and stars work well as section dividers in captions.</li>
              </ul>
              <p>
                For bio ideas and character limits, read the guide to <Link href="/fonts/instagram-fonts">Instagram fonts</Link>.
              </p>
            </div>
          </div>
          <Mockup
            caption="Example bio using Bold Cursive for the name and Small Caps for the tagline."
            lines={[
              { label: "Name", text: styled("bold-cursive", "Maya Rivers") },
              { label: "Bio", text: styled("small-caps", "travel · film photos · coffee"), muted: true },
              { label: "Caption", text: styled("royal-wings", "Weekend mood") },
            ]}
          />
        </section>

        <section id="discord" aria-labelledby="discord-heading" className="scroll-mt-24 grid items-center gap-10 lg:grid-cols-2">
          <div className="lg:order-2">
            <SectionHeading id="discord-heading" eyebrow="Discord" title="Discord Fonts Generator" />
            <div className="prose-fc mt-4">
              <p>
                Discord already supports simple formatting like <code>**bold**</code> and <code>*italic*</code> in
                messages. Unicode styles go further: they also work in places where formatting does not, such as your
                server nickname, your profile bio and channel names.
              </p>
              <ul>
                <li>Glitch and Old English styles suit gaming servers and roleplay channels.</li>
                <li>Small Caps and Monospace look clean in channel and role names.</li>
                <li>Heavy glitch text can be hard to read in chat, so save it for short names.</li>
              </ul>
              <p>
                Try the <Link href="/fonts/glitch-text">glitch text generator</Link> or the{" "}
                <Link href="/fonts/bold-text">bold text styles</Link> for headings in your server.
              </p>
            </div>
          </div>
          <Mockup
            caption="Example nickname and channel names using Glitch Bold, Small Caps and Monospace."
            lines={[
              { label: "Nickname", text: styled("glitch-bold", "NightOwl") },
              { label: "Channel", text: "# " + styled("small-caps", "general-chat"), muted: true },
              { label: "Role", text: styled("monospace", "Moderator") },
            ]}
          />
        </section>

        <section id="tiktok" aria-labelledby="tiktok-heading" className="scroll-mt-24 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="tiktok-heading" eyebrow="TikTok" title="Stylish Text for TikTok" />
            <div className="prose-fc mt-4">
              <p>
                On TikTok, a styled display name or bio helps your profile look finished when people tap through from
                your videos. Paste styled text into your name, bio or comments the same way you paste normal text.
              </p>
              <ul>
                <li>Aesthetic Wide and Sparkles fit soft, lifestyle accounts.</li>
                <li>Bold Sans is clear on a busy video screen, so it works well in comments.</li>
                <li>Check your name after saving: TikTok limits name length, and styled letters can count as more than one character.</li>
              </ul>
              <p>
                Browse the <Link href="/fonts/aesthetic-fonts">aesthetic fonts</Link> for more ideas, or add symbols with the{" "}
                <Link href="/text-decorator">Text Decorator</Link>.
              </p>
            </div>
          </div>
          <Mockup
            caption="Example profile using Aesthetic Wide, Sparkles and Bold Sans."
            lines={[
              { label: "Name", text: styled("aesthetic-wide", "daily bakes") },
              { label: "Bio", text: styled("sparkles", "new recipe every friday"), muted: true },
              { label: "Comment", text: styled("bold-sans", "Recipe in the pinned comment!") },
            ]}
          />
        </section>
      </Container>

      {/* How to use */}
      <section aria-labelledby="howto-heading" className="fc-band py-16">
        <Container>
          <SectionHeading
            id="howto-heading"
            eyebrow="How it works"
            title="How to Use Fonts Changer"
            intro="Four steps, and no sign-up. Everything happens on this page."
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ title: stepTitle, text }, i) => (
              <li key={stepTitle} className="relative rounded-[var(--radius-card)] border border-line bg-paper p-3">
                <div className="relative">
                  <Image
                    src={STEP_ART[i].src}
                    alt={STEP_ART[i].alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
                    className="h-auto w-full rounded-xl"
                  />
                  <span
                    className="absolute left-3 top-3 grid size-9 place-items-center rounded-full bg-white text-base font-extrabold text-accent shadow"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 px-2 text-lg font-bold text-ink">
                  <span className="sr-only">Step {i + 1}: </span>
                  {stepTitle}
                </h3>
                <p className="mt-1.5 px-2 pb-2 leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ol>
          <div className="prose-fc mt-10 max-w-3xl">
            <h3>Why the text keeps its style</h3>
            <p>
              Fonts Changer does not change a font setting. It swaps each letter for a look-alike Unicode character, such
              as the bold and script letters from the{" "}
              <a href="https://www.unicode.org/charts/PDF/U1D400.pdf">Mathematical Alphanumeric Symbols</a> block. Because
              these are characters rather than formatting, they stay styled wherever you paste them. Letters with no match,
              such as accented letters and emoji, stay as they are. Want the full story? Read{" "}
              <Link href="/blog/how-fancy-font-generators-work">how fancy font generators work</Link>.
            </p>
          </div>
        </Container>
      </section>

      {/* Guides */}
      <Container className="pt-20">
        <section aria-labelledby="guides-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              id="guides-heading"
              eyebrow="Learn"
              title="Guides to Fancy Text and Unicode"
              intro="Short, simple reads on how styled letters work, why some show as boxes and how to type any symbol."
            />
            <Link href="/blog" className="inline-flex items-center gap-1.5 font-bold text-accent hover:underline dark:text-accent-strong">
              All guides
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.filter((p) => p.homeImage ?? p.cover).map((post) => {
              const pic = (post.homeImage ?? post.cover)!;
              return (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[var(--shadow-card)]"
                  >
                    {/* The card title says what the guide is about, so the picture is decorative. */}
                    <Image src={pic} alt="" placeholder="blur" sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/9] h-auto w-full object-cover" />
                    <span className="flex flex-1 flex-col p-5">
                      <span className="text-lg font-extrabold leading-snug tracking-tight text-ink group-hover:text-accent dark:group-hover:text-accent-strong">
                        {post.title}
                      </span>
                      <span className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-muted">{post.description}</span>
                      <span className="mt-auto inline-flex pt-4 items-center gap-1.5 text-sm font-bold text-accent dark:text-accent-strong">
                        Read guide
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>

      {/* Why choose */}
      <Container className="pt-20">
        <section aria-labelledby="why-heading">
          <SectionHeading
            id="why-heading"
            eyebrow="Why Fonts Changer"
            title="Why Choose Our Fonts Changer?"
            intro="A focused tool that does one job well: turning your words into styles you can actually use."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title: reasonTitle, text }) => (
              <li key={reasonTitle} className="rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-sm">
                <span className="grid size-11 place-items-center rounded-xl bg-accent-soft">
                  <Icon className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{reasonTitle}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
            One honest note: styled Unicode text can be hard for screen readers and search to understand, and older devices
            may show empty boxes for rare characters. Use it for short, decorative lines and keep important details in
            plain text.
          </p>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              id="faq-heading"
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              intro="Quick answers about copying, privacy and why some styles look different on some phones."
            />
            <Link
              href="/faq"
              className="mt-5 inline-flex items-center gap-1.5 font-semibold text-accent hover:underline dark:text-accent-strong"
            >
              Read the full FAQ
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <FaqList faqs={homeFaqs} />
        </section>

        {/* Closing call to action */}
        <section
          aria-labelledby="cta-heading"
          className="relative mt-20 flex flex-col items-start gap-6 overflow-hidden rounded-[1.75rem] bg-navy px-6 py-10 text-white sm:px-10 sm:py-14 md:flex-row md:items-center md:justify-between"
        >
          <Image
            src={ART.ctaBanner.src}
            alt=""
            fill
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="object-cover object-right"
          />
          {/* Keeps the headline readable over the artwork. */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/10" />
          <div className="relative">
            <h2 id="cta-heading" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Ready to change your font?
            </h2>
            <p className="mt-2 max-w-xl text-white/75">
              Type your name or a short phrase and copy the style you like. It takes about ten seconds.
            </p>
          </div>
          <a
            href="#fc-top"
            className="relative inline-flex shrink-0 items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 font-bold text-white shadow-[0_10px_24px_-10px_rgb(100_37_232/0.9)] transition-colors hover:bg-[#7a45f0]"
          >
            <Sparkles className="size-5" aria-hidden="true" />
            Start generating fonts
          </a>
        </section>
      </Container>
    </>
  );
}
