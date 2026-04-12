import Link from "next/link";
import { getBlogPosts, type PostMeta } from "@/lib/mdx";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { ArrowRight, Clock } from "lucide-react";

export const metadata = {
  title: "Blog — Sassify",
  description: "Thoughts on building SaaS, engineering, and design.",
};

const categoryVariant: Record<string, "default" | "success" | "warning" | "secondary"> = {
  Product:     "default",
  Engineering: "success",
  Design:      "warning",
};

function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.08)] cursor-pointer">
        {/* Gradient accent */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
          {/* Meta */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge variant={categoryVariant[post.category] ?? "secondary"}>
                {post.category}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock size={11} />
                {post.readTime}
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-200 lg:text-3xl">
                {post.title}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Avatar size="sm" fallback={post.authorAvatar} />
                <div>
                  <p className="text-sm font-medium text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                </div>
              </div>
              <time className="text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </time>
            </div>
          </div>

          {/* CTA arrow */}
          <div className="hidden lg:flex shrink-0 size-12 items-center justify-center rounded-xl border border-border bg-muted/50 text-muted-foreground transition-all duration-200 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary group-hover:translate-x-1">
            <ArrowRight size={18} />
          </div>
        </div>
      </article>
    </Link>
  );
}

function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.07)] cursor-pointer">
        {/* Top color bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex flex-col gap-4 p-6 flex-1">
          <div className="flex items-center justify-between">
            <Badge variant={categoryVariant[post.category] ?? "secondary"} size="sm">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock size={11} />
              {post.readTime}
            </span>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/60">
            <div className="flex items-center gap-2">
              <Avatar size="xs" fallback={post.authorAvatar} />
              <span className="text-xs text-muted-foreground">{post.author}</span>
            </div>
            <time className="text-xs text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const posts = getBlogPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 dot-grid opacity-30" />
      <div className="pointer-events-none fixed top-0 right-0 size-[600px] -translate-y-1/2 translate-x-1/4 rounded-full bg-primary/6 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 py-32">
        {/* Header */}
        <div className="mb-14">
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="default">Blog</Badge>
            <span className="text-sm text-muted-foreground">{posts.length} articles</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground lg:text-5xl">
            Ideas, engineering,<br />
            <span className="text-gradient">and design.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Thoughts on building modern SaaS products — from architecture decisions to design systems.
          </p>

          {/* Category filter */}
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-border bg-muted/50 px-3 py-1 text-sm text-muted-foreground cursor-pointer hover:border-primary/40 hover:text-foreground transition-all duration-150 first:bg-primary first:text-white first:border-primary"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Featured post */}
        <div className="mb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Featured
          </p>
          <FeaturedPost post={featured} />
        </div>

        {/* Post grid */}
        {rest.length > 0 && (
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Latest
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
