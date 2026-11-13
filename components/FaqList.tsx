import type { Faq } from "@/types/content";

export default function FaqList({ faqs, headingLevel = "h3" }: { faqs: Faq[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="divide-y divide-line rounded-[var(--radius-card)] border border-line bg-surface">
      {faqs.map((f) => (
        <details key={f.question} className="group p-4 sm:p-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <Heading className="text-base font-semibold text-ink">{f.question}</Heading>
            <span aria-hidden="true" className="mt-0.5 text-lg leading-none text-muted transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 leading-relaxed text-[#3a3631]">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
