import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const contentRoot = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

export interface DocMeta {
  slug: string[];
  title: string;
  excerpt: string;
  order: number;
}

/* ── Blog ─────────────────────────────────────── */

export const getBlogPosts = cache((): PostMeta[] => {
  const dir = path.join(contentRoot, "blog");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const { data } = matter(fs.readFileSync(path.join(dir, filename), "utf8"));
      return { slug, ...data } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export const getBlogPost = cache((slug: string): { meta: PostMeta; content: string } => {
  const filepath = path.join(contentRoot, "blog", `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(filepath, "utf8"));
  return { meta: { slug, ...data } as PostMeta, content };
});

export const getBlogSlugs = cache((): string[] =>
  fs
    .readdirSync(path.join(contentRoot, "blog"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""))
);

/* ── Docs ─────────────────────────────────────── */

function collectDocFiles(dir: string, base: string[] = []): DocMeta[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results: DocMeta[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      results.push(...collectDocFiles(path.join(dir, entry.name), [...base, entry.name]));
    } else if (entry.name.endsWith(".mdx")) {
      const slug = [...base, entry.name.replace(".mdx", "")];
      const { data } = matter(fs.readFileSync(path.join(dir, entry.name), "utf8"));
      results.push({ slug, ...data } as DocMeta);
    }
  }
  return results.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export const getDocPages = cache((): DocMeta[] =>
  collectDocFiles(path.join(contentRoot, "docs"))
);

export const getDocPage = cache((slug: string[]): { meta: DocMeta; content: string } => {
  const filepath = path.join(contentRoot, "docs", ...slug) + ".mdx";
  const { data, content } = matter(fs.readFileSync(filepath, "utf8"));
  return { meta: { slug, ...data } as DocMeta, content };
});

export const getDocSlugs = cache((): string[][] =>
  collectDocFiles(path.join(contentRoot, "docs")).map((d) => d.slug)
);
