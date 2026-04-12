export default function NotificationsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative mx-auto max-w-3xl px-6 py-28">
        <div className="mb-8 h-9 w-40 rounded-lg bg-muted animate-pulse" />
        <div className="flex gap-2 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-20 rounded-full bg-muted animate-pulse" />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
