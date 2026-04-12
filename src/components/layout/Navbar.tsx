"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown, Settings, User, Bell, LogOut, LayoutDashboard } from "lucide-react";
import { useTheme } from "next-themes";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const links = [
  { label: "Components", href: "/components" },
  { label: "Blog",       href: "/blog" },
  { label: "Docs",       href: "/docs" },
  { label: "Changelog",  href: "/changelog" },
  { label: "Dashboard",  href: "/dashboard" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="size-8" />;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

function UserAvatar({ imageUrl, name }: { imageUrl?: string | null; name: string }) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={name}
        width={32}
        height={32}
        className="rounded-full object-cover ring-2 ring-border"
      />
    );
  }
  return (
    <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold ring-2 ring-border">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function UserDropdown() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  if (!user) return null;

  const name = user.fullName ?? user.firstName ?? user.emailAddresses[0]?.emailAddress ?? "User";

  const items = [
    { label: "Profile",       href: "/profile",       icon: User },
    { label: "Settings",      href: "/settings",      icon: Settings },
    { label: "Notifications", href: "/notifications", icon: Bell },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted/60 transition-all duration-200 cursor-pointer"
        aria-label="User menu"
      >
        <UserAvatar imageUrl={user.imageUrl} name={name} />
        <span className="hidden lg:block text-sm font-medium text-foreground max-w-[120px] truncate">{name}</span>
        <ChevronDown size={14} className={cn("text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-full mt-2 w-52 glass rounded-xl border border-border/60 shadow-xl overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-border/50">
              <p className="text-sm font-semibold text-foreground truncate">{name}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>

            <div className="py-1">
              {items.map(({ label, href, icon: Icon }) => (
                <button key={label} onClick={() => { setOpen(false); router.push(href); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                  <Icon size={15} />
                  {label}
                </button>
              ))}
              <button
                onClick={() => { setOpen(false); router.push("/dashboard"); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <LayoutDashboard size={15} />
                Dashboard
                <span className="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground/60 leading-none">soon</span>
              </button>
            </div>

            <div className="border-t border-border/50 py-1">
              <button
                onClick={() => signOut(() => router.push("/"))}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300",
          scrolled ? "glass border-b border-border/50 py-3" : "bg-transparent py-5"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold text-gradient cursor-pointer">
            Sassify
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) =>
              l.href ? (
                <Link key={l.label} href={l.href}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer rounded-md hover:bg-muted/50">
                  {l.label}
                </Link>
              ) : (
                <span key={l.label}
                  className="relative px-3 py-1.5 text-sm text-muted-foreground/40 cursor-not-allowed select-none flex items-center gap-1.5"
                  title="Coming soon">
                  {l.label}
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground/60 leading-none">
                    soon
                  </span>
                </span>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {isLoaded && (
              isSignedIn ? (
                <UserDropdown />
              ) : (
                <>
                  <Link href="/login"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Sign in
                  </Link>
                  <Link href="/signup"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105 cursor-pointer">
                    Get started
                  </Link>
                </>
              )
            )}
          </div>

          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[60px] z-30 glass border-b border-border/50 px-6 py-6 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l) =>
                l.href ? (
                  <Link key={l.label} href={l.href} onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                    {l.label}
                  </Link>
                ) : (
                  <span key={l.label}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground/40 cursor-not-allowed select-none">
                    {l.label}
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground/60 leading-none">
                      soon
                    </span>
                  </span>
                )
              )}
              <hr className="border-border/50 my-1" />
              {isLoaded && isSignedIn ? (
                <>
                  <Link href="/profile" onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                    Profile
                  </Link>
                  <Link href="/settings" onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                    Settings
                  </Link>
                  <button
                    onClick={() => { setOpen(false); signOut(() => router.push("/")); }}
                    className="text-left rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer">
                    Sign out
                  </button>
                </>
              ) : (
                <Link href="/signup" className="text-sm font-semibold text-primary cursor-pointer px-3 py-2">
                  Get started →
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
