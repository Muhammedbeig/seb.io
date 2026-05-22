import Link from "next/link";
import type { Author } from "@/lib/cms";
import type { NavSeries } from "./Navbar";

const staticFooterLinks = {
  Company: [
    { label: "About Us", href: "/about-us" },
    { label: "Authors", href: "/authors" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact-us" },
    { label: "llms.txt", href: "/llms.txt" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-and-conditions" },
  ],
};

export default function Footer({ series = [], authors = [] }: { series?: NavSeries[]; authors?: Author[] }) {
  const seriesLinks = series.map((s) => ({
    label: s.title,
    href: `/${s.slug}`,
  }));
  const authorLinks = authors.slice(0, 5).map((author) => ({
    label: author.name,
    href: `/authors/${author.slug}`,
  }));

  const footerLinks: Record<string, { label: string; href: string }[]> = {
    Series: seriesLinks.length > 0 ? seriesLinks : [{ label: "All Series", href: "/series" }],
    Authors: authorLinks.length > 0 ? authorLinks : [{ label: "All Authors", href: "/authors" }],
    ...staticFooterLinks,
  };

  return (
    <footer className="border-t border-[#1E1E30]" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 rounded border border-[#B8FF35] opacity-80" />
                <div className="absolute inset-[3px] rounded-sm bg-[#B8FF35] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="5.5" cy="5.5" r="3" stroke="#07070F" strokeWidth="1.5" />
                    <line x1="7.5" y1="7.5" x2="12" y2="12" stroke="#07070F" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <span className="font-bold text-[#E8E8F0]" style={{ fontFamily: "var(--font-syne)" }}>
                SEB<span className="text-[#B8FF35]">.io</span>
              </span>
            </Link>

            <p className="text-xs text-[#6B6B80] leading-relaxed max-w-[200px]" style={{ fontFamily: "var(--font-dm-sans)" }}>
              The cleanest place to read how search engines actually work.
              Free forever.
            </p>

            <div className="flex items-center gap-3 mt-5">
              {["X", "in", "o"].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg border border-[#1E1E30] flex items-center justify-center text-xs text-[#6B6B80] hover:text-[#E8E8F0] hover:border-[#B8FF35] transition-all duration-200"
                  aria-label={`Social link ${i + 1}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation" className="contents">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p className="text-xs font-semibold text-[#E8E8F0] tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                  {section}
                </p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="text-xs text-[#6B6B80] hover:text-[#E8E8F0] transition-colors duration-200" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1E1E30] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-mono)" }}>
            Copyright 2026 searchenginebasics.io - All rights reserved.
          </p>
          <p className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-mono)" }}>
            Built for readers. Powered by curiosity.
          </p>
        </div>
      </div>
    </footer>
  );
}
