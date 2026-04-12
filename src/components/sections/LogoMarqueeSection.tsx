const logos = [
  "GitHub", "Stripe", "Vercel", "Linear", "Notion",
  "Figma",  "Slack",  "AWS",    "Supabase", "Planetscale",
];

function LogoItem({ name }: { name: string }) {
  return (
    <div className="mx-8 flex items-center opacity-40 hover:opacity-70 transition-opacity duration-300 cursor-default shrink-0">
      <span className="text-sm font-semibold tracking-wide text-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function LogoMarqueeSection() {
  const doubled = [...logos, ...logos];

  return (
    <section className="relative py-16 overflow-hidden border-y border-border/40">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
        Trusted by engineers at
      </p>

      <div className="flex">
        <div className="flex marquee-track">
          {doubled.map((name, i) => (
            <LogoItem key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
