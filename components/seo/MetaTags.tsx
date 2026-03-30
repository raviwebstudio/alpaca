import Head from "next/head";

type Schema =
  | Record<string, unknown>
  | Array<Record<string, unknown>>
  | undefined;

export interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "product" | "article";
  schema?: Schema;
  children?: React.ReactNode;
}

export function MetaTags({
  title,
  description,
  image,
  url,
  type = "website",
  schema,
  children,
}: MetaTagsProps) {
  const pageTitle = `${title} | ALPACA`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      {image ? <meta property="og:image" content={image} /> : null}
      {url ? <meta property="og:url" content={url} /> : null}
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}
      {url ? <link rel="canonical" href={url} /> : null}
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
      {children}
    </Head>
  );
}
