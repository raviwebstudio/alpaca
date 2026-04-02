"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ProductCard } from "@/components/storefront/product-card";
import { SectionHeading } from "@/components/storefront/section-heading";
import { FadeIn } from "@/components/storefront/fade-in";
import { productCategories, products, productSizes, type ProductCategory } from "@/data/products";
import { categoryLabels } from "@/lib/storefront";

type Filters = {
  category: ProductCategory | "all";
  size: string;
};

type ShopPageContentProps = {
  initialFilters: Filters;
};

export function ShopPageContent({ initialFilters }: ShopPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [filters, setFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const categories = ["all", ...productCategories] as const;
  const sizes = ["all", ...productSizes];

  const updateFilters = (nextFilters: Filters) => {
    setFilters(nextFilters);

    startTransition(() => {
      const params = new URLSearchParams();

      if (nextFilters.category !== "all") {
        params.set("category", nextFilters.category);
      }

      if (nextFilters.size !== "all") {
        params.set("size", nextFilters.size);
      }

      const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(nextUrl, { scroll: false });
    });
  };

  const filteredProducts = products.filter((product) => {
    return (
      (filters.category === "all" || product.category === filters.category) &&
      (filters.size === "all" || product.sizes.includes(filters.size))
    );
  });

  return (
    <section className="shell section-space">
      <div className="space-y-10">
        <FadeIn>
          <SectionHeading
            eyebrow="Shop"
            title="Premium wardrobe essentials with room to breathe."
            description="Filter by category and size to narrow the catalog, then open any product for details and checkout."
          />
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const active = filters.category === category;
              const label = category === "all" ? "All products" : categoryLabels[category];

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => updateFilters({ ...filters, category })}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-dark bg-dark text-white"
                      : "border-line bg-white text-dark hover:-translate-y-0.5 hover:border-dark"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <FadeIn delay={0.1}>
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
                    value={filters.category}
                    onChange={(e) =>
                      updateFilters({
                        ...filters,
                        category: e.target.value as ProductCategory | "all",
                      })
                    }
                    className="w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-dark outline-none transition focus:border-dark"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All categories" : categoryLabels[category]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="size"
                    className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary"
                  >
                    Size
                  </label>
                  <select
                    id="size"
                    value={filters.size}
                    onChange={(e) => updateFilters({ ...filters, size: e.target.value })}
                    className="w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-dark outline-none transition focus:border-dark"
                  >
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size === "all" ? "All sizes" : size}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => updateFilters({ category: "all", size: "all" })}
                  className="inline-flex items-center justify-center rounded-full border border-dark bg-dark px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Reset filters
                </button>
              </div>
            </aside>
          </FadeIn>

          <FadeIn delay={0.15} className="min-w-0">
            <div className="space-y-6 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-text-secondary">
                  Showing <span className="font-semibold text-dark">{filteredProducts.length}</span>{" "}
                  products
                </p>
                <p className="text-sm text-text-secondary">
                  {isPending ? "Updating filters..." : "Pick a product to view details"}
                </p>
              </div>

              {filteredProducts.length ? (
                <div className="grid min-w-0 gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product, index) => (
                    <FadeIn key={product.id} delay={0.02 * index}>
                      <ProductCard product={product} />
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <div className="surface-card rounded-[32px] px-6 py-16 text-center sm:px-10">
                  <h2 className="text-4xl text-dark sm:text-5xl">No products match those filters.</h2>
                  <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
                    Try broadening the category or size filter to see the full collection again.
                  </p>
                  <button
                    type="button"
                    onClick={() => updateFilters({ category: "all", size: "all" })}
                    className="mt-8 inline-flex rounded-full border border-dark bg-dark px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    Reset shop view
                  </button>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
