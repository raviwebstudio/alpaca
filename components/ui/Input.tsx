import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "withIcon";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      variant = "default",
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref,
  ) => {
    const hasLeftIcon = variant === "withIcon" && Boolean(leftIcon);
    const hasRightIcon = variant === "withIcon" && Boolean(rightIcon);

    return (
      <label className="flex w-full flex-col gap-2 text-sm text-text-secondary" htmlFor={id}>
        {label ? <span className="font-medium text-text-primary">{label}</span> : null}
        <span className="relative flex items-center">
          {hasLeftIcon ? (
            <span className="pointer-events-none absolute left-4 text-text-secondary">
              {leftIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={id}
            className={cn(
              "w-full rounded-xl border border-border-soft bg-white px-4 py-3 text-text-primary outline-none transition duration-200 placeholder:text-text-secondary/70 focus:border-accent focus:ring-4 focus:ring-accent/15",
              hasLeftIcon && "pl-11",
              hasRightIcon && "pr-11",
              error && "border-error focus:border-error focus:ring-error/15",
              className,
            )}
            {...props}
          />
          {hasRightIcon ? (
            <span className="pointer-events-none absolute right-4 text-text-secondary">
              {rightIcon}
            </span>
          ) : null}
        </span>
        {error ? <span className="text-small text-error">{error}</span> : null}
      </label>
    );
  },
);

Input.displayName = "Input";
