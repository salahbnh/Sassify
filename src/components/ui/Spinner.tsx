import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "white";
}

const sizeMap = { xs: "size-3", sm: "size-4", md: "size-6", lg: "size-8", xl: "size-12" };
const colorMap = {
  default: "border-border border-t-foreground",
  primary: "border-primary/20 border-t-primary",
  white:   "border-white/20 border-t-white",
};

export function Spinner({ size = "md", variant = "primary", className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "rounded-full border-2 animate-spin",
        sizeMap[size],
        colorMap[variant],
        className
      )}
      {...props}
    />
  );
}
