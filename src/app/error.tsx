"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Icon */}
        <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/20">
          <AlertTriangle size={36} className="text-red-500" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-3 max-w-md text-base text-muted-foreground">
          An unexpected error occurred. You can try again or return to the homepage.
        </p>

        {/* Error digest */}
        {error.digest && (
          <p className="mt-3 rounded-lg bg-muted/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" onClick={reset} className="gap-2">
            <RotateCcw size={15} /> Try again
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")} className="gap-2">
            <Home size={15} /> Go home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
