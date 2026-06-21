# Sassify

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-000000?logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?logo=clerk&logoColor=white)

A modern **SaaS web application** with an immersive, animation-rich front end: interactive 3D scenes, smooth scroll, an MDX-powered content/blog system, plus authentication and subscription billing.

> **Stack:** Next.js · React Three Fiber + Drei · GSAP + Lenis · Prisma · Clerk · Stripe · Tailwind CSS · MDX

## Features

- **3D & motion** — interactive scenes with React Three Fiber, Drei, and postprocessing; GSAP animations and Lenis smooth scrolling
- **Authentication** — Clerk sign-in / user management
- **Billing** — Stripe subscriptions
- **Content system** — MDX articles (`next-mdx-remote`) with syntax highlighting (Shiki, `rehype-pretty-code`) and GitHub-flavored Markdown
- **Email** — React Email + Resend
- **Polished UI** — Tailwind CSS, Framer Motion, theming via `next-themes`

## Tech Stack

| Layer | Technologies |
|---|---|
| Framework | Next.js, React, TypeScript |
| 3D / Animation | React Three Fiber, Drei, Postprocessing, Three.js, GSAP, Lenis |
| Auth / Payments | Clerk, Stripe |
| Data | Prisma |
| Content | MDX (next-mdx-remote), Shiki, rehype/remark |
| UI | Tailwind CSS, Framer Motion |

## Getting Started

```bash
git clone https://github.com/salahbnh/Sassify.git
cd Sassify
npm install
cp .env.example .env   # Clerk, Stripe, database keys
npm run dev            # http://localhost:3000
```

## Demo

<!-- Add a screen recording of the 3D scenes / landing page here — this project is very visual. -->

---

Built by [Salah Bounouh](https://github.com/salahbnh) · [Portfolio](https://salahbounouh.com) · [LinkedIn](https://www.linkedin.com/in/salah-bounouh-1426ba27b/)
