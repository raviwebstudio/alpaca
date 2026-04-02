import type { Metadata } from "next";
import { SuccessPage } from "@/components/storefront/success-page";

export const metadata: Metadata = {
  title: "Order Success",
  description: "Your ALPACA order has been placed successfully.",
};

export default function CheckoutSuccessRoute() {
  return <SuccessPage />;
}
