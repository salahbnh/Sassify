import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default:   "bg-primary/10 text-primary border border-primary/20",
        secondary: "bg-muted text-muted-foreground border border-border",
        success:   "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
        warning:   "bg-amber-500/10 text-amber-500 border border-amber-500/20",
        danger:    "bg-red-500/10 text-red-500 border border-red-500/20",
        outline:   "bg-transparent border border-border text-foreground",
        glass:     "glass text-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
