export type ReleaseType = "major" | "minor" | "patch";
export type ChangeType = "added" | "improved" | "fixed" | "removed";

export interface ChangeGroup {
  type: ChangeType;
  items: string[];
}

export interface Release {
  version: string;
  date: string;
  type: ReleaseType;
  title: string;
  summary: string;
  changes: ChangeGroup[];
}

export const releases: Release[] = [
  {
    version: "0.3.0",
    date: "2026-04-08",
    type: "minor",
    title: "Blog, Docs, Auth & Changelog",
    summary: "Full content system with MDX-powered blog and docs, three auth pages, and this changelog.",
    changes: [
      {
        type: "added",
        items: [
          "Blog system — list page with featured post hero, category filter, and post cards",
          "Blog article page — sticky sidebar, author card, syntax-highlighted MDX, related posts",
          "Docs system — collapsible sidebar, breadcrumbs, prev/next navigation",
          "8 docs pages across 5 sections: Getting Started, Components, Design System, Sections, Content",
          "3 sample blog posts — Product, Engineering, and Design categories",
          "Login page — email/password, show/hide, remember me, Google/GitHub social buttons",
          "Signup page — name/email/password with strength meter, 3-tier plan picker, terms checkbox",
          "Forgot password page — animated success state with inbox confirmation",
          "Changelog page — versioned timeline with grouped change types",
          "MDX custom components — Callout, Warning, Success callout boxes",
          "rehype-pretty-code syntax highlighting with github-dark-dimmed theme",
        ],
      },
      {
        type: "improved",
        items: [
          "Navbar — replaced anchor links with page links; Docs and Components are live, Dashboard/Changelog marked \"soon\"",
          "Navbar Sign in/Get started now link to /login and /signup",
          "Auth pages link to each other (login ↔ signup ↔ forgot-password)",
        ],
      },
    ],
  },
  {
    version: "0.2.0",
    date: "2026-03-15",
    type: "minor",
    title: "Component Library & Dark Mode",
    summary: "22-component UI library with full dark/light mode support and a live showcase at /components.",
    changes: [
      {
        type: "added",
        items: [
          "22 production-ready UI components: Button, Badge, Avatar, Input, Textarea, Select, Checkbox, Switch, Card, Tabs, Modal, Alert, Skeleton, Spinner, Progress, Tooltip, Dropdown, Table, Breadcrumb, CommandPalette, Chart (Bar/Line/Donut), Sidebar",
          "Component showcase page at /components — all variants, sizes, and interactive states",
          "Dark/light mode toggle in Navbar — Sun/Moon icon, persisted via next-themes",
          "ThemeProvider wired into root layout with class-based switching",
          "Password show/hide toggle pattern",
          "Chart components — custom SVG-based Bar, Line, and Donut charts",
          "CommandPalette — ⌘K search with categories, keyboard navigation, shortcuts",
        ],
      },
      {
        type: "improved",
        items: [
          "CSS token system — separate :root (light) and .dark token sets for all 15 design tokens",
          "Glass utility now uses theme-aware --glass-bg and --glass-border tokens",
          "All interactive elements have cursor-pointer and 150–300ms transitions",
        ],
      },
      {
        type: "fixed",
        items: [
          "Framer Motion whileInView animations no longer stuck at opacity:0 when animate prop was used instead",
          "tw-animate-css removed — was Tailwind v4 syntax, broke v3 compilation",
        ],
      },
    ],
  },
  {
    version: "0.1.0",
    date: "2026-02-01",
    type: "major",
    title: "Initial Release — Landing Page",
    summary: "The first release of Sassify: a complete animated SaaS landing page with 10 sections and global effects.",
    changes: [
      {
        type: "added",
        items: [
          "Next.js 14 App Router project with TypeScript and Tailwind CSS v3",
          "HeroSection — animated blobs, terminal mockup, word rotation, avatar group",
          "LogoMarqueeSection — infinite CSS marquee with 8 brand logos",
          "StatsSection — three animated counters with spring physics",
          "FeaturesSection — 6-card grid with 3D TiltCard hover effect",
          "HowItWorksSection — numbered steps with alternating layout",
          "PricingSection — 3-tier pricing with monthly/annual toggle",
          "TestimonialsSection — staggered grid of quote cards",
          "FAQSection — accordion with Framer Motion height animation",
          "CTASection — gradient full-width conversion block",
          "FooterSection — 4-column footer with social icons",
          "CursorSpotlight — radial gradient that follows the cursor",
          "ScrollProgressBar — viewport progress indicator",
          "FloatingCTA — sticky demo button with scroll-triggered visibility",
          "LiveToast — social proof notification after 3s delay",
          "Navbar — glass effect on scroll, mobile drawer, animated entrance",
          "SmoothScrollProvider — Lenis smooth scroll synced with GSAP ticker",
          "TiltCard — reusable 3D perspective tilt component",
          "Framer Motion, GSAP + ScrollTrigger, Lenis, React Three Fiber stack",
        ],
      },
    ],
  },
];
