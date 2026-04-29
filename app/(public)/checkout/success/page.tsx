"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") || "N/A";
  const paymentId = params.get("paymentId") || "N/A";
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`w-full max-w-md text-center transition-all duration-700 ${
        show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="mb-2 text-3xl text-[#1C1917]">Order Confirmed!</h1>
      <p className="mb-8 text-sm text-stone-500">
        Thank you for shopping with ALPACA. Your order is on its way.
      </p>

      <div className="mb-6 space-y-3 rounded-2xl bg-white p-6 text-left shadow-sm">
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-stone-500">Order ID</span>
          <span className="break-all font-mono text-xs text-stone-700">{orderId}</span>
        </div>
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-stone-500">Payment ID</span>
          <span className="break-all font-mono text-xs text-stone-700">{paymentId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Status</span>
          <span className="text-sm font-medium text-green-600">✓ Paid</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Estimated Delivery</span>
          <span className="font-medium text-stone-700">5-7 business days</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Mode</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">TEST ORDER</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/shop"
          className="w-full rounded-full bg-[#1C1917] py-3 text-sm font-medium text-white transition-colors hover:bg-[#C8956C]"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="w-full rounded-full border border-[#E0D8D0] py-3 text-sm font-medium text-stone-700 transition-colors hover:bg-[#F2EDE8]"
        >
          Back to Home
        </Link>
      </div>

      <p className="mt-6 text-xs text-stone-400">This was a test order. No real payment was processed.</p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-4">
      <Suspense fallback={<div className="text-sm text-stone-400">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
