"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Store,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sellerNavItems = [
  { label: "Dashboard", href: "/seller", icon: LayoutDashboard },
  { label: "My Products", href: "/seller/products", icon: Package },
  { label: "Orders", href: "/seller/orders", icon: ShoppingBag },
  { label: "Earnings", href: "/seller/earnings", icon: Wallet },
  { label: "Store Profile", href: "/seller/store-profile", icon: Store },
  { label: "Settings", href: "/seller/settings", icon: Settings },
];

export function SellerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 flex h-screen w-20 shrink-0 flex-col border-r border-border-soft bg-surface px-3 py-6 text-text-primary md:w-60 md:px-4">
        <Link href="/seller" className="mb-8 px-2 font-heading text-2xl text-text-primary">
          <span className="hidden md:inline">ALPACA</span>
          <span className="md:hidden">A</span>
        </Link>

        <nav className="flex flex-1 flex-col gap-2">
          {sellerNavItems.map(({ label, href, icon: Icon }) => {
            const isActive = href === "/seller" ? pathname === href : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                title={label}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border-l-4 border-transparent px-3 py-3 text-sm font-medium text-text-secondary transition hover:bg-white/70 hover:text-text-primary",
                  isActive && "border-accent bg-white text-accent",
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="min-h-screen flex-1 bg-background p-6">{children}</main>
    </div>
  );
}
