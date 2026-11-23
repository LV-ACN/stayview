import { formatCurrency } from "@/lib/format";
import { clsx } from "clsx";

interface PriceTagProps {
  amount: number;
  currency?: string;
  period?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceTag({
  amount,
  currency = "INR",
  period = "night",
  size = "md",
  className,
}: PriceTagProps) {
  return (
    <div className={clsx("flex items-baseline gap-1", className)}>
      <span
        className={clsx("font-bold text-neutral-900", {
          "text-lg": size === "sm",
          "text-2xl": size === "md",
          "text-3xl": size === "lg",
        })}
      >
        {formatCurrency(amount, currency)}
      </span>
      <span className="text-neutral-500 text-sm">/ {period}</span>
    </div>
  );
}
