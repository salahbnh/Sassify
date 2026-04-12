import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circle" | "rect";
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export function Skeleton({ variant = "rect", width, height, lines = 1, className, style, ...props }: SkeletonProps) {
  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn("skeleton rounded", i === lines - 1 && lines > 1 && "w-3/4")}
            style={{ height: 14, ...style }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "skeleton",
        variant === "circle" ? "rounded-full" : "rounded-lg",
        variant === "text" && "rounded",
        className
      )}
      style={{ width, height: height ?? (variant === "text" ? 14 : undefined), ...style }}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width={40} height={40} />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton variant="text" width="60%" height={14} />
          <Skeleton variant="text" width="40%" height={12} />
        </div>
      </div>
      <Skeleton variant="text" lines={3} />
      <Skeleton height={36} />
    </div>
  );
}
