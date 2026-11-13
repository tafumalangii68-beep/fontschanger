import Link from "next/link";
import FaqList from "@/components/FaqList";
import InfoPage from "@/components/InfoPage";
import { generalFaqs, homeFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";

const title = "Frequently Asked Questions";
const description =
  "Answers about copy-and-paste fonts: whether they are real fonts, which apps support them, accessibility, privacy and why some characters show as boxes.";

export const metadata = buildMetadata({ title, description, path: "/faq" });

export default function FaqPage() {
  return (
    <InfoPage title={title} description={description} path="/faq">
      <p>
        Questions about how Unicode text styles work and where to use them. For questions about a specific style, see the{" "}
        <Link href="/fonts">font style pages</Link>.
      </p>
      <h2>About fancy text</h2>
      <div className="not-prose">
        <FaqList faqs={generalFaqs} />
      </div>
      <h2>Using the generator</h2>
      <div className="not-prose">
        <FaqList faqs={homeFaqs} />
      </div>
      <p>
        Still have a question? <Link href="/contact">Contact us</Link>.
      </p>
    </InfoPage>
  );
}
