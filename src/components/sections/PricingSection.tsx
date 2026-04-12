"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "For individuals and small projects.",
    features: ["Up to 3 projects", "1GB storage", "Community support", "Basic analytics"],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For growing teams that need more power.",
    features: ["Unlimited projects", "100GB storage", "Priority support", "Advanced analytics", "Custom domains", "AI features"],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large organizations with custom needs.",
    features: ["Everything in Pro", "Dedicated infrastructure", "SLA guarantees", "SSO / SAML", "Audit logs", "Custom contracts"],
    cta: "Talk to sales",
    highlighted: false,
  },
];

export function PricingSection() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCta(planName: string) {
    if (planName === "Starter") {
      router.push("/signup");
      return;
    }
    if (planName === "Enterprise") {
      window.location.href = "mailto:sales@sassify.com";
      return;
    }
    // Pro — create Stripe checkout session
    setLoading(planName);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey: "PRO" }),
      });
      if (res.status === 401) {
        // Not signed in — send to signup with plan pre-selected
        router.push("/signup?plan=pro");
        return;
      }
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // silently handle; user can retry
    } finally {
      setLoading(null);
    }
  }

  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[var(--grad-purple)] opacity-5 blur-[100px]" />
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
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-balance"
          >
            Simple, transparent{" "}
            <span className="text-gradient">pricing</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={plan.highlighted ? "md:-my-4" : ""}
            >
              <TiltCard
                className={cn(
                  "rounded-2xl p-8 shimmer-card transition-all duration-300 cursor-default",
                  plan.highlighted
                    ? "glass glow-purple border-primary/30"
                    : "glass"
                )}
              >
                {plan.highlighted && (
                  <div className="mb-4 inline-flex rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                    Most popular
                  </div>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-3 mb-1 flex items-end gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="mb-1 text-sm text-muted-foreground">/{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <button
                  onClick={() => handleCta(plan.name)}
                  disabled={loading === plan.name}
                  className={cn(
                    "w-full rounded-xl py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed",
                    plan.highlighted
                      ? "bg-primary text-white hover:opacity-90"
                      : "glass hover:bg-white/8"
                  )}
                >
                  {loading === plan.name && <Loader2 size={14} className="animate-spin" />}
                  {plan.cta}
                </button>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Check size={14} className="shrink-0 text-primary" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
