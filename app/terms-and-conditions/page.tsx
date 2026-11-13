import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Terms and Conditions";
const description = "The terms for using Fonts Changer, including acceptable use, accuracy limits and liability.";

export const metadata = buildMetadata({ title, description, path: "/terms-and-conditions" });

export default function TermsPage() {
  return (
    <InfoPage title={title} description={description} path="/terms-and-conditions" showUpdated>
      <p>
        By using {siteConfig.name} (the “site”), you agree to these terms. If you do not agree, please do not use the
        site.
      </p>

      <h2>1. The service</h2>
      <p>
        The site provides a free tool that converts text into styled Unicode characters, along with information about how
        those characters work. It is provided for personal and general use. No account is required.
      </p>

      <h2>2. Acceptable use</h2>
      <p>You agree not to use the site or the text it produces to:</p>
      <ul>
        <li>impersonate another person, brand or account, for example by using lookalike characters in a name;</li>
        <li>deceive people, including phishing or disguising links and addresses;</li>
        <li>avoid spam, moderation or content filters on other platforms;</li>
        <li>harass, threaten or harm others, or break any law;</li>
        <li>interfere with the site, for example by attempting to overload or attack it.</li>
      </ul>
      <p>You are responsible for following the rules of any app or website where you paste the text.</p>

      <h2>3. Your text</h2>
      <p>
        You keep all rights to the text you type. Because conversion happens in your browser, we do not receive or store
        it.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        The site&apos;s design, written content and code belong to the site owner, unless stated otherwise. You may share
        links to the site. Please do not copy large parts of the site&apos;s written content without permission. Unicode
        characters themselves are part of an open international standard and are free for anyone to use.
      </p>

      <h2>5. Accuracy and display</h2>
      <p>
        We try to keep each style accurate, but we cannot guarantee how styled text will look on every device, font or
        app. Some characters may display as boxes, be removed by a platform, or be read incorrectly by assistive
        technology. Please check the result before you rely on it. See our <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>6. Availability</h2>
      <p>
        The site is provided “as is” and “as available”. We may change, pause or stop any part of it at any time without
        notice.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the fullest extent allowed by law, the site owner is not liable for any indirect, incidental or consequential
        loss arising from your use of the site or of text produced with it, including problems caused when another
        platform rejects, alters or misreads that text. Some jurisdictions do not allow certain limitations, so parts of
        this section may not apply to you.
      </p>

      <h2>8. Links to other websites</h2>
      <p>
        The site links to external resources, such as the Unicode Consortium. We are not responsible for their content or
        practices.
      </p>

      <h2>9. Changes to these terms</h2>
      <p>
        We may update these terms. The date at the top shows when they last changed. Continuing to use the site after a
        change means you accept the updated terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms? Visit the <Link href="/contact">contact page</Link>.
      </p>
    </InfoPage>
  );
}
