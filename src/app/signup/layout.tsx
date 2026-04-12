import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account — Sassify",
  description: "Start your free Sassify account. No credit card required. Launch your SaaS in minutes.",
  openGraph: {
    title: "Create your Sassify account",
    description: "Start your free Sassify account. No credit card required.",
    type: "website",
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
