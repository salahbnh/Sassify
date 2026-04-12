import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://sassify.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/settings", "/profile", "/notifications", "/sso-callback"],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
