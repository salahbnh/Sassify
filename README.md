# Sassify — Production-Ready SaaS Template

A full-stack SaaS template built for developers who want to ship fast. Includes a conversion-optimized landing page, 22+ UI components, auth, Stripe billing, database, email, MDX blog/docs, and SEO — all wired together and ready to customize.

---

## What's Included

### Landing Page
| Section | Description |
|---------|-------------|
| **Navbar** | Scroll-aware glass effect, mobile drawer, dark/light toggle, authenticated user menu |
| **Hero** | Animated gradient blobs, rotating word animation, terminal mockup, trust logos |
| **Logo Marquee** | Infinite scrolling logo strip with fade edges |
| **Stats** | Animated number counters triggered on scroll |
| **Features** | 6 feature cards with 3D tilt + shimmer hover |
| **How It Works** | 3-step process with connecting line |
| **Pricing** | 3-tier pricing cards wired to Stripe Checkout |
| **Testimonials** | Customer testimonials grid |
| **FAQ** | Accordion with smooth height animation |
| **CTA** | Full-width call-to-action section |
| **Footer** | Multi-column footer with links |

**Global effects:** cursor spotlight · scroll progress bar · floating CTA · live toast · smooth scroll (Lenis + GSAP)

---

### Component Library (`/components`)

22 production-ready UI components:

| Component | Highlights |
|-----------|-----------|
| Button | primary/secondary/outline/ghost/danger/gradient/glass · xs–xl sizes · loading state |
| Badge | 7 variants · 3 sizes |
| Avatar | 5 sizes · status indicators · AvatarGroup with overflow |
| Input / Textarea / Select | label, error, helper text, prefix/suffix icons |
| Checkbox / Switch | 3 sizes, animated |
| Card | default/glass/bordered/elevated · sub-components |
| Tabs | pills/underline/glass · keyboard accessible |
| Modal | 5 sizes · backdrop blur · Escape key · scroll lock |
| Alert | info/success/warning/error · dismissible |
| Skeleton | text/circle/rect · SkeletonCard preset |
| Spinner | 5 sizes · 3 color variants |
| Progress | 4 sizes · animated gradient fill |
| Tooltip | 4 directions · configurable delay |
| Dropdown | animated, icons, separators, danger items |
| Table | overflow scroll, hover rows |
| Breadcrumb | with home icon |
| Sidebar | collapsible, nav items with badges |
| CommandPalette | fuzzy search, categories, keyboard nav, ⌘K trigger |
| Charts | BarChart · LineChart · DonutChart with legend |

---

### App Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | Full app dashboard — KPIs, charts, activity feed, customers table, 3 tabs (Overview · Analytics · Reports) |
| `/login` | Email/password + Google + Facebook sign-in (Clerk) |
| `/signup` | Email/password + Google + Facebook sign-up (Clerk) |
| `/forgot-password` | 3-step password reset via email code (Clerk) |
| `/blog` | MDX-powered blog list |
| `/blog/[slug]` | MDX article with syntax highlighting |
| `/docs` | Documentation layout with sidebar |
| `/docs/[...slug]` | MDX documentation pages |
| `/changelog` | Versioned product updates |
| `/settings` | Account · Billing (live Stripe data) · Team tabs |
| `/profile` | User profile page |
| `/notifications` | Activity notifications |
| `/components` | Component library showcase |

---

### Backend

| Feature | Technology |
|---------|-----------|
| Authentication | Clerk (Google + Facebook OAuth, email/password, SSO callback) |
| Payments | Stripe (Checkout Sessions, Billing Portal, Webhooks) |
| Database | Prisma 5 + PostgreSQL (Neon Serverless with pgbouncer) |
| Email | Resend with React HTML templates |
| SEO | `sitemap.xml` + `robots.txt` auto-generated from routes |

---

## Tech Stack

