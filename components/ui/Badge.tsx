import { cn } from "@/lib/utils";

const badgeStyles = {
  success: "bg-success/10 text-success",
  error: "bg-error/10 text-error",
  warning: "bg-amber-100 text-amber-700",
  info: "bg-sky-100 text-sky-700",
  neutral: "bg-stone-200 text-stone-700",
} as const;

export interface BadgeProps {
  children: React.ReactNode;
  variant?: keyof typeof badgeStyles;
  className?: string;
}

export function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        badgeStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
