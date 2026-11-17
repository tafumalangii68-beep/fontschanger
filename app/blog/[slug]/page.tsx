import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, UserRound, WandSparkles } from "lucide-react";
import ArticleBody from "@/components/blog/ArticleBody";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { BLOG_POSTS, formatPostDate, getPost } from "@/data/blog";
import { blogPostingJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

type Params = { slug: string };

export const dynamicParams = false;

/** Posts with their own folder (custom layout) are excluded; those routes take priority anyway. */
export function generateStaticParams(): Params[] {
  return BLOG_POSTS.filter((p) => p.body).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const post = getPost((await params).slug);
  if (!post?.body) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    absoluteTitle: true,
    image: post.shareImage ? { url: post.shareImage, width: 1200, height: 630, alt: post.coverAlt ?? post.title } : undefined,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const post = getPost((await params).slug);
  if (!post?.body) notFound();
  const path = `/blog/${post.slug}`;
  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={blogPostingJsonLd({
          title: post.title,
          description: post.description,
          path,
          published: post.published,
          updated: post.updated,
          author: siteConfig.author,
          image: post.shareImage,
        })}
      />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ]}
        title={post.title}
        intro={post.description}
      >
        <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="size-4" aria-hidden="true" />
            By <span className="font-semibold text-ink">{siteConfig.author}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden="true" />
            <time dateTime={post.published}>{formatPostDate(post.published)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden="true" />
            {post.readingMinutes} min read
          </span>
        </p>
      </PageHero>

      <Container className="pt-6">
        <article className="prose-fc max-w-3xl">
          {post.cover && (
            <figure className="not-prose my-7">
              <Image
                src={post.cover}
                alt={post.coverAlt ?? ""}
                placeholder="blur"
                priority
                sizes="(min-width: 800px) 768px, 100vw"
                className="h-auto w-full rounded-[1.25rem] border border-line shadow-[var(--shadow-card)]"
              />
            </figure>
          )}
          <ArticleBody blocks={post.body} />
        </article>

        <aside className="mt-10 max-w-3xl rounded-[1.5rem] bg-navy p-6 text-white sm:p-8">
          <p className="flex items-center gap-2 text-xl font-extrabold">
            <WandSparkles className="size-5 text-[#c4abff]" aria-hidden="true" />
            Try it yourself
          </p>
          <p className="mt-2 text-white/80">Type your name and see it in every style at once. It all runs in your browser.</p>
          <Link href="/" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white transition-colors hover:bg-[#7a45f0]">
            Open the font generator
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </aside>

        <nav aria-labelledby="keep-reading" className="mt-10 max-w-3xl">
          <h2 id="keep-reading" className="text-lg font-bold text-ink">
            Keep reading
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 font-semibold text-ink shadow-sm transition-colors hover:border-accent"
                >
                  {p.title}
                  <ArrowRight className="size-4 shrink-0 text-muted group-hover:text-accent" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </>
  );
}
