export default function Ticker() {
  const items = [
    "Crawling",
    "Indexing",
    "Ranking",
    "PageRank",
    "E-E-A-T",
    "Core Web Vitals",
    "Keyword Research",
    "Technical SEO",
    "On-Page SEO",
    "Link Building",
    "Search Algorithms",
    "SERP Features",
    "Structured Data",
    "Sitemaps",
    "Robots.txt",
    "Canonical Tags",
  ];

  const doubled = [...items, ...items];

  return (
    <div
      className="border-y border-[#1E1E30] py-3 overflow-hidden"
      style={{ background: "rgba(184,255,53,0.03)" }}
    >
      <div className="ticker-track flex items-center gap-0 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="text-xs font-semibold tracking-widest text-[#6B6B80] uppercase px-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {item}
            </span>
            <span className="text-[#1E1E30] text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
