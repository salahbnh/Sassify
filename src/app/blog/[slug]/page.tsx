import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getBlogPost, getBlogPosts, getBlogSlugs } from "@/lib/mdx";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { mdxComponents, Callout, Warning, Success } from "@/components/mdx/MdxComponents";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { meta } = getBlogPost(slug);
    return { title: `${meta.title} — Sassify Blog`, description: meta.excerpt };
  } catch {
    return {};
  }
}

const categoryVariant: Record<string, "default" | "success" | "warning" | "secondary"> = {
  Product:     "default",
  Engineering: "success",
  Design:      "warning",
};

const prettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try {
    post = getBlogPost(slug);
  } catch {
    notFound();
  }

  const { meta, content } = post;
  const allPosts = getBlogPosts();
  const related = allPosts.filter((p) => p.slug !== meta.slug && p.category === meta.category).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 dot-grid opacity-20" />
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-gradient-to-b from-primary/8 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 py-32">
        {/* Back */}
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          All posts
        </Link>

        <div className="flex gap-16 lg:flex-row flex-col">
          {/* ── Main content ── */}
          <article className="min-w-0 flex-1">
            {/* Header */}
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge variant={categoryVariant[meta.category] ?? "secondary"}>
                  {meta.category}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={11} /> {meta.readTime}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={11} />
                  {new Date(meta.date).toLocaleDateString("en-US", {
                    month: "long", day: "numeric", year: "numeric",
                  })}
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl">
                {meta.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {meta.excerpt}
              </p>

              {/* Author */}
              <div className="mt-8 flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4">
                <Avatar size="lg" fallback={meta.authorAvatar} status="online" />
                <div>
                  <p className="font-semibold text-foreground">{meta.author}</p>
                  <p className="text-sm text-muted-foreground">{meta.authorRole}</p>
                </div>
              </div>
            </header>

            {/* MDX */}
            <div className="prose-sassify">
              <MDXRemote
                source={content}
                components={{ ...mdxComponents, Callout, Warning, Success }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypePrettyCode, prettyCodeOptions],
                    ],
                  },
                }}
              />
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="mt-16 border-t border-border/60 pt-10">
                <h2 className="mb-6 text-lg font-bold text-foreground">More in {meta.category}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group flex flex-col gap-2 rounded-xl border border-border/60 bg-card p-5 hover:border-primary/30 transition-all duration-200 cursor-pointer"
                    >
                      <Badge variant={categoryVariant[p.category] ?? "secondary"} size="sm">
                        {p.category}
                      </Badge>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {p.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{p.excerpt}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Avatar size="xs" fallback={p.authorAvatar} />
                        <span className="text-xs text-muted-foreground">{p.author}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-28 flex flex-col gap-6">
              {/* Author card */}
              <div className="rounded-xl border border-border/60 bg-card p-4 flex flex-col items-center gap-3 text-center">
                <Avatar size="xl" fallback={meta.authorAvatar} status="online" />
                <div>
                  <p className="font-semibold text-foreground text-sm">{meta.author}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{meta.authorRole}</p>
                </div>
              </div>

              {/* Post meta */}
              <div className="rounded-xl border border-border/60 bg-card p-4 flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">Category</span>
                  <Badge variant={categoryVariant[meta.category] ?? "secondary"} size="sm">
                    {meta.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">Read time</span>
                  <span className="text-xs text-foreground">{meta.readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">Published</span>
                  <span className="text-xs text-foreground">
                    {new Date(meta.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Back link */}
              <Link
                href="/blog"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <ArrowLeft size={12} />
                Back to all posts
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
