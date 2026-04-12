"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Sassify cut our time-to-ship by 60%. It's the only platform that actually gets out of our way.",
    author: "Sarah Chen",
    role: "CTO at Loops",
    avatar: "SC",
  },
  {
    quote: "We migrated 3 services to Sassify in a weekend. The DX is unlike anything I've used before.",
    author: "Marcus Rivera",
    role: "Lead Engineer at Tidal",
    avatar: "MR",
  },
  {
    quote: "Our infrastructure costs dropped 40% after switching. The auto-scaling is pure magic.",
    author: "Priya Patel",
    role: "VP Engineering at Orbit",
    avatar: "PP",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-balance"
          >
            Loved by{" "}
            <span className="text-gradient">engineering teams</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 flex flex-col gap-4"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="size-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
