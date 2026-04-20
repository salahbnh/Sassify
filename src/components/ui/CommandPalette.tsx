"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState, useRef } from "react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  category?: string;
  shortcut?: string[];
  onSelect: () => void;
}

interface CommandPaletteProps {
  items: CommandItem[];
  open: boolean;
  onClose: () => void;
  placeholder?: string;
}

export function CommandPalette({ items, open, onClose, placeholder = "Search commands..." }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? items.filter(
        (i) =>
          i.label.toLowerCase().includes(query.toLowerCase()) ||
          i.description?.toLowerCase().includes(query.toLowerCase()) ||
          i.category?.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && filtered[activeIndex]) { filtered[activeIndex].onSelect(); onClose(); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, filtered, activeIndex, onClose]);

  const categories = Array.from(new Set(filtered.map((i) => i.category ?? "")));

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-lg glass border border-border/60 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/50">
              <Search size={16} className="text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border text-xs text-muted-foreground font-mono">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-1.5">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
                  <Search size={20} />
                  <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
                </div>
              ) : (
                categories.map((cat) => {
                  const catItems = filtered.filter((i) => (i.category ?? "") === cat);
                  return (
                    <div key={cat}>
                      {cat && (
                        <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                          {cat}
                        </p>
                      )}
                      {catItems.map((item) => {
                        const globalIdx = filtered.indexOf(item);
                        return (
                          <button
                            key={item.id}
                            onClick={() => { item.onSelect(); onClose(); }}
                            onMouseEnter={() => setActiveIndex(globalIdx)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-100 cursor-pointer",
                              globalIdx === activeIndex ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                            )}
                          >
                            {item.icon && (
                              <span className={cn("shrink-0", globalIdx === activeIndex ? "text-primary" : "text-muted-foreground")}>
                                {item.icon}
                              </span>
                            )}
                            <div className="flex flex-col gap-0.5 flex-1 text-left min-w-0">
                              <span className="font-medium truncate">{item.label}</span>
                              {item.description && (
                                <span className={cn("text-xs truncate", globalIdx === activeIndex ? "text-primary/70" : "text-muted-foreground")}>
                                  {item.description}
                                </span>
                              )}
                            </div>
                            {item.shortcut && (
                              <div className="flex items-center gap-1 shrink-0">
                                {item.shortcut.map((k, ki) => (
                                  <kbd key={ki} className="px-1.5 py-0.5 rounded border border-border text-xs text-muted-foreground font-mono">
                                    {k}
                                  </kbd>
                                ))}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center gap-3 px-4 py-2.5 border-t border-border/50 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><kbd className="font-mono">↑↓</kbd> navigate</span>
              <span className="flex items-center gap-1"><kbd className="font-mono">↵</kbd> select</span>
              <span className="flex items-center gap-1"><kbd className="font-mono">esc</kbd> close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function CommandPaletteTrigger({ onOpen, className }: { onOpen: () => void; className?: string }) {
  return (
    <button
      onClick={onOpen}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer",
        className
      )}
    >
      <Search size={14} />
      <span>Search...</span>
      <div className="ml-auto flex items-center gap-0.5">
        <kbd className="flex size-5 items-center justify-center rounded border border-border text-xs font-mono">⌘</kbd>
        <kbd className="flex size-5 items-center justify-center rounded border border-border text-xs font-mono">K</kbd>
      </div>
    </button>
  );
}
