import Link from "next/link";
import { ArrowRight, CircleCheck, Code2, Lightbulb, Scale, Target, type LucideIcon } from "lucide-react";
import HeroIllustration from "@/components/HeroIllustration";
import InfoPage from "@/components/InfoPage";
import { AboutIllustration } from "@/components/PageIllustrations";
import { FONT_STYLES } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";

const count = FONT_STYLES.length;
const title = "About Fonts Changer";
const description =
  "Learn what Fonts Changer is, why we built it, how the text generator works in your browser and what makes it different.";

export const metadata = buildMetadata({ title, description, path: "/about" });

const different = [
  `${count} stylish font styles`,
  "Works instantly in your browser",
  "No account or sign-up required",
  "100% free to use",
  "Respects your privacy: your text never leaves your device",
];

function InfoCard({ icon: Icon, title: cardTitle, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-sm">
      <h2 className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-ink">
        <span className="grid size-10 place-items-center rounded-xl bg-accent-soft">
          <Icon className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
        </span>
        {cardTitle}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-body">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <InfoPage
      title={title}
      description={description}
      path="/about"
      intro="Learn more about our tool, our mission and why we created Fonts Changer."
      illustration={<AboutIllustration className="w-full" />}
      prose={false}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard icon={Target} title="Our Mission">
          <p>
            To make text styling simple, fun and free for everyone. We believe creative text should be accessible to all,
            without sign-ups, downloads or hidden costs.
          </p>
        </InfoCard>
        <InfoCard icon={Lightbulb} title="Why We Created It">
          <p>
            Most apps do not let you change the font of your bio, captions or messages. Unicode already contains many
            letter variants that look styled, but finding them by hand is slow. Fonts Changer does the lookup for you,
            shows every style side by side and copies the one you choose with one tap.
          </p>
        </InfoCard>
      </div>

      <section
        aria-labelledby="different-heading"
        className="mt-8 grid items-center gap-8 rounded-[1.5rem] border border-line bg-surface p-6 shadow-sm sm:p-8 md:grid-cols-[1fr_1.1fr]"
      >
        <HeroIllustration className="mx-auto w-full max-w-sm" />
        <div>
          <h2 id="different-heading" className="text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
            What Makes Us Different?
          </h2>
          <ul className="mt-5 space-y-3">
            {different.map((item) => (
              <li key={item} className="flex items-start gap-3 text-body">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-accent dark:text-accent-strong" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white transition-colors hover:bg-accent-strong dark:hover:bg-[#8455f5]"
          >
            Try the font generator
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <InfoCard icon={Code2} title="How It Is Built">
          <ul className="list-disc space-y-2 pl-5 marker:text-accent">
            <li>The generator runs entirely in your browser. Your text is not sent to a server.</li>
            <li>There are no accounts, no analytics and no advertising scripts.</li>
            <li>
              Each style is a character mapping based on the published{" "}
              <a href="https://www.unicode.org/charts/" className="font-semibold text-accent underline underline-offset-2 dark:text-accent-strong">
                Unicode code charts
              </a>
              .
            </li>
            <li>Automated tests check known characters for each style.</li>
          </ul>
        </InfoCard>
        <InfoCard icon={Scale} title="What We Are Honest About">
          <p>
            Styled Unicode text is not a real font. It can be hard for screen readers to read, may not be found by search,
            and some devices cannot display every character. We explain these limits in the{" "}
            <Link href="/faq" className="font-semibold text-accent underline underline-offset-2 dark:text-accent-strong">
              FAQ
            </Link>{" "}
            and on each{" "}
            <Link href="/fonts" className="font-semibold text-accent underline underline-offset-2 dark:text-accent-strong">
              font style page
            </Link>
            .
          </p>
          <p className="text-sm text-muted">
            Fonts Changer is not affiliated with or endorsed by Instagram, TikTok, Meta, Discord, X, the Unicode Consortium or
            any other company mentioned on this site.
          </p>
        </InfoCard>
      </div>

      <p className="mt-8 text-muted">
        Found a style that displays incorrectly, or have an idea for a new one?{" "}
        <Link href="/contact" className="font-semibold text-accent hover:underline dark:text-accent-strong">
          Get in touch
        </Link>
        .
      </p>
    </InfoPage>
  );
}
