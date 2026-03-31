import Link from "next/link";
import { navigation } from "@/lib/storefront";

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/shipping-policy", label: "Shipping Policy" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line/80">
      <div className="shell section-space grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <p className="eyebrow">ALPACA</p>
          <div className="max-w-xl space-y-4">
            <h2 className="text-balance text-4xl text-dark sm:text-5xl">
              Premium essentials, cut to move through the day with ease.
            </h2>
            <p className="max-w-lg text-base text-text-secondary sm:text-lg">
              Minimal layers, refined silhouettes, and a quieter way to build a wardrobe.
            </p>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-secondary">
              Explore
            </p>
            <div className="flex flex-col gap-3 text-sm text-dark">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="transition-colors hover:text-accent">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-secondary">
              Customer care
            </p>
            <div className="flex flex-col gap-3 text-sm text-dark">
              {legalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="transition-colors hover:text-accent">
                  {item.label}
                </Link>
              ))}
              <a href="mailto:hello@alpaca-fashion.com" className="transition-colors hover:text-accent">
                hello@alpaca-fashion.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="shell flex flex-col gap-3 py-6 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ALPACA. MADE FOR THE MOVE.</p>
          <p>Designed for a minimal wardrobe in motion.</p>
        </div>
      </div>
    </footer>
  );
}
