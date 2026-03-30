"use client";

import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

const toastStyles = {
  base: "flex min-w-[280px] items-start gap-3 rounded-2xl border bg-white px-4 py-3 text-sm shadow-card",
  success: "border-success/20 text-text-primary",
  error: "border-error/20 text-text-primary",
  info: "border-accent/20 text-text-primary",
} as const;

function renderToast(message: string, variant: keyof Omit<typeof toastStyles, "base">) {
  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  }[variant];

  const iconClass = {
    success: "text-success",
    error: "text-error",
    info: "text-accent",
  }[variant];

  return (
    <div className={cn(toastStyles.base, toastStyles[variant])}>
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconClass)} />
      <p className="text-small text-text-secondary">{message}</p>
    </div>
  );
}

export const notify = {
  success: (message: string) =>
    toast.custom(() => renderToast(message, "success"), {
      duration: 4000,
      position: "top-right",
    }),
  error: (message: string) =>
    toast.custom(() => renderToast(message, "error"), {
      duration: 4000,
      position: "top-right",
    }),
  info: (message: string) =>
    toast.custom(() => renderToast(message, "info"), {
      duration: 4000,
      position: "top-right",
    }),
};

export function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
      }}
      containerClassName="!top-4 !right-4"
      gutter={12}
    />
  );
}
