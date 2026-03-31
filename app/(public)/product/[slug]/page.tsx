import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Truck, Undo2 } from "lucide-react";
import { ProductGallery } from "@/components/storefront/product-gallery";
import { ProductCard } from "@/components/storefront/product-card";
import { PurchasePanel } from "@/components/storefront/purchase-panel";
import { faqs, formatPrice, getProductBySlug, getRelatedProducts, products } from "@/lib/storefront";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ALPACA`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.slug, product.category);

  return (
    <div className="shell section-space space-y-16">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <ProductGallery images={product.images} alt={product.name} />
        <PurchasePanel product={product} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr_0.9fr]">
        <div className="surface-card rounded-[28px] p-6 sm:p-8">
          <p className="eyebrow">Description</p>
          <h2 className="mt-4 text-4xl text-dark">Built for repeat wear.</h2>
          <p className="mt-4 text-base leading-8 text-text-secondary sm:text-lg">
            {product.description}
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-text-secondary">
            {product.details.map((detail) => (
              <li key={detail} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-dark" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card rounded-[28px] p-6 sm:p-8">
          <p className="eyebrow">Delivery</p>
          <div className="mt-5 space-y-6">
            <div className="flex gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft">
                <Truck className="h-5 w-5 text-dark" />
              </span>
              <div>
                <h2 className="text-2xl text-dark">Fast dispatch</h2>
                <p className="mt-2 text-sm leading-7 text-text-secondary">
                  Ships within 48 hours for in-stock pieces. Complimentary delivery on orders above
                  ₹4,999.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft">
                <Undo2 className="h-5 w-5 text-dark" />
              </span>
              <div>
                <h2 className="text-2xl text-dark">Easy returns</h2>
                <p className="mt-2 text-sm leading-7 text-text-secondary">
                  Return eligible items within 7 days of delivery in original condition.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="surface-card rounded-[28px] p-6 sm:p-8">
          <p className="eyebrow">Product notes</p>
          <div className="mt-4 space-y-4">
            <div className="rounded-[24px] border border-line bg-background p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary">
                Fit profile
              </p>
              <p className="mt-2 text-sm leading-7 text-text-secondary">{product.fit}</p>
            </div>
            <div className="rounded-[24px] border border-line bg-background p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary">
                Material
              </p>
              <p className="mt-2 text-sm leading-7 text-text-secondary">{product.material}</p>
            </div>
            <div className="rounded-[24px] border border-line bg-background p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary">
                Price
              </p>
              <p className="mt-2 text-sm leading-7 text-text-secondary">{formatPrice(product.price)}</p>
            </div>
          </div>
        </div>
      </section>

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

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Similar products</p>
            <h2 className="mt-4 text-balance text-4xl text-dark sm:text-5xl">
              More in the same movement.
            </h2>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
