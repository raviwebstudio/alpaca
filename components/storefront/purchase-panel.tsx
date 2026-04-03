"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { getCategoryLabel, type Product } from "@/data/products";
import { useCart } from "@/components/storefront/cart-provider";
import { formatPrice } from "@/lib/storefront";

export function PurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.hex ?? "");
  const [quantity] = useState(1);
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

  const handleAddCurrentItem = () => {
    const color = product.colors.find((entry) => entry.hex === selectedColor) ?? product.colors[0];

    if (!color || !selectedSize) {
      return false;
    }

    addToCart({
      productId: product.id,
      sellerId: product.seller.id,
      sellerName: product.seller.name,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0].src,
      size: selectedSize,
      color: color.name,
      colorHex: color.hex,
      quantity,
    });
    setAddedToCart(true);

    return true;
  };

  const handleAddToCart = () => {
    handleAddCurrentItem();
  };

  const handleBuyNow = () => {
    if (!handleAddCurrentItem()) {
      return;
    }

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
        <p className="text-sm text-text-secondary">
          Sold by {product.seller.name} / {product.shippingLeadTime}
        </p>
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
                key={color.hex}
                type="button"
                onClick={() => setSelectedColor(color.hex)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  selectedColor === color.hex
                    ? "border-dark bg-white text-dark"
                    : "border-line bg-white/70 text-text-secondary hover:-translate-y-0.5 hover:border-dark"
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

      <div className="grid gap-3">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleAddToCart();
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dark bg-dark px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95"
        >
          <ShoppingBag className="h-4 w-4" />
          {addedToCart ? "Added to Cart" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleBuyNow();
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-3.5 text-sm font-semibold text-dark transition hover:-translate-y-0.5 hover:border-dark"
        >
          Buy Now
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="text-sm text-text-secondary">
          Next step: review your cart, then enter address and payment details.
        </p>
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

      <div className="rounded-[24px] border border-line bg-background/80 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-text-secondary">
          How checkout works
        </p>
        <ol className="mt-4 space-y-2 text-sm leading-6 text-text-secondary">
          <li>1. Choose your size and color.</li>
          <li>2. Add the product to cart or continue straight to cart.</li>
          <li>3. Confirm address and payment on the next screens.</li>
        </ol>
      </div>
    </div>
  );
}
