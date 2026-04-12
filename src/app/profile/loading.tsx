export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-48 bg-muted animate-pulse" />
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="flex items-end gap-4 -mt-12 mb-8">
          <div className="size-24 rounded-2xl bg-muted animate-pulse ring-4 ring-background" />
          <div className="mb-2 flex flex-col gap-2">
            <div className="h-7 w-40 rounded bg-muted animate-pulse" />
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-10 w-48 rounded-lg bg-muted animate-pulse" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
