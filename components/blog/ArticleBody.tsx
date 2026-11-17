import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

/** Building blocks for data-driven blog posts. Text supports **bold**, `code` and [links](/path). */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; glyph?: number[] }
  | { type: "code"; text: string }
  | { type: "callout"; title: string; text: string }
  | { type: "img"; src: StaticImageData; alt: string };

/** Turns the small inline syntax into React nodes. */
export function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={i++}>{m[1]}</strong>);
    else if (m[2]) out.push(<code key={i++}>{m[2]}</code>);
    else if (m[3] && m[4]) {
      const href = m[4];
      out.push(
        href.startsWith("/") ? (
          <Link key={i++} href={href}>
            {m[3]}
          </Link>
        ) : (
          <a key={i++} href={href}>
            {m[3]}
          </a>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const th = "px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-muted";
const td = "px-4 py-3 text-left align-top";

export default function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <>
      {blocks.map((b, k) => {
        switch (b.type) {
          case "img":
            return (
            <figure key={k} className="not-prose my-7">
              <Image
                src={b.src}
                alt={b.alt}
                placeholder="blur"
                sizes="(min-width: 800px) 768px, 100vw"
                className="h-auto w-full rounded-[1.25rem] border border-line shadow-[var(--shadow-card)]"
              />
            </figure>
          );
          case "p":
            return <p key={k}>{inline(b.text)}</p>;
          case "h2":
            return (
              <h2 key={k} id={b.id}>
                {b.text}
              </h2>
            );
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={k}>
                {b.items.map((it) => (
                  <li key={it.slice(0, 40)}>{inline(it)}</li>
                ))}
              </List>
            );
          }
          case "code":
            return (
              <pre key={k}>
                <code>{b.text}</code>
              </pre>
            );
          case "callout":
            return (
              <aside key={k} className="not-prose my-8 rounded-[var(--radius-card)] border border-accent/30 bg-accent-soft/60 p-5">
                <p className="flex items-center gap-2 font-bold text-ink">
                  <Lightbulb className="size-5 text-accent dark:text-accent-strong" aria-hidden="true" />
                  {b.title}
                </p>
                <p className="mt-2 leading-relaxed text-body">{inline(b.text)}</p>
              </aside>
            );
          case "table":
            return (
              <div key={k} className="not-prose my-6 overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
                <table className="w-full min-w-[30rem] text-sm">
                  <thead className="bg-accent-soft/60">
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col" className={th}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-body">
                    {b.rows.map((r) => (
                      <tr key={r.join("|")}>
                        {r.map((c, ci) => (
                          <td key={ci} className={`${td} ${b.glyph?.includes(ci) ? "glyph text-lg text-ink" : ""} ${ci === 0 ? "font-semibold text-ink" : ""}`}>
                            {inline(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </>
  );
}
