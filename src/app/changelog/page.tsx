import { releases, type Release, type ChangeType, type ReleaseType } from "@/lib/changelog-data";
import { Badge } from "@/components/ui/Badge";
import { Plus, Zap, Wrench, Trash2 } from "lucide-react";

export const metadata = {
  title: "Changelog — Sassify",
  description: "Every release, what changed, and why.",
};

/* ── Helpers ──────────────────────────────────────────── */

const releaseTypeConfig: Record<ReleaseType, { label: string; variant: "default" | "success" | "warning" | "secondary"; dot: string }> = {
  major: { label: "Major",  variant: "default",   dot: "bg-primary" },
  minor: { label: "Minor",  variant: "success",   dot: "bg-green-500" },
  patch: { label: "Patch",  variant: "secondary", dot: "bg-muted-foreground" },
};

const changeTypeConfig: Record<ChangeType, { label: string; icon: React.ReactNode; color: string; bg: string; border: string }> = {
  added:   {
    label: "Added",
    icon: <Plus size={12} strokeWidth={2.5} />,
    color: "text-green-400",
    bg:    "bg-green-500/8",
    border: "border-green-500/15",
  },
  improved: {
    label: "Improved",
    icon: <Zap size={12} strokeWidth={2.5} />,
    color: "text-blue-400",
    bg:    "bg-blue-500/8",
    border: "border-blue-500/15",
  },
  fixed: {
    label: "Fixed",
    icon: <Wrench size={12} strokeWidth={2.5} />,
    color: "text-yellow-400",
    bg:    "bg-yellow-500/8",
    border: "border-yellow-500/15",
  },
  removed: {
    label: "Removed",
    icon: <Trash2 size={12} strokeWidth={2.5} />,
    color: "text-red-400",
    bg:    "bg-red-500/8",
    border: "border-red-500/15",
  },
};

function ChangeGroup({ group }: { group: Release["changes"][number] }) {
  const cfg = changeTypeConfig[group.type];
  return (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} p-4`}>
      <div className={`mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest ${cfg.color}`}>
        {cfg.icon}
        {cfg.label}
      </div>
      <ul className="flex flex-col gap-2">
        {group.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
            <span className={`mt-2 size-1.5 shrink-0 rounded-full ${cfg.color.replace("text-", "bg-")}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReleaseCard({ release, isLatest }: { release: Release; isLatest: boolean }) {
  const rtCfg = releaseTypeConfig[release.type];

  return (
    <div className="relative flex gap-8">
      {/* Timeline spine + dot */}
      <div className="flex flex-col items-center">
        <div className={`mt-1 size-3 shrink-0 rounded-full ring-4 ring-background ${rtCfg.dot} ${isLatest ? "ring-primary/30 shadow-[0_0_12px_rgba(168,85,247,0.4)]" : ""}`} />
        <div className="mt-2 w-px flex-1 bg-border/60" />
      </div>

      {/* Content */}
      <div className="pb-14 flex-1 min-w-0">
        {/* Header */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-lg font-bold text-foreground">
                v{release.version}
              </span>
              <Badge variant={rtCfg.variant} size="sm">{rtCfg.label}</Badge>
              {isLatest && (
                <Badge variant="default" size="sm">Latest</Badge>
              )}
            </div>
            <h2 className="text-xl font-bold text-foreground">{release.title}</h2>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              {release.summary}
            </p>
          </div>
          <time className="shrink-0 rounded-lg border border-border/60 bg-muted/40 px-3 py-1.5 font-mono text-xs text-muted-foreground">
            {new Date(release.date).toLocaleDateString("en-US", {
              month: "long", day: "numeric", year: "numeric",
            })}
          </time>
        </div>

        {/* Change groups */}
        <div className="flex flex-col gap-3">
          {release.changes.map((group, i) => (
            <ChangeGroup key={i} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 dot-grid opacity-25" />
      <div className="pointer-events-none fixed top-0 right-0 size-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/6 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6 py-32">
        {/* Page header */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="default">Changelog</Badge>
            <span className="text-sm text-muted-foreground">{releases.length} releases</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground lg:text-5xl">
            What&apos;s new in<br />
            <span className="text-gradient">Sassify</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Every release, what changed, and why. New versions ship every few weeks.
          </p>
        </div>

        {/* Timeline */}
        <div>
          {releases.map((release, i) => (
            <ReleaseCard key={release.version} release={release} isLatest={i === 0} />
          ))}

          {/* Timeline end cap */}
          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <div className="size-3 rounded-full border-2 border-border/60 bg-background" />
            </div>
            <p className="pb-4 text-sm text-muted-foreground">The beginning of Sassify</p>
          </div>
        </div>
      </div>
    </div>
  );
}
