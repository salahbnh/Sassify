"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState, useRef } from "react";

type TooltipSide = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: ReactNode;
  side?: TooltipSide;
  delay?: number;
  children: ReactNode;
  className?: string;
}

const sideMap: Record<TooltipSide, { initial: object; tooltip: string; arrow: string }> = {
  top:    { initial: { y: 4 },   tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2",  arrow: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-[var(--glass-border)]" },
  bottom: { initial: { y: -4 },  tooltip: "top-full left-1/2 -translate-x-1/2 mt-2",    arrow: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-[var(--glass-border)]" },
  left:   { initial: { x: 4 },   tooltip: "right-full top-1/2 -translate-y-1/2 mr-2",   arrow: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-[var(--glass-border)]" },
  right:  { initial: { x: -4 },  tooltip: "left-full top-1/2 -translate-y-1/2 ml-2",    arrow: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-[var(--glass-border)]" },
};

export function Tooltip({ content, side = "top", delay = 300, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const s = sideMap[side];

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => { timer.current = setTimeout(() => setVisible(true), delay); }}
      onMouseLeave={() => { clearTimeout(timer.current); setVisible(false); }}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, ...s.initial }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...s.initial }}
            transition={{ duration: 0.15 }}
            role="tooltip"
            className={cn(
              "absolute z-50 pointer-events-none px-2.5 py-1.5 rounded-lg glass border border-border/60 text-xs text-foreground whitespace-nowrap shadow-lg",
              s.tooltip,
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
