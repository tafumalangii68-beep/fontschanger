type Props = { data: Record<string, unknown> | Record<string, unknown>[] };

/** Renders Schema.org structured data. Content is built from our own static data. */
export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
