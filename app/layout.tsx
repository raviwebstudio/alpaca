import type { Metadata } from "next";
import "./globals.css";
import { Toast } from "@/components/ui/Toast";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "ALPACA",
    template: "%s | ALPACA",
  },
  description: "Curated fashion marketplace for independent labels and modern wardrobes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background font-body text-body text-text-primary antialiased">
        {children}
        <Toast />
      </body>
    </html>
  );
}
