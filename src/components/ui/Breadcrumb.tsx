import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import { HTMLAttributes, ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

export function Breadcrumb({ items, showHome = true, className, ...props }: BreadcrumbProps) {
  const all = showHome ? [{ label: "Home", href: "/", icon: <Home size={13} /> }, ...items] : items;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)} {...props}>
      <ol className="flex items-center gap-1 text-sm">
        {all.map((item, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={13} className="text-muted-foreground/50" />}
              {isLast ? (
                <span className="flex items-center gap-1 font-medium text-foreground">
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? "#"}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  {item.icon}
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
