"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs/legacy";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Alert } from "@/components/ui/Alert";
import { cn } from "@/lib/utils";

import { GoogleIcon, FacebookIcon } from "@/components/icons/SocialIcons";

const plans = [
  { id: "free",       name: "Free",       price: "$0",  period: "",    features: ["5 projects", "1GB storage", "Community support"] },
  { id: "pro",        name: "Pro",        price: "$29", period: "/mo", features: ["Unlimited projects", "50GB storage", "Priority support"], popular: true },
  { id: "enterprise", name: "Enterprise", price: "Custom", period: "", features: ["Unlimited everything", "SLA guarantee", "Dedicated support"] },
];

function getStrength(pw: string) {
  if (!pw) return { score: 0, label: "", color: "" };
  let s = 0;
  if (pw.length >= 8)          s++;
  if (/[A-Z]/.test(pw))        s++;
  if (/[0-9]/.test(pw))        s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map = [
    { score: 1, label: "Weak",   color: "bg-red-500" },
    { score: 2, label: "Fair",   color: "bg-yellow-500" },
    { score: 3, label: "Good",   color: "bg-blue-500" },
    { score: 4, label: "Strong", color: "bg-green-500" },
  ];
  return map[s - 1] ?? { score: 0, label: "", color: "" };
}

export default function SignupPage() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [step, setStep]           = useState<"form" | "verify">("form");
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [terms, setTerms]         = useState(false);
  const [code, setCode]           = useState("");
  const [loading, setLoading]     = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError]         = useState("");

  const strength = getStrength(password);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded || !terms) return;
    setLoading(true);
    setError("");

    try {
      const [firstName, ...rest] = name.trim().split(" ");
      await signUp.create({ emailAddress: email, password, firstName, lastName: rest.join(" ") || undefined });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep("verify");
    } catch (err: unknown) {
      const msg = (err as { errors?: { message: string }[] })?.errors?.[0]?.message ?? "Failed to create account.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: unknown) {
      const msg = (err as { errors?: { message: string }[] })?.errors?.[0]?.message ?? "Invalid code.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: "oauth_google" | "oauth_facebook") {
    setOauthLoading(provider); // always first — confirms click is registering
    setError("");

    if (!isLoaded) {
      setError("Clerk is still loading. Please wait a moment and try again.");
      setOauthLoading(null);
      return;
    }
    if (!signUp) {
      setError("Sign-up service unavailable. Please refresh the page.");
      setOauthLoading(null);
      return;
    }

    try {
      await signUp.authenticateWithRedirect({
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
      <div className="pointer-events-none fixed top-[-10%] left-[-5%] size-[500px] rounded-full bg-primary/8 blur-3xl blob-2" />
      <div className="pointer-events-none fixed bottom-[-20%] right-[-10%] size-[400px] rounded-full bg-secondary/8 blur-3xl blob-1" />
      <div className="pointer-events-none fixed inset-0 dot-grid opacity-30" />

      <motion.div className="relative z-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>

        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>

        <div className="glass rounded-2xl border border-border/60 overflow-hidden">
          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }} className="p-8">

                <div className="mb-8">
                  <span className="text-xl font-bold text-gradient">Sassify</span>
                  <h1 className="mt-4 text-2xl font-bold text-foreground">Create your account</h1>
                  <p className="mt-1.5 text-sm text-muted-foreground">Start your free 14-day trial — no credit card required</p>
                </div>

                {error && <div className="mb-4"><Alert variant="error">{error}</Alert></div>}

                {/* Social */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button variant="outline" type="button" loading={oauthLoading === "oauth_google"} onClick={() => handleOAuth("oauth_google")} className="w-full"><GoogleIcon /> Google</Button>
                  <Button variant="outline" type="button" loading={oauthLoading === "oauth_facebook"} onClick={() => handleOAuth("oauth_facebook")} className="w-full"><FacebookIcon /> Facebook</Button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center">
                    <span className="bg-[var(--glass-bg)] backdrop-blur-sm px-3 text-xs text-muted-foreground">or sign up with email</span>
                  </div>
                </div>

                <form onSubmit={handleRegister}>
                  <div className="flex flex-col gap-4">
                    <Input label="Full name" type="text" placeholder="Alex Chen" prefix={<User size={14} />}
                      value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
                    <Input label="Email" type="email" placeholder="you@example.com" prefix={<Mail size={14} />}
                      value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                    <div className="flex flex-col gap-1.5">
                      <Input label="Password" type={showPw ? "text" : "password"} placeholder="At least 8 characters"
                        prefix={<Lock size={14} />}
                        suffix={
                          <button type="button" onClick={() => setShowPw(!showPw)}
                            className="pointer-events-auto text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                            {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        }
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required autoComplete="new-password" />
                      {password && (
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 flex-1">
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} className={cn("h-1 flex-1 rounded-full transition-all duration-300",
                                i <= strength.score ? strength.color : "bg-muted")} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground w-12 text-right">{strength.label}</span>
                        </div>
                      )}
                    </div>

                    {/* Plan selection */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-foreground">Choose your plan</label>
                      <div className="grid grid-cols-3 gap-2">
                        {plans.map((plan) => (
                          <button key={plan.id} type="button" onClick={() => setSelectedPlan(plan.id)}
                            className={cn("relative flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all duration-200 cursor-pointer",
                              selectedPlan === plan.id ? "border-primary bg-primary/8" : "border-border hover:border-border/80 hover:bg-muted/50")}>
                            {plan.popular && <span className="absolute -top-2 left-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">Popular</span>}
                            {selectedPlan === plan.id && <span className="absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-primary text-white"><Check size={10} strokeWidth={3} /></span>}
                            <span className="text-sm font-semibold text-foreground">{plan.name}</span>
                            <span className="text-xs font-bold text-primary">{plan.price}<span className="text-muted-foreground font-normal">{plan.period}</span></span>
                            <ul className="flex flex-col gap-0.5 mt-1">
                              {plan.features.map((f) => <li key={f} className="text-[11px] text-muted-foreground leading-tight">{f}</li>)}
                            </ul>
                          </button>
                        ))}
                      </div>
                    </div>

                    <Checkbox label="I agree to the Terms of Service and Privacy Policy"
                      checked={terms} onChange={(e) => setTerms(e.target.checked)} required />

                    <Button type="submit" variant="gradient" size="lg" loading={loading} disabled={!terms} className="w-full mt-1">
                      {loading ? "Creating account…" : "Create account"}
                    </Button>
                  </div>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:opacity-80 transition-opacity font-medium cursor-pointer">Sign in</Link>
                </p>
              </motion.div>
            ) : (
              /* ── Verification step ── */
              <motion.div key="verify" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }} className="p-8 flex flex-col items-center text-center">

                <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ShieldCheck size={28} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Check your inbox</h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                  We sent a 6-digit code to <strong className="text-foreground">{email}</strong>. Enter it below to verify your email.
                </p>

                {error && <div className="w-full mt-4"><Alert variant="error">{error}</Alert></div>}

                <form onSubmit={handleVerify} className="w-full mt-6 flex flex-col gap-4">
                  <Input label="Verification code" type="text" inputMode="numeric" pattern="[0-9]*"
                    placeholder="000000" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    required autoComplete="one-time-code" className="text-center text-2xl tracking-[0.5em] font-mono" />
                  <Button type="submit" variant="gradient" size="lg" loading={loading} className="w-full">
                    {loading ? "Verifying…" : "Verify email"}
                  </Button>
                  <Button type="button" variant="ghost" size="sm"
                    onClick={() => { setStep("form"); setCode(""); setError(""); }}>
                    ← Back to sign up
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
