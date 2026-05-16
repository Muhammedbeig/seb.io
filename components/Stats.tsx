import { getSeries } from "@/lib/cms";

export default async function Stats() {
  const allSeries = await getSeries();
  const totalArticles = allSeries.reduce((acc, s) => acc + s.articles.length, 0);
  const displayArticles = totalArticles > 0 ? `${totalArticles}+` : "26+";
  const displaySeries = allSeries.length > 0 ? `${allSeries.length}+` : "6+";

  const stats = [
    { value: displayArticles, label: "Free Articles", sub: "and growing" },
    { value: displaySeries, label: "Topic Series", sub: "category-driven" },
    { value: "0", label: "Accounts Needed", sub: "open reading" },
    { value: "100%", label: "Free Forever", sub: "no paywalls" },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(184,255,53,0.04) 0%, transparent 50%, rgba(74,74,255,0.04) 100%)",
        }}
      />
      <div className="section-line" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#1E1E30]">
          {stats.map((s, i) => (
            <div key={i} className="text-center lg:px-10">
              <div
                className="stat-number"
                style={{
                  fontFamily: "var(--font-syne)",
                  background: i === 3 ? "linear-gradient(135deg, #B8FF35, #66FF99)" : undefined,
                  WebkitBackgroundClip: i === 3 ? "text" : undefined,
                  WebkitTextFillColor: i === 3 ? "transparent" : undefined,
                }}
              >
                {s.value}
              </div>
              <p
                className="mt-2 text-sm font-semibold text-[#E8E8F0]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {s.label}
              </p>
              <p
                className="text-xs text-[#6B6B80] mt-0.5"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-line" />
    </section>
  );
}
