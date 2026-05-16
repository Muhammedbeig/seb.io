import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import RouteScrollReset from "@/components/RouteScrollReset";
import RouteTransitionFallback from "@/components/RouteTransitionFallback";
import { getSeries } from "@/lib/cms";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Search Engine Basics",
  title: "Search Engine Basics - SEO Guides and Reading Series",
  description:
    "Read clear guides on how search engines crawl, index, and rank websites. Free, structured SEO series at searchenginebasics.io.",
  keywords: [
    "SEO",
    "search engine basics",
    "SEO guides",
    "crawling indexing ranking",
    "SEO education",
    "how search engines work",
  ],
  authors: [{ name: "Search Engine Basics" }],
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Search Engine Basics",
    description: "The cleanest way to read how search engines actually work.",
    url: SITE_URL,
    siteName: "Search Engine Basics",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07070F",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const allSeries = await getSeries();
  const mobileNavSeries = allSeries
    .filter((s) => s.show_in_mobile_nav ?? s.show_in_nav ?? false)
    .sort((a, b) => (a.mobile_nav_order ?? a.nav_order ?? 0) - (b.mobile_nav_order ?? b.nav_order ?? 0))
    .map((s) => ({ title: s.title, slug: s.slug, icon: s.icon, mobile_nav_order: s.mobile_nav_order }));

  const headerNavSeries = allSeries
    .filter((s) => s.show_in_header_nav ?? s.show_in_nav ?? false)
    .sort((a, b) => (a.header_nav_order ?? a.nav_order ?? 0) - (b.header_nav_order ?? b.nav_order ?? 0))
    .map((s) => ({ title: s.title, slug: s.slug, icon: s.icon, header_nav_order: s.header_nav_order }));

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{
          __html: `
          :root {
            --font-syne: 'Syne', sans-serif;
            --font-dm-sans: 'DM Sans', sans-serif;
            --font-dm-mono: 'DM Mono', monospace;
          }
        `}} />
        <script
          id="mathjax-config"
          dangerouslySetInnerHTML={{
            __html: `
              window.MathJax = {
                tex: {
                  inlineMath: [['\\\\(', '\\\\)'], ['$', '$']],
                  displayMath: [['\\\\[', '\\\\]'], ['$$', '$$']],
                  processEscapes: true
                },
                options: {
                  skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
                },
                startup: { typeset: false }
              };
            `,
          }}
        />
      </head>
      <body className="antialiased pb-14 md:pb-0">
        <RouteScrollReset />
        <Navbar series={headerNavSeries} />
        <RouteTransitionFallback />
        {children}
        <Footer series={headerNavSeries} />
        <MobileBottomNav series={mobileNavSeries} />
      </body>
    </html>
  );
}
