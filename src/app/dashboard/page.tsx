"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import {
  LayoutDashboard, Users, DollarSign, TrendingUp,
  Bell, Search, Settings, HelpCircle, FileText,
  BarChart2, MessageSquare, ArrowUpRight, ArrowDownRight,
  Activity, Zap, Star, MoreHorizontal, Calendar,
  Download, Plus, AlertCircle, CheckCircle2,
  Package, ShoppingCart, ChevronRight, Layers, Filter,
  RefreshCw, ExternalLink, Menu, X,
} from "lucide-react";
import {
  Sidebar, SidebarHeader, SidebarContent,
  SidebarFooter, SidebarSection, SidebarNavItem,
} from "@/components/ui/Sidebar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { BarChart, LineChart, DonutChart } from "@/components/ui/Chart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";

/* ──────────────────────────────── mock data ──────────────────────────────── */

const revenueData = [
  { label: "Jan", value: 82 }, { label: "Feb", value: 91 },
  { label: "Mar", value: 87 }, { label: "Apr", value: 103 },
  { label: "May", value: 118 }, { label: "Jun", value: 112 },
  { label: "Jul", value: 128 }, { label: "Aug", value: 143 },
];

const signupsData = [
  { label: "W1", value: 44 }, { label: "W2", value: 63 },
  { label: "W3", value: 58 }, { label: "W4", value: 71 },
  { label: "W5", value: 85 }, { label: "W6", value: 79 },
  { label: "W7", value: 94 }, { label: "W8", value: 102 },
];

const trafficData = [
  { label: "Organic Search", value: 42, color: "#a855f7" },
  { label: "Paid Ads",       value: 28, color: "#06b6d4" },
  { label: "Referral",       value: 18, color: "#6366f1" },
  { label: "Direct",         value: 12, color: "#f472b6" },
];

const planData = [
  { label: "Enterprise", value: 48, color: "#a855f7" },
  { label: "Pro",        value: 35, color: "#06b6d4" },
  { label: "Starter",    value: 17, color: "#6366f1" },
];

const kpis = [
  {
    title: "Total Revenue",    value: "$142,850", change: "+12.5%", up: true,  good: true,
    icon: DollarSign, iconColor: "text-purple-400", iconBg: "bg-purple-500/10",
  },
  {
    title: "Active Users",     value: "8,249",    change: "+8.3%",  up: true,  good: true,
    icon: Users,      iconColor: "text-cyan-400",   iconBg: "bg-cyan-500/10",
  },
  {
    title: "New Subscriptions",value: "384",      change: "+23.1%", up: true,  good: true,
    icon: Zap,        iconColor: "text-indigo-400", iconBg: "bg-indigo-500/10",
  },
  {
    title: "Churn Rate",       value: "2.4%",     change: "-0.8%",  up: false, good: true,
    icon: Activity,   iconColor: "text-emerald-400", iconBg: "bg-emerald-500/10",
  },
];

const customers = [
  { name: "Acme Corp",     email: "admin@acme.com",     plan: "Enterprise", revenue: "$2,400", status: "active",  fallback: "AC" },
  { name: "Globex Inc",    email: "billing@globex.io",   plan: "Pro",        revenue: "$290",   status: "active",  fallback: "GI" },
  { name: "Initech Ltd",   email: "team@initech.com",    plan: "Pro",        revenue: "$290",   status: "trial",   fallback: "IL" },
  { name: "Umbrella Co",   email: "ops@umbrella.com",    plan: "Enterprise", revenue: "$2,400", status: "active",  fallback: "UC" },
  { name: "Soylent Corp",  email: "hi@soylent.io",       plan: "Starter",    revenue: "$49",    status: "paused",  fallback: "SC" },
  { name: "Veridian Dyn.", email: "pay@veridian.io",     plan: "Pro",        revenue: "$290",   status: "active",  fallback: "VD" },
];

