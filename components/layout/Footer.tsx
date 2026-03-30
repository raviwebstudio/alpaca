import Link from "next/link";
import { Camera, PinIcon, Send, ThumbsUp } from "lucide-react";

const footerColumns = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Sale", href: "/sale" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  seller: [
    { label: "Sell on ALPACA", href: "/services" },
    { label: "Seller Login", href: "/seller" },
    { label: "Seller Guidelines", href: "/services#guidelines" },
    { label: "Become a Partner", href: "/register?role=seller" },
  ],
  help: [
    { label: "FAQ", href: "/faq" },
    { label: "Track Order", href: "/account/orders" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-of-service" },
  ],
};

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: Camera },
  { label: "Facebook", href: "https://facebook.com", icon: ThumbsUp },
  { label: "Twitter", href: "https://twitter.com", icon: Send },
  { label: "Pinterest", href: "https://pinterest.com", icon: PinIcon },
];

export function Footer() {
  return (
    <footer className="bg-text-primary text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-5">
          <div>
            <Link href="/" className="font-heading text-[24px] text-white">
              ALPACA
            </Link>
            <p className="mt-3 max-w-xs text-small text-white/70">
              Curated fashion, delivered.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Quick Links" links={footerColumns.quickLinks} />
        <FooterColumn title="Seller" links={footerColumns.seller} />
        <FooterColumn title="Help" links={footerColumns.help} />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-small sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} ALPACA. All rights reserved.</p>
          <span className="inline-flex w-fit items-center rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80">
            Razorpay
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="mb-4 font-heading text-h3 text-white">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-small text-white/70 transition hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
