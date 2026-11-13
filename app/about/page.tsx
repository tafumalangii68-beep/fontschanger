import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { FONT_STYLES } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";

const title = "About Us";
const description =
  "Learn what Fonts Changer is, how the text generator works, what it does not do, and how we handle your privacy.";

export const metadata = buildMetadata({ title, description, path: "/about" });

export default function AboutPage() {
  return (
    <InfoPage title={title} description={description} path="/about">
      <p>
        Fonts Changer is an independent website with one job: to turn plain text into styled Unicode text you can copy
        and paste. It currently offers {FONT_STYLES.length} styles, grouped into cursive, bold, aesthetic, fancy, small,
        line, glitch and upside-down categories.
      </p>

      <h2>Why this site exists</h2>
      <p>
        Most apps do not let you change the font of your bio, captions or messages. Unicode already contains many letter
        variants that look styled, but finding and typing them by hand is slow. Fonts Changer does the lookup for you,
        shows every style side by side, and copies the one you choose with one tap.
      </p>

      <h2>How it is built</h2>
      <ul>
        <li>The generator runs entirely in your browser. Your text is not sent to a server.</li>
        <li>There are no accounts, no analytics and no advertising scripts.</li>
        <li>
          Each style is a simple character mapping based on the published{" "}
          <a href="https://www.unicode.org/charts/">Unicode code charts</a>.
        </li>
        <li>The core conversion logic is covered by automated tests that check known characters for each style.</li>
      </ul>

      <h2>What we are honest about</h2>
      <p>
        Styled Unicode text is not a real font. It can be hard for screen readers to read, it may not be found by search,
        and some devices cannot display every character. We explain these limits on the{" "}
        <Link href="/">homepage</Link>, on each <Link href="/fonts">font style page</Link> and in the{" "}
        <Link href="/faq">FAQ</Link>, so you can decide where styled text makes sense.
      </p>
      <p>
        Fonts Changer is not affiliated with or endorsed by Instagram, TikTok, Meta, Discord, X, the Unicode Consortium or
        any other company or organization mentioned on this site.
      </p>

      <h2>Contact</h2>
      <p>
        Found a style that displays incorrectly, or have an idea for a new one? Get in touch through the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </InfoPage>
  );
}
