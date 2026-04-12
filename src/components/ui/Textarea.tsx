"use client";

import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helper, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full min-h-24 rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground resize-y",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:ring-red-500/30",
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
        {!error && helper && <p className="text-xs text-muted-foreground">{helper}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
