"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
];

export default function CheckoutAddressPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    label: "Home",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required";
    if (!form.phone.match(/^[6-9]\d{9}$/)) nextErrors.phone = "Enter valid 10-digit phone number";
    if (!form.line1.trim()) nextErrors.line1 = "Address line 1 is required";
    if (!form.city.trim()) nextErrors.city = "City is required";
    if (!form.state) nextErrors.state = "State is required";
    if (!form.pincode.match(/^\d{6}$/)) nextErrors.pincode = "Enter valid 6-digit pincode";
    return nextErrors;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setErrors((current) => ({ ...current, [event.target.name]: "" }));
  };

  const handleContinue = async () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSaving(true);
    sessionStorage.setItem("alpaca_checkout_address", JSON.stringify(form));
    await new Promise((resolve) => setTimeout(resolve, 400));
    router.push("/checkout/payment");
  };

  const inputClass = (field: string) =>
    `w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
      errors[field]
        ? "border-red-300 bg-red-50 focus:border-red-400"
        : "border-[#E0D8D0] bg-white focus:border-[#C8956C]"
    }`;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="border-b border-[#E0D8D0] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-3 overflow-x-auto">
          {["Cart", "Address", "Payment", "Success"].map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                  index === 1
                    ? "bg-[#1C1917] text-white"
                    : index < 1
                      ? "bg-[#C8956C] text-white"
                      : "border border-[#E0D8D0] text-stone-400"
                }`}
              >
                {index < 1 ? "✓" : index + 1}
              </div>
              <span className={`text-sm ${index === 1 ? "font-medium text-[#1C1917]" : "text-stone-400"}`}>
                {step}
              </span>
              {index < 3 ? <div className="h-px w-8 bg-[#E0D8D0]" /> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="mb-2 text-3xl text-[#1C1917]">Delivery address</h1>
        <p className="mb-8 text-sm text-stone-500">Where should we send your order?</p>

        <div className="mb-6 flex gap-3">
          {["Home", "Work", "Other"].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setForm((current) => ({ ...current, label }))}
              className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                form.label === label
                  ? "border-[#1C1917] bg-[#1C1917] text-white"
                  : "border-[#E0D8D0] bg-white text-stone-600 hover:border-[#C8956C]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500">
                Full Name *
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Ravi Gautam"
                className={inputClass("fullName")}
              />
              {errors.fullName ? <p className="mt-1 text-xs text-red-500">{errors.fullName}</p> : null}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500">
                Phone *
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
                maxLength={10}
                className={inputClass("phone")}
              />
              {errors.phone ? <p className="mt-1 text-xs text-red-500">{errors.phone}</p> : null}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500">
              Address Line 1 *
            </label>
            <input
              name="line1"
              value={form.line1}
              onChange={handleChange}
              placeholder="Flat / House no, Building, Street"
              className={inputClass("line1")}
            />
            {errors.line1 ? <p className="mt-1 text-xs text-red-500">{errors.line1}</p> : null}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500">
              Address Line 2 (optional)
            </label>
            <input
              name="line2"
              value={form.line2}
              onChange={handleChange}
              placeholder="Area, Colony, Landmark"
              className={inputClass("line2")}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500">
                City *
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="New Delhi"
                className={inputClass("city")}
              />
              {errors.city ? <p className="mt-1 text-xs text-red-500">{errors.city}</p> : null}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500">
                Pincode *
              </label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="110001"
                maxLength={6}
                className={inputClass("pincode")}
              />
              {errors.pincode ? <p className="mt-1 text-xs text-red-500">{errors.pincode}</p> : null}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500">
              State *
            </label>
            <select name="state" value={form.state} onChange={handleChange} className={inputClass("state")}>
              <option value="">Select state</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state ? <p className="mt-1 text-xs text-red-500">{errors.state}</p> : null}
          </div>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={saving}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#1C1917] py-4 text-sm font-medium text-white transition-colors hover:bg-[#C8956C] disabled:opacity-60"
        >
          {saving ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </>
          ) : (
            "Continue to Payment →"
          )}
        </button>

        <Link href="/cart" className="mt-4 block text-center text-sm text-stone-400 transition-colors hover:text-stone-600">
          ← Back to cart
        </Link>
      </div>
    </div>
  );
}
