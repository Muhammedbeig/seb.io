const reasons = [
  {
    icon: "01",
    title: "Structured, not scattered",
    desc: "Articles are grouped into clear series, so each topic has a natural next read instead of becoming a random archive.",
  },
  {
    icon: "02",
    title: "Plain English, real depth",
    desc: "The explanations stay readable while still showing the mechanics behind crawling, indexing, ranking, and technical SEO.",
  },
  {
    icon: "03",
    title: "Easy to update",
    desc: "The panel controls categories, ordering, attributes, and article placement, so the public site stays fast and current.",
  },
  {
    icon: "04",
    title: "Free. Genuinely.",
    desc: "No premium tier and no gated reading. The full guide library stays open.",
  },
];

const topicRows = [
  { label: "Search Fundamentals", pct: 100, color: "#B8FF35" },
  { label: "Crawl and Index", pct: 86, color: "#4A4AFF" },
  { label: "Ranking Signals", pct: 72, color: "#FF9F43" },
  { label: "Technical SEO", pct: 58, color: "#FF6B6B" },
];

export default function WhyReadHere() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(184,255,53,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="tag">Why This Library</span>
            <h2
              className="mt-5 leading-tight text-[#E8E8F0]"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
              }}
            >
              Built for readers
              <br />
              <span className="gradient-text">who want the system.</span>
            </h2>
            <p className="mt-5 text-[#6B6B80] leading-relaxed text-sm max-w-md" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Most SEO content gives isolated tactics. This library shows the underlying systems so each article fits into the bigger picture.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((reason) => (
                <div key={reason.title} className="group">
                  <div className="text-xs mb-3 text-[#B8FF35]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                    {reason.icon}
                  </div>
                  <h4 className="text-sm font-bold text-[#E8E8F0] mb-1.5" style={{ fontFamily: "var(--font-syne)" }}>
                    {reason.title}
                  </h4>
                  <p className="text-xs text-[#6B6B80] leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {reason.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#1E1E30] p-6" style={{ background: "var(--card)" }}>
            <p className="text-xs font-semibold text-[#6B6B80] mb-5 tracking-wider uppercase" style={{ fontFamily: "var(--font-dm-mono)" }}>
              Topic Coverage
            </p>
            {topicRows.map((item) => (
              <div key={item.label} className="mb-5 last:mb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#E8E8F0]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {item.label}
                  </span>
                  <span className="text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: item.color }}>
                    {item.pct}%
                  </span>
                </div>
                <div className="h-1.5 bg-[#1E1E30] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.pct}%`,
                      background: item.color,
                      opacity: 0.85,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
