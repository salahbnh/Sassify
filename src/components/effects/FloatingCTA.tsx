"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export function FloatingCTA() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setVisible(v > 700));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
        >
          <button className="glow-purple flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-xl transition-all hover:bg-primary hover:text-white hover:scale-105 cursor-pointer">
            <span className="size-1.5 rounded-full bg-[var(--grad-cyan)] pulse-glow" />
            Get started free →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
