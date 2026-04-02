import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { ProductCarousel } from "@/components/storefront/product-carousel";
import { ProductGallery } from "@/components/storefront/product-gallery";
import { PurchasePanel } from "@/components/storefront/purchase-panel";
import { products } from "@/data/products";
import { faqs, formatPrice, getRelatedProducts } from "@/lib/storefront";

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
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | ALPACA`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return notFound();
  }

  const related = getRelatedProducts(product.slug, product.category);
  const similarProducts = related.length
    ? related
    : products.filter((item) => item.slug !== product.slug).slice(0, 4);

  return (
    <div className="shell section-space space-y-16">
      <div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition hover:text-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>
      </div>

      <section className="grid gap-12 md:grid-cols-2">
        <ProductGallery images={product.images} alt={product.title} />
        <PurchasePanel product={product} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="surface-card rounded-[32px] p-6 sm:p-8">
          <p className="eyebrow">Description</p>
          <h2 className="mt-4 text-4xl text-dark sm:text-5xl">{product.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
            {product.description}
          </p>
        </div>

        <div className="space-y-6">
          <div className="surface-card rounded-[32px] p-6 sm:p-8">
            <p className="eyebrow">Available Sizes</p>
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
            <p className="eyebrow">Available Colors</p>
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
                  {color.toUpperCase()}
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
        <div className="mt-10">
          <ProductCarousel products={similarProducts} />
        </div>
      </section>
    </div>
  );
}
