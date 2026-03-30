import { ArrowRight, CheckCircle2, ShieldCheck, Store, Truck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const highlights = [
  {
    title: "Curated Fashion",
    description: "Thoughtfully selected labels, textures, and silhouettes for modern wardrobes.",
    icon: Store,
  },
  {
    title: "Warm, Editorial Design",
    description: "A storefront foundation shaped for fashion storytelling and premium discovery.",
    icon: CheckCircle2,
  },
  {
    title: "Marketplace Ready",
    description: "Seller, admin, auth, and commerce foundations are scaffolded for the next phases.",
    icon: ShieldCheck,
  },
];

const trustBadges = [
  { label: "Free shipping above ₹999", icon: Truck },
  { label: "Verified fashion partners", icon: ShieldCheck },
  { label: "Seller-friendly dashboard base", icon: Store },
];

export default function HomePage() {
  return (
    <div className="space-y-16 py-12 sm:py-16">
      <section className="grid gap-8 rounded-[2rem] border border-border-soft bg-gradient-to-br from-white via-background to-surface px-6 py-10 shadow-soft sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <Badge variant="info">Phase 1 scaffold complete</Badge>
          <div className="space-y-4">
            <p className="text-small uppercase tracking-[0.3em] text-accent">ALPACA marketplace</p>
            <h1 className="max-w-xl font-heading text-display text-text-primary">
              A warm, fashion-first foundation for your multi-vendor storefront.
            </h1>
            <p className="max-w-2xl text-body text-text-secondary">
              Next.js 14, Tailwind, Prisma, reusable layouts, and a polished design system are now in place for the marketplace build.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button>
              Explore the design system
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary">Review shared layouts</Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map(({ title, description, icon: Icon }, index) => (
            <Card key={title} className={index === 0 ? "sm:col-span-2" : ""}>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-heading text-h3 text-text-primary">{title}</h2>
                  <p className="text-small text-text-secondary">{description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {trustBadges.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-border-soft bg-white px-5 py-4 shadow-card"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-accent">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-small font-medium text-text-secondary">{label}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
