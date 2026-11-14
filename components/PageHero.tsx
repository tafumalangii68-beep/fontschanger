import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import type { Crumb } from "@/lib/seo";

type Props = {
  crumbs: Crumb[];
  title: ReactNode;
  intro?: ReactNode;
  illustration?: ReactNode;
  /** Width of the illustration column; photos and 3D artwork need more room than icons. */
  illustrationClassName?: string;
  /** Extra content under the intro, such as a "last updated" line. */
  children?: ReactNode;
};

/** Lavender page header with breadcrumbs, H1, intro and an optional illustration. */
export default function PageHero({ crumbs, title, intro, illustration, illustrationClassName = "w-56 lg:w-64", children }: Props) {
  return (
    <section className="fc-hero-bg relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 size-[26rem] rounded-full fc-glow-shape opacity-90 blur-3xl"
      />
      <Container className="relative grid items-center gap-6 pb-8 pt-8 sm:pt-10 md:grid-cols-[1fr_auto] md:pb-10">
        <div className="max-w-2xl">
          <Breadcrumbs items={crumbs} />
          <h1 className="text-[2rem] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-[2.6rem]">{title}</h1>
          {intro && <div className="mt-3 text-lg leading-relaxed text-muted">{intro}</div>}
          {children}
        </div>
        {illustration && <div className={`hidden shrink-0 md:block ${illustrationClassName}`}>{illustration}</div>}
      </Container>
    </section>
  );
}