const activities = [
  { icon: CheckCircle2, iconColor: "text-emerald-400", iconBg: "bg-emerald-500/10", title: "New user signed up",      sub: "jessica@example.com joined on Pro plan",           time: "2m ago"  },
  { icon: DollarSign,   iconColor: "text-purple-400",  iconBg: "bg-purple-500/10",  title: "Payment received",        sub: "$2,400 monthly renewal from Acme Corp",             time: "8m ago"  },
  { icon: TrendingUp,   iconColor: "text-cyan-400",    iconBg: "bg-cyan-500/10",    title: "Subscription upgraded",   sub: "Initech Ltd upgraded from Starter → Pro",           time: "23m ago" },
  { icon: AlertCircle,  iconColor: "text-amber-400",   iconBg: "bg-amber-500/10",   title: "API usage warning",       sub: "Globex Inc approaching monthly rate limit",          time: "1h ago"  },
  { icon: Star,         iconColor: "text-indigo-400",  iconBg: "bg-indigo-500/10",  title: "New 5-star review",       sub: '"Absolutely love the product!" — Sarah T.',          time: "2h ago"  },
  { icon: Package,      iconColor: "text-rose-400",    iconBg: "bg-rose-500/10",    title: "Trial expired",           sub: "Free trial ended for trial_user_3891",               time: "3h ago"  },
];

const goals = [
  { label: "Monthly Revenue", value: 89, variant: "gradient" as const },
  { label: "Active Users",    value: 82, variant: "default"  as const },
  { label: "NPS Score",       value: 93, variant: "success"  as const },
  { label: "Support SLA",     value: 94, variant: "warning"  as const },
];

const funnel = [
  { stage: "Visitors",       count: "48,291", pct: 100 },
  { stage: "Sign-ups",       count: "6,842",  pct: 42  },
  { stage: "Activated",      count: "3,209",  pct: 28  },
  { stage: "Converted",      count: "1,104",  pct: 16  },
  { stage: "Retained (90d)", count: "891",    pct: 11  },
];

const reports = [
  { name: "Monthly Revenue Report",   date: "Aug 1, 2025",  size: "2.4 MB", status: "ready",      type: "Revenue"  },
  { name: "User Acquisition Report",  date: "Aug 1, 2025",  size: "1.1 MB", status: "ready",      type: "Users"    },
  { name: "Churn Analysis Q2 2025",   date: "Jul 15, 2025", size: "3.7 MB", status: "ready",      type: "Churn"    },
  { name: "Weekly Active Users",      date: "Aug 10, 2025", size: "0.8 MB", status: "ready",      type: "Users"    },
  { name: "NPS Survey Results",       date: "Jul 31, 2025", size: "1.5 MB", status: "ready",      type: "Feedback" },
  { name: "Enterprise Usage Report",  date: "Aug 5, 2025",  size: "4.2 MB", status: "generating", type: "Usage"    },
];

/* ──────────────────────────────── animation ──────────────────────────────── */

const item = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

/* ──────────────────────────────── helpers ────────────────────────────────── */

function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <Card variant="elevated" padding="none" className={cn("overflow-hidden", className)}>
      {children}
    </Card>
  );
}

function PanelBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

