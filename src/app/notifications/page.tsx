"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, BellOff, Check, CheckCheck, Trash2,
  MessageSquare, UserPlus, CreditCard, Zap, AlertCircle, Star, GitMerge,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/* ── Types & data ──────────────────────────────── */
type NotifType = "mention" | "comment" | "invite" | "billing" | "deploy" | "system" | "star" | "merge";
type Filter = "all" | "unread" | "mentions";

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  avatar?: string;
  avatarFallback?: string;
}

const initialNotifs: Notification[] = [
  { id: 1,  type: "mention",  title: "Mia Tanaka mentioned you",            body: "In a comment on 'Scaling SaaS with Next.js' — @alexchen what's your take on edge caching here?",   time: "5m ago",  read: false, avatarFallback: "MT" },
  { id: 2,  type: "deploy",   title: "Deployment successful",               body: "sassify-app v0.3.0 deployed to production in 42s",                                                 time: "2h ago",  read: false },
  { id: 3,  type: "invite",   title: "Jordan Park accepted your invite",     body: "Jordan joined Sassify as a Member",                                                                time: "4h ago",  read: false, avatarFallback: "JP" },
  { id: 4,  type: "billing",  title: "Invoice paid — $29.00",               body: "Your April 2026 invoice has been paid. Download receipt →",                                        time: "1d ago",  read: false },
  { id: 5,  type: "comment",  title: "New comment on your post",            body: "Sam Rivera replied: 'This section on GSAP cleanup is super helpful, never seen it explained this clearly.'", time: "1d ago", read: true, avatarFallback: "SR" },
  { id: 6,  type: "star",     title: "sassify-app reached 250 stars",       body: "Your repository sassify-app just hit 250 GitHub stars 🎉",                                           time: "2d ago",  read: true },
  { id: 7,  type: "merge",    title: "PR #24 merged",                       body: "Auth pages — Login, Signup, Forgot Password was merged into main",                                 time: "3d ago",  read: true },
  { id: 8,  type: "system",   title: "Scheduled maintenance",               body: "Sassify will undergo maintenance on Apr 12, 2026 from 02:00–04:00 UTC. Expect brief downtime.",   time: "4d ago",  read: true },
  { id: 9,  type: "mention",  title: "Jordan Park mentioned you",           body: "In the team channel — hey @alexchen can you review the design tokens PR?",                        time: "5d ago",  read: true, avatarFallback: "JP" },
  { id: 10, type: "billing",  title: "Usage alert — API calls at 88%",     body: "You've used 88,000 of your 100,000 monthly API calls. Consider upgrading.",                        time: "1w ago",  read: true },
];

/* ── Icon & color map ──────────────────────────── */
const typeConfig: Record<NotifType, { icon: React.ReactNode; bg: string; color: string }> = {
  mention:  { icon: <MessageSquare size={14} />, bg: "bg-primary/10",       color: "text-primary" },
  comment:  { icon: <MessageSquare size={14} />, bg: "bg-blue-500/10",      color: "text-blue-400" },
  invite:   { icon: <UserPlus size={14} />,      bg: "bg-green-500/10",     color: "text-green-400" },
  billing:  { icon: <CreditCard size={14} />,    bg: "bg-yellow-500/10",    color: "text-yellow-400" },
  deploy:   { icon: <Zap size={14} />,           bg: "bg-primary/10",       color: "text-primary" },
  system:   { icon: <AlertCircle size={14} />,   bg: "bg-muted",            color: "text-muted-foreground" },
  star:     { icon: <Star size={14} />,          bg: "bg-yellow-500/10",    color: "text-yellow-400" },
  merge:    { icon: <GitMerge size={14} />,      bg: "bg-[#6366f1]/10",     color: "text-[#6366f1]" },
};

/* ── Single notification row ────────────────────── */
function NotifRow({ notif, onRead, onDelete }: { notif: Notification; onRead: (id: number) => void; onDelete: (id: number) => void }) {
  const cfg = typeConfig[notif.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative flex items-start gap-4 rounded-xl border px-5 py-4 transition-all duration-200",
        notif.read
          ? "border-border/40 bg-card/60"
          : "border-primary/20 bg-primary/3 shadow-[0_0_0_1px_rgba(168,85,247,0.06)]"
      )}
    >
      {/* Unread dot */}
      {!notif.read && (
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-primary" />
      )}

      {/* Icon or avatar */}
      <div className="shrink-0 mt-0.5">
        {notif.avatarFallback ? (
          <Avatar size="sm" fallback={notif.avatarFallback} />
        ) : (
          <div className={cn("flex size-8 items-center justify-center rounded-xl", cfg.bg, cfg.color)}>
            {cfg.icon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <p className={cn("text-sm font-medium leading-tight", notif.read ? "text-muted-foreground" : "text-foreground")}>
            {notif.title}
          </p>
          <time className="shrink-0 text-xs text-muted-foreground">{notif.time}</time>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">{notif.body}</p>
      </div>

      {/* Hover actions */}
      <div className="absolute right-4 top-3 hidden items-center gap-1 group-hover:flex">
        {!notif.read && (
          <button
            onClick={() => onRead(notif.id)}
            className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground hover:text-primary hover:border-primary/40 transition-all cursor-pointer"
            title="Mark as read"
          >
            <Check size={12} />
          </button>
        )}
        <button
          onClick={() => onDelete(notif.id)}
          className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground hover:text-red-500 hover:border-red-500/30 transition-all cursor-pointer"
          title="Dismiss"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Page ──────────────────────────────────────── */
export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifs);
  const [filter, setFilter] = useState<Filter>("all");

  const unreadCount = notifs.filter((n) => !n.read).length;

  const filtered = notifs.filter((n) => {
    if (filter === "unread")   return !n.read;
    if (filter === "mentions") return n.type === "mention";
    return true;
  });

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: number) {
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }

  function dismiss(id: number) {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  }

  const filters: { id: Filter; label: string }[] = [
    { id: "all",      label: "All" },
    { id: "unread",   label: `Unread${unreadCount ? ` (${unreadCount})` : ""}` },
    { id: "mentions", label: "Mentions" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 dot-grid opacity-20" />

      <div className="relative mx-auto max-w-2xl px-6 py-28">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Bell size={20} className="text-foreground" />
              <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "You're all caught up"}
            </p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllRead}>
                <CheckCheck size={13} /> Mark all read
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setNotifs([])}>
              <BellOff size={13} /> Clear all
            </Button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex gap-1 border-b border-border/60">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-all duration-150 cursor-pointer",
                filter === f.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div className="flex flex-col gap-2">
              {filtered.map((n) => (
                <NotifRow key={n.id} notif={n} onRead={markRead} onDelete={dismiss} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-4 py-24 text-center"
            >
              <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <BellOff size={24} />
              </div>
              <div>
                <p className="font-semibold text-foreground">No notifications</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {filter === "unread" ? "You're all caught up!" : "Nothing to show here yet."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification type legend */}
        {filtered.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3 border-t border-border/60 pt-6">
            {(Object.entries(typeConfig) as [NotifType, typeof typeConfig[NotifType]][])
              .filter(([type]) => filtered.some((n) => n.type === type))
              .map(([type, cfg]) => (
                <div key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground capitalize">
                  <div className={cn("flex size-4 items-center justify-center rounded", cfg.bg, cfg.color)}>
                    {cfg.icon}
                  </div>
                  {type}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
