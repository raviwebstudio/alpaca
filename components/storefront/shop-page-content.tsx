"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/storefront/product-card";
import { SectionHeading } from "@/components/storefront/section-heading";
import { categoryOptions, products, type ProductCategory } from "@/data/products";
import { collections } from "@/lib/storefront";

type ShopPageContentProps = {
  initialCategory: ProductCategory | "all";
};

export function ShopPageContent({ initialCategory }: ShopPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">(initialCategory);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") {
      return true;
    }

    return product.category === selectedCategory;
  });

  return (
    <section className="shell section-space">
      <div className="space-y-10">
        <SectionHeading
          eyebrow="Shop"
          title="Premium wardrobe essentials with room to breathe."
          description="Browse the full catalog or filter by category to view the products that match."
        />

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              selectedCategory === "all"
                ? "border-dark bg-dark text-white"
                : "border-line bg-white text-dark hover:-translate-y-0.5 hover:border-dark"
            }`}
          >
            All products
          </button>
          {collections.map((collection) => (
            <button
              key={collection.slug}
              type="button"
              onClick={() => setSelectedCategory(collection.slug as ProductCategory)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === collection.slug
                  ? "border-dark bg-dark text-white"
                  : "border-line bg-white text-dark hover:-translate-y-0.5 hover:border-dark"
              }`}
            >
              {collection.title}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="surface-card h-fit rounded-[32px] p-6 lg:sticky lg:top-28">
            <div className="space-y-6">
              <div className="space-y-3">
                <label
                  htmlFor="category"
                  className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | "all")}
                  className="w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-dark outline-none transition focus:border-dark"
                >
                  <option value="all">All categories</option>
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className="inline-flex items-center justify-center rounded-full border border-dark bg-dark px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Reset filters
              </button>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-text-secondary">
                Showing <span className="font-semibold text-dark">{filteredProducts.length}</span>{" "}
                products
              </p>
            </div>

            {filteredProducts.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="surface-card rounded-[32px] px-6 py-16 text-center sm:px-10">
                <h2 className="text-4xl text-dark sm:text-5xl">No products match that category.</h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
                  Reset the category filter to view the full product range again.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="mt-8 inline-flex rounded-full border border-dark bg-dark px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Reset shop view
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
