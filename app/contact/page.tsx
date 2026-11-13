import ContactForm from "@/components/ContactForm";
import InfoPage from "@/components/InfoPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Contact Us";
const description = "How to contact Fonts Changer with questions, bug reports, style suggestions or privacy requests.";

export const metadata = buildMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  const email = siteConfig.contactEmail;
  return (
    <InfoPage title={title} description={description} path="/contact">
      <p>
        You can contact us about bug reports, styles that display incorrectly, ideas for new styles, privacy questions or
        anything else related to this website.
      </p>

      {email ? (
        <>
          <h2>Email</h2>
          <p>
            Write to <a href={`mailto:${email}`}>{email}</a>. We read every message, but we cannot promise a reply time.
          </p>
          <h2>Write a message</h2>
          <p>
            Fill in the form below to open a ready-made email in your own email app. This website does not send or store
            the message.
          </p>
          <div className="not-prose">
            <ContactForm email={email} />
          </div>
        </>
      ) : (
        <div className="rounded-[var(--radius-card)] border border-line bg-sand p-5">
          <p>
            <strong>Contact email coming soon.</strong> The site owner has not published a contact address yet. Please
            check back later.
          </p>
        </div>
      )}

      <h2>Before you write</h2>
      <ul>
        <li>
          If a style shows boxes or question marks, please mention your device and app. Display problems usually depend
          on the fonts installed on a device.
        </li>
        <li>Please do not send passwords or other sensitive personal information by email.</li>
      </ul>
    </InfoPage>
  );
}
