import type { MetadataRoute } from "next";
import { getBlogSummaries, getSeries } from "@/lib/cms";
import { absoluteSiteUrl } from "@/lib/site";

type SitemapEntry = MetadataRoute.Sitemap[number];

function dateOrToday(input?: string) {
  if (!input) return new Date();

  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function addRoute(routes: Map<string, SitemapEntry>, entry: SitemapEntry) {
  routes.set(entry.url, entry);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = new Map<string, SitemapEntry>();
  const now = new Date();

  [
    { path: "/", changeFrequency: "daily", priority: 1 },
    { path: "/blog", changeFrequency: "daily", priority: 0.9 },
    { path: "/series", changeFrequency: "weekly", priority: 0.8 },
    { path: "/about-us", changeFrequency: "monthly", priority: 0.5 },
    { path: "/contact-us", changeFrequency: "monthly", priority: 0.4 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
    { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.2 },
  ].forEach(({ path, changeFrequency, priority }) => {
    addRoute(routes, {
      url: absoluteSiteUrl(path),
      lastModified: now,
      changeFrequency: changeFrequency as SitemapEntry["changeFrequency"],
      priority,
    });
  });

  const [series, articles] = await Promise.all([getSeries(), getBlogSummaries(1000)]);

  for (const item of series) {
    addRoute(routes, {
      url: absoluteSiteUrl(`/${item.slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    for (const article of item.articles) {
      addRoute(routes, {
        url: absoluteSiteUrl(article.href || `/${item.slug}/${article.slug}`),
        lastModified: dateOrToday(article.date),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  for (const article of articles) {
    addRoute(routes, {
      url: absoluteSiteUrl(article.href),
      lastModified: dateOrToday(article.date),
      changeFrequency: "monthly",
      priority: article.featured || article.isFeatured ? 0.75 : 0.65,
    });
  }

  return Array.from(routes.values());
}

