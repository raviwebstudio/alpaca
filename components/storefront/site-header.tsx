"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/lib/storefront";
import { useCart } from "@/components/storefront/cart-provider";
import { useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-background/80 backdrop-blur-xl">
      <div className="shell flex h-20 items-center justify-between gap-4">
        <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
          {/* <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-line bg-white text-sm font-bold text-dark shadow-soft">
            A
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold tracking-[0.28em] text-dark">ALPACA
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.32em] text-text-secondary">
              Made for the move
            </span>
          </div> */}
          <span>
            <Image
              src="/assets/logo-black.png"
              alt="ALPACA Logo"
              // className="h-10 w-10"
              width={80}
              height={80}
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-text-secondary md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "transition-colors duration-300 hover:text-dark",
                pathname === item.href && "text-dark",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-dark transition-transform duration-300 hover:-translate-y-0.5"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Cart</span>
            <span className="rounded-full bg-dark px-2 py-0.5 text-[0.72rem] text-white">
              {itemCount}
            </span>
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-dark md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-background md:hidden"
          >
            <div className="shell flex flex-col gap-1 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={clsx(
                    "rounded-2xl px-4 py-3 text-sm font-medium text-text-secondary transition-colors duration-300 hover:bg-white hover:text-dark",
                    pathname === item.href && "bg-white text-dark",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
