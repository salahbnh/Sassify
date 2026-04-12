"use client";

import { useScroll, motion } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9999]"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(to right, #a855f7, #6366f1, #06b6d4)",
      }}
    />
  );
}
