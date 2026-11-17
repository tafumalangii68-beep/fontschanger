import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { buildMetadata } from "@/lib/seo";

const title = "Disclaimer";
const description =
  "Important limits of Fonts Changer: styled Unicode text is not a real font, may not display everywhere, and can affect accessibility and search.";

export const metadata = buildMetadata({ title, description, path: "/disclaimer" });

export default function DisclaimerPage() {
  return (
    <InfoPage title={title} description={description} path="/disclaimer" showUpdated>
      <p>The information and tools on Fonts Changer are provided for general, informational and entertainment use.</p>

      <h2>Not a real font</h2>
      <p>
        The generator does not change or install fonts. It replaces letters with other Unicode characters that look
        styled. These characters have their own meanings in the Unicode Standard, for example as mathematical symbols or
        letters of other writing systems. For a simple explanation, see{" "}
        <Link href="/blog/how-fancy-font-generators-work">how fancy font generators work</Link>.
      </p>

      <h2>No guarantee of display or acceptance</h2>
      <p>
        How the text appears depends on the device, operating system, fonts and app being used. We cannot guarantee that
        any style will display correctly, be accepted, or stay unchanged on a particular platform. Platforms may change
        what they allow at any time.
      </p>

      <h2>Accessibility and search</h2>
      <p>
        Styled characters may be read incorrectly or skipped by screen readers, and may not be found by search features.
        Do not use styled text for important information such as contact details, safety notices or anything people need
        to read reliably.
      </p>

      <h2>No affiliation</h2>
      <p>
        Names of apps and companies, such as Instagram, TikTok, WhatsApp, Discord and X, are used only to describe where
        text can be pasted. Fonts Changer is not affiliated with, sponsored by or endorsed by any of them, or by the Unicode
        Consortium.
      </p>

      <p>
        See also our <Link href="/terms-and-conditions">Terms and Conditions</Link>.
      </p>
    </InfoPage>
  );
}
