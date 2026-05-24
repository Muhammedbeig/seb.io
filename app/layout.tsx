import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Sans, Syne } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import RouteScrollReset from "@/components/RouteScrollReset";
import RouteTransitionFallback from "@/components/RouteTransitionFallback";
import AuthorsStrip from "@/components/AuthorsStrip";
import { getAuthors, getSeries, getSiteSettings } from "@/lib/cms";
import { SITE_URL } from "@/lib/site";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Search Engine Basics",
  title: "Search Engine Basics: A Step-by-Step SEO Guide for Beginners",
  description:
    "Master search engine basics — learn how crawling, indexing, and ranking work. Build your SEO Knowledge from beginner to expert. Your SEO marketing starts here.",
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
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        {verificationKey && <meta name="google-site-verification" content={verificationKey} />}
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
          <Script id="gtm-script" strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
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
