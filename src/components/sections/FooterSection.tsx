const links = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export function FooterSection() {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <p className="text-lg font-bold text-gradient mb-3">Sassify</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              The modern SaaS platform built for speed, scale, and simplicity.
            </p>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {category}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sassify. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
