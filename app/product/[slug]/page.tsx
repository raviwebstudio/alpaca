import type { Metadata } from "next";
import { ProductDetails, ProductFallback } from "@/components/ProductDetails";
import { getProductBySlug, products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product unavailable",
      description:
        "That ALPACA product is not available right now. Browse the shop to continue with an active product.",
    };
  }

  return {
    title: product.title,
    description: product.summary,
    openGraph: {
      title: `${product.title} | ALPACA`,
      description: product.summary,
      images: [product.images[0].src],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return <ProductFallback slug={slug} />;
  }

  return <ProductDetails product={product} />;
}
