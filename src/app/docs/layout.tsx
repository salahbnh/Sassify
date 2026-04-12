import { DocsSidebar } from "@/components/docs/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 dot-grid opacity-20" />
      <div className="relative mx-auto max-w-6xl px-6 py-28">
        <div className="flex gap-12">
          <DocsSidebar />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
