import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile — Sassify",
  description: "View and edit your Sassify profile.",
  robots: { index: false, follow: false },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
