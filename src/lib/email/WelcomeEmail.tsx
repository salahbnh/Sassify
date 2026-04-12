interface WelcomeEmailProps {
  name: string;
  plan: string;
}

export function WelcomeEmail({ name, plan }: WelcomeEmailProps) {
  const planLabel = plan.charAt(0) + plan.slice(1).toLowerCase();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 520, margin: "0 auto", padding: "40px 24px", color: "#0f0f13" }}>
      <div style={{ marginBottom: 32 }}>
        <span style={{ fontSize: 22, fontWeight: 800, background: "linear-gradient(135deg, #a855f7, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Sassify
        </span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 12px" }}>
        Welcome, {name}! 🎉
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: "#6b7280", margin: "0 0 24px" }}>
        Your <strong style={{ color: "#a855f7" }}>{planLabel} Plan</strong> is now active. You&apos;re all set to build something amazing.
      </p>

      <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 24px", marginBottom: 28, border: "1px solid #e5e7eb" }}>
        <p style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", color: "#374151" }}>What&apos;s included in {planLabel}:</p>
        <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 14, color: "#6b7280", lineHeight: 2 }}>
          {plan === "PRO" && (
            <>
              <li>Unlimited projects</li>
              <li>50GB storage</li>
              <li>Priority support</li>
              <li>Custom domains + AI features</li>
            </>
          )}
          {plan === "ENTERPRISE" && (
            <>
              <li>Everything in Pro</li>
              <li>Dedicated infrastructure</li>
              <li>SLA guarantee</li>
              <li>Dedicated support</li>
            </>
          )}
          {plan === "FREE" && (
            <>
              <li>Up to 5 projects</li>
              <li>1GB storage</li>
              <li>Community support</li>
            </>
          )}
        </ul>
      </div>

      <a
        href={`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/settings`}
        style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #a855f7, #6366f1)",
          color: "#fff",
          textDecoration: "none",
          padding: "12px 28px",
          borderRadius: 10,
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        Go to your account →
      </a>

      <p style={{ marginTop: 40, fontSize: 13, color: "#9ca3af" }}>
        You&apos;re receiving this email because you signed up at Sassify.<br />
        © {new Date().getFullYear()} Sassify. All rights reserved.
      </p>
    </div>
  );
}
