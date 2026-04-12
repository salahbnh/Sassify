import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

const variantMap = {
  default:  "bg-card border border-border",
  glass:    "glass",
  bordered: "bg-transparent border border-border",
  elevated: "bg-card border border-border shadow-xl shadow-black/10",
};

const paddingMap = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

export function Card({ variant = "default", padding = "md", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-xl", variantMap[variant], paddingMap[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold text-foreground", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3 mt-4 pt-4 border-t border-border", className)} {...props} />;
}
