export interface DocNavItem {
  title: string;
  slug: string[];
}

export interface DocNavSection {
  title: string;
  items: DocNavItem[];
}

export const docsNav: DocNavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction",       slug: ["getting-started", "introduction"] },
      { title: "Installation",       slug: ["getting-started", "installation"] },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Overview",           slug: ["components", "overview"] },
    ],
  },
  {
    title: "Design System",
    items: [
      { title: "Colors & Tokens",    slug: ["design-system", "colors"] },
      { title: "Animations",         slug: ["design-system", "animations"] },
    ],
  },
  {
    title: "Sections",
    items: [
      { title: "Landing Page",       slug: ["sections", "overview"] },
    ],
  },
  {
    title: "Content",
    items: [
      { title: "MDX System",         slug: ["content", "mdx-system"] },
    ],
  },
];

export function slugToHref(slug: string[]): string {
  return `/docs/${slug.join("/")}`;
}
