"use client";

import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass glow-purple rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary opacity-10 blur-[80px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance mb-4">
              Ready to <span className="text-gradient">get started?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto text-balance">
              Join 10,000+ teams already building on Sassify. Free to start, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="glow-purple rounded-xl bg-primary px-10 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95">
                Start building for free
              </button>
              <button className="glass rounded-xl px-10 py-4 text-sm font-semibold transition-all hover:bg-white/8">
                Schedule a demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
