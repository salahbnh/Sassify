export default function DashboardLoading() {
  return (
    <div
      className="flex overflow-hidden bg-background"
      style={{ height: "calc(100vh - 68px)", marginTop: "68px" }}
    >
      {/* Sidebar skeleton */}
      <div className="hidden w-60 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="size-8 animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        </div>
        <div className="flex-1 space-y-1 p-3">
          <div className="mb-3 mt-2 h-3 w-16 animate-pulse rounded bg-muted/60 px-2" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 animate-pulse rounded-lg bg-muted" style={{ animationDelay: `${i * 60}ms` }} />
          ))}
          <div className="mb-3 mt-4 h-3 w-20 animate-pulse rounded bg-muted/60 px-2" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-9 animate-pulse rounded-lg bg-muted" style={{ animationDelay: `${(i + 5) * 60}ms` }} />
          ))}
        </div>
        <div className="space-y-1 border-t border-border p-3">
          <div className="h-9 animate-pulse rounded-lg bg-muted" />
          <div className="h-9 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>

      {/* Main skeleton */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sub-header */}
        <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-border/60 bg-card/60 px-6">
          <div className="space-y-1.5">
            <div className="h-4 w-40 animate-pulse rounded bg-muted" />
            <div className="h-3 w-28 animate-pulse rounded bg-muted/60" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-44 animate-pulse rounded-lg bg-muted" />
            <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />
            <div className="size-8 animate-pulse rounded-lg bg-muted" />
            <div className="size-8 animate-pulse rounded-lg bg-muted" />
            <div className="h-8 w-28 animate-pulse rounded-lg bg-muted" />
            <div className="size-8 animate-pulse rounded-full bg-muted" />
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Tab bar */}
          <div className="h-9 w-64 animate-pulse rounded-lg bg-muted" />

          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" style={{ animationDelay: `${i * 80}ms` }} />
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="h-72 animate-pulse rounded-xl bg-muted xl:col-span-2" />
            <div className="h-72 animate-pulse rounded-xl bg-muted" />
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="h-64 animate-pulse rounded-xl bg-muted" />
            <div className="space-y-4">
              <div className="h-44 animate-pulse rounded-xl bg-muted" />
              <div className="h-36 animate-pulse rounded-xl bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
