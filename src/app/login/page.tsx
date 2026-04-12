"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs/legacy";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Alert } from "@/components/ui/Alert";

import { GoogleIcon, FacebookIcon } from "@/components/icons/SocialIcons";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.4, 0, 0.2, 1] as const },
});

export default function LoginPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError]         = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        setError("Sign-in incomplete. Please try again.");
      }
    } catch (err: unknown) {
      const msg = (err as { errors?: { message: string }[] })?.errors?.[0]?.message
        ?? "Invalid email or password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: "oauth_google" | "oauth_facebook") {
    setOauthLoading(provider);
    setError("");

    if (!isLoaded) {
      setError("Clerk is still loading. Please wait a moment and try again.");
      setOauthLoading(null);
      return;
    }
    if (!signIn) {
      setError("Sign-in service unavailable. Please refresh the page.");
      setOauthLoading(null);
      return;
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: "/",
      });
    } catch (err: unknown) {
      const msg = (err as { errors?: { message: string }[] })?.errors?.[0]?.message
        ?? "OAuth failed. Check that this provider is enabled in your Clerk dashboard.";
      setError(msg);
      setOauthLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-24 relative overflow-hidden">
      <div className="pointer-events-none fixed top-[-15%] right-[-5%] size-[500px] rounded-full bg-primary/8 blur-3xl blob-1" />
      <div className="pointer-events-none fixed bottom-[-20%] left-[-10%] size-[400px] rounded-full bg-secondary/8 blur-3xl blob-2" />
      <div className="pointer-events-none fixed inset-0 dot-grid opacity-30" />

      <motion.div className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>

        <motion.div {...fadeUp(0)} className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeft size={14} /> Back to home
          </Link>
        </motion.div>

        <div className="glass rounded-2xl p-8 border border-border/60">
          <motion.div {...fadeUp(0.05)} className="mb-8">
            <span className="text-xl font-bold text-gradient">Sassify</span>
            <h1 className="mt-4 text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">Sign in to continue to your account</p>
          </motion.div>

          {error && (
            <motion.div {...fadeUp(0)} className="mb-4">
              <Alert variant="error">{error}</Alert>
            </motion.div>
          )}

          {/* Social */}
          <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="outline" type="button" loading={oauthLoading === "oauth_google"} onClick={() => handleOAuth("oauth_google")} className="w-full">
              <GoogleIcon /> Google
            </Button>
            <Button variant="outline" type="button" loading={oauthLoading === "oauth_facebook"} onClick={() => handleOAuth("oauth_facebook")} className="w-full">
              <FacebookIcon /> Facebook
            </Button>
          </motion.div>

          {/* Divider */}
          <motion.div {...fadeUp(0.12)} className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center">
              <span className="bg-[var(--glass-bg)] backdrop-blur-sm px-3 text-xs text-muted-foreground">or continue with email</span>
            </div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <motion.div {...fadeUp(0.15)} className="flex flex-col gap-4">
              <Input label="Email" type="email" placeholder="you@example.com" prefix={<Mail size={14} />}
                value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              <div className="flex flex-col gap-1.5">
                <Input label="Password" type={showPw ? "text" : "password"} placeholder="••••••••"
                  prefix={<Lock size={14} />}
                  suffix={
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="pointer-events-auto text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  }
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  required autoComplete="current-password" />
                <div className="flex justify-end">
                  <Link href="/forgot-password" className="text-xs text-primary hover:opacity-80 transition-opacity cursor-pointer">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Checkbox label="Remember me for 30 days" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <Button type="submit" variant="gradient" size="lg" loading={loading} className="w-full mt-2">
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </motion.div>
          </form>

          <motion.p {...fadeUp(0.2)} className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:opacity-80 transition-opacity font-medium cursor-pointer">Sign up free</Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
