"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { track: "w-8 h-4",  thumb: "size-3",  translate: "translate-x-4" },
  md: { track: "w-10 h-5", thumb: "size-3.5",translate: "translate-x-5" },
  lg: { track: "w-12 h-6", thumb: "size-4.5",translate: "translate-x-6" },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, size = "md", className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-") ?? "switch";
    const s = sizeMap[size];
    return (
      <label htmlFor={inputId} className={cn("flex items-center gap-3 cursor-pointer group", props.disabled && "opacity-50 cursor-not-allowed", className)}>
        <div className="relative flex shrink-0">
          <input ref={ref} type="checkbox" id={inputId} className="peer sr-only" {...props} />
          <div
            className={cn(
              "rounded-full border border-border bg-muted transition-all duration-200",
              "peer-checked:bg-primary peer-checked:border-primary",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
              s.track
            )}
          />
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 left-0.5 rounded-full bg-white shadow-sm transition-all duration-200",
              "peer-checked:" + s.translate,
              s.thumb
            )}
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && <span className="text-sm font-medium text-foreground leading-tight">{label}</span>}
            {description && <span className="text-xs text-muted-foreground">{description}</span>}
          </div>
        )}
      </label>
    );
  }
);
Switch.displayName = "Switch";
