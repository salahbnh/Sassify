import { cn } from "@/lib/utils";
import { Info, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

/* ── Typography ─────────────────────────────────── */

export const mdxComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="mt-10 mb-4 scroll-mt-24 text-3xl font-bold tracking-tight text-foreground first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: { children?: ReactNode; id?: string }) => (
    <h2
      {...props}
      className="mt-10 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight text-foreground border-b border-border/60 pb-2"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: { children?: ReactNode; id?: string }) => (
    <h3
      {...props}
      className="mt-8 mb-3 scroll-mt-24 text-xl font-semibold text-foreground"
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: { children?: ReactNode; id?: string }) => (
    <h4
      {...props}
      className="mt-6 mb-2 scroll-mt-24 text-base font-semibold text-foreground"
    >
      {children}
    </h4>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mb-5 leading-7 text-foreground/85">{children}</p>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => (
    <em className="italic text-foreground/80">{children}</em>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors duration-150 cursor-pointer"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-border/60" />,

  /* ── Lists ────────────────────────────── */
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mb-5 ml-5 flex flex-col gap-1.5 list-none">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mb-5 ml-5 flex flex-col gap-1.5 list-decimal list-outside">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="leading-7 text-foreground/85 flex items-start gap-2">
      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/70" />
      <span>{children}</span>
    </li>
  ),

  /* ── Code ─────────────────────────────── */
  code: ({ children, className }: { children?: ReactNode; className?: string }) => {
    // Block code (inside <pre>) — rehype-pretty-code handles the heavy lifting
    if (className) {
      return <code className={className}>{children}</code>;
    }
    // Inline code
    return (
      <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-primary">
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: { children?: ReactNode; [key: string]: unknown }) => (
    <pre
      {...props}
      className={cn(
        "group relative mb-5 overflow-x-auto rounded-xl border border-border/60 bg-[#0d0d14] p-5 text-sm leading-6",
        "[&_.line]:min-h-[1em]",
        "[&_[data-highlighted-line]]:bg-white/5 [&_[data-highlighted-line]]:-mx-5 [&_[data-highlighted-line]]:px-5",
        "[&_[data-line-numbers]]:pr-4 [&_[data-line-numbers]]:text-muted-foreground/50"
      )}
    >
      {children}
    </pre>
  ),

  /* ── Blockquote ───────────────────────── */
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-6 flex gap-4 rounded-xl border border-border/60 bg-muted/40 px-5 py-4">
      <span className="mt-0.5 shrink-0 text-primary">
        <Info size={16} />
      </span>
      <div className="text-sm leading-7 text-muted-foreground [&>p]:mb-0">{children}</div>
    </blockquote>
  ),

  /* ── Table ────────────────────────────── */
  table: ({ children }: { children?: ReactNode }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: ReactNode }) => (
    <thead className="bg-muted/50 border-b border-border/60">{children}</thead>
  ),
  tbody: ({ children }: { children?: ReactNode }) => (
    <tbody className="divide-y divide-border/40">{children}</tbody>
  ),
  tr: ({ children }: { children?: ReactNode }) => <tr>{children}</tr>,
  th: ({ children }: { children?: ReactNode }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="px-4 py-3 text-foreground/85">{children}</td>
  ),
};

/* ── Custom callout components ────────────────── */

interface CalloutProps { children?: ReactNode; title?: string }

export function Callout({ children, title }: CalloutProps) {
  return (
    <div className="my-6 flex gap-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
      <Lightbulb size={16} className="mt-0.5 shrink-0 text-primary" />
      <div>
        {title && <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>}
        <div className="text-sm leading-7 text-muted-foreground [&>p]:mb-0">{children}</div>
      </div>
    </div>
  );
}

export function Warning({ children, title }: CalloutProps) {
  return (
    <div className="my-6 flex gap-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-5 py-4">
      <AlertTriangle size={16} className="mt-0.5 shrink-0 text-yellow-500" />
      <div>
        {title && <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>}
        <div className="text-sm leading-7 text-muted-foreground [&>p]:mb-0">{children}</div>
      </div>
    </div>
  );
}

export function Success({ children, title }: CalloutProps) {
  return (
    <div className="my-6 flex gap-4 rounded-xl border border-green-500/20 bg-green-500/5 px-5 py-4">
      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-500" />
      <div>
        {title && <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>}
        <div className="text-sm leading-7 text-muted-foreground [&>p]:mb-0">{children}</div>
      </div>
    </div>
  );
}
