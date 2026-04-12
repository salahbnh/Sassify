import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />
      <div className="blob-1 pointer-events-none absolute left-1/4 top-1/4 size-72 opacity-20" />
      <div className="blob-2 pointer-events-none absolute right-1/4 bottom-1/4 size-72 opacity-15" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-gradient text-[120px] font-black leading-none tracking-tighter">404</p>

        <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-sm text-base text-muted-foreground">
          This page doesn&apos;t exist or has been moved. Check the URL or head back home.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
          >
            <Search size={15} /> Browse docs
          </Link>
        </div>
      </div>
    </div>
  );
}
