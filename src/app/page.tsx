import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";

// Below-fold sections: code-split so the initial JS bundle stays small.
// SSR is kept ON (default) so content is in the HTML for SEO.
const LogoMarqueeSection  = dynamic(() => import("@/components/sections/LogoMarqueeSection").then(m => ({ default: m.LogoMarqueeSection })));
const StatsSection        = dynamic(() => import("@/components/sections/StatsSection").then(m => ({ default: m.StatsSection })));
const FeaturesSection     = dynamic(() => import("@/components/sections/FeaturesSection").then(m => ({ default: m.FeaturesSection })));
const HowItWorksSection   = dynamic(() => import("@/components/sections/HowItWorksSection").then(m => ({ default: m.HowItWorksSection })));
const PricingSection      = dynamic(() => import("@/components/sections/PricingSection").then(m => ({ default: m.PricingSection })));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const FAQSection          = dynamic(() => import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection })));
const CTASection          = dynamic(() => import("@/components/sections/CTASection").then(m => ({ default: m.CTASection })));
const FooterSection       = dynamic(() => import("@/components/sections/FooterSection").then(m => ({ default: m.FooterSection })));

export const metadata: Metadata = {
  title: "Sassify — Modern SaaS Starter Template",
  description: "Production-ready Next.js SaaS template with auth, billing, blog, docs, and more. Ship your SaaS faster.",
  openGraph: {
    title: "Sassify — Modern SaaS Starter Template",
    description: "Production-ready Next.js SaaS template with auth, billing, blog, docs, and more.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LogoMarqueeSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
