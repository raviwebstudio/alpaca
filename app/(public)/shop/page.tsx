import type { Metadata } from "next";
import { ShopPageContent } from "@/components/storefront/shop-page-content";
import { normalizeProductCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse ALPACA's oversized tees, minimal basics, and outerwear with working category filters.",
};

type ShopPageProps = {
  searchParams: Promise<{
    category?: string | string[];
  }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const initialCategory = normalizeProductCategory(params.category);

  return <ShopPageContent initialCategory={initialCategory} />;
}
