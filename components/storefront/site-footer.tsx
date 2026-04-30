"use client";

import Image from "next/image";
import Link from "next/link";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const quickLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
];

const socialLinks = [
  { label: "IG", href: "https://www.instagram.com/alpacaa.clothing" },
  { label: "FB", href: "https://www.facebook.com/alpacaa.clothing/" },
];

export function SiteFooter() {
  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(135deg, #0F0E0D 0%, #1C1917 50%, #2C2420 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(200,149,108,0.08), transparent), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 32%)",
        }}
      />
      <div
        className="relative h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(200,149,108,0.5), transparent)",
        }}
      />

      <div className="shell relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <Image
                src="/assets/logo-black.png"
                alt="ALPACA"
                width={100}
                height={100}
                className="h-16 w-16 object-contain"
                style={{ filter: "invert(1) brightness(2.8)" }}
              />
              <p
                className="uppercase text-white"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "22px",
                  letterSpacing: "0.15em",
                }}
              >
                
              </p>
            </div>
            <p
              className="max-w-sm leading-snug text-white/85"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "24px" }}
            >
              Premium essentials, cut to move through the day with ease.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/45">
              Minimal layers, refined silhouettes, and a quieter way to build a wardrobe.
            </p>

            <div className="mt-7 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C8956C]/30 text-[10px] tracking-wide text-white/60 transition hover:border-[#C8956C] hover:bg-[#C8956C]/10 hover:text-[#C8956C]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[#C8956C]">
              Explore
            </p>
            <div className="flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/55 transition-colors hover:text-[#C8956C]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[#C8956C]">
              Quick Links
            </p>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/55 transition-colors hover:text-[#C8956C]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-white/10 pt-4">
                <a href="mailto:contact@alpacaa.in" className="text-sm text-[#C8956C]">
                  contact@alpacaa.in
                </a>
                <a
                  href="mailto:support@alpacaa.in"
                  className="mt-1 block text-sm text-white/45 transition-colors hover:text-[#C8956C]"
                >
                  support@alpacaa.in
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/35">(c) 2026 ALPACA - MADE FOR THE MOVE. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-white/35">Design and Development By</span>
            <span className="rounded border border-[#C8956C]/30 px-2 py-0.5 text-xs tracking-wide text-[#C8956C]">
              <a href="https://www.crowcent.com" target="_blank" rel="noopener noreferrer">
                CROWCENT
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
