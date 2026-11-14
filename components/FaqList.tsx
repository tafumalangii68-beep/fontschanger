import { CircleHelp } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/Accordion";
import type { Faq } from "@/types/content";

export default function FaqList({
  faqs,
  headingLevel = "h3",
  openFirst = false,
}: {
  faqs: Faq[];
  headingLevel?: "h2" | "h3";
  openFirst?: boolean;
}) {
  return (
    <Accordion>
      {faqs.map((f, i) => (
        <AccordionItem key={f.question} icon={CircleHelp} title={f.question} headingLevel={headingLevel} defaultOpen={openFirst && i === 0}>
          <p>{f.answer}</p>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
