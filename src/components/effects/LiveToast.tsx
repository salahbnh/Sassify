"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const events = [
  { company: "Acme Corp",    action: "just deployed to production",   region: "US East",    time: "2s ago"  },
  { company: "TechFlow",     action: "scaled to 500k req/min",        region: "EU West",    time: "1m ago"  },
  { company: "DevStudio",    action: "shipped 3 services in 4.2s",    region: "AP South",   time: "3m ago"  },
  { company: "StartupX",     action: "went live across 47 regions",   region: "Global",     time: "5m ago"  },
  { company: "PixelLabs",    action: "ran 12k tests — all green",     region: "US West",    time: "7m ago"  },
];

export function LiveToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(show);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % events.length);
        setVisible(true);
      }, 600);
    }, 5000);
    return () => clearInterval(cycle);
  }, [visible]);

  const ev = events[index];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-8 right-6 z-50 w-72"
        >
          <div className="glass rounded-2xl p-4 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 size-8 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
                {ev.company[0]}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">
                  {ev.company}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {ev.action}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-400 pulse-glow" />
                  <span className="text-[10px] text-muted-foreground">{ev.region} · {ev.time}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
