import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getDocPage, getDocSlugs } from "@/lib/mdx";
import { mdxComponents, Callout, Warning, Success } from "@/components/mdx/MdxComponents";
import { docsNav, slugToHref } from "@/lib/docs-nav";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params;
    const { meta } = getDocPage(slug);
    return { title: `${meta.title} — Sassify Docs`, description: meta.excerpt };
  } catch {
    return {};
  }
}

const prettyCodeOptions = { theme: "github-dark-dimmed", keepBackground: false };

/** Flatten nav items to find prev/next */
function getFlatNav() {
  return docsNav.flatMap((s) => s.items);
}

export default async function DocsPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  let page;
  try {
    page = getDocPage(slug);
  } catch {
    notFound();
  }

  const { meta, content } = page;
  const flat = getFlatNav();
  const currentIndex = flat.findIndex((item) => item.slug.join("/") === slug.join("/"));
  const prev = currentIndex > 0 ? flat[currentIndex - 1] : null;
  const next = currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null;

  // Build breadcrumb from slug
  const sectionTitle = docsNav.find((s) =>
    s.items.some((i) => i.slug.join("/") === slug.join("/"))
  )?.title;

  return (
    <div className="flex gap-10 xl:flex-row flex-col">
      {/* ── Main ── */}
      <div className="min-w-0 flex-1">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground transition-colors cursor-pointer">Docs</Link>
          {sectionTitle && (
            <>
              <ChevronRight size={12} />
              <span>{sectionTitle}</span>
            </>
          )}
          <ChevronRight size={12} />
          <span className="text-foreground">{meta.title}</span>
        </div>

        {/* Content */}
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

        {/* Prev / Next navigation */}
        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-border/60 pt-8">
          {prev ? (
            <Link
              href={slugToHref(prev.slug)}
              className="group flex flex-col gap-1 rounded-xl border border-border/60 bg-card p-4 hover:border-primary/30 transition-all duration-200 cursor-pointer"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowLeft size={11} /> Previous
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={slugToHref(next.slug)}
              className="group flex flex-col items-end gap-1 rounded-xl border border-border/60 bg-card p-4 hover:border-primary/30 transition-all duration-200 cursor-pointer"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                Next <ArrowRight size={11} />
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {next.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
