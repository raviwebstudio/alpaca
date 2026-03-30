"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Store,
  Tags,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Sellers", href: "/admin/sellers", icon: Store },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Categories", href: "/admin/categories", icon: Tags },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Payouts", href: "/admin/payouts", icon: Wallet },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 flex h-screen w-20 shrink-0 flex-col border-r border-white/10 bg-text-primary px-3 py-6 text-white md:w-60 md:px-4">
        <Link href="/admin" className="mb-8 px-2 font-heading text-2xl text-white">
          <span className="hidden md:inline">ALPACA</span>
          <span className="md:hidden">A</span>
        </Link>

        <nav className="flex flex-1 flex-col gap-2">
          {adminNavItems.map(({ label, href, icon: Icon }) => {
            const isActive = href === "/admin" ? pathname === href : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                title={label}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border-l-4 border-transparent px-3 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white",
                  isActive && "border-accent bg-white/5 text-accent",
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
