import type { Metadata } from "next";
import { PaymentPage } from "@/components/storefront/payment-page";

export const metadata: Metadata = {
  title: "Payment",
  description: "Choose a prepaid payment method for your ALPACA order.",
};

export default function CheckoutPaymentRoute() {
  return <PaymentPage />;
}
