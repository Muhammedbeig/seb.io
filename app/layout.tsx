import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import RouteScrollReset from "@/components/RouteScrollReset";
import RouteTransitionFallback from "@/components/RouteTransitionFallback";
import AuthorsStrip from "@/components/AuthorsStrip";
import { getAuthors, getSeries, getSiteSettings } from "@/lib/cms";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Search Engine Basics",
  title: "Search Engine Basics: A Step-by-Step SEO Guide for Beginners",
  description:
    "Master search engine basics — learn how crawling, indexing, and ranking work. Build your SEO Knowledge from beginner to expert. Your SEO marketing starts here.",
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
    title: "Search Engine Basics: A Step-by-Step SEO Guide for Beginners",
    description: "Master search engine basics — learn how crawling, indexing, and ranking work.",
    url: SITE_URL,
    siteName: "Search Engine Basics",
    type: "website",
    images: [{ url: "/Thumbnail.png", width: 1200, height: 630, alt: "Search Engine Basics" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Engine Basics: A Step-by-Step SEO Guide for Beginners",
    description: "Master search engine basics — learn how crawling, indexing, and ranking work.",
    images: ["/Thumbnail.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#07070F",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [allSeries, authors, settings] = await Promise.all([
    getSeries(),
    getAuthors(),
    getSiteSettings(),
  ]);
  const gtmId = (settings.gtm_container_id || process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || "GTM-P8LVQLT3")
    .replace(/[^A-Z0-9-]/gi, "")
    .trim();
  const verificationKey = (
    settings.google_site_verification ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    "vHzrzYvTLVaFa1uW5eOTfAb91sB6jXRJySFCcI_apfc"
  ).trim();
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
        {verificationKey && <meta name="google-site-verification" content={verificationKey} />}
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
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
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <RouteScrollReset />
        <Navbar series={headerNavSeries} />
        <RouteTransitionFallback />
        {children}
        <AuthorsStrip authors={authors} />
        <Footer series={headerNavSeries} authors={authors} />
        <MobileBottomNav series={mobileNavSeries} />
      </body>
    </html>
  );
}
