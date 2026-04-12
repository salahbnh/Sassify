"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createContext, useContext, useState, HTMLAttributes, ReactNode } from "react";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue>({ collapsed: false, setCollapsed: () => {} });

interface SidebarProps extends HTMLAttributes<HTMLElement> {
  defaultCollapsed?: boolean;
  collapsible?: boolean;
}

export function Sidebar({ defaultCollapsed = false, collapsible = true, className, children, ...props }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <aside
        className={cn(
          "relative flex flex-col h-full border-r border-border bg-card transition-all duration-300",
          collapsed ? "w-16" : "w-60",
          className
        )}
        {...props}
      >
        {children}
        {collapsible && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 flex size-6 items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm z-10"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        )}
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center h-16 px-4 border-b border-border shrink-0", className)} {...props} />;
}

export function SidebarContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-y-auto py-4", className)} {...props} />;
}

export function SidebarFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t border-border p-4 shrink-0", className)} {...props} />;
}

interface SidebarNavItemProps extends HTMLAttributes<HTMLAnchorElement> {
  icon?: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  badge?: string | number;
}

export function SidebarNavItem({ icon, label, href = "#", active, badge, className, ...props }: SidebarNavItemProps) {
  const { collapsed } = useContext(SidebarContext);
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg mx-2 text-sm font-medium transition-all duration-150 cursor-pointer group",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
        collapsed && "justify-center px-2",
        className
      )}
      title={collapsed ? label : undefined}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge && (
            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/15 text-primary text-xs px-1.5 tabular-nums">
              {badge}
            </span>
          )}
        </>
      )}
    </a>
  );
}

export function SidebarSection({ label, className, children, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string }) {
  const { collapsed } = useContext(SidebarContext);
  return (
    <div className={cn("mb-2", className)} {...props}>
      {label && !collapsed && (
        <p className="px-5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}
