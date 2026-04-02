"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { CheckoutProgress } from "@/components/storefront/checkout-progress";
import { formatPrice } from "@/lib/storefront";
import { useCart } from "@/components/storefront/cart-provider";

export function SuccessPage() {
  const router = useRouter();
  const { hydrated, lastOrder, clearLastOrder } = useCart();

  useEffect(() => {
    if (hydrated && !lastOrder) {
      router.replace("/cart");
    }
  }, [hydrated, lastOrder, router]);

  if (!hydrated) {
    return (
      <section className="shell section-space">
        <div className="surface-card rounded-[32px] p-8 text-center">
          <p className="eyebrow">Order</p>
          <h1 className="mt-4 text-4xl text-dark sm:text-5xl">Confirming your order.</h1>
        </div>
      </section>
    );
  }

  if (!lastOrder) {
    return null;
  }

  return (
    <section className="shell section-space space-y-8">
      <CheckoutProgress current="success" />

      <div className="surface-card rounded-[36px] p-8 sm:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#F0E7DD] text-dark">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <p className="eyebrow mt-6">Order confirmed</p>
          <h1 className="mt-4 text-balance text-5xl text-dark sm:text-6xl">
            Your ALPACA order is placed.
          </h1>
          <p className="mt-4 text-base leading-7 text-text-secondary sm:text-lg">
            We are getting it ready now. Dispatch updates will follow shortly on your registered phone
            number.
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-text-secondary">
            Reference / {lastOrder.reference}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-line bg-[#F8F5F2] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
              Delivery details
            </p>
            <p className="mt-4 text-xl font-semibold text-dark">{lastOrder.address.name}</p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {lastOrder.address.address}, {lastOrder.address.city}, {lastOrder.address.state} -{" "}
              {lastOrder.address.pincode}
            </p>
            <p className="mt-1 text-sm text-text-secondary">{lastOrder.address.phone}</p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
              Payment
            </p>
            <p className="mt-2 text-sm text-dark">
              {lastOrder.paymentMethod === "netbanking"
                ? "Net banking"
                : lastOrder.paymentMethod.toUpperCase()}
            </p>
          </div>

          <div className="rounded-[28px] border border-line bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
              Order summary
            </p>
            <div className="mt-5 space-y-4">
              {lastOrder.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-dark">{item.title}</p>
                    <p className="mt-1 text-text-secondary">
                      {item.color} / {item.size} / Qty {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-dark">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3 border-t border-line pt-6 text-sm text-text-secondary">
              <div className="flex items-center justify-between">
                <span>Total paid</span>
                <span className="font-semibold text-dark">{formatPrice(lastOrder.total)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated delivery</span>
                <span className="font-semibold text-dark">2-4 business days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/shop"
            onClick={clearLastOrder}
            className="inline-flex items-center justify-center rounded-xl border border-dark bg-dark px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            onClick={clearLastOrder}
            className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-6 py-3.5 text-sm font-semibold text-dark transition hover:-translate-y-0.5 hover:border-dark"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
