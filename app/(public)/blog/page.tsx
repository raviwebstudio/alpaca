import type { Metadata } from "next";
import { BlogCard } from "@/components/storefront/blog-card";
import { SectionHeading } from "@/components/storefront/section-heading";
import { blogPosts } from "@/lib/storefront";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Read ALPACA's journal on fabric, fit, modern uniforms, and wardrobe movement.",
};

export default function BlogPage() {
  return (
    <div className="shell section-space space-y-12">
      <SectionHeading
        eyebrow="Journal"
        title="Notes on movement, fabric, and sharper everyday dressing."
        description="Stories and guidance from the ALPACA studio on building a quieter wardrobe with stronger fundamentals."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
