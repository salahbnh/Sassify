"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav, slugToHref } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <nav className="flex flex-col gap-6">
      {docsNav.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {section.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const href = slugToHref(item.slug);
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-all duration-150 cursor-pointer",
                      active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-lg lg:hidden cursor-pointer"
        aria-label="Open docs navigation"
      >
        <Menu size={18} />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-background border-r border-border p-6 overflow-y-auto">
            <div className="mb-6 flex items-center justify-between">
              <Link href="/docs/getting-started/introduction" className="flex items-center gap-2 text-sm font-bold text-foreground">
                <BookOpen size={16} className="text-primary" />
                Documentation
              </Link>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <SidebarContent pathname={pathname} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 shrink-0">
        <div className="sticky top-24 overflow-y-auto max-h-[calc(100vh-7rem)]">
          <div className="mb-6 flex items-center gap-2">
            <BookOpen size={15} className="text-primary" />
            <span className="text-sm font-semibold text-foreground">Documentation</span>
          </div>
          <SidebarContent pathname={pathname} />
        </div>
      </aside>
    </>
  );
}
