import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { BlogCard } from "@/components/storefront/blog-card";
import { ProductCard } from "@/components/storefront/product-card";
import { SectionHeading } from "@/components/storefront/section-heading";
import { blogPosts, collections, metrics, products, reasons } from "@/lib/storefront";

export const metadata: Metadata = {
  title: "MADE FOR THE MOVE",
  description:
    "Discover ALPACA's premium essentials, oversized t-shirts, printed  t-shirts, minimal basics, and editorial new drops in a refined fashion storefront.",
};

const bestSellers = products.filter((product) => product.bestSeller).slice(0, 4);

const whyAlpaca = [
  { title: "Soft dispatch", copy: "Fast prepaid fulfillment with careful finishing.", icon: Truck },
  { title: "Verified quality", copy: "Construction-first fabrics and quiet detail.", icon: ShieldCheck },
  { title: "Curated edits", copy: "Intentional releases instead of crowded choice.", icon: Sparkles },
  { title: "Move-ready", copy: "Made to travel from work, city, and weekend plans.", icon: PackageCheck },
];

export default function HomePage() {
  return (
    <>
      <section className="shell section-space grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="eyebrow">ALPACA</p>
            <h1 className="max-w-4xl text-balance text-[3.8rem] leading-[0.94] text-dark sm:text-[5.4rem] lg:text-[5rem]">
              MADE FOR
              <br />
              THE MOVE.
            </h1>
            <p className="max-w-xl text-base leading-7 text-text-secondary sm:text-md">
              Premium essentials shaped for momentum: oversized silhouettes, refined basics, and
              clean layers for every part of the day.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-dark bg-dark px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-dark transition hover:-translate-y-0.5 hover:border-dark"
            >
              Brand story
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {metrics.map((item) => (
              <div key={item.label} className="surface-card rounded-[24px] p-5">
                <p className="text-3xl text-dark">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-10 hidden h-28 w-28 rounded-full bg-accent/15 blur-3xl sm:block" />
          <div className="surface-card relative overflow-hidden rounded-[36px] bg-surface-muted p-4 shadow-premium">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
              <Image
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80"
                alt="ALPACA lookbook lifestyle frame"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-dark/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/80">New Launch</p>
                  <p className="mt-2 max-w-xs text-2xl">Quiet layers for city movement.</p>
                </div>
                <Link
                  href="/shop?category=New%20Drops"
                  className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur"
                >
                  New drops
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section-space pt-0">
        <SectionHeading
          eyebrow="Best sellers"
          title="The pieces customers keep returning to."
          description="Foundational silhouettes with premium weight, soft structure, and everyday versatility."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="shell section-space pt-0">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured collections"
            title="A tighter, cleaner way to shop the wardrobe."
            description="Three entry points into the ALPACA edit: oversized staples, essential layers, and fresh drops."
          />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <Link
              key={collection.slug}
              href={collection.href}
              className={`group surface-card overflow-hidden rounded-[28px] transition duration-500 hover:-translate-y-1 hover:shadow-premium ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className={`grid h-full ${index === 0 ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
                <div className="space-y-4 p-6 sm:p-8">
                  <p className="eyebrow">{collection.label}</p>
                  <h3 className="text-balance text-4xl text-dark sm:text-5xl">{collection.title}</h3>
                  <p className="max-w-md text-base leading-7 text-text-secondary">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-dark">
                    Explore collection
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="relative min-h-[320px] overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell section-space pt-0">
        <div className="surface-card rounded-[36px] p-8 sm:p-12 lg:p-16">
          <p className="eyebrow">Brand statement</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h2 className="text-balance text-5xl leading-[0.96] text-dark sm:text-6xl lg:text-7xl">
              Clothes should make movement feel easier, not louder.
            </h2>
            <p className="max-w-xl text-base leading-8 text-text-secondary sm:text-lg">
              ALPACA builds a quieter wardrobe with elevated fabric, measured proportion, and
              enough softness to move from commute to evening without changing character.
            </p>
          </div>
        </div>
      </section>

      <section className="shell section-space pt-0">
        <div className="surface-card relative overflow-hidden rounded-[36px]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5 p-8 sm:p-12 lg:p-16">
              <p className="eyebrow">Lifestyle edit</p>
              <h2 className="text-balance text-5xl text-dark sm:text-6xl">
                Dressed for a long day, not a single moment.
              </h2>
              <p className="max-w-xl text-base leading-8 text-text-secondary sm:text-lg">
                The ALPACA wardrobe is designed around repeat wear, tonal layering, and that rare
                feeling where comfort and presence stop competing.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {reasons.slice(0, 2).map((reason) => (
                  <div key={reason.title} className="rounded-[24px] border border-line bg-background/80 p-5">
                    <h3 className="text-2xl text-dark">{reason.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{reason.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80"
                alt="ALPACA lifestyle story"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="shell section-space pt-0">
        <SectionHeading
          eyebrow="Why ALPACA"
          title="Minimal does not mean empty. It means every detail matters."
          description="The design language stays quiet so fabric, fit, and finishing can speak clearly."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {whyAlpaca.map((item) => (
            <div key={item.title} className="surface-card rounded-[28px] p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-dark">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-3xl text-dark">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell section-space pt-0">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Journal"
            title="Stories behind the wardrobe."
            description="Thoughts on fabric, proportion, movement, and building a sharper daily uniform."
          />
          <Link href="/blog" className="hidden text-sm font-semibold text-dark md:block">
            View all posts
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* <section className="shell section-space pt-0">
        <div className="surface-card rounded-[36px] px-6 py-14 sm:px-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-4">
              <p className="eyebrow">Newsletter</p>
              <h2 className="text-balance text-5xl text-dark sm:text-6xl">
                Keep up with new drops and quiet wardrobe notes.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                Join the ALPACA list for launch alerts, fabric stories, and early access to limited
                capsule releases.
              </p>
            </div>
            <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Email address"
                className="min-h-[54px] flex-1 rounded-full border border-line bg-background px-5 text-sm text-dark outline-none transition focus:border-dark"
              />
              <button
                type="submit"
                className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-dark bg-dark px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Join the list
              </button>
            </form>
          </div>
        </div>
      </section> */}
    </>
  );
}
