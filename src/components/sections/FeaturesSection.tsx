"use client";

import { motion } from "framer-motion";
import { Zap, Shield, BarChart2, Plug, Bot, Infinity } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "Edge-deployed infrastructure with sub-100ms response times globally.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified. End-to-end encryption at rest and in transit.",
  },
  {
    icon: BarChart2,
    title: "Real-time Analytics",
    description: "Live dashboards with actionable insights powered by streaming data.",
  },
  {
    icon: Plug,
    title: "100+ Integrations",
    description: "Connect your favorite tools in one click. No engineering required.",
  },
  {
    icon: Bot,
    title: "AI-Powered",
    description: "Intelligent automation that learns your workflow and eliminates toil.",
  },
  {
    icon: Infinity,
    title: "Infinite Scale",
    description: "Auto-scales from zero to millions of users without configuration.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--grad-indigo)] opacity-5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-widest text-primary mb-3"
          >
            Everything you need
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-balance"
          >
            Built for teams that{" "}
            <span className="text-gradient">move fast</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
            >
              <TiltCard
                className={cn(
                  "glass shimmer-card rounded-2xl p-6 h-full",
                  "hover:border-white/12 transition-colors duration-300 cursor-default"
                )}
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon size={20} className="text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
