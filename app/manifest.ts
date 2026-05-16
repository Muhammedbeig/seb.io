import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Search Engine Basics",
    short_name: "SEB.io",
    description: "Structured reading series for understanding how search engines crawl, index, and rank the web.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#07070F",
    theme_color: "#B8FF35",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
