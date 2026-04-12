"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HTMLAttributes } from "react";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "gradient" | "success" | "warning" | "danger";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

const sizeMap = { xs: "h-1", sm: "h-1.5", md: "h-2.5", lg: "h-4" };
const variantMap = {
  default:  "bg-primary",
  gradient: "bg-gradient-to-r from-[--grad-purple] to-[--grad-cyan]",
  success:  "bg-emerald-500",
  warning:  "bg-amber-500",
  danger:   "bg-red-500",
};

export function Progress({
  value,
  max = 100,
  size = "md",
  variant = "default",
  showLabel,
  label,
  animated = true,
  className,
  ...props
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {(label || showLabel) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium text-foreground">{label}</span>}
          {showLabel && <span className="text-muted-foreground tabular-nums">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn("w-full rounded-full bg-muted overflow-hidden", sizeMap[size])}
      >
        <motion.div
          className={cn("h-full rounded-full", variantMap[variant])}
          initial={animated ? { width: 0 } : { width: `${pct}%` }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}
