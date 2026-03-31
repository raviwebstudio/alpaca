"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Product, formatPrice } from "@/lib/storefront";
import { useCart } from "@/components/storefront/cart-provider";

export function PurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? product.colors[0]);

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      title: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="surface-card space-y-8 p-6 sm:p-8">
      <div className="space-y-4">
        <p className="eyebrow">{product.category}</p>
        <div className="space-y-3">
          <h1 className="text-balance text-5xl text-dark sm:text-6xl">{product.name}</h1>
          <p className="max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
            {product.description}
          </p>
        </div>
        <p className="text-2xl font-semibold text-dark">{formatPrice(product.price)}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary">
            Select size
          </p>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  selectedSize === size
                    ? "border-dark bg-dark text-white"
                    : "border-line bg-white text-dark hover:border-dark"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary">
            Select color
          </p>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  selectedColor.name === color.name
                    ? "border-dark bg-white text-dark"
                    : "border-line bg-white/70 text-text-secondary hover:border-dark"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-dark bg-dark px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to cart
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-dark transition hover:-translate-y-0.5 hover:border-dark"
        >
          Buy now
          <ArrowRight className="h-4 w-4" />
        </button>
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
