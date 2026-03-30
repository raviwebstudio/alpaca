"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Sale", href: "/sale" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const cartCount = 0;

  return (
    <>
      <header className="sticky top-0 z-50">
        {showPromo ? (
          <div className="bg-accent px-4 py-2 text-center text-small text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-3">
              <span className="text-center">Free shipping on orders above ₹999</span>
              <button
                type="button"
                aria-label="Dismiss promo banner"
                className="rounded-full p-1 transition hover:bg-white/15"
                onClick={() => setShowPromo(false)}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : null}

        <div className="border-b border-border-soft bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="rounded-full p-2 text-text-primary transition hover:bg-surface lg:hidden"
                aria-label="Open navigation menu"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>

              <Link href="/" className="font-heading text-[24px] text-text-primary">
                ALPACA
              </Link>
            </div>

            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-small font-medium text-text-secondary transition hover:text-accent",
                      isActive && "text-text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="rounded-full p-2 text-text-primary transition hover:bg-surface"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="hidden rounded-full p-2 text-text-primary transition hover:bg-surface sm:inline-flex"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="relative rounded-full p-2 text-text-primary transition hover:bg-surface"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white">
                  {cartCount}
                </span>
              </button>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full border border-border-soft px-3 py-2 text-small font-medium text-text-primary transition hover:border-accent hover:text-accent sm:inline-flex"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
                  <User className="h-4 w-4" />
                </span>
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {drawerOpen ? (
        <div className="fixed inset-0 z-[55] bg-text-primary/30 backdrop-blur-sm lg:hidden">
          <div className="h-full w-full max-w-xs bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="font-heading text-[24px] text-text-primary">ALPACA</span>
              <button
                type="button"
                aria-label="Close navigation menu"
                className="rounded-full p-2 text-text-primary transition hover:bg-surface"
                onClick={() => setDrawerOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-body font-medium text-text-secondary transition hover:bg-surface hover:text-text-primary",
                      isActive && "bg-surface text-text-primary",
                    )}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-border-soft px-4 py-3 text-small font-medium text-text-primary"
                onClick={() => setDrawerOpen(false)}
              >
                <User className="h-4 w-4" />
                Login
              </Link>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-border-soft px-4 py-3 text-small font-medium text-text-primary"
              >
                <Heart className="h-4 w-4" />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
