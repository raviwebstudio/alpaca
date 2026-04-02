"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Product, formatPrice, getCategoryLabel } from "@/lib/storefront";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Link href={`/product/${product.slug}`} className={clsx("block h-full min-w-0 w-full", className)}>
      <motion.article
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="group surface-card flex h-full min-w-0 w-full flex-col overflow-hidden rounded-[28px]"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 24vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.05]"
          />
          <div className="absolute left-4 top-4 flex gap-2">
            {product.bestSeller ? (
              <span className="rounded-full bg-white/88 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-dark">
                Best seller
              </span>
            ) : null}
            {product.newDrop ? (
              <span className="rounded-full bg-dark px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white">
                New
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col space-y-4 p-5">
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary/90">
              {getCategoryLabel(product.category)}
            </p>
            <h3 className="text-2xl text-dark">{product.title}</h3>
          </div>

          <p className="flex-1 min-w-0 text-sm leading-6 text-text-secondary">{product.summary}</p>

          <div className="flex items-center justify-between border-t border-line/70 pt-4">
            <span className="text-base font-semibold text-dark">{formatPrice(product.price)}</span>
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((color) => (
                <span
                  key={color}
                  className="h-3.5 w-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <span className="inline-flex w-fit text-sm font-medium text-dark transition border-dark bg-dark text-white rounded-xl border border-dark bg-dark px-4 py-3.5 group-hover:underline">
            View Product -&gt;
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
