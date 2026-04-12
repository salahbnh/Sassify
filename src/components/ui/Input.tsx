"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, prefix, suffix, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3 text-muted-foreground flex items-center pointer-events-none">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-10 rounded-lg border border-border bg-input px-3 text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-500 focus:ring-red-500/30",
              prefix && "pl-9",
              suffix && "pr-9",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 text-muted-foreground flex items-center pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
        {!error && helper && (
          <p id={`${inputId}-helper`} className="text-xs text-muted-foreground">
            {helper}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
