import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/storefront/product-card";
import { SectionHeading } from "@/components/storefront/section-heading";
import { categories, collections, products, sortProducts } from "@/lib/storefront";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse ALPACA's oversized tees, minimal basics, and new drops with thoughtful filters and clean premium presentation.",
};

type ShopPageProps = {
  searchParams?: {
    category?: string;
    size?: string;
    price?: string;
    sort?: string;
  };
};

const filterByPrice = (value: string | undefined, amount: number) => {
  if (!value) return true;
  if (value === "under-2500") return amount < 2500;
  if (value === "2500-4500") return amount >= 2500 && amount <= 4500;
  if (value === "4500-plus") return amount > 4500;
  return true;
};

export default function ShopPage({ searchParams }: ShopPageProps) {
  const category = searchParams?.category;
  const size = searchParams?.size;
  const price = searchParams?.price;
  const sort = searchParams?.sort;

  const filtered = sortProducts(
    products.filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesSize = size ? product.sizes.includes(size) : true;
      const matchesPrice = filterByPrice(price, product.price);
      return matchesCategory && matchesSize && matchesPrice;
    }),
    sort,
  );

  return (
    <section className="shell section-space">
      <div className="space-y-10">
        <SectionHeading
          eyebrow="Shop"
          title="Premium wardrobe essentials with room to breathe."
          description="Use the filters to narrow by category, sizing, or price, then sort the edit the way you prefer."
        />

        <div className="flex flex-wrap gap-3">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={collection.href}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-dark transition hover:-translate-y-0.5 hover:border-dark"
            >
              {collection.title}
            </Link>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="surface-card h-fit rounded-[32px] p-6 lg:sticky lg:top-28">
            <form className="grid gap-6">
              <div className="space-y-3">
                <label htmlFor="category" className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={category ?? ""}
                  className="w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-dark outline-none transition focus:border-dark"
                >
                  <option value="">All categories</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label htmlFor="size" className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary">
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  defaultValue={size ?? ""}
                  className="w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-dark outline-none transition focus:border-dark"
                >
                  <option value="">All sizes</option>
                  {["XS", "S", "M", "L", "XL"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label htmlFor="price" className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary">
                  Price
                </label>
                <select
                  id="price"
                  name="price"
                  defaultValue={price ?? ""}
                  className="w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-dark outline-none transition focus:border-dark"
                >
                  <option value="">All prices</option>
                  <option value="under-2500">Under ₹2,500</option>
                  <option value="2500-4500">₹2,500 to ₹4,500</option>
                  <option value="4500-plus">Above ₹4,500</option>
                </select>
              </div>

              <div className="space-y-3">
                <label htmlFor="sort" className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary">
                  Sort
                </label>
                <select
                  id="sort"
                  name="sort"
                  defaultValue={sort ?? ""}
                  className="w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-dark outline-none transition focus:border-dark"
                >
                  <option value="">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-dark bg-dark px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Apply filters
              </button>
              <Link
                href="/shop"
                className="text-center text-sm font-semibold text-text-secondary transition hover:text-dark"
              >
                Reset filters
              </Link>
            </form>
          </aside>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-text-secondary">
                Showing <span className="font-semibold text-dark">{filtered.length}</span> products
              </p>
            </div>

            {filtered.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="surface-card rounded-[32px] px-6 py-16 text-center sm:px-10">
                <h2 className="text-4xl text-dark sm:text-5xl">No products match those filters.</h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
                  Try broadening the category or size filters to see the full ALPACA edit again.
                </p>
                <Link
                  href="/shop"
                  className="mt-8 inline-flex rounded-full border border-dark bg-dark px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Reset shop view
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
