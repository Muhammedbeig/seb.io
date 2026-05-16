import type { MetadataRoute } from "next";
import { absoluteSiteUrl, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/search"],
      },
    ],
    sitemap: absoluteSiteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}

