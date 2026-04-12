"use client";

import { cn } from "@/lib/utils";
import { createContext, useContext, useState, HTMLAttributes } from "react";

interface TabsContextValue {
  active: string;
  setActive: (v: string) => void;
  variant: "underline" | "pills" | "glass";
}

const TabsContext = createContext<TabsContextValue>({
  active: "",
  setActive: () => {},
  variant: "pills",
});

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  variant?: "underline" | "pills" | "glass";
}

export function Tabs({ defaultValue, variant = "pills", className, children, ...props }: TabsProps) {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive, variant }}>
      <div className={cn("flex flex-col gap-4", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { variant } = useContext(TabsContext);
  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center gap-1",
        variant === "pills" && "bg-muted rounded-xl p-1",
        variant === "glass" && "glass rounded-xl p-1",
        variant === "underline" && "border-b border-border gap-0",
        className
      )}
      {...props}
    />
  );
}

interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const { active, setActive, variant } = useContext(TabsContext);
  const isActive = active === value;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActive(value)}
      className={cn(
        "flex items-center gap-1.5 text-sm font-medium transition-all duration-200 cursor-pointer",
        variant === "pills" && cn(
          "px-4 py-1.5 rounded-lg",
          isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        ),
        variant === "glass" && cn(
          "px-4 py-1.5 rounded-lg",
          isActive ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"
        ),
        variant === "underline" && cn(
          "px-4 py-2.5 border-b-2 -mb-px",
          isActive ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
        ),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const { active } = useContext(TabsContext);
  if (active !== value) return null;
  return (
    <div role="tabpanel" className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