| Layer | Package | Version |
|-------|---------|---------|
| Framework | Next.js App Router + TypeScript | 14.x |
| Styling | Tailwind CSS v3 | 3.4.x |
| Animation | Framer Motion + GSAP + Lenis | v12 / v3 / v1 |
| 3D | React Three Fiber + Drei + Postprocessing | v9 |
| Icons | Lucide React | latest |
| Auth | @clerk/nextjs | 7.x |
| Payments | stripe (Node SDK) | 22.x |
| ORM | Prisma | 5.x |
| Email | resend | 6.x |
| MDX | next-mdx-remote + rehype-pretty-code | 6.x |
| Theme | next-themes | 0.4.x |
| Components | class-variance-authority + tailwind-merge | latest |

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in every value:

```bash
cp .env.example .env.local
```

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk (https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe (https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRODUCT_PRO=prod_...
STRIPE_PRODUCT_ENTERPRISE=prod_...

# Database (Neon — https://console.neon.tech)
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require&pgbouncer=true&connection_limit=1

# Resend (https://resend.com/api-keys)
RESEND_API_KEY=re_...
```

### 3. Push the database schema

```bash
npx prisma db push
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Setup Guides

### Clerk (Authentication)

1. Create a project at [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Enable sign-in methods: **Google** and **Facebook** (or any OAuth provider you want)
3. Copy the Publishable Key and Secret Key to `.env.local`
4. In Clerk dashboard → **Redirect URLs**, add:
   - `http://localhost:3000/sso-callback` (development)
   - `https://yourdomain.com/sso-callback` (production)
5. Phone number / SMS features require a paid Clerk plan ($25/mo+)

**Free tier limits:** 10,000 Monthly Active Users, unlimited sign-ins, all OAuth providers included.

---

### Stripe (Payments)

1. Create an account at [https://stripe.com](https://stripe.com)
2. In test mode, create two products:
   - **Pro Plan** — recurring monthly price (e.g. $29/mo)
   - **Enterprise Plan** — recurring monthly price (e.g. $99/mo)
3. Copy the Product IDs (`prod_...`) to `.env.local`
4. Copy the Secret Key and Publishable Key to `.env.local`

**Local webhook forwarding:**

```bash
# Authenticate Stripe CLI
stripe login

# Forward webhooks to your local server
STRIPE_API_KEY="sk_test_..." stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` value it prints and paste it into `.env.local` as `STRIPE_WEBHOOK_SECRET`.

**Test card:** `4242 4242 4242 4242` · any future expiry · any CVC

**Production webhooks:** In [Stripe Dashboard](https://dashboard.stripe.com/webhooks), add an endpoint:
- URL: `https://yourdomain.com/api/webhooks/stripe`
- Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

---

### Database (Neon + Prisma)

1. Create a free project at [https://console.neon.tech](https://console.neon.tech)
2. Copy the **pooled connection string** (use the Pooler tab, not the Direct Connection)
3. Append `&pgbouncer=true&connection_limit=1` to the URL
4. Paste into `.env.local` as `DATABASE_URL`
5. Push the schema:

```bash
npx prisma db push
```

**View your data:**

```bash
npx prisma studio
```

**Schema location:** `prisma/schema.prisma`

The schema includes:
- `User` — synced from Clerk on first sign-in
- `Subscription` — Stripe plan, status, billing period
- `Team` + `TeamMember` — multi-tenant teams with roles (OWNER/ADMIN/MEMBER/VIEWER)

---

### Resend (Email)

1. Create an account at [https://resend.com](https://resend.com)
2. Create an API key and paste it into `.env.local` as `RESEND_API_KEY`
3. In development, Resend sends to any address (free tier: 100 emails/day)
4. In production, verify your domain in the Resend dashboard and update the `from` address in `src/app/api/webhooks/stripe/route.ts`

The welcome email template is at `src/lib/email/WelcomeEmail.tsx`. Customize the content, colors, and feature list there.

---

## Customization

### Branding

| What | Where |
|------|-------|
| App name | `src/app/layout.tsx` (metadata), `src/components/layout/Navbar.tsx` (logo text) |
| Colors | `src/app/globals.css` — CSS custom properties (`--primary`, `--secondary`, etc.) |
| Fonts | `src/app/layout.tsx` — replace `localFont` with any Google Font or local font |
| Logo | Replace text in Navbar with an `<Image>` component |

### Pricing Plans

Edit `src/components/sections/PricingSection.tsx` to change plan names, prices, and features. The `planKey` in the checkout button must match a key in `src/lib/stripe.ts`:

```ts
// src/lib/stripe.ts
export const STRIPE_PRODUCTS = {
  PRO:        process.env.STRIPE_PRODUCT_PRO!,
  ENTERPRISE: process.env.STRIPE_PRODUCT_ENTERPRISE!,
};
```

### Blog Content

Blog posts live in `content/blog/` as `.mdx` files. Each file needs frontmatter:

```mdx
---
title: "Your Post Title"
description: "A short description for SEO and previews."
date: "2026-01-15"
author: "Your Name"
tags: ["saas", "product"]
image: "/blog/cover.jpg"
---

Your content here...
```

### Documentation

Docs live in `content/docs/` as `.mdx` files. Nested folders become URL segments:

```
content/docs/
├── getting-started.mdx      → /docs/getting-started
├── authentication/
│   └── clerk.mdx            → /docs/authentication/clerk
└── billing/
    └── stripe.mdx           → /docs/billing/stripe
```

The docs sidebar is configured in `src/app/docs/layout.tsx`.

### Navigation Links

- **Navbar:** `src/components/layout/Navbar.tsx` — `navLinks` array
- **Footer:** `src/components/sections/FooterSection.tsx` — `footerLinks` object
- **Docs sidebar:** `src/app/docs/layout.tsx`

### Adding New Pages

Create `src/app/your-page/page.tsx`. For protected pages (requires auth), wrap with Clerk's `auth()`:

```tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function YourPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");
  // ...
}
```

Add the route to the middleware matcher in `src/middleware.ts` to protect it.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout — ClerkProvider, ThemeProvider, Lenis, Navbar
│   ├── page.tsx                      # Landing page (all sections, dynamic imports)
│   ├── globals.css                   # Design tokens, keyframes, utility classes
│   ├── sitemap.ts                    # Auto-generated sitemap.xml
│   ├── robots.ts                     # Auto-generated robots.txt
│   │
│   ├── api/
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts     # POST → create Checkout Session
│   │   │   └── portal/route.ts       # POST → create Billing Portal session
│   │   ├── webhooks/
│   │   │   └── stripe/route.ts       # Stripe webhook handler
│   │   └── user/
│   │       └── subscription/route.ts # GET → current plan + invoices
│   │
│   ├── login/page.tsx                # Sign-in page (Clerk)
│   ├── signup/page.tsx               # Sign-up page (Clerk)
│   ├── forgot-password/page.tsx      # Password reset (Clerk)
│   ├── sso-callback/page.tsx         # OAuth redirect handler (Clerk)
│   ├── settings/page.tsx             # Account + Billing + Team settings
│   ├── profile/page.tsx              # User profile
│   ├── notifications/page.tsx        # Notifications
│   ├── blog/
│   │   ├── page.tsx                  # Blog list
│   │   └── [slug]/page.tsx           # Blog post
│   ├── docs/
│   │   ├── layout.tsx                # Docs layout with sidebar
│   │   └── [...slug]/page.tsx        # Docs page
│   ├── changelog/page.tsx            # Changelog
│   └── components/page.tsx           # Component showcase
│
├── components/
│   ├── effects/                      # CursorSpotlight, ScrollProgressBar, FloatingCTA, LiveToast
│   ├── icons/                        # SocialIcons (Google, Facebook SVGs)
│   ├── layout/                       # Navbar, LayoutEffects
│   ├── sections/                     # All landing page sections
│   └── ui/                           # 22 reusable components
│
├── lib/
│   ├── utils.ts                      # cn() utility
│   ├── mdx.ts                        # MDX helpers (getBlogPosts, getDocSlugs, etc.)
│   ├── stripe.ts                     # Stripe client + STRIPE_PRODUCTS
│   ├── resend.ts                     # Resend client
│   ├── prisma.ts                     # Prisma singleton
│   ├── email/
│   │   └── WelcomeEmail.tsx          # Welcome email React template
│   └── db/
│       └── user.ts                   # getUserByClerkId, syncUser, upsertSubscription
│
├── providers/
│   ├── ThemeProvider.tsx             # next-themes wrapper
│   └── SmoothScrollProvider.tsx      # Lenis + GSAP ticker
│
├── hooks/
│   └── useReducedMotion.ts           # Respects prefers-reduced-motion
│
└── middleware.ts                     # Clerk auth middleware
```

---

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo in the [Vercel dashboard](https://vercel.com/new).

**Environment variables:** Add all variables from `.env.local` in the Vercel project settings under **Settings → Environment Variables**.

**After deploying:**
1. Update `NEXT_PUBLIC_APP_URL` to your production URL
2. Add production Stripe webhook endpoint (see Stripe setup above)
3. Add production redirect URLs in Clerk dashboard

### Build locally (optional)

```bash
npm run build
npm start
```

---

## Updating Content Without Code

| Content | File(s) |
|---------|---------|
| Blog posts | `content/blog/*.mdx` |
| Docs pages | `content/docs/**/*.mdx` |
| Changelog | `content/changelog/*.mdx` (or `src/app/changelog/page.tsx`) |
| Testimonials | `src/components/sections/TestimonialsSection.tsx` |
| FAQ | `src/components/sections/FAQSection.tsx` |
| Logo marquee | `src/components/sections/LogoMarqueeSection.tsx` |
| Stats | `src/components/sections/StatsSection.tsx` |

---

## SEO

The template is fully SEO-optimized out of the box:

- **Metadata** — page titles and descriptions on every route via `layout.tsx` files
- **Open Graph** — og:title, og:description, og:image on public-facing pages (`opengraph-image.tsx`)
- **sitemap.xml** — auto-generated at `/sitemap.xml`, includes all blog and doc routes
- **robots.txt** — auto-generated at `/robots.txt`, blocks auth/private routes from crawlers
- **Server-rendered** — landing page and all public pages are SSR/RSC for fast LCP
- **next/image** — all images optimized (lazy-load, WebP, correct srcset)
- **next/link** — all internal navigation uses prefetching

To set a canonical URL, update `NEXT_PUBLIC_APP_URL` in `.env.local`.

---

## Design System

- **Style:** Modern Dark Cinema + Liquid Glass
- **Primary:** `#a855f7` (purple)
- **Secondary:** `#06b6d4` (cyan)
- **Background:** `#050508` dark / `#fafafe` light
- **Fonts:** Geist Sans + Geist Mono (local, zero CLS)
- **Default theme:** Dark (user can toggle, persisted to localStorage)

All design tokens live in `src/app/globals.css` as CSS custom properties. Change `--primary` and `--secondary` to rebrand in one edit.

**Available CSS utilities:** `.glass` · `.text-gradient` · `.text-gradient-warm` · `.glow-purple` · `.glow-cyan` · `.dot-grid` · `.shimmer-card` · `.blob-1/2/3` · `.pulse-glow` · `.noise`

---

## Performance Notes

- All heavy sections (3D, charts, animations) are loaded with `next/dynamic` — initial page JS is minimal
- MDX file reads use React `cache()` — no duplicate filesystem I/O in a single render pass
- Subscription API responses include `Cache-Control: private, max-age=60, stale-while-revalidate=300`
- Neon uses pooled connections (`pgbouncer=true`) — safe for serverless cold starts
- `loading.tsx` skeleton screens on all protected routes eliminate layout shift during auth checks

---

## License

See [LICENSE.md](./LICENSE.md) for full terms. Commercial use is permitted for purchased licenses. Redistribution or resale of the source code is not allowed.
