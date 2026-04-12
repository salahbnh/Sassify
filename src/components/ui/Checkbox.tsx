"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { InputHTMLAttributes, forwardRef } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { box: "size-4", icon: 10, label: "text-sm", desc: "text-xs" },
  md: { box: "size-5", icon: 12, label: "text-sm", desc: "text-xs" },
  lg: { box: "size-6", icon: 14, label: "text-base", desc: "text-sm" },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, size = "md", className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-") ?? "checkbox";
    const s = sizeMap[size];
    return (
      <label htmlFor={inputId} className={cn("flex items-start gap-2.5 cursor-pointer group", props.disabled && "opacity-50 cursor-not-allowed", className)}>
        <div className="relative flex shrink-0 mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "rounded border border-border bg-input transition-all duration-150",
              "peer-checked:bg-primary peer-checked:border-primary",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
              s.box
            )}
          />
          <Check
            size={s.icon}
            className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
            strokeWidth={3}
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && <span className={cn("font-medium text-foreground leading-tight", s.label)}>{label}</span>}
            {description && <span className={cn("text-muted-foreground", s.desc)}>{description}</span>}
          </div>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
