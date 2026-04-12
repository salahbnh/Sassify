import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — Sassify",
  description: "Manage your Sassify account settings, billing, and team.",
  robots: { index: false, follow: false },
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
