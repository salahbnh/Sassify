"use client";

import { motion } from "framer-motion";
import { Link2, SlidersHorizontal, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect your stack",
    description:
      "Link your Git provider, cloud accounts, and existing services in under 60 seconds. Zero config required.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "Configure once",
    description:
      "Set your deployment rules, scaling thresholds, and monitoring preferences through a clean visual interface.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Ship with confidence",
    description:
      "Push code and watch Sassify handle the rest — builds, tests, deployments, rollbacks, and alerting automatically.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--grad-cyan)] opacity-4 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-widest text-primary mb-3"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-balance"
          >
            Up and running in{" "}
            <span className="text-gradient">three steps</span>
          </motion.h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step icon circle */}
              <div className="relative mb-6 flex size-20 items-center justify-center rounded-2xl glass shimmer-card">
                <step.icon size={28} className="text-primary" strokeWidth={1.5} />
                <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-2 text-base font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-balance">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
