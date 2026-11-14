import Link from "next/link";
import { Cookie, Globe, Info, Lock, RefreshCw, Settings, ShieldCheck, UserRound } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/Accordion";
import InfoPage from "@/components/InfoPage";
import { PrivacyIllustration } from "@/components/PageIllustrations";
import { RECENT_KEY, SAVED_KEY, THEME_KEY, VIEW_KEY } from "@/lib/browser-store";
import { CONSENT_KEY } from "@/lib/consent";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Privacy Policy";
const description =
  "How Fonts Changer handles your data: text is converted in your browser, nothing you type is sent or stored, and no analytics or advertising scripts are used.";

export const metadata = buildMetadata({ title, description, path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      title={title}
      description={description}
      path="/privacy-policy"
      intro="Your privacy matters to us. This page explains how Fonts Changer works and how we handle your information."
      illustration={<PrivacyIllustration className="w-full" />}
      showUpdated
      prose={false}
    >
      <div className="max-w-4xl">
        <Accordion>
          <AccordionItem icon={Info} title="Introduction" defaultOpen>
            <p>
              This policy explains what information {siteConfig.name} ({siteConfig.url.replace("https://", "")}) handles
              when you use the website. In short: the font generator runs on your device, the text you type is never sent
              to us, and we do not use analytics, advertising or tracking scripts.
            </p>
          </AccordionItem>

          <AccordionItem icon={UserRound} title="Information We Collect">
            <p>
              We do not ask for, collect or store personal information through the website. There are no accounts, sign-ups
              or newsletters.
            </p>
            <ul>
              <li>
                <strong>Text you type:</strong> not collected. It stays in your browser and disappears when you reload or
                close the page.
              </li>
              <li>
                <strong>Server logs:</strong> like any website, pages are delivered by a hosting provider whose servers may
                automatically record technical data such as your IP address, browser type, the page requested and the time.
                This is used to deliver the site and keep it secure, and we do not use it to identify you.
              </li>
              <li>
                <strong>Emails you send us:</strong> if you contact us, we receive your email address and your message. We
                use them only to reply and delete them when they are no longer needed.
              </li>
              <li>
                <strong>Children:</strong> the site is a general-audience tool and does not knowingly collect personal
                information from anyone, including children.
              </li>
            </ul>
          </AccordionItem>

          <AccordionItem icon={Settings} title="How the Website Works">
            <p>
              Text conversion and decoration happen in your web browser using JavaScript that is part of this website. The
              text you type is not sent to our servers or to anyone else.
            </p>
            <p>
              When you press Copy, the styled text is placed on your device&apos;s clipboard using your browser&apos;s
              standard clipboard feature. We cannot read your clipboard. The contact form only opens a draft in your own
              email app; the website does not send or store your message.
            </p>
          </AccordionItem>

          <AccordionItem icon={Cookie} title="Cookies and Local Storage">
            <p>We do not set tracking cookies. The site uses your browser&apos;s local storage for a few small settings:</p>
            <ul>
              <li>
                <strong>Cookie choice</strong> (<code>{CONSENT_KEY}</code>): remembers whether you accepted or rejected
                optional cookies, so the banner does not appear on every page.
              </li>
              <li>
                <strong>Saved styles</strong> (<code>{SAVED_KEY}</code>): created only when you tap the heart on a style. It
                contains the names of the styles you saved, never your text.
              </li>
              <li>
                <strong>Theme</strong> (<code>{THEME_KEY}</code>): remembers whether you chose light or dark mode.
              </li>
              <li>
                <strong>Recent copies</strong> (<code>{RECENT_KEY}</code>): the names of the last few styles you copied, so you
                can reuse them. It never contains the text you copied.
              </li>
              <li>
                <strong>Layout</strong> (<code>{VIEW_KEY}</code>): remembers whether you prefer the grid or list view of results.
              </li>
            </ul>
            <p>
              This information stays on your device until you change it or clear your browser data. Read more in our{" "}
              <Link href="/cookie-policy">Cookie Policy</Link>.
            </p>
          </AccordionItem>

          <AccordionItem icon={Globe} title="Third-Party Services">
            <p>
              We do not currently use analytics, advertising, social media plugins or any other third-party scripts. Fonts
              are bundled with the website, so your browser does not contact font providers either.
            </p>
            <p>
              The cookie settings include optional analytics and marketing categories so that you can make a choice in
              advance, but no such service is installed. If we add one, we will update this policy and ask for your
              consent before it runs. Links to other websites, such as the Unicode Consortium, are covered by those
              sites&apos; own policies.
            </p>
          </AccordionItem>

          <AccordionItem icon={Lock} title="Data Security">
            <p>
              The site is served over HTTPS, which encrypts the connection between your browser and the server. Because your
              text is processed on your own device and we do not keep a database of visitors, there is very little
              information that could be exposed. Your browser&apos;s local storage is protected by your device and browser
              security.
            </p>
          </AccordionItem>

          <AccordionItem icon={ShieldCheck} title="Your Rights">
            <ul>
              <li>
                Change or withdraw your cookie choice at any time with the <strong>Cookie Settings</strong> link in the
                footer.
              </li>
              <li>Delete everything this site stored by clearing site data in your browser settings.</li>
              <li>
                Depending on where you live, laws such as the GDPR or the California Consumer Privacy Act may give you rights
                to access, correct or delete personal information. Because we do not collect personal information through
                the website itself, there is usually nothing to access or delete, but you can{" "}
                <Link href="/contact">contact us</Link> with any request.
              </li>
              <li>We do not sell or share personal information.</li>
            </ul>
          </AccordionItem>

          <AccordionItem icon={RefreshCw} title="Policy Updates">
            <p>
              If our practices change, for example if we add an analytics service, we will update this page and the date at
              the top. Questions about privacy? Visit our <Link href="/contact">contact page</Link>.
            </p>
          </AccordionItem>
        </Accordion>
      </div>
    </InfoPage>
  );
}