function PanelHead({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

/* ──────────────────────────────── page ───────────────────────────────────── */

/* ──────────────────────────────── greeting helpers ──────────────────────────────── */

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

/* ──────────────────────────────── sidebar nav content ──────────────────────────── */

function SidebarNav({
  activeNav,
  setActiveNav,
  onNavigate,
}: {
  activeNav: string;
  setActiveNav: (id: string) => void;
  onNavigate?: () => void;
}) {
  function nav(id: string, icon: React.ReactNode, label: string, badge?: string) {
    return (
      <SidebarNavItem
        key={id}
        icon={icon}
        label={label}
        badge={badge}
        active={activeNav === id}
        onClick={(e) => { e.preventDefault(); setActiveNav(id); onNavigate?.(); }}
      />
    );
  }

  return (
    <>
      <SidebarContent>
        <SidebarSection label="Main">
          {nav("overview",  <LayoutDashboard size={16} />, "Overview")}
          {nav("analytics", <BarChart2       size={16} />, "Analytics")}
          {nav("customers", <Users           size={16} />, "Customers")}
          {nav("revenue",   <DollarSign      size={16} />, "Revenue")}
          {nav("orders",    <ShoppingCart    size={16} />, "Orders", "12")}
        </SidebarSection>
        <SidebarSection label="Workspace">
          {nav("reports",  <FileText      size={16} />, "Reports")}
          {nav("messages", <MessageSquare size={16} />, "Messages", "3")}
          {nav("schedule", <Calendar      size={16} />, "Schedule")}
        </SidebarSection>
      </SidebarContent>
      <SidebarFooter>
        <SidebarNavItem icon={<Settings   size={16} />} label="Settings"   href="/settings" />
        <SidebarNavItem icon={<HelpCircle size={16} />} label="Help & Docs" href="/docs" />
      </SidebarFooter>
    </>
  );
}

/* ──────────────────────────────── page ───────────────────────────────────── */

export default function DashboardPage() {
  const { user } = useUser();
  const [activeNav, setActiveNav] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const firstName = user?.firstName ?? user?.username ?? "there";
  const greeting = useMemo(() => `${getGreeting()}, ${firstName} 👋`, [firstName]);
  const formattedDate = useMemo(() => getFormattedDate(), []);

  const logoMark = (
    <div className="flex items-center gap-2.5">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 shadow-sm">
        <Layers size={15} className="text-white" />
      </div>
      <span className="text-sm font-bold text-foreground">Sassify</span>
    </div>
  );

  return (
    <div
      className="flex overflow-hidden bg-background"
      style={{ height: "calc(100vh - 68px)", marginTop: "68px" }}
    >
      {/* ═══════════════════════════ DESKTOP SIDEBAR ═══════════════════════════ */}
      <div className="hidden lg:block h-full shrink-0">
        <Sidebar>
          <SidebarHeader>{logoMark}</SidebarHeader>
          <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} />
        </Sidebar>
      </div>

      {/* ═══════════════════════════ MOBILE SIDEBAR ════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card lg:hidden"
              style={{ top: "68px" }}
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <div className="flex h-14 items-center justify-between border-b border-border px-4">
                {logoMark}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
              <Sidebar collapsible={false} className="border-0 flex-1 h-auto w-full">
                <SidebarNav
                  activeNav={activeNav}
                  setActiveNav={setActiveNav}
                  onNavigate={() => setMobileOpen(false)}
                />
              </Sidebar>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════ MAIN ══════════════════════════════ */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* ── Sub-header ── */}
        <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-border/60 bg-card/60 px-4 sm:px-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={18} />
            </button>
            <div>
              <p className="text-sm font-semibold leading-none text-foreground">{greeting}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-8 w-44 rounded-lg border border-border bg-muted/50 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Date toggle */}
            <Button variant="outline" size="sm" className="hidden md:flex h-8 gap-1.5 px-3 text-xs">
              <Calendar size={12} /> Aug 2025
            </Button>

            {/* Icon actions */}
            {[
              { icon: <Download size={15} /> },
            ].map((a, i) => (
              <button key={i} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                {a.icon}
              </button>
            ))}

            {/* Notifications */}
            <button className="relative flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Bell size={15} />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />
            </button>

            {/* CTA */}
            <Button variant="gradient" size="sm" className="h-8 gap-1.5 px-3 text-xs">
              <Plus size={13} />
              <span className="hidden sm:inline">New Report</span>
            </Button>

            <Avatar fallback="AJ" size="sm" status="online" className="cursor-pointer" />
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Tabs defaultValue="overview" variant="underline" className="gap-0">

              {/* Tab bar */}
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              {/* ═══════════════════ TAB: OVERVIEW ═══════════════════ */}
              <TabsContent value="overview" className="space-y-5">

                {/* KPI cards */}
                <motion.div
                  className="grid grid-cols-2 gap-4 xl:grid-cols-4"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                >
                  {kpis.map((kpi) => {
                    const Icon = kpi.icon;
                    return (
                      <motion.div key={kpi.title} variants={item}>
                        <Panel>
                          <PanelBody>
                            <div className="mb-4 flex items-start justify-between">
                              <div className={cn("flex size-10 items-center justify-center rounded-xl", kpi.iconBg)}>
                                <Icon size={18} className={kpi.iconColor} />
                              </div>
                              <Badge variant={kpi.good ? "success" : "danger"} size="sm" className="gap-0.5 text-[11px]">
                                {kpi.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                                {kpi.change}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{kpi.title}</p>
                            <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{kpi.value}</p>
                            <p className="mt-1 text-[11px] text-muted-foreground/60">vs last month</p>
                          </PanelBody>
                        </Panel>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Revenue chart + plan donut */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                  <Panel className="xl:col-span-2">
                    <PanelBody>
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">Revenue Overview</h3>
                          <p className="mt-0.5 text-xs text-muted-foreground">Monthly recurring revenue (in thousands)</p>
                        </div>
                        <div className="flex items-center gap-1 rounded-lg bg-muted p-0.5">
                          <span className="rounded-md bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">MRR</span>
                          <span className="cursor-pointer px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground">ARR</span>
                        </div>
                      </div>
                      <LineChart data={revenueData} height={180} filled showDots />
                      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border/50 pt-4">
                        {[
                          { label: "This month", value: "$143k" },
                          { label: "Monthly avg", value: "$108k" },
                          { label: "YTD total",   value: "$864k" },
                        ].map((s) => (
                          <div key={s.label}>
                            <p className="text-[11px] text-muted-foreground">{s.label}</p>
                            <p className="mt-0.5 text-sm font-semibold text-foreground">{s.value}</p>
                          </div>
                        ))}
                      </div>
                    </PanelBody>
                  </Panel>

                  <Panel>
                    <PanelBody>
                      <PanelHead title="Revenue by Plan" sub="Distribution across tiers" />
                      <div className="flex justify-center">
                        <DonutChart
                          data={planData}
                          size={148}
                          thickness={30}
                          showLegend
                          className="flex-col items-center gap-4"
                          centerLabel="tiers"
                          centerValue="3"
                        />
                      </div>
                    </PanelBody>
                  </Panel>
                </div>

                {/* Activity feed + Goals/Traffic */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {/* Activity feed */}
                  <Panel>
                    <PanelBody>
                      <PanelHead
                        title="Recent Activity"
                        sub="Live feed across your workspace"
                        action={
                          <button className="flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary/80">
                            View all <ChevronRight size={12} />
                          </button>
                        }
                      />
                      <div className="space-y-3.5">
                        {activities.map((a, i) => {
                          const Icon = a.icon;
                          return (
                            <div key={i} className="flex items-start gap-3">
                              <div className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg", a.iconBg)}>
                                <Icon size={13} className={a.iconColor} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-foreground">{a.title}</p>
                                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{a.sub}</p>
                              </div>
                              <span className="mt-0.5 shrink-0 text-[10px] text-muted-foreground/50">{a.time}</span>
                            </div>
                          );
                        })}
                      </div>
                    </PanelBody>
                  </Panel>

                  {/* Goals + Traffic stacked */}
                  <div className="flex flex-col gap-4">
                    <Panel>
                      <PanelBody>
                        <PanelHead
                          title="Goal Progress"
                          sub="August 2025 targets"
                          action={<Badge variant="secondary" size="sm">Month</Badge>}
                        />
                        <div className="space-y-3.5">
                          {goals.map((g) => (
                            <Progress key={g.label} value={g.value} size="sm" variant={g.variant} showLabel label={g.label} />
                          ))}
                        </div>
                      </PanelBody>
                    </Panel>

                    <Panel>
                      <PanelBody>
                        <PanelHead title="Traffic Sources" sub="Where your users come from" />
                        <DonutChart
                          data={trafficData}
                          size={100}
                          thickness={22}
                          showLegend
                          centerValue="4"
                          centerLabel="sources"
                        />
                      </PanelBody>
                    </Panel>
                  </div>
                </div>

                {/* Weekly signups + Top customers */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                  <Panel>
                    <PanelBody>
                      <PanelHead title="Weekly Sign-ups" sub="New users over 8 weeks" />
                      <BarChart data={signupsData} height={150} showGrid showValues />
                      <div className="mt-3 flex items-center gap-1.5 text-xs">
                        <span className="flex items-center gap-0.5 font-semibold text-emerald-500">
                          <ArrowUpRight size={13} /> +31.6%
                        </span>
                        <span className="text-muted-foreground">vs previous 8 weeks</span>
                      </div>
                    </PanelBody>
                  </Panel>

                  <Panel className="xl:col-span-2">
                    <PanelBody>
                      <PanelHead
                        title="Top Customers"
                        sub="Highest-value accounts this month"
                        action={
                          <Button variant="outline" size="xs" className="gap-1 text-xs">
                            <Plus size={11} /> Add
                          </Button>
                        }
                      />
                      <div className="-mx-1 overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-border/50">
                              <th className="pb-2.5 pl-1 text-left font-medium text-muted-foreground">Customer</th>
                              <th className="hidden pb-2.5 text-left font-medium text-muted-foreground sm:table-cell">Plan</th>
                              <th className="pb-2.5 text-right font-medium text-muted-foreground">MRR</th>
                              <th className="hidden pb-2.5 text-right font-medium text-muted-foreground md:table-cell">Status</th>
                              <th className="w-8 pb-2.5" />
                            </tr>
                          </thead>
                          <tbody>
                            {customers.map((c, i) => (
                              <tr key={i} className="group border-b border-border/30 last:border-0 transition-colors hover:bg-muted/20">
                                <td className="py-2.5 pl-1">
                                  <div className="flex items-center gap-2.5">
                                    <Avatar fallback={c.fallback} size="xs" />
                                    <div className="min-w-0">
                                      <p className="font-medium text-foreground">{c.name}</p>
                                      <p className="hidden text-[10px] text-muted-foreground/70 sm:block">{c.email}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="hidden py-2.5 sm:table-cell">
                                  <Badge
                                    variant={c.plan === "Enterprise" ? "default" : c.plan === "Pro" ? "secondary" : "outline"}
                                    size="sm"
                                  >
                                    {c.plan}
                                  </Badge>
                                </td>
                                <td className="py-2.5 text-right font-semibold text-foreground">{c.revenue}</td>
                                <td className="hidden py-2.5 text-right md:table-cell">
                                  <Badge
                                    variant={c.status === "active" ? "success" : c.status === "trial" ? "warning" : "danger"}
                                    size="sm"
                                  >
                                    {c.status}
                                  </Badge>
                                </td>
                                <td className="py-2.5 pr-1">
                                  <button className="ml-auto flex size-6 items-center justify-center rounded text-muted-foreground opacity-0 transition-all hover:bg-muted group-hover:opacity-100">
                                    <MoreHorizontal size={13} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </PanelBody>
                  </Panel>
                </div>
              </TabsContent>

              {/* ═══════════════════ TAB: ANALYTICS ══════════════════ */}
              <TabsContent value="analytics" className="space-y-5">

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Conversion Rate",   value: "4.7%",  change: "+0.3%", good: true  },
                    { label: "Avg Session (min)", value: "6:42",  change: "+1:10", good: true  },
                    { label: "Bounce Rate",        value: "28.4%", change: "-2.1%", good: true  },
                  ].map((s) => (
                    <Panel key={s.label}>
                      <PanelBody>
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                        <p className="mt-1.5 text-xl font-bold text-foreground">{s.value}</p>
                        <p className={cn("mt-1 text-xs font-medium", s.good ? "text-emerald-500" : "text-red-500")}>
                          {s.change} vs last month
                        </p>
                      </PanelBody>
                    </Panel>
                  ))}
                </div>

                {/* Traffic donut + Weekly bar */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
                  <Panel className="xl:col-span-2">
                    <PanelBody>
                      <PanelHead title="Traffic Sources" sub="Channel breakdown — last 30 days" />
                      <div className="flex justify-center">
                        <DonutChart
                          data={trafficData}
                          size={150}
                          thickness={30}
                          showLegend
                          className="flex-col items-center gap-4"
                          centerValue="48k"
                          centerLabel="visitors"
                        />
                      </div>
                    </PanelBody>
                  </Panel>

                  <Panel className="xl:col-span-3">
                    <PanelBody>
                      <PanelHead
                        title="Weekly Sign-ups"
                        sub="New user registrations per week"
                        action={<Badge variant="success" size="sm">+31.6% WoW</Badge>}
                      />
                      <BarChart data={signupsData} height={165} showGrid showValues />
                    </PanelBody>
                  </Panel>
                </div>

                {/* Conversion funnel */}
                <Panel>
                  <PanelBody>
                    <PanelHead
                      title="Conversion Funnel"
                      sub="User journey from first visit to retention"
                      action={
                        <Button variant="ghost" size="xs" className="gap-1 text-xs">
                          <Filter size={11} /> Filter
                        </Button>
                      }
                    />
                    <div className="space-y-3.5">
                      {funnel.map((f, i) => (
                        <div key={f.stage} className="flex items-center gap-4">
                          <span className="w-32 shrink-0 text-xs text-muted-foreground">{f.stage}</span>
                          <div className="flex-1">
                            <Progress
                              value={f.pct}
                              size="md"
                              variant={i === 0 ? "gradient" : i < 3 ? "default" : "warning"}
                            />
                          </div>
                          <span className="w-16 shrink-0 text-right text-xs font-semibold text-foreground tabular-nums">{f.count}</span>
                          <span className="w-10 shrink-0 text-right text-xs text-muted-foreground tabular-nums">{f.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </PanelBody>
                </Panel>

                {/* Revenue line (full width) */}
                <Panel>
                  <PanelBody>
                    <PanelHead
                      title="Revenue Trend"
                      sub="Monthly MRR growth Jan–Aug 2025"
                      action={
                        <div className="flex items-center gap-1 text-xs text-emerald-500 font-semibold">
                          <ArrowUpRight size={14} /> +74.4% YTD
                        </div>
                      }
                    />
                    <LineChart data={revenueData} height={200} filled showDots />
                  </PanelBody>
                </Panel>
              </TabsContent>

              {/* ═══════════════════ TAB: REPORTS ════════════════════ */}
              <TabsContent value="reports" className="space-y-5">

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Reports</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">Download and manage your data exports</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <RefreshCw size={12} /> Refresh
                    </Button>
                    <Button variant="gradient" size="sm" className="gap-1.5 text-xs">
                      <Plus size={13} /> Generate Report
                    </Button>
                  </div>
                </div>

                <Panel>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="px-5 py-3 text-left font-medium text-muted-foreground">Report Name</th>
                        <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Type</th>
                        <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">Date</th>
                        <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">Size</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                        <th className="px-5 py-3 text-right font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((r, i) => (
                        <tr key={i} className="group border-b border-border/30 last:border-0 transition-colors hover:bg-muted/20">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
                                <FileText size={13} className="text-primary" />
                              </div>
                              <span className="font-medium text-foreground">{r.name}</span>
                            </div>
                          </td>
                          <td className="hidden px-4 py-3.5 md:table-cell">
                            <Badge variant="secondary" size="sm">{r.type}</Badge>
                          </td>
                          <td className="hidden px-4 py-3.5 text-muted-foreground sm:table-cell">{r.date}</td>
                          <td className="hidden px-4 py-3.5 text-muted-foreground lg:table-cell">{r.size}</td>
                          <td className="px-4 py-3.5">
                            <Badge variant={r.status === "ready" ? "success" : "warning"} size="sm">
                              {r.status}
                            </Badge>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                              <button className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                <ExternalLink size={13} />
                              </button>
                              <button className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                <Download size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Panel>
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
