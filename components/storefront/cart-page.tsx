"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/storefront/cart-provider";
import { formatPrice } from "@/lib/storefront";

export function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const shipping = subtotal >= 4999 ? 0 : items.length ? 249 : 0;
  const total = subtotal + shipping;

  if (!items.length) {
    return (
      <section className="shell section-space">
        <div className="surface-card rounded-[32px] px-6 py-16 text-center sm:px-10">
          <p className="eyebrow">Your cart</p>
          <h1 className="mt-4 text-5xl text-dark sm:text-6xl">Nothing here yet.</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
            Start with the pieces that move the most: heavyweight tees, refined basics, and the
            latest drops.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-full border border-dark bg-dark px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="shell section-space grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="surface-card grid gap-5 rounded-[28px] p-5 sm:grid-cols-[160px_1fr]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-muted">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl text-dark">{item.title}</h2>
                    <p className="text-sm text-text-secondary">
                      Size {item.size} · {item.color}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-dark">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="h-4 w-4 rounded-full border border-black/10"
                    style={{ backgroundColor: item.colorHex }}
                  />
                  <span className="text-sm text-text-secondary">{item.color}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center rounded-full border border-line bg-background p-1">
                  <button
                    type="button"
                    aria-label={`Decrease quantity for ${item.title}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-dark transition hover:bg-white"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-10 text-center text-sm font-semibold text-dark">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase quantity for ${item.title}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-dark transition hover:bg-white"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition hover:text-dark"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="surface-card h-fit rounded-[32px] p-6 sm:p-8 lg:sticky lg:top-28">
        <p className="eyebrow">Order summary</p>
        <div className="mt-6 space-y-4 text-sm text-text-secondary">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-dark">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-dark">
              {shipping === 0 ? "Free" : formatPrice(shipping)}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-line pt-4">
            <span className="text-base font-semibold text-dark">Total</span>
            <span className="text-base font-semibold text-dark">{formatPrice(total)}</span>
          </div>
        </div>

        <Link
          href="/checkout"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-dark bg-dark px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          Proceed to checkout
        </Link>
        <p className="mt-4 text-sm leading-6 text-text-secondary">
          Complimentary shipping unlocks automatically on orders above ₹4,999.
        </p>
      </aside>
    </section>
  );
}
