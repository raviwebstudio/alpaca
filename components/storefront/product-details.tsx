import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { ProductGallery } from "@/components/storefront/product-gallery";
import { ProductCarousel } from "@/components/storefront/product-carousel";
import { PurchasePanel } from "@/components/storefront/purchase-panel";
import { FadeIn } from "@/components/storefront/fade-in";
import { type Product } from "@/data/products";
import { faqs, formatPrice, getColorLabel, getRelatedProducts, products } from "@/lib/storefront";

export function ProductDetails({ product }: { product: Product }) {
  const related = getRelatedProducts(product.slug, product.category);
  const similarProducts = related.length
    ? related
    : products.filter((item) => item.slug !== product.slug).slice(0, 4);

  return (
    <div className="shell section-space space-y-14">
      <FadeIn>
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition hover:text-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </Link>
        </div>
      </FadeIn>

      <FadeIn>
        <section className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="min-w-0">
            <ProductGallery images={product.images} alt={product.title} />
          </div>
          <div className="min-w-0">
            <PurchasePanel product={product} />
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <div className="surface-card rounded-[32px] p-6 sm:p-8">
            <p className="eyebrow">Description</p>
            <h2 className="mt-4 text-4xl text-dark sm:text-5xl">Built for repeat wear.</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
              {product.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="surface-card rounded-[32px] p-6 sm:p-8">
              <p className="eyebrow">Available sizes</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="rounded-xl border border-line bg-background px-4 py-2 text-sm font-semibold text-dark"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div className="surface-card rounded-[32px] p-6 sm:p-8">
              <p className="eyebrow">Available colors</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className="flex items-center gap-3 rounded-xl border border-line bg-background px-4 py-2.5 text-sm font-semibold text-dark"
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-black/10"
                      style={{ backgroundColor: color }}
                    />
                    {getColorLabel(color)}
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card rounded-[32px] p-6 sm:p-8">
              <p className="eyebrow">Delivery</p>
              <div className="mt-5 space-y-6">
                <div className="flex gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft">
                    <Truck className="h-5 w-5 text-dark" />
                  </span>
                  <div>
                    <h3 className="text-2xl text-dark">Fast dispatch</h3>
                    <p className="mt-2 text-sm leading-7 text-text-secondary">
                      Ships in 2-4 days across India. Complimentary delivery applies automatically on
                      higher-value orders.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft">
                    <ShieldCheck className="h-5 w-5 text-dark" />
                  </span>
                  <div>
                    <h3 className="text-2xl text-dark">Price</h3>
                    <p className="mt-2 text-sm leading-7 text-text-secondary">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="surface-card rounded-[32px] p-6 sm:p-8">
          <p className="eyebrow">FAQ</p>
          <div className="mt-5 divide-y divide-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="cursor-pointer list-none text-xl text-dark">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-text-secondary">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="min-w-0">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Similar products</p>
              <h2 className="mt-4 text-balance text-4xl text-dark sm:text-5xl">
                More in the same movement.
              </h2>
            </div>
          </div>
          <div className="mt-10 min-w-0">
            <ProductCarousel products={similarProducts} />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
