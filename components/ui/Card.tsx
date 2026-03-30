import { cn } from "@/lib/utils";

const cardVariants = {
  default: "bg-white",
  surface: "bg-surface",
} as const;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof cardVariants;
  hover?: boolean;
}

export function Card({
  className,
  variant = "default",
  hover = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 shadow-soft transition-transform duration-300",
        cardVariants[variant],
        hover && "hover:scale-[1.01]",
        className,
      )}
      {...props}
    />
  );
}
