import type { Metadata } from "next";
import { AddressPage } from "@/components/storefront/address-page";

export const metadata: Metadata = {
  title: "Address",
  description: "Enter your delivery details to continue with ALPACA prepaid checkout.",
};

export default function CheckoutAddressPage() {
  return <AddressPage />;
}
