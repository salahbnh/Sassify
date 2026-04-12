"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:   "bg-primary text-white hover:opacity-90 hover:scale-[1.03] active:scale-[0.98]",
        secondary: "bg-muted text-foreground hover:bg-muted/80 hover:scale-[1.02]",
        outline:   "border border-border bg-transparent text-foreground hover:bg-muted hover:scale-[1.02]",
        ghost:     "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted",
        danger:    "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30",
        gradient:  "bg-gradient-to-r from-[--grad-purple] to-[--grad-cyan] text-white hover:opacity-90 hover:scale-[1.03] active:scale-[0.98]",
        glass:     "glass text-foreground hover:bg-white/10 border border-border/50",
      },
      size: {
        xs:  "h-7  px-3  text-xs",
        sm:  "h-8  px-4  text-sm",
        md:  "h-10 px-5  text-sm",
        lg:  "h-11 px-6  text-base",
        xl:  "h-13 px-8  text-base",
        icon:"h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  )
);
Button.displayName = "Button";
