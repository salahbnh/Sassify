import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { LayoutEffects } from "@/components/layout/LayoutEffects";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sassify — Modern SaaS Platform",
  description: "The modern SaaS platform that scales with your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ClerkProvider>
        <ThemeProvider>
        <SmoothScrollProvider>
          <Navbar />
          <LayoutEffects />
          {children}
        </SmoothScrollProvider>
        </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
