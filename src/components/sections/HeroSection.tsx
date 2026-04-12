"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const rotatingWords = ["faster", "smarter", "at scale", "with ease"];

const terminalLines = [
  { text: "$ sassify deploy --env production", delay: 0.8,  type: "cmd"     },
  { text: "✓ Building application...",         delay: 1.4,  type: "success" },
  { text: "✓ Running test suite (248 tests)...",delay: 1.9,  type: "success" },
  { text: "✓ Deploying to 47 edge regions...", delay: 2.5,  type: "success" },
  { text: "✓ SSL certificates renewed...",     delay: 3.0,  type: "success" },
  { text: "● Live → https://app.sassify.dev", delay: 3.6,  type: "live"    },
  { text: "  50ms · 47 regions · 100% healthy",delay: 3.9,  type: "meta"   },
];

const trustLogos = ["Vercel", "GitHub", "Stripe", "Linear", "Notion"];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  // Rotate words
  useEffect(() => {
    const t = setInterval(() => setWordIndex((i) => (i + 1) % rotatingWords.length), 2200);
    return () => clearInterval(t);
  }, []);

  // Terminal typewriter
  useEffect(() => {
    terminalLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay * 1000);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">

      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob-1 absolute left-[15%] top-[20%] w-[480px] h-[480px] rounded-full bg-[var(--grad-purple)] opacity-[0.12] blur-[100px]" />
        <div className="blob-2 absolute right-[15%] top-[40%] w-[380px] h-[380px] rounded-full bg-[var(--grad-cyan)] opacity-[0.09] blur-[90px]" />
        <div className="blob-3 absolute left-[40%] bottom-[10%] w-[300px] h-[300px] rounded-full bg-[var(--grad-indigo)] opacity-[0.08] blur-[80px]" />
      </div>

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-100" />

      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-400 pulse-glow" />
            Now in public beta — free to start
          </span>
        </motion.div>

        {/* Headline with rotating word */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-balance"
        >
          Build{" "}
          <span className="relative inline-block w-[220px] sm:w-[280px] lg:w-[340px] text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 text-gradient"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
            {/* Invisible placeholder to hold width */}
            <span className="invisible">{rotatingWords[2]}</span>
          </span>
          <br />
          with Sassify
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance"
        >
          The modern platform that gives your team superpowers.
          From first commit to global scale — all in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="glow-purple rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95 cursor-pointer">
            Start building free
          </button>
          <button className="glass rounded-xl px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-white/8 cursor-pointer">
            Watch demo →
          </button>
        </motion.div>

        {/* Trust logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <p className="text-xs text-muted-foreground">Trusted by engineers at</p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {trustLogos.map((name) => (
              <span key={name} className="text-xs font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-default">
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Terminal mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 mx-auto max-w-2xl"
        >
          <div className="glass rounded-2xl overflow-hidden shadow-2xl">
            {/* Terminal titlebar */}
            <div className="flex items-center gap-2 border-b border-border/50 bg-white/[0.02] px-4 py-3">
              <div className="size-3 rounded-full bg-red-500/70" />
              <div className="size-3 rounded-full bg-yellow-500/70" />
              <div className="size-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-muted-foreground font-mono">sassify — production</span>
            </div>
            {/* Terminal body */}
            <div className="px-5 py-5 font-mono text-xs text-left min-h-[180px]">
              {terminalLines.map((line, i) => (
                <AnimatePresence key={i}>
                  {visibleLines.includes(i) && (
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "leading-6",
                        line.type === "cmd"     && "text-foreground/90",
                        line.type === "success" && "text-emerald-400",
                        line.type === "live"    && "text-primary font-semibold",
                        line.type === "meta"    && "text-muted-foreground",
                      )}
                    >
                      {line.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              ))}
              {visibleLines.length < terminalLines.length && (
                <span className="inline-block w-2 h-4 bg-primary/80 animate-pulse" />
              )}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-muted-foreground/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
