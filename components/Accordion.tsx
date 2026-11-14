import type { ReactNode } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";

type ItemProps = {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  headingLevel?: "h2" | "h3";
  id?: string;
};

/**
 * Expandable section built on <details>, so the content is in the HTML for
 * search engines and works with the keyboard and without JavaScript.
 */
export function AccordionItem({ icon: Icon, title, children, defaultOpen, headingLevel = "h2", id }: ItemProps) {
  const Heading = headingLevel;
  return (
    <details
      id={id}
      open={defaultOpen}
      className="fc-accordion group scroll-mt-24 rounded-[var(--radius-card)] border border-line bg-surface shadow-sm transition-colors open:border-accent/40 open:shadow-[var(--shadow-card)]"
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-[var(--radius-card)] px-4 py-3.5 transition-colors hover:bg-accent-soft/50 group-open:bg-accent-soft/60 sm:px-5 [&::-webkit-details-marker]:hidden">
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-accent/30 bg-surface text-accent dark:text-accent-strong">
          <Icon className="size-[1.1rem]" aria-hidden="true" />
        </span>
        <Heading className="flex-1 text-base font-bold text-ink sm:text-[1.05rem]">{title}</Heading>
        <ChevronDown className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="prose-fc px-4 pb-5 pt-3 text-base sm:px-5 sm:pl-[4.25rem]">{children}</div>
    </details>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}
