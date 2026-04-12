"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Switch } from "@/components/ui/Switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Modal } from "@/components/ui/Modal";
import { Alert } from "@/components/ui/Alert";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { Progress } from "@/components/ui/Progress";
import { Tooltip } from "@/components/ui/Tooltip";
import { Dropdown } from "@/components/ui/Dropdown";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CommandPalette, CommandPaletteTrigger } from "@/components/ui/CommandPalette";
import { BarChart, LineChart, DonutChart } from "@/components/ui/Chart";
import {
  Mail, Lock, Search, User, Settings, LogOut, Trash2,
  FileText, Zap, Bell, Plus,
  LayoutDashboard, Code2, Palette, Layers
} from "lucide-react";

/* ── Section wrapper ───────────────────────────── */
function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-foreground border-b border-border pb-3">{title}</h2>
      {children}
    </section>
  );
}

function Row({ children, wrap }: { children: React.ReactNode; wrap?: boolean }) {
  return (
    <div className={`flex items-start gap-3 ${wrap ? "flex-wrap" : ""}`}>{children}</div>
  );
}

/* ── Main page ──────────────────────────────────── */
export default function ComponentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  const [checked, setChecked] = useState(true);

  const cmdItems = [
    { id: "1", label: "Dashboard", description: "Go to your dashboard", icon: <LayoutDashboard size={15} />, category: "Navigation", shortcut: ["⌘", "D"], onSelect: () => {} },
    { id: "2", label: "Components", description: "Browse UI components", icon: <Layers size={15} />, category: "Navigation", shortcut: ["⌘", "C"], onSelect: () => {} },
    { id: "3", label: "Settings", description: "Account & billing", icon: <Settings size={15} />, category: "Navigation", onSelect: () => {} },
    { id: "4", label: "New Project", description: "Create a new project", icon: <Plus size={15} />, category: "Actions", shortcut: ["⌘", "N"], onSelect: () => {} },
    { id: "5", label: "Export Data", description: "Download your data as CSV", icon: <FileText size={15} />, category: "Actions", onSelect: () => {} },
    { id: "6", label: "Dark Mode", description: "Toggle dark/light theme", icon: <Palette size={15} />, category: "Preferences", onSelect: () => {} },
  ];

  const tableData = [
    { name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", plan: "Pro" },
    { name: "Bob Smith",     email: "bob@example.com",   role: "Editor", status: "Active", plan: "Basic" },
    { name: "Carol White",   email: "carol@example.com", role: "Viewer", status: "Inactive", plan: "Free" },
    { name: "Dan Brown",     email: "dan@example.com",   role: "Editor", status: "Active", plan: "Pro" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-32 flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="default" size="md">Phase 2</Badge>
            <Badge variant="success" size="md">22 Components</Badge>
          </div>
          <h1 className="text-4xl font-bold text-gradient">Component Library</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Production-ready UI components built with CVA, Framer Motion, and Tailwind CSS. Dark/light mode, fully accessible, and designed for modern SaaS products.
          </p>
          <Row>
            <CommandPaletteTrigger onOpen={() => setCmdOpen(true)} className="w-64" />
          </Row>
        </div>

        {/* ── Buttons ── */}
        <Section title="Button" id="button">
          <Row wrap>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="gradient">Gradient</Button>
            <Button variant="glass">Glass</Button>
          </Row>
          <Row wrap>
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row wrap>
            <Button loading>Loading...</Button>
            <Button disabled>Disabled</Button>
            <Button variant="primary" size="icon"><Zap size={16} /></Button>
          </Row>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badge" id="badge">
          <Row wrap>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="glass">Glass</Badge>
          </Row>
          <Row wrap>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </Row>
        </Section>

        {/* ── Avatars ── */}
        <Section title="Avatar" id="avatar">
          <Row>
            <Avatar size="xs" fallback="AB" />
            <Avatar size="sm" fallback="CD" status="online" />
            <Avatar size="md" fallback="EF" status="busy" />
            <Avatar size="lg" fallback="GH" status="away" />
            <Avatar size="xl" fallback="IJ" status="offline" />
          </Row>
          <Row>
            <Avatar
              size="md"
              src="https://i.pravatar.cc/150?img=3"
              alt="User avatar"
              status="online"
            />
            <AvatarGroup
              size="md"
              avatars={[
                { fallback: "A1" },
                { fallback: "B2" },
                { fallback: "C3" },
                { fallback: "D4" },
                { fallback: "E5" },
                { fallback: "F6" },
              ]}
              max={4}
            />
          </Row>
        </Section>

        {/* ── Inputs ── */}
        <Section title="Input & Textarea" id="input">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <Input label="Email" type="email" placeholder="you@example.com" prefix={<Mail size={14} />} required />
            <Input label="Password" type="password" placeholder="••••••••" prefix={<Lock size={14} />} />
            <Input label="With error" error="This field is required" placeholder="Type something" />
            <Input label="With helper" helper="Must be at least 8 characters" placeholder="Enter value" />
            <div className="sm:col-span-2">
              <Textarea label="Message" placeholder="Write your message here..." rows={4} helper="Max 500 characters" />
            </div>
            <Select
              label="Plan"
              placeholder="Choose a plan"
              options={[
                { value: "free", label: "Free" },
                { value: "pro", label: "Pro — $29/mo" },
                { value: "enterprise", label: "Enterprise" },
              ]}
            />
          </div>
        </Section>

        {/* ── Checkbox & Switch ── */}
        <Section title="Checkbox & Switch" id="forms">
          <Row wrap>
            <Checkbox
              label="Accept terms"
              description="I agree to the Terms of Service and Privacy Policy"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <Checkbox label="Subscribe to newsletter" defaultChecked />
            <Checkbox label="Disabled option" disabled />
          </Row>
          <Row wrap>
            <Switch
              label="Email notifications"
              description="Receive updates via email"
              checked={switchOn}
              onChange={(e) => setSwitchOn(e.target.checked)}
            />
            <Switch label="Push notifications" defaultChecked />
            <Switch label="Disabled" disabled />
          </Row>
        </Section>

        {/* ── Cards ── */}
        <Section title="Card" id="card">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard card with border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Content goes here with any elements you need.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline">Cancel</Button>
                <Button size="sm">Save</Button>
              </CardFooter>
            </Card>
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>Frosted glass effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Perfect for hero sections and overlays.</p>
              </CardContent>
            </Card>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>With drop shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={72} label="Completion" showLabel variant="gradient" />
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ── Tabs ── */}
        <Section title="Tabs" id="tabs">
          <div className="flex flex-col gap-8">
            <Tabs defaultValue="overview" variant="pills">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card variant="bordered" padding="md">
                  <p className="text-sm text-muted-foreground">Overview content — metrics, summaries, quick actions.</p>
                </Card>
              </TabsContent>
              <TabsContent value="analytics">
                <Card variant="bordered" padding="md">
                  <LineChart data={[
                    { label: "Jan", value: 40 }, { label: "Feb", value: 65 }, { label: "Mar", value: 52 },
                    { label: "Apr", value: 78 }, { label: "May", value: 90 }, { label: "Jun", value: 110 },
                  ]} />
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <Card variant="bordered" padding="md">
                  <div className="flex flex-col gap-4">
                    <Switch label="Public profile" defaultChecked />
                    <Switch label="Two-factor authentication" />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs defaultValue="code" variant="underline">
              <TabsList>
                <TabsTrigger value="preview"><Palette size={14} />Preview</TabsTrigger>
                <TabsTrigger value="code"><Code2 size={14} />Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <p className="text-sm text-muted-foreground pt-2">Underline tabs variant.</p>
              </TabsContent>
              <TabsContent value="code">
                <pre className="text-xs text-muted-foreground bg-muted p-3 rounded-lg mt-2 overflow-auto">{`<Tabs defaultValue="tab1" variant="underline">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>`}</pre>
              </TabsContent>
            </Tabs>
          </div>
        </Section>

        {/* ── Modal ── */}
        <Section title="Modal" id="modal">
          <Row>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </Row>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm action"
            description="This action cannot be undone. Are you sure?"
          >
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                You are about to permanently delete this project and all associated data.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={() => setModalOpen(false)}>Delete</Button>
              </div>
            </div>
          </Modal>
        </Section>

        {/* ── Alerts ── */}
        <Section title="Alert" id="alert">
          <div className="flex flex-col gap-3 max-w-xl">
            <Alert variant="info" title="New update available" dismissible>
              Version 2.0 is ready. Check the changelog for what&apos;s new.
            </Alert>
            <Alert variant="success" title="Payment successful">
              Your subscription has been activated. Welcome to Pro!
            </Alert>
            <Alert variant="warning" title="Storage almost full">
              You&apos;re using 85% of your storage quota.
            </Alert>
            <Alert variant="error" title="Connection failed" dismissible>
              Unable to reach the server. Please check your network.
            </Alert>
          </div>
        </Section>

        {/* ── Skeleton ── */}
        <Section title="Skeleton" id="skeleton">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SkeletonCard />
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-border">
              <Skeleton variant="circle" width={48} height={48} />
              <Skeleton variant="text" width="70%" height={18} />
              <Skeleton variant="text" lines={3} />
              <Skeleton height={32} />
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-xl border border-border">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton variant="circle" width={32} height={32} />
                  <Skeleton variant="text" width={`${60 + i * 8}%`} height={14} />
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Spinner & Progress ── */}
        <Section title="Spinner & Progress" id="progress">
          <Row>
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </Row>
          <div className="flex flex-col gap-4 max-w-sm">
            <Progress value={30} label="Storage" showLabel />
            <Progress value={65} label="CPU" showLabel variant="gradient" />
            <Progress value={85} label="Memory" showLabel variant="warning" />
            <Progress value={95} label="Disk" showLabel variant="danger" />
          </div>
        </Section>

        {/* ── Tooltip ── */}
        <Section title="Tooltip" id="tooltip">
          <Row wrap>
            <Tooltip content="Appears on top" side="top">
              <Button variant="outline" size="sm">Hover me (top)</Button>
            </Tooltip>
            <Tooltip content="Appears on bottom" side="bottom">
              <Button variant="outline" size="sm">Bottom</Button>
            </Tooltip>
            <Tooltip content="Appears on right" side="right">
              <Button variant="outline" size="sm">Right</Button>
            </Tooltip>
            <Tooltip content="Appears on left" side="left">
              <Button variant="outline" size="sm">Left</Button>
            </Tooltip>
          </Row>
        </Section>

        {/* ── Dropdown ── */}
        <Section title="Dropdown" id="dropdown">
          <Row>
            <Dropdown
              trigger={
                <Button variant="outline">
                  Options <Settings size={14} />
                </Button>
              }
              items={[
                { label: "Profile", icon: <User size={14} />, onClick: () => {} },
                { label: "Settings", icon: <Settings size={14} />, onClick: () => {} },
                { label: "Notifications", icon: <Bell size={14} />, onClick: () => {} },
                { separator: true, label: "" },
                { label: "Sign out", icon: <LogOut size={14} />, onClick: () => {} },
              ]}
            />
            <Dropdown
              trigger={<Button variant="danger" size="sm">Danger actions</Button>}
              items={[
                { label: "Archive", icon: <FileText size={14} />, onClick: () => {} },
                { separator: true, label: "" },
                { label: "Delete permanently", icon: <Trash2 size={14} />, onClick: () => {}, danger: true },
              ]}
              align="right"
            />
          </Row>
        </Section>

        {/* ── Table ── */}
        <Section title="Table" id="table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.email}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" fallback={row.name.slice(0, 2)} />
                      <span className="font-medium">{row.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.email}</TableCell>
                  <TableCell><Badge variant="secondary" size="sm">{row.role}</Badge></TableCell>
                  <TableCell>
                    <Badge variant={row.status === "Active" ? "success" : "secondary"} size="sm">
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={row.plan === "Pro" ? "default" : "outline"} size="sm">
                      {row.plan}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        {/* ── Breadcrumb ── */}
        <Section title="Breadcrumb" id="breadcrumb">
          <div className="flex flex-col gap-3">
            <Breadcrumb items={[{ label: "Dashboard" }, { label: "Projects" }, { label: "Sassify" }]} />
            <Breadcrumb
              showHome={false}
              items={[{ label: "Blog" }, { label: "Design" }, { label: "Modern SaaS UI Patterns" }]}
            />
          </div>
        </Section>

        {/* ── Charts ── */}
        <Section title="Charts" id="charts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Monthly revenue growth</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { label: "Jan", value: 4200 }, { label: "Feb", value: 5800 }, { label: "Mar", value: 5100 },
                    { label: "Apr", value: 7400 }, { label: "May", value: 8900 }, { label: "Jun", value: 11200 },
                  ]}
                />
              </CardContent>
            </Card>
            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Daily active users trend</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    { label: "Mon", value: 1200 }, { label: "Tue", value: 1900 }, { label: "Wed", value: 1600 },
                    { label: "Thu", value: 2400 }, { label: "Fri", value: 2200 }, { label: "Sat", value: 1800 }, { label: "Sun", value: 1400 },
                  ]}
                />
              </CardContent>
            </Card>
            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your users come from</CardDescription>
              </CardHeader>
              <CardContent>
                <DonutChart
                  data={[
                    { label: "Organic", value: 45 },
                    { label: "Social", value: 28 },
                    { label: "Direct", value: 18 },
                    { label: "Referral", value: 9 },
                  ]}
                  centerLabel="Total"
                  centerValue="12.4k"
                />
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ── Command Palette ── */}
        <Section title="Command Palette" id="command">
          <Row>
            <Button onClick={() => setCmdOpen(true)} variant="outline">
              <Search size={14} />
              Open Command Palette
              <kbd className="ml-2 flex items-center gap-0.5 text-xs text-muted-foreground">
                <span>⌘</span><span>K</span>
              </kbd>
            </Button>
          </Row>
        </Section>

        <CommandPalette
          open={cmdOpen}
          onClose={() => setCmdOpen(false)}
          items={cmdItems}
        />
      </div>
    </div>
  );
}
