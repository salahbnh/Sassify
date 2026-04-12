"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState, useRef, useEffect } from "react";

interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
}

export function Dropdown({ trigger, items, align = "left", className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "absolute top-full mt-1.5 z-50 min-w-44 glass border border-border/60 rounded-xl shadow-xl py-1 overflow-hidden",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            {items.map((item, i) =>
              item.separator ? (
                <hr key={i} className="border-border/50 my-1" />
              ) : (
                <button
                  key={i}
                  onClick={() => { item.onClick?.(); setOpen(false); }}
                  disabled={item.disabled}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors duration-150 cursor-pointer",
                    item.danger
                      ? "text-red-500 hover:bg-red-500/10"
                      : "text-foreground hover:bg-muted",
                    item.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
                  {item.label}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
