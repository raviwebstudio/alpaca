import type { Metadata } from "next";
import { CheckoutForm } from "@/components/storefront/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure prepaid checkout for ALPACA essentials with delivery summary and order review.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
