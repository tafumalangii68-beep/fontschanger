"use client";

import { useState } from "react";
import { CircleHelp } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/Accordion";
import SearchInput from "@/components/SearchInput";
import type { Faq } from "@/types/content";

/** FAQ accordion with a live question filter. All answers are in the HTML on first load. */
export default function FaqSearch({ faqs }: { faqs: Faq[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  const matches = q
    ? faqs.filter((f) => {
        const hay = `${f.question} ${f.answer}`.toLowerCase();
        return words.every((w) => hay.includes(w));
      })
    : faqs;

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} label="Search questions" placeholder="Search questions…" size="lg" />
      <p className="mb-4 mt-3 text-sm text-muted" aria-live="polite">
        {q
          ? matches.length
            ? `${matches.length} matching ${matches.length === 1 ? "question" : "questions"}`
            : "No questions match. Try a different word, such as copy, privacy or Instagram."
          : `${faqs.length} questions`}
      </p>
      <Accordion>
        {matches.map((f, i) => (
          <AccordionItem key={f.question} icon={CircleHelp} title={f.question} defaultOpen={!q && i === 0}>
            <p>{f.answer}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
