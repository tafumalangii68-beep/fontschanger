import Link from "next/link";
import { Bug, Clock, Lightbulb, Mail, MessageCircle, Send, type LucideIcon } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import InfoPage from "@/components/InfoPage";
import { ContactIllustration } from "@/components/PageIllustrations";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Contact Us";
const description =
  "Contact Fonts Changer with questions, bug reports, font style suggestions or privacy requests.";

export const metadata = buildMetadata({ title, description, path: "/contact" });

function Info({ icon: Icon, title: t, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft">
        <Icon className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-bold text-ink">{t}</h3>
        <p className="mt-0.5 text-sm leading-relaxed text-muted">{children}</p>
      </div>
    </li>
  );
}

export default function ContactPage() {
  const email = siteConfig.contactEmail;
  return (
    <InfoPage
      title={title}
      description={description}
      path="/contact"
      schemaType="ContactPage"
      intro="Have a question, suggestion or feedback? We'd love to hear from you."
      illustration={<ContactIllustration className="w-full" />}
      prose={false}
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section aria-labelledby="form-heading" className="rounded-[1.5rem] border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-7">
          <h2 id="form-heading" className="mb-5 flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-ink">
            <Send className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
            Send Us a Message
          </h2>
          <ContactForm email={email} />
        </section>

        <aside aria-labelledby="touch-heading" className="rounded-[1.5rem] border border-line bg-surface p-5 shadow-sm sm:p-7">
          <h2 id="touch-heading" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-ink">
            <MessageCircle className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
            Get in Touch
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {email ? (
              <>
                Use the form or write to{" "}
                <a href={`mailto:${email}`} className="font-semibold text-accent underline underline-offset-2 dark:text-accent-strong">
                  {email}
                </a>
                .
              </>
            ) : (
              "A contact email address will be published here soon."
            )}
          </p>
          <ul className="mt-6 space-y-5">
            <Info icon={Clock} title="Response Time">
              We read every message. Replies can take a few days, and we cannot promise one for every request.
            </Info>
            <Info icon={Bug} title="Support">
              If a style shows boxes or question marks, tell us your device and app. Display problems usually depend on
              installed fonts.
            </Info>
            <Info icon={Lightbulb} title="Feedback">
              Share ideas for new font styles, decorations or features you would like to see.
            </Info>
            <Info icon={Mail} title="Privacy">
              Please do not send passwords or other sensitive information. See our{" "}
              <Link href="/privacy-policy" className="font-semibold text-accent hover:underline dark:text-accent-strong">
                Privacy Policy
              </Link>
              .
            </Info>
          </ul>
        </aside>
      </div>
      <p className="mt-8 text-muted">
        Looking for a quick answer? Many questions are covered in the{" "}
        <Link href="/faq" className="font-semibold text-accent hover:underline dark:text-accent-strong">
          FAQ
        </Link>
        .
      </p>
    </InfoPage>
  );
}
