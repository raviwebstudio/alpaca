"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Product, formatPrice, getCategoryLabel } from "@/lib/storefront";
import { useCart } from "@/components/storefront/cart-provider";

export function PurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!addedToCart) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setAddedToCart(false);
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [addedToCart]);

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor.toUpperCase(),
      colorHex: selectedColor,
    });
    setAddedToCart(true);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <div className="surface-card space-y-8 rounded-[32px] p-6 sm:p-8">
      <div className="space-y-4">
        <p className="eyebrow">{getCategoryLabel(product.category)}</p>
        <div className="space-y-3">
          <h1 className="text-balance text-4xl font-semibold text-dark sm:text-5xl">{product.title}</h1>
          <p className="max-w-xl text-base leading-7 text-text-secondary">{product.summary}</p>
          <p className="max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
            {product.description}
          </p>
        </div>
        <p className="text-3xl font-semibold text-dark">{formatPrice(product.price)}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-dark">Select Size</p>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  selectedSize === size
                    ? "border-dark bg-dark text-white"
                    : "border-line bg-white text-dark hover:-translate-y-0.5 hover:border-dark"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-dark">Color</p>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  selectedColor === color
                    ? "border-dark bg-white text-dark"
                    : "border-line bg-white/70 text-text-secondary hover:-translate-y-0.5 hover:border-dark"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: color }}
                />
                {color.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dark bg-dark px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95"
        >
          <ShoppingBag className="h-4 w-4" />
          {addedToCart ? "Added to Cart" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-3.5 text-sm font-semibold text-dark transition hover:-translate-y-0.5 hover:border-dark"
        >
          Buy Now
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="text-sm text-text-secondary">Ships in 2-4 days across India</p>
      </div>

      <div className="grid gap-4 border-t border-line pt-6 text-sm text-text-secondary sm:grid-cols-2">
        <div>
          <p className="font-semibold uppercase tracking-[0.24em] text-dark">Fit</p>
          <p className="mt-2 leading-6">{product.fit}</p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-[0.24em] text-dark">Material</p>
          <p className="mt-2 leading-6">{product.material}</p>
        </div>
      </div>
    </div>
  );
}
