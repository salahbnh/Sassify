import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — Sassify",
  description: "Sign in to your Sassify account to access your dashboard, billing, and settings.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
