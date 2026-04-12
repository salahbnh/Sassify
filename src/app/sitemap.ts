import type { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/mdx";
import { getDocSlugs } from "@/lib/mdx";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://sassify.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs  = getBlogSlugs();
  const docSlugs   = getDocSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: APP_URL,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${APP_URL}/blog`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${APP_URL}/docs`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${APP_URL}/changelog`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${APP_URL}/components`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${APP_URL}/login`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${APP_URL}/signup`,      lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${APP_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const docRoutes: MetadataRoute.Sitemap = docSlugs.map((slug) => ({
    url: `${APP_URL}/docs/${slug.join("/")}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...docRoutes];
}
