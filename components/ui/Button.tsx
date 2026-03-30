import * as React from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary: "bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent/30",
  secondary:
    "border border-border-soft bg-transparent text-text-primary hover:border-accent hover:text-accent focus-visible:ring-accent/20",
  ghost: "bg-transparent text-text-secondary hover:bg-surface hover:text-text-primary focus-visible:ring-accent/20",
  danger: "bg-error text-white hover:bg-error/90 focus-visible:ring-error/20",
} as const;

const sizeStyles = {
  sm: "h-10 px-4 text-small",
  md: "h-11 px-5 text-body",
  lg: "h-12 px-6 text-body",
} as const;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <LoadingSpinner size="sm" className="border-white/30 border-t-current" /> : null}
        <span>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
