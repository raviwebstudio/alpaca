"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart, type CartItem } from "@/components/storefront/cart-provider";

type CheckoutAddress = {
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  label: string;
};

type OrderResponse = {
  success: boolean;
  error?: string;
  razorpayOrderId?: string;
};

type SimulateResponse = {
  success: boolean;
  error?: string;
  paymentId?: string;
};

type VerifyResponse = {
  success: boolean;
  error?: string;
  orderId?: string;
  paymentId?: string;
};

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [address, setAddress] = useState<CheckoutAddress | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    const storedAddress = sessionStorage.getItem("alpaca_checkout_address");
    if (!storedAddress) {
      router.push("/checkout/address");
      return;
    }

    setAddress(JSON.parse(storedAddress) as CheckoutAddress);

    const storedCart = localStorage.getItem("alpaca_cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart) as CartItem[]);
    }
  }, [router]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : cartItems.length ? 99 : 0;
  const total = subtotal + shipping;

  const handleTestPayment = async () => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      const createRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, items: cartItems }),
      });
      const createData = (await createRes.json()) as OrderResponse;
      if (!createData.success) throw new Error(createData.error);

      const simRes = await fetch("/api/payments/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const simData = (await simRes.json()) as SimulateResponse;
      if (!simData.success) throw new Error(simData.error);

      const verifyRes = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpayOrderId: createData.razorpayOrderId,
          razorpayPaymentId: simData.paymentId,
          items: cartItems,
          amount: total,
          address,
        }),
      });
      const verifyData = (await verifyRes.json()) as VerifyResponse;
      if (!verifyData.success) throw new Error(verifyData.error);

      clearCart();
      localStorage.removeItem("alpaca_cart");
      window.dispatchEvent(new Event("storage"));
      router.push(`/checkout/success?orderId=${verifyData.orderId}&paymentId=${verifyData.paymentId}`);
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  if (!address) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
        <div className="animate-pulse text-sm text-stone-400">Loading checkout...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="border-b border-[#E0D8D0] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center gap-3 overflow-x-auto">
          {["Cart", "Address", "Payment", "Success"].map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                  index === 2
                    ? "bg-[#1C1917] text-white"
                    : index < 2
                      ? "bg-[#C8956C] text-white"
                      : "border border-[#E0D8D0] text-stone-400"
                }`}
              >
                {index < 2 ? "✓" : index + 1}
              </div>
              <span className={`text-sm ${index === 2 ? "font-medium text-[#1C1917]" : "text-stone-400"}`}>
                {step}
              </span>
              {index < 3 ? <div className="h-px w-8 bg-[#E0D8D0]" /> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl text-[#1C1917]">Order summary</h2>

          <div className="mb-6 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
                  {item.image ? (
                    <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-stone-800">{item.title}</p>
                  <p className="mt-0.5 text-xs text-stone-400">
                    {item.size} / {item.color}
                  </p>
                  <p className="text-xs text-stone-400">Qty: {item.quantity}</p>
                </div>
                <p className="whitespace-nowrap text-sm font-medium text-stone-800">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-start justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Delivering to</p>
              <Link href="/checkout/address" className="text-xs text-[#C8956C] hover:underline">
                Change
              </Link>
            </div>
            <p className="text-sm font-medium text-stone-800">
              {address.fullName} · {address.phone}
            </p>
            <p className="mt-1 text-xs text-stone-500">
              {address.line1}
              {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} - {address.pincode}
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-2xl text-[#1C1917]">Payment</h2>

          <div className="mb-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <span className="text-lg text-amber-500">⚡</span>
            <div>
              <p className="text-sm font-medium text-amber-800">Test Mode Active</p>
              <p className="mt-0.5 text-xs text-amber-700">
                No real payment will be processed. Click pay to simulate a successful order.
              </p>
            </div>
          </div>

          <div className="mb-5 space-y-3 rounded-xl bg-white p-5 shadow-sm">
            <div className="flex justify-between text-sm text-stone-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-600">
              <span>Shipping</span>
              <span className={shipping === 0 ? "font-medium text-green-600" : ""}>
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>
            {shipping > 0 ? (
              <p className="text-xs text-stone-400">
                Add ₹{(999 - subtotal).toLocaleString("en-IN")} more for free shipping
              </p>
            ) : null}
            <div className="flex justify-between border-t border-[#E0D8D0] pt-3 font-semibold text-stone-800">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTestPayment}
            disabled={isProcessing || cartItems.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1C1917] py-4 text-sm font-medium text-white transition-colors hover:bg-[#C8956C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing payment...
              </>
            ) : (
              <>🔒 Pay ₹{total.toLocaleString("en-IN")} - Test Mode</>
            )}
          </button>

          {paymentError ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">❌ {paymentError}</p>
              <p className="mt-1 text-xs text-red-400">Please try again.</p>
            </div>
          ) : null}

          <p className="mt-4 text-center text-xs text-stone-400">🔒 Secured by ALPACA · Test Environment</p>

          <Link href="/checkout/address" className="mt-3 block text-center text-sm text-stone-400 transition-colors hover:text-stone-600">
            ← Back to address
          </Link>
        </div>
      </div>
    </div>
  );
}
