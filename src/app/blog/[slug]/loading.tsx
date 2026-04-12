export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-background py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="h-4 w-32 rounded bg-muted animate-pulse mb-8" />
        <div className="h-10 w-full rounded-lg bg-muted animate-pulse mb-4" />
        <div className="h-10 w-3/4 rounded-lg bg-muted animate-pulse mb-6" />
        <div className="flex gap-3 mb-10">
          <div className="size-10 rounded-full bg-muted animate-pulse" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-28 rounded bg-muted animate-pulse" />
            <div className="h-3 w-20 rounded bg-muted animate-pulse" />
          </div>
        </div>
        <div className="h-72 rounded-2xl bg-muted animate-pulse mb-10" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`h-4 rounded bg-muted animate-pulse mb-3 ${i % 4 === 3 ? "w-2/3" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}
