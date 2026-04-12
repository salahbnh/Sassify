"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, CreditCard, Users, Bell, AlertTriangle,
  Camera, Check, Mail, Globe, Clock, AtSign,
  Plus, Trash2, Shield, Crown, Eye, LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Switch } from "@/components/ui/Switch";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { Progress } from "@/components/ui/Progress";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Dropdown } from "@/components/ui/Dropdown";
import { Modal } from "@/components/ui/Modal";
import { Alert } from "@/components/ui/Alert";
import { cn } from "@/lib/utils";

/* ── Types ──────────────────────────────────────── */
type Tab = "account" | "billing" | "team" | "notifications" | "danger";

/* ── Sidebar nav ────────────────────────────────── */
const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "account",       label: "Account",        icon: <User size={15} /> },
  { id: "billing",       label: "Billing",         icon: <CreditCard size={15} /> },
  { id: "team",          label: "Team",             icon: <Users size={15} /> },
  { id: "notifications", label: "Notifications",    icon: <Bell size={15} /> },
  { id: "danger",        label: "Danger Zone",      icon: <AlertTriangle size={15} /> },
];

/* ── Section wrapper ────────────────────────────── */
function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border/60 bg-card p-6">
      <div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="h-px bg-border/60" />
      {children}
    </div>
  );
}

/* ── Tabs ──────────────────────────────────────── */

function AccountTab() {
  const [saved, setSaved] = useState(false);
  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }
  return (
    <div className="flex flex-col gap-6">
      <Section title="Profile" description="This information will be visible on your public profile.">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar size="xl" fallback="AC" status="online" />
            <button className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-background bg-primary text-white cursor-pointer hover:opacity-90 transition-opacity">
              <Camera size={12} />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Alex Chen</p>
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF — max 2MB</p>
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="xs">Upload photo</Button>
              <Button variant="ghost" size="xs">Remove</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Full name" defaultValue="Alex Chen" prefix={<User size={14} />} />
          <Input label="Username" defaultValue="alexchen" prefix={<AtSign size={14} />} helper="sassify.io/@alexchen" />
          <div className="sm:col-span-2">
            <Input
              label="Email address"
              type="email"
              defaultValue="alex@sassify.io"
              prefix={<Mail size={14} />}
              suffix={<Badge variant="success" size="sm">Verified</Badge>}
            />
          </div>
          <div className="sm:col-span-2">
            <Textarea label="Bio" defaultValue="Co-founder & CEO at Sassify. Building the modern SaaS stack." rows={3} helper="Max 280 characters" />
          </div>
        </div>
      </Section>

      <Section title="Preferences" description="Localisation and display settings.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Language"
            defaultValue="en"
            prefix={<Globe size={14} />}
            options={[
              { value: "en", label: "English (US)" },
              { value: "en-gb", label: "English (UK)" },
              { value: "fr", label: "French" },
              { value: "de", label: "German" },
              { value: "es", label: "Spanish" },
              { value: "ja", label: "Japanese" },
            ]}
          />
          <Select
            label="Timezone"
            defaultValue="utc-8"
            prefix={<Clock size={14} />}
            options={[
              { value: "utc-12", label: "UTC−12:00" },
              { value: "utc-8",  label: "UTC−08:00 (Pacific)" },
              { value: "utc-5",  label: "UTC−05:00 (Eastern)" },
              { value: "utc+0",  label: "UTC±00:00 (London)" },
              { value: "utc+1",  label: "UTC+01:00 (Paris)" },
              { value: "utc+8",  label: "UTC+08:00 (Singapore)" },
              { value: "utc+9",  label: "UTC+09:00 (Tokyo)" },
            ]}
          />
        </div>
      </Section>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Discard changes</Button>
        <Button variant={saved ? "secondary" : "gradient"} onClick={handleSave}>
          {saved ? <><Check size={14} /> Saved</> : "Save changes"}
        </Button>
      </div>
    </div>
  );
}

type SubData = {
  plan: string;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId: string | null;
  paymentMethod: { brand: string; last4: string; expMonth: number; expYear: number } | null;
  invoices: { id: string; date: number; amount: number; status: string | null; url: string | null }[];
};

