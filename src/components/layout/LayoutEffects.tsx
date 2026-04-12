"use client";

import { usePathname } from "next/navigation";
import { ScrollProgressBar } from "@/components/effects/ScrollProgressBar";
import { CursorSpotlight } from "@/components/effects/CursorSpotlight";
import { FloatingCTA } from "@/components/effects/FloatingCTA";
import { LiveToast } from "@/components/effects/LiveToast";

const HIDE_ON = ["/login", "/signup", "/forgot-password", "/sso-callback"];

export function LayoutEffects() {
  const pathname = usePathname();
  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;
  return (
    <>
      <ScrollProgressBar />
      <CursorSpotlight />
      <FloatingCTA />
      <LiveToast />
    </>
  );
}
