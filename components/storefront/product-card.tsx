import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { Product, formatPrice, getCategoryLabel } from "@/lib/storefront";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={clsx(
        "group surface-card flex h-full flex-col overflow-hidden rounded-[28px] transition duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-premium",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.08]"
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

      <div className="flex flex-1 flex-col space-y-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary/90">
              {getCategoryLabel(product.category)}
            </p>
            <h3 className="text-2xl text-dark">{product.title}</h3>
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 text-text-secondary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-dark" />
        </div>
        <p className="flex-1 text-sm leading-6 text-text-secondary">{product.summary}</p>
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
      </div>
    </Link>
  );
}
