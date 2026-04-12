"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs/legacy";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, MailCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.4, 0, 0.2, 1] as const },
});

type Step = "email" | "reset" | "done";

export default function ForgotPasswordPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [step, setStep]         = useState<Step>("email");
  const [email, setEmail]       = useState("");
  const [code, setCode]         = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleRequestReset(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      await signIn.create({ strategy: "reset_password_email_code", identifier: email });
      setStep("reset");
    } catch (err: unknown) {
      const msg = (err as { errors?: { message: string }[] })?.errors?.[0]?.message ?? "Could not send reset email.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setStep("done");
        setTimeout(() => router.push("/"), 1500);
      } else {
        setError("Reset incomplete. Please try again.");
      }
    } catch (err: unknown) {
      const msg = (err as { errors?: { message: string }[] })?.errors?.[0]?.message ?? "Invalid code or password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-24 relative overflow-hidden">
      <div className="pointer-events-none fixed top-[-15%] right-[-5%] size-[450px] rounded-full bg-primary/8 blur-3xl blob-1" />
      <div className="pointer-events-none fixed bottom-[-15%] left-[-10%] size-[350px] rounded-full bg-secondary/8 blur-3xl blob-3" />
      <div className="pointer-events-none fixed inset-0 dot-grid opacity-30" />

      <motion.div className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>

        <motion.div {...fadeUp(0)} className="mb-8">
          <Link href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </motion.div>

        <div className="glass rounded-2xl p-8 border border-border/60">
          <AnimatePresence mode="wait">

            {step === "email" && (
              <motion.div key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <motion.div {...fadeUp(0.05)} className="mb-8">
                  <span className="text-xl font-bold text-gradient">Sassify</span>
                  <h1 className="mt-4 text-2xl font-bold text-foreground">Forgot your password?</h1>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Enter your email and we&apos;ll send you a reset code
                  </p>
                </motion.div>

                {error && <div className="mb-4"><Alert variant="error">{error}</Alert></div>}

                <form onSubmit={handleRequestReset}>
                  <motion.div {...fadeUp(0.1)} className="flex flex-col gap-4">
                    <Input label="Email" type="email" placeholder="you@example.com"
                      prefix={<Mail size={14} />}
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      required autoComplete="email" />
                    <Button type="submit" variant="gradient" size="lg" loading={loading} className="w-full">
                      {loading ? "Sending code…" : "Send reset code"}
                    </Button>
                  </motion.div>
                </form>

                <motion.p {...fadeUp(0.15)} className="mt-6 text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link href="/login" className="text-primary hover:opacity-80 transition-opacity font-medium cursor-pointer">
                    Sign in
                  </Link>
                </motion.p>
              </motion.div>
            )}

            {step === "reset" && (
              <motion.div key="reset" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ShieldCheck size={28} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Check your inbox</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We sent a reset code to <strong className="text-foreground">{email}</strong>.
                  Enter it below with your new password.
                </p>

                {error && <div className="mt-4"><Alert variant="error">{error}</Alert></div>}

                <form onSubmit={handleReset} className="mt-6 flex flex-col gap-4">
                  <Input label="Reset code" type="text" inputMode="numeric" pattern="[0-9]*"
                    placeholder="000000" maxLength={6}
                    value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    required autoComplete="one-time-code"
                    className="text-center text-2xl tracking-[0.5em] font-mono" />

                  <Input label="New password" type={showPw ? "text" : "password"}
                    placeholder="At least 8 characters"
                    prefix={<Lock size={14} />}
                    suffix={
                      <button type="button" onClick={() => setShowPw(!showPw)}
                        className="pointer-events-auto text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    }
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    required autoComplete="new-password" />

                  <Button type="submit" variant="gradient" size="lg" loading={loading} className="w-full">
                    {loading ? "Resetting…" : "Reset password"}
                  </Button>
                  <Button type="button" variant="ghost" size="sm"
                    onClick={() => { setStep("email"); setCode(""); setError(""); }}>
                    ← Back
                  </Button>
                </form>
              </motion.div>
            )}

            {step === "done" && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col items-center text-center py-4">
                <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">
                  <MailCheck size={28} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Password reset!</h2>
                <p className="mt-3 text-sm text-muted-foreground max-w-xs">
                  Your password has been updated. Redirecting you to your dashboard…
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
