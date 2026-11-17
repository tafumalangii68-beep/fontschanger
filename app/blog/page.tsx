import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import Artwork from "@/components/Artwork";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { BLOG_POSTS, formatPostDate } from "@/data/blog";
import { ART } from "@/lib/art";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";

const title = "Blog: Fancy Text, Fonts and Unicode Explained";
const description =
  "Guides from Fonts Changer about fancy text, copy-and-paste fonts and Unicode: how they work, where to use them and what to watch out for.";
const path = "/blog";

export const metadata = buildMetadata({ title, description, path });

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(title, description, path, "CollectionPage"),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: BLOG_POSTS.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/blog/${p.slug}`),
              name: p.title,
            })),
          },
        ]}
      />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path },
        ]}
        title="Fonts Changer Blog"
        intro="Simple guides about fancy text, copy-and-paste fonts and the Unicode characters behind them."
        illustration={<Artwork art={ART.fontStyles} sizes="(min-width: 1024px) 336px, 288px" />}
        illustrationClassName="w-72 lg:w-[21rem]"
      />
      <Container className="pt-6">
        <ul className="grid gap-5 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[var(--shadow-card)]"
              >
                {/* The card title describes the post, so the cover is decorative here. */}
                {post.cover && (
                  <Image
                    src={post.cover}
                    alt=""
                    placeholder="blur"
                    sizes="(min-width: 768px) 540px, 100vw"
                    className="mb-5 h-auto w-full rounded-xl"
                  />
                )}
                <span className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent dark:text-accent-strong">
                      {tag}
                    </span>
                  ))}
                </span>
                <h2 className="mt-4 text-xl font-extrabold leading-snug tracking-tight text-ink group-hover:text-accent dark:group-hover:text-accent-strong">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{post.description}</p>
                <span className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    <time dateTime={post.published}>{formatPostDate(post.published)}</time>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" aria-hidden="true" />
                    {post.readingMinutes} min read
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 font-semibold text-accent dark:text-accent-strong">
                    Read article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
