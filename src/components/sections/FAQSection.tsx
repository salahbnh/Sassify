"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How does the free plan work?",
    a: "The free plan gives you full access to core features with up to 3 projects and 1GB storage — no credit card required, no time limit. Upgrade whenever your needs grow.",
  },
  {
    q: "Can I migrate from my current provider?",
    a: "Yes. Sassify provides one-click migration tools for the most popular platforms. Our team also offers free white-glove migration for Pro and Enterprise plans.",
  },
  {
    q: "What does 99.99% uptime SLA mean in practice?",
    a: "It means less than 52 minutes of downtime per year. We back this with financial credits — if we miss the SLA, you get service credits applied to your next invoice automatically.",
  },
  {
    q: "Is my data secure?",
    a: "Sassify is SOC 2 Type II certified. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We run in isolated customer environments with zero shared compute.",
  },
  {
    q: "Do you support custom domains?",
    a: "Custom domains are available on the Pro plan and above. SSL certificates are provisioned and auto-renewed for free. We support wildcard domains and multi-region routing.",
  },
  {
    q: "What kind of support do you offer?",
    a: "Free plans get community support. Pro plans get priority email support with a 4-hour SLA. Enterprise plans include a dedicated Slack channel and a named customer success engineer.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={cn("border-b border-border/50 last:border-0")}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer group"
      >
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
          {q}
        </span>
        <span className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-200">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 text-sm text-muted-foreground leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-widest text-primary mb-3"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-balance"
          >
            Questions &{" "}
            <span className="text-gradient">answers</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl px-6"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
