import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sassify — Production-Ready SaaS Template";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050508",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid dots background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Purple glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(168,85,247,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Cyan glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "100px",
            width: "400px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "linear-gradient(135deg, #a855f7, #06b6d4)",
            marginBottom: 32,
            boxShadow: "0 0 40px rgba(168,85,247,0.5)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="9" height="9" rx="2" fill="white" fillOpacity="0.9" />
            <rect x="13" y="2" width="9" height="9" rx="2" fill="white" fillOpacity="0.6" />
            <rect x="2" y="13" width="9" height="9" rx="2" fill="white" fillOpacity="0.6" />
            <rect x="13" y="13" width="9" height="9" rx="2" fill="white" fillOpacity="0.3" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "-2px",
            background: "linear-gradient(135deg, #f0f0f8 30%, #a855f7 70%, #06b6d4 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Sassify
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(240,240,248,0.6)",
            textAlign: "center",
            maxWidth: 640,
            lineHeight: 1.4,
          }}
        >
          Production-ready SaaS template. Auth, billing, database, email — all wired up.
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
          {["Next.js 14", "Stripe", "Clerk", "Prisma", "Tailwind CSS"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(240,240,248,0.7)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
