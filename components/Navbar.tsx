"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export type NavSeries = {
  title: string;
  slug: string;
  icon?: string;
  header_nav_order?: number;
  mobile_nav_order?: number;
};

// Blog is always shown as the last static link
const blogLink = {
  label: "Blog",
  href: "/blog",
  iconHtml: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
};

// Fallback icon for series that don't have one set in the DB
const fallbackSeriesIcon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>';

function buildNavLinks(series: NavSeries[]) {
  const seriesLinks = series.map((s) => ({
    label: s.title,
    href: `/${s.slug}`,
    iconHtml: s.icon || fallbackSeriesIcon,
  }));
  return [...seriesLinks, blogLink];
}

export default function Navbar({ series = [] }: { series?: NavSeries[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = buildNavLinks(series);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#07070F]/90 backdrop-blur-xl border-b border-[#1E1E30]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 relative">
            <div className="absolute inset-0 rounded border border-[#B8FF35] opacity-80" />
            <div className="absolute inset-[3px] rounded-sm bg-[#B8FF35] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="4.5" cy="4.5" r="2.5" stroke="#07070F" strokeWidth="1.5" />
                <line x1="6.5" y1="6.5" x2="10" y2="10" stroke="#07070F" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-[#E8E8F0]" style={{ fontFamily: "var(--font-syne)" }}>
              SE<span className="text-[#B8FF35]">B</span>
            </span>
            <span className="hidden sm:inline text-sm font-medium text-[#E8E8F0] ml-0.5" style={{ fontFamily: "var(--font-syne)" }}>
              .io
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/blog" && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm transition-colors duration-200 ${
                  isActive ? "text-[#B8FF35]" : "text-[#6B6B80] hover:text-[#E8E8F0]"
                }`}
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <span
                  className="flex items-center [&>svg]:w-[15px] [&>svg]:h-[15px]"
                  dangerouslySetInnerHTML={{ __html: link.iconHtml }}
                />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <form
            onSubmit={handleSearch}
            className={`relative flex items-center justify-end transition-all duration-300 overflow-hidden rounded-full ${
              searchOpen ? "w-56 bg-[#07070F] border border-[#1E1E30]" : "w-9 bg-transparent border border-transparent"
            }`}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
              className={`w-full h-9 bg-transparent text-sm text-[#E8E8F0] pl-10 pr-4 focus:outline-none transition-opacity duration-300 ${
                searchOpen ? "opacity-100" : "opacity-0"
              }`}
            />
            <button
              type={searchOpen ? "submit" : "button"}
              onClick={() => { if (!searchOpen) setSearchOpen(true); }}
              className="absolute left-0 w-9 h-9 flex items-center justify-center text-[#6B6B80] hover:text-[#E8E8F0] transition-colors"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>

          <Link href="/#main-guide" className="btn-lime text-sm px-5 py-2 rounded-full">
            Start Reading {"->"}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <form
            onSubmit={handleSearch}
            className={`relative flex items-center justify-end transition-all duration-300 overflow-hidden rounded-full ${
              searchOpen ? "w-44 bg-[#07070F] border border-[#1E1E30]" : "w-9 bg-transparent border border-transparent"
            }`}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
              className={`w-full h-9 bg-transparent text-sm text-[#E8E8F0] pl-9 pr-3 focus:outline-none transition-opacity duration-300 ${
                searchOpen ? "opacity-100" : "opacity-0"
              }`}
            />
            <button
              type={searchOpen ? "submit" : "button"}
              onClick={() => { if (!searchOpen) setSearchOpen(true); }}
              className="absolute left-0 w-9 h-9 flex items-center justify-center text-[#6B6B80] hover:text-[#E8E8F0] transition-colors"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>

          <button className="flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={`block w-5 h-0.5 bg-[#E8E8F0] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#E8E8F0] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#E8E8F0] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden border-t border-[#1E1E30] bg-[#07070F]/95 backdrop-blur-xl transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/blog" && pathname.startsWith(`${link.href}/`));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 text-sm transition-colors ${
                  isActive ? "text-[#B8FF35]" : "text-[#6B6B80] hover:text-[#E8E8F0]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/#main-guide" className="btn-lime text-sm px-5 py-2.5 rounded-full text-center mt-2" onClick={() => setMenuOpen(false)}>
            Start Reading {"->"}
          </Link>
        </div>
      </div>
    </header>
  );
}
