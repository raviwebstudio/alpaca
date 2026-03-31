import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/lib/storefront";

type BlogDetailProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogDetailProps): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | ALPACA`,
      description: post.description,
      images: [post.coverImage],
      type: "article",
    },
  };
}

export default function BlogDetailPage({ params }: BlogDetailProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="shell section-space">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-6">
          <p className="eyebrow">{post.category}</p>
          <h1 className="text-balance text-5xl leading-[0.96] text-dark sm:text-6xl lg:text-7xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>{post.readingTime}</span>
          </div>
          <p className="max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
            {post.description}
          </p>
        </header>

        <div className="surface-card relative aspect-[16/9] overflow-hidden rounded-[36px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mx-auto max-w-3xl space-y-12">
          {post.sections.map((section) => (
            <section key={section.heading} className="space-y-5">
              <h2 className="text-balance text-4xl text-dark sm:text-5xl">{section.heading}</h2>
              <div className="space-y-5 text-base leading-8 text-text-secondary sm:text-lg">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
