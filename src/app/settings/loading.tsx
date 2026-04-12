export default function SettingsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative mx-auto max-w-5xl px-6 py-28">
        <div className="mb-10">
          <div className="h-9 w-32 rounded-lg bg-muted animate-pulse" />
          <div className="mt-2 h-4 w-72 rounded bg-muted animate-pulse" />
        </div>
        <div className="flex gap-8 lg:flex-row flex-col">
          <aside className="lg:w-52 shrink-0">
            <div className="flex flex-col gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-9 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          </aside>
          <div className="flex-1 flex flex-col gap-6">
            <div className="h-48 rounded-xl bg-muted animate-pulse" />
            <div className="h-32 rounded-xl bg-muted animate-pulse" />
            <div className="h-64 rounded-xl bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
