"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, LinkIcon, Calendar, GitBranch, Star, Eye, ArrowUpRight, Zap, Users, MessageSquare, GitMerge, Package } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/* ── Data ──────────────────────────────────────── */
const profile = {
  name: "Alex Chen",
  handle: "@alexchen",
  role: "Co-founder & CEO",
  bio: "Building the modern SaaS stack. Prev: Staff Eng @ Stripe, Eng @ Vercel. Writing about product, engineering, and design systems.",
  location: "San Francisco, CA",
  website: "sassify.io",
  joinedDate: "February 2026",
  stats: { projects: 31, posts: 12, followers: 2840, following: 148 },
  skills: ["Next.js", "TypeScript", "React", "Tailwind CSS", "System Design", "SaaS"],
};

type ActivityType = "commit" | "deploy" | "comment" | "merge" | "star" | "follow";

const activityFeed: { id: number; type: ActivityType; text: string; time: string; project?: string }[] = [
  { id: 1, type: "deploy",  text: "Deployed v0.3.0 to production",            time: "2h ago",   project: "sassify-app" },
  { id: 2, type: "commit",  text: "Added /settings, /profile, /notifications", time: "4h ago",   project: "sassify-app" },
  { id: 3, type: "commit",  text: "Built MDX blog and docs system",            time: "1d ago",   project: "sassify-app" },
  { id: 4, type: "comment", text: "Replied to @miatanaka on scaling post",     time: "1d ago" },
  { id: 5, type: "star",    text: "Starred vercel/ai-sdk",                     time: "2d ago" },
  { id: 6, type: "merge",   text: "Merged PR #24 — Auth pages",               time: "3d ago",   project: "sassify-app" },
  { id: 7, type: "deploy",  text: "Deployed v0.2.0 — Component library",      time: "3w ago",   project: "sassify-app" },
  { id: 8, type: "follow",  text: "Started following @jordanpark",            time: "1mo ago" },
];

const projects = [
  { name: "sassify-app",    desc: "Modern SaaS starter template",   lang: "TypeScript", stars: 284, gradient: "from-primary/20 to-secondary/10" },
  { name: "ui-components",  desc: "22+ production-ready components", lang: "TypeScript", stars: 156, gradient: "from-secondary/20 to-primary/10" },
  { name: "mdx-blog-kit",   desc: "Plug-and-play MDX blog system",   lang: "MDX",        stars: 93,  gradient: "from-primary/15 to-[#6366f1]/10" },
  { name: "lenis-gsap-kit", desc: "Smooth scroll + GSAP setup",      lang: "JavaScript", stars: 71,  gradient: "from-[#6366f1]/15 to-secondary/10" },
];

const activityIcon: Record<ActivityType, React.ReactNode> = {
  commit:  <GitBranch size={13} />,
  deploy:  <Zap size={13} />,
  comment: <MessageSquare size={13} />,
  merge:   <GitMerge size={13} />,
  star:    <Star size={13} />,
  follow:  <Users size={13} />,
};

const activityColor: Record<ActivityType, string> = {
  commit:  "bg-blue-500/10 text-blue-400",
  deploy:  "bg-primary/10 text-primary",
  comment: "bg-green-500/10 text-green-400",
  merge:   "bg-[#6366f1]/10 text-[#6366f1]",
  star:    "bg-yellow-500/10 text-yellow-400",
  follow:  "bg-secondary/10 text-secondary",
};

const langColor: Record<string, string> = {
  TypeScript:  "bg-blue-500",
  JavaScript:  "bg-yellow-500",
  MDX:         "bg-primary",
};

/* ── Page ──────────────────────────────────────── */
export default function ProfilePage() {
  const [tab, setTab] = useState<"activity" | "projects">("activity");

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 dot-grid opacity-20" />

      {/* Cover */}
      <div className="relative h-52 bg-gradient-to-br from-primary/30 via-[#6366f1]/20 to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        {/* Decorative orbs */}
        <div className="absolute -top-10 -right-10 size-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 size-48 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Avatar — overlaps cover */}
        <div className="relative -mt-14 flex items-end justify-between">
          <div className="relative">
            <div className="size-28 rounded-2xl border-4 border-background bg-primary/20 flex items-center justify-center overflow-hidden shadow-xl">
              <span className="text-3xl font-bold text-gradient">AC</span>
            </div>
            <span className="absolute bottom-1.5 right-1.5 size-4 rounded-full bg-green-500 ring-2 ring-background" />
          </div>
          <div className="flex gap-2 pb-2">
            <Button variant="outline" size="sm"><Users size={13} /> Follow</Button>
            <Button variant="primary" size="sm"><MessageSquare size={13} /> Message</Button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
            <span className="text-muted-foreground">{profile.handle}</span>
            <Badge variant="default" size="sm">{profile.role}</Badge>
          </div>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>

          {/* Meta row */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin size={12} />{profile.location}</span>
            <a href="#" className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
              <LinkIcon size={12} />{profile.website}
            </a>
            <span className="flex items-center gap-1"><Calendar size={12} />Joined {profile.joinedDate}</span>
          </div>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap gap-6 border-b border-border/60 pb-5">
            {[
              { label: "Projects",   value: profile.stats.projects },
              { label: "Posts",      value: profile.stats.posts },
              { label: "Followers",  value: profile.stats.followers.toLocaleString() },
              { label: "Following",  value: profile.stats.following },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-foreground">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mt-4 flex flex-wrap gap-2 border-b border-border/60 pb-5">
            {profile.skills.map((skill) => (
              <span key={skill} className="rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-1 border-b border-border/60">
          {(["activity", "projects"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px transition-all duration-150 cursor-pointer",
                tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="py-8">
          <AnimatePresence mode="wait">
            {tab === "activity" ? (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-1"
              >
                {activityFeed.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 rounded-xl px-4 py-3 hover:bg-muted/40 transition-colors">
                    <div className={cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg", activityColor[item.type])}>
                      {activityIcon[item.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        {item.text}
                        {item.project && (
                          <span className="ml-1.5 font-mono text-xs text-primary">
                            <Package size={10} className="inline mr-0.5" />{item.project}
                          </span>
                        )}
                      </p>
                    </div>
                    <time className="shrink-0 text-xs text-muted-foreground">{item.time}</time>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {projects.map((p) => (
                  <div key={p.name} className="group flex flex-col gap-3 rounded-xl border border-border/60 bg-card overflow-hidden hover:border-primary/30 transition-all duration-200 cursor-pointer">
                    {/* Gradient thumbnail */}
                    <div className={cn("h-24 bg-gradient-to-br", p.gradient, "relative overflow-hidden")}>
                      <div className="absolute inset-0 dot-grid opacity-40" />
                      <ArrowUpRight size={16} className="absolute right-3 top-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-col gap-2 px-4 pb-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star size={11} /> {p.stars}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{p.desc}</p>
                      <div className="flex items-center gap-1.5">
                        <span className={cn("size-2.5 rounded-full", langColor[p.lang] ?? "bg-muted-foreground")} />
                        <span className="text-xs text-muted-foreground">{p.lang}</span>
                        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground"><Eye size={11} /> Public</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
