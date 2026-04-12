"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: ReactNode;
  className?: string;
}

const sizeMap = {
  sm:   "max-w-sm",
  md:   "max-w-md",
  lg:   "max-w-lg",
  xl:   "max-w-2xl",
  full: "max-w-5xl",
};

export function Modal({ open, onClose, title, description, size = "md", children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "relative w-full glass border border-border/50 rounded-2xl shadow-2xl",
              sizeMap[size],
              className
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
          >
            {/* Header */}
            {(title || description) && (
              <div className="flex items-start justify-between p-6 pb-0">
                <div className="flex flex-col gap-1">
                  {title && <h2 id="modal-title" className="text-lg font-semibold text-foreground">{title}</h2>}
                  {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer z-10"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
