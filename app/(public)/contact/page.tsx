import type { Metadata } from "next";
import { ContactForm } from "@/components/storefront/contact-form";
import { SectionHeading } from "@/components/storefront/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ALPACA for order support, sizing questions, or retail and editorial partnerships.",
};

export default function ContactPage() {
  return (
    <div className="shell section-space space-y-12">
      <SectionHeading
        eyebrow="Contact"
        title="We keep customer care clear, direct, and personal."
        description="Reach out for order updates, sizing guidance, or partnerships. We will respond as quickly as possible."
      />

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
          <div className="surface-card rounded-[28px] p-6">
            <p className="eyebrow">Email</p>
            <a href="mailto:hello@alpaca-fashion.com" className="mt-4 block text-3xl text-dark">
              hello@alpaca-fashion.com
            </a>
          </div>
          <div className="surface-card rounded-[28px] p-6">
            <p className="eyebrow">Hours</p>
            <p className="mt-4 text-base leading-7 text-text-secondary">
              Monday to Saturday
              <br />
              10:00 AM to 7:00 PM IST
            </p>
          </div>
          <div className="surface-card rounded-[28px] p-6">
            <p className="eyebrow">Studio</p>
            <p className="mt-4 text-base leading-7 text-text-secondary">
              ALPACA House
              <br />
              24 Movement Lane
              <br />
              Bengaluru, India
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
