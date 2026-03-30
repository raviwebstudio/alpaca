import { cn } from "@/lib/utils";

const spinnerSizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-[3px]",
  lg: "h-10 w-10 border-4",
} as const;

export interface LoadingSpinnerProps {
  size?: keyof typeof spinnerSizes;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex animate-spin rounded-full border-solid border-accent/20 border-t-accent",
        spinnerSizes[size],
        className,
      )}
    />
  );
}
