import type { ReactNode } from "react";

export default function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
      {children && <div className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>}
    </header>
  );
}
