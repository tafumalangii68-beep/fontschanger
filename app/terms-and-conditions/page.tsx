import Link from "next/link";
import { AlertTriangle, Copyright, FileCheck, Globe, Pencil, Scale, UserCheck, Wrench } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/Accordion";
import InfoPage from "@/components/InfoPage";
import { TermsIllustration } from "@/components/PageIllustrations";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Terms and Conditions";
const description = "The terms for using Fonts Changer, including acceptable use, how the tools work, accuracy limits and liability.";

export const metadata = buildMetadata({ title, description, path: "/terms-and-conditions" });

export default function TermsPage() {
  return (
    <InfoPage
      title={title}
      description={description}
      path="/terms-and-conditions"
      intro="Please read these terms carefully before using Fonts Changer."
      illustration={<TermsIllustration className="w-full" />}
      showUpdated
      prose={false}
    >
      <div className="max-w-4xl">
        <Accordion>
          <AccordionItem icon={FileCheck} title="Acceptance of Terms" defaultOpen>
            <p>
              By using {siteConfig.name} (the “site”), you agree to these terms. If you do not agree, please do not use the
              site.
            </p>
          </AccordionItem>

          <AccordionItem icon={Globe} title="Website Usage">
            <p>
              The site is free for personal and general use and does not require an account. You may share links to any
              page. You agree not to interfere with the site, for example by attempting to overload, scrape at high volume
              or attack it.
            </p>
          </AccordionItem>

          <AccordionItem icon={Wrench} title="Tool Functionality">
            <p>
              The font generator converts text into styled Unicode characters, and the Text Decorator adds symbols around
              it. Both run in your browser. You keep all rights to the text you type, and we do not receive or store it.
            </p>
            <p>
              We try to keep each style accurate, but we cannot guarantee how styled text will look on every device, font or
              app. Some characters may display as boxes, be removed by a platform, or be read incorrectly by assistive
              technology. The site is provided “as is” and “as available”, and we may change, pause or stop any part of it
              at any time.
            </p>
          </AccordionItem>

          <AccordionItem icon={Copyright} title="Intellectual Property">
            <p>
              The site&apos;s design, written content and code belong to the site owner unless stated otherwise. Please do
              not copy large parts of the written content without permission. Unicode characters themselves are part of an
              open international standard and are free for anyone to use.
            </p>
          </AccordionItem>

          <AccordionItem icon={UserCheck} title="User Responsibilities">
            <p>You agree not to use the site or the text it produces to:</p>
            <ul>
              <li>impersonate another person, brand or account, for example with lookalike characters in a name;</li>
              <li>deceive people, including phishing or disguising links and addresses;</li>
              <li>avoid spam, moderation or content filters on other platforms;</li>
              <li>harass, threaten or harm others, or break any law.</li>
            </ul>
            <p>You are responsible for following the rules of any app or website where you paste the text.</p>
          </AccordionItem>

          <AccordionItem icon={AlertTriangle} title="Disclaimer">
            <p>
              Styled text is not a real font and may affect accessibility and search. Please check the result before you
              rely on it. The site links to external resources, such as the Unicode Consortium, and we are not responsible
              for their content. Read the full <Link href="/disclaimer">Disclaimer</Link>.
            </p>
          </AccordionItem>

          <AccordionItem icon={Scale} title="Limitation of Liability">
            <p>
              To the fullest extent allowed by law, the site owner is not liable for any indirect, incidental or
              consequential loss arising from your use of the site or of text produced with it, including problems caused
              when another platform rejects, alters or misreads that text. Some jurisdictions do not allow certain
              limitations, so parts of this section may not apply to you.
            </p>
          </AccordionItem>

          <AccordionItem icon={Pencil} title="Changes to Terms">
            <p>
              We may update these terms. The date at the top shows when they last changed. Continuing to use the site after
              a change means you accept the updated terms. Questions? Visit the <Link href="/contact">contact page</Link>.
            </p>
          </AccordionItem>
        </Accordion>
      </div>
    </InfoPage>
  );
}
