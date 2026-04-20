"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { SelectHTMLAttributes, ReactNode, forwardRef } from "react";

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "prefix"> {
  label?: string;
  error?: string;
  helper?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  prefix?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helper, options, placeholder, prefix, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10 flex items-center">
              {prefix}
            </span>
          )}
          <select
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-10 rounded-lg border border-border bg-input pl-3 pr-9 text-sm text-foreground appearance-none cursor-pointer",
              prefix && "pl-9",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-500 focus:ring-red-500/30",
              className
            )}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
        {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
        {!error && helper && <p className="text-xs text-muted-foreground">{helper}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
