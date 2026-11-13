import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { CONSENT_KEY } from "@/lib/consent";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Privacy Policy";
const description =
  "How Fonts Changer handles your data: text is converted in your browser, nothing you type is sent or stored, and no analytics or advertising scripts are used.";

export const metadata = buildMetadata({ title, description, path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
  return (
    <InfoPage title={title} description={description} path="/privacy-policy" showUpdated>
      <p>
        This policy explains what information {siteConfig.name} ({siteConfig.url.replace("https://", "")}) handles when
        you use the website. In short: the font generator runs on your device, the text you type is never sent to us, and
        we do not use analytics, advertising or tracking scripts.
      </p>

      <h2>1. Text you type into the generator</h2>
      <p>
        The conversion happens in your web browser using JavaScript that is part of this website. The text you type is not
        sent to our servers or to anyone else, and it is not saved. It is cleared when you reload or close the page.
      </p>
      <p>
        When you press Copy, the styled text is placed on your device&apos;s clipboard using your browser&apos;s standard
        clipboard feature. We cannot read your clipboard.
      </p>

      <h2>2. Information stored in your browser</h2>
      <p>The site uses your browser&apos;s local storage for two purposes only:</p>
      <ul>
        <li>
          <strong>Cookie choice</strong> (<code>{CONSENT_KEY}</code>): remembers whether you accepted or rejected optional
          cookies, so the banner does not appear on every page. It is kept until you change your choice or clear your
          browser data.
        </li>
        <li>
          <strong>Saved styles</strong> (<code>fc-saved-styles</code>): created only if you tap the star on a style. It
          contains the names of the styles you saved, not your text. It is kept until you remove the stars or clear your
          browser data.
        </li>
      </ul>
      <p>This information stays on your device. It is not sent to us, and we cannot see it.</p>

      <h2>3. Analytics, advertising and third parties</h2>
      <p>
        We do not currently use analytics, advertising, social media plugins or any other third-party scripts. The website
        does not load external fonts or content from other companies. The cookie settings include optional analytics and
        marketing categories so that you can make a choice in advance, but no such service is installed. If we add one in
        the future, we will update this policy and ask for your consent before it runs.
      </p>

      <h2>4. Server and hosting logs</h2>
      <p>
        Like any website, pages are delivered by a hosting provider. When your browser requests a page, the hosting
        provider&apos;s servers may automatically record technical information such as your IP address, browser type, the
        page requested and the time of the request. This is used to deliver the site and keep it secure. We do not combine
        this information with anything else or use it to identify you.
      </p>

      <h2>5. Emails you send us</h2>
      <p>
        If you contact us by email, we receive your email address and whatever you include in your message. We use it only
        to respond to you and delete it when it is no longer needed for that purpose. The contact form on this site only
        opens your own email app; it does not send or store anything.
      </p>

      <h2>6. Children</h2>
      <p>
        The site is a general-audience tool and does not knowingly collect personal information from anyone, including
        children.
      </p>

      <h2>7. Your choices and rights</h2>
      <ul>
        <li>
          Change or withdraw your cookie choice at any time with the <strong>Cookie Settings</strong> link in the footer.
        </li>
        <li>Delete everything stored by this site by clearing site data in your browser settings.</li>
        <li>
          Depending on where you live, laws such as the GDPR or the California Consumer Privacy Act may give you rights to
          access, correct or delete personal information. Because we do not collect personal information through the
          website itself, there is usually nothing to access or delete, but you can contact us with any request.
        </li>
        <li>We do not sell or share personal information.</li>
      </ul>

      <h2>8. Changes to this policy</h2>
      <p>
        If our practices change, for example if we add an analytics service, we will update this page and the date at the
        top.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about privacy? See our <Link href="/contact">contact page</Link>. You can also read our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>
    </InfoPage>
  );
}
