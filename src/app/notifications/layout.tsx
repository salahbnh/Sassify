import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications — Sassify",
  description: "View your Sassify notifications and activity.",
  robots: { index: false, follow: false },
};

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