const PLAN_PRICES: Record<string, string> = { FREE: "$0", PRO: "$29", ENTERPRISE: "Custom" };
const PLAN_FEATURES: Record<string, string[]> = {
  FREE:       ["Up to 5 projects", "1GB storage", "Community support"],
  PRO:        ["Unlimited projects", "50GB storage", "Priority support", "Custom domain"],
  ENTERPRISE: ["Unlimited everything", "SLA guarantee", "Dedicated support"],
};

function BillingTab() {
  const [sub, setSub]         = useState<SubData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    fetch("/api/user/subscription")
      .then((r) => r.json() as Promise<SubData>)
      .then(setSub)
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  async function openPortal() {
    setPortalLoading(true);
    try {
      const res  = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) window.location.href = data.url;
    } catch {
      // user sees nothing — Stripe portal just won't open
    } finally {
      setPortalLoading(false);
    }
  }

  const planLabel = sub ? (sub.plan.charAt(0) + sub.plan.slice(1).toLowerCase() + " Plan") : "Free Plan";
  const planPrice = sub ? PLAN_PRICES[sub.plan] ?? "—" : "$0";
  const features  = sub ? (PLAN_FEATURES[sub.plan] ?? []) : PLAN_FEATURES.FREE;
  const renewsOn  = sub?.currentPeriodEnd
    ? new Date(sub.currentPeriodEnd).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Current plan */}
      <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-primary/5 p-6">
        <div className="pointer-events-none absolute right-0 top-0 size-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Crown size={16} className="text-primary" />
              {fetching
                ? <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                : <span className="text-sm font-semibold text-primary">{planLabel}</span>
              }
            </div>
            {fetching ? (
              <div className="mt-2 h-8 w-24 rounded bg-muted animate-pulse" />
            ) : (
              <p className="mt-1 text-2xl font-bold text-foreground">
                {planPrice}
                {planPrice !== "Custom" && <span className="text-base font-normal text-muted-foreground"> /month</span>}
              </p>
            )}
            {fetching ? (
              <div className="mt-1 h-4 w-52 rounded bg-muted animate-pulse" />
            ) : renewsOn ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {sub?.cancelAtPeriodEnd ? `Cancels on ${renewsOn}` : `Renews on ${renewsOn} · Billed monthly`}
              </p>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">Free forever</p>
            )}
          </div>
          {sub?.stripeCustomerId && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" loading={portalLoading} onClick={openPortal}>Change plan</Button>
              <Button variant="ghost" size="sm" loading={portalLoading} onClick={openPortal}>Cancel</Button>
            </div>
          )}
          {!fetching && !sub?.stripeCustomerId && (
            <Button variant="gradient" size="sm" onClick={() => window.location.href = "/#pricing"}>
              Upgrade
            </Button>
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-1.5 text-xs text-foreground/80">
              <Check size={11} className="text-primary shrink-0" /> {f}
            </div>
          ))}
        </div>
      </div>

      {/* Usage */}
      <Section title="Usage" description="Current billing period usage.">
        <div className="flex flex-col gap-4">
          <Progress value={62} label="Projects (31 / 50)" showLabel variant="gradient" />
          <Progress value={45} label="Storage (22.5 GB / 50 GB)" showLabel />
          <Progress value={88} label="API calls (88k / 100k)" showLabel variant="warning" />
          <Progress value={12} label="Teammates (3 / 25)" showLabel />
        </div>
      </Section>

      {/* Payment method */}
      <Section title="Payment method" description="Manage your payment information.">
        {fetching ? (
          <div className="h-16 rounded-lg bg-muted animate-pulse" />
        ) : sub?.paymentMethod ? (
          <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted border border-border/60">
                <CreditCard size={16} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground capitalize">
                  {sub.paymentMethod.brand} ending in {sub.paymentMethod.last4}
                </p>
                <p className="text-xs text-muted-foreground">
                  Expires {String(sub.paymentMethod.expMonth).padStart(2, "0")}/{sub.paymentMethod.expYear}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" loading={portalLoading} onClick={openPortal}>Update</Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No payment method on file.</p>
        )}
      </Section>

      {/* Invoices */}
      <Section title="Billing history" description="Download past invoices.">
        {fetching ? (
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map((i) => <div key={i} className="h-10 rounded bg-muted animate-pulse" />)}
          </div>
        ) : sub?.invoices && sub.invoices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sub.invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(inv.date * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </TableCell>
                  <TableCell className="text-sm font-medium">${inv.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={inv.status === "paid" ? "success" : "warning"} size="sm">
                      {inv.status ?? "—"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {inv.url && (
                      <a href={inv.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="xs">View</Button>
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">No invoices yet.</p>
        )}
      </Section>
    </div>
  );
}

function TeamTab() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");

  const members = [
    { name: "Alex Chen",    email: "alex@sassify.io",   role: "Owner",  avatar: "AC", status: "online" as const },
    { name: "Mia Tanaka",   email: "mia@sassify.io",    role: "Admin",  avatar: "MT", status: "online" as const },
    { name: "Jordan Park",  email: "jordan@sassify.io", role: "Member", avatar: "JP", status: "away" as const },
    { name: "Sam Rivera",   email: "sam@sassify.io",    role: "Member", avatar: "SR", status: "offline" as const },
  ];

  const roleVariant = (r: string) =>
    r === "Owner" ? "default" : r === "Admin" ? "warning" : "secondary";

  return (
    <div className="flex flex-col gap-6">
      {/* Team overview */}
      <Section title="Team" description="Manage your team members and their roles.">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AvatarGroup
              size="sm"
              avatars={members.map((m) => ({ fallback: m.avatar }))}
              max={4}
            />
            <span className="text-sm text-muted-foreground">{members.length} members</span>
          </div>
          <Badge variant="secondary" size="sm">Pro — 25 seats</Badge>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.email}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm" fallback={m.avatar} status={m.status} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={roleVariant(m.role)} size="sm">{m.role}</Badge>
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "text-xs capitalize",
                    m.status === "online" ? "text-green-500" : m.status === "away" ? "text-yellow-500" : "text-muted-foreground"
                  )}>
                    {m.status}
                  </span>
                </TableCell>
                <TableCell>
                  {m.role !== "Owner" && (
                    <Dropdown
                      trigger={<Button variant="ghost" size="xs">Manage</Button>}
                      align="right"
                      items={[
                        { label: "View profile", icon: <Eye size={13} />, onClick: () => {} },
                        { label: "Change role",  icon: <Shield size={13} />, onClick: () => {} },
                        { separator: true, label: "" },
                        { label: "Remove from team", icon: <Trash2 size={13} />, onClick: () => {}, danger: true },
                      ]}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* Invite */}
      <Section title="Invite member" description="Send an invitation link to a new team member.">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <Input
            label="Email address"
            type="email"
            placeholder="colleague@company.com"
            prefix={<Mail size={14} />}
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1"
          />
          <Select
            label="Role"
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            options={[
              { value: "admin",  label: "Admin" },
              { value: "member", label: "Member" },
              { value: "viewer", label: "Viewer" },
            ]}
            className="w-40"
          />
          <Button variant="primary" className="shrink-0">
            <Plus size={14} /> Send invite
          </Button>
        </div>

        {/* Pending invites */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Pending (2)</p>
          {[
            { email: "new@company.com",  role: "Member", sent: "2 days ago" },
            { email: "hire@startup.io",  role: "Admin",  sent: "5 days ago" },
          ].map((inv) => (
            <div key={inv.email} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{inv.email}</span>
                <Badge variant="secondary" size="sm">{inv.role}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{inv.sent}</span>
                <Button variant="ghost" size="xs">Revoke</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function NotificationsTab() {
  const emailGroups = [
    {
      title: "Product & Updates",
      items: [
        { id: "product-news",   label: "Product announcements", description: "New features, improvements, and releases", defaultChecked: true },
        { id: "changelog",      label: "Changelog digest",       description: "Weekly summary of what changed",           defaultChecked: true },
        { id: "blog-posts",     label: "New blog posts",          description: "Engineering and design articles",          defaultChecked: false },
      ],
    },
    {
      title: "Activity",
      items: [
        { id: "comments",       label: "Comments & mentions",    description: "When someone replies to or mentions you",  defaultChecked: true },
        { id: "team-invites",   label: "Team invitations",       description: "When you're invited to a team",            defaultChecked: true },
        { id: "project-shares", label: "Project shares",          description: "When someone shares a project with you",   defaultChecked: false },
      ],
    },
    {
      title: "Billing",
      items: [
        { id: "billing-receipts", label: "Payment receipts",    description: "Monthly invoice and payment confirmation", defaultChecked: true },
        { id: "billing-alerts",   label: "Usage alerts",         description: "When approaching plan limits",             defaultChecked: true },
        { id: "billing-changes",  label: "Plan changes",         description: "Upgrades, downgrades, and cancellations",  defaultChecked: true },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Alert variant="info" title="Email notifications">
        Notifications are sent to <strong>alex@sassify.io</strong>. Change your email in Account settings.
      </Alert>

      {emailGroups.map((group) => (
        <Section key={group.title} title={group.title}>
          <div className="flex flex-col gap-4">
            {group.items.map((item) => (
              <Switch
                key={item.id}
                label={item.label}
                description={item.description}
                defaultChecked={item.defaultChecked}
              />
            ))}
          </div>
        </Section>
      ))}

      <div className="flex justify-end">
        <Button variant="gradient">Save preferences</Button>
      </div>
    </div>
  );
}

function DangerTab() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Alert variant="error" title="Danger zone">
        Actions in this section are irreversible. Proceed with caution.
      </Alert>

      {[
        {
          title: "Export data",
          description: "Download a ZIP archive of all your projects, settings, and billing history.",
          action: "Export all data",
          variant: "outline" as const,
          onClick: () => setExportOpen(true),
        },
        {
          title: "Transfer ownership",
          description: "Transfer your account and all associated data to another team member.",
          action: "Transfer account",
          variant: "outline" as const,
          onClick: () => {},
        },
        {
          title: "Sign out everywhere",
          description: "Sign out of all active sessions across all devices immediately.",
          action: "Sign out all devices",
          variant: "danger" as const,
          onClick: () => {},
        },
        {
          title: "Delete account",
          description: "Permanently delete your account, all projects, and cancel your subscription. This cannot be undone.",
          action: "Delete account",
          variant: "danger" as const,
          onClick: () => setDeleteOpen(true),
        },
      ].map((item) => (
        <div key={item.title} className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">{item.title}</p>
            <p className="mt-0.5 text-sm text-muted-foreground max-w-sm">{item.description}</p>
          </div>
          <Button
            variant={item.variant === "danger" ? "danger" : "outline"}
            size="sm"
            className="shrink-0"
            onClick={item.onClick}
          >
            {item.variant === "danger" && item.action === "Delete account" && <Trash2 size={13} />}
            {item.variant === "danger" && item.action === "Sign out all devices" && <LogOut size={13} />}
            {item.action}
          </Button>
        </div>
      ))}

      {/* Export modal */}
      <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Export your data" description="We'll prepare a ZIP file with all your data and email you when it's ready.">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">The export includes: projects, settings, billing history, and account information. It may take up to 24 hours to prepare.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setExportOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setExportOpen(false)}>Request export</Button>
          </div>
        </div>
      </Modal>

      {/* Delete modal */}
      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete account" description="This action cannot be undone.">
        <div className="flex flex-col gap-4">
          <Alert variant="error">All your projects, data, and subscription will be permanently removed.</Alert>
          <Input label="Type your email to confirm" type="email" placeholder="alex@sassify.io" />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setDeleteOpen(false)}><Trash2 size={13} /> Delete permanently</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ── Page ──────────────────────────────────────── */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("account");

  const tabContent: Record<Tab, React.ReactNode> = {
    account:       <AccountTab />,
    billing:       <BillingTab />,
    team:          <TeamTab />,
    notifications: <NotificationsTab />,
    danger:        <DangerTab />,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 dot-grid opacity-20" />

      <div className="relative mx-auto max-w-5xl px-6 py-28">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="mt-1 text-muted-foreground">Manage your account, billing, and team preferences.</p>
        </div>

        <div className="flex gap-8 lg:flex-row flex-col">
          {/* Sidebar */}
          <aside className="lg:w-52 shrink-0">
            <nav className="flex flex-row flex-wrap gap-1 lg:flex-col">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer text-left w-full",
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    tab.id === "danger" && activeTab !== tab.id && "text-red-500/60 hover:text-red-500 hover:bg-red-500/8"
                  )}
                >
                  <span className={cn(activeTab === tab.id ? "text-primary" : "", tab.id === "danger" && activeTab !== tab.id ? "text-red-500/60" : "")}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
