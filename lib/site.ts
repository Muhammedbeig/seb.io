export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://searchenginebasics.io").replace(/\/$/, "");

export function absoluteSiteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
}

