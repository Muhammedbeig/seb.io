import Link from "next/link";
import ArticlePeekCard from "@/components/ArticlePeekCard";
import { getSeries } from "@/lib/cms";

export default async function CoreSeries() {
  const allSeries = await getSeries();

  if (allSeries.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="tag">Series</span>
            <h2
              className="mt-4 text-[#E8E8F0] leading-tight"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
              }}
            >
              Read by topic.<br />
              <span className="text-stroke-white">Move in order.</span>
            </h2>
          </div>
          <Link href="/series" className="btn-ghost text-sm px-5 py-2.5 rounded-full self-start md:self-auto">
            All Series -&gt;
          </Link>
        </div>

        <div className="space-y-10">
          {allSeries.map((series, seriesIndex) => {
            const accent = series.accent || "#B8FF35";

            return (
              <section key={series.id} className="overflow-hidden rounded-lg border border-[#1E1E30]">
                <Link
                  href={`/${series.slug}`}
                  className="flex flex-col gap-3 border-b border-[#1E1E30] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  style={{ background: "var(--surface)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
                    <span
                      className="text-xs text-[#6B6B80]"
                      style={{ fontFamily: "var(--font-dm-mono)" }}
                    >
                      {String(seriesIndex + 1).padStart(2, "0")}
                    </span>
                    {series.icon && (
                      <span
                        className="flex items-center [&>svg]:h-5 [&>svg]:w-5"
                        style={{ color: accent }}
                        dangerouslySetInnerHTML={{ __html: series.icon }}
                      />
                    )}
                    <h3 className="text-lg font-bold text-[#E8E8F0]" style={{ fontFamily: "var(--font-syne)" }}>
                      {series.title}
                    </h3>
                    {series.isComingSoon && (
                      <span className="tag tag-cyan">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                    {series.isComingSoon && series.articles.length === 0 ? "Coming soon" : `${series.articles.length} articles`}
                  </span>
                </Link>

                {series.description && (
                  <p className="border-b border-[#1E1E30] px-4 py-3 text-sm leading-relaxed text-[#8F8FA3]">
                    {series.description}
                  </p>
                )}

                <div>
                  {series.isComingSoon && series.articles.length === 0 ? (
                    <div className="px-4 py-5 text-sm text-[#6B6B80]">
                      Articles will appear here when this series is ready.
                    </div>
                  ) : series.articles.map((article, articleIndex) => (
                    <Link
                      key={article.slug}
                      href={article.href || `/${article.slug}`}
                      className="group grid grid-cols-[44px_minmax(0,1fr)] border-b border-[#1E1E30] transition-colors last:border-b-0 hover:bg-[#0F0F1A]"
                    >
                      <div
                        className="flex justify-center border-r border-[#1E1E30] pt-4 text-[11px] text-[#6B6B80]"
                        style={{ fontFamily: "var(--font-dm-mono)" }}
                      >
                        {seriesIndex + 1}.{articleIndex + 1}
                      </div>
                      <div className="px-4 py-4">
                        <ArticlePeekCard
                          title={article.title}
                          excerpt={article.excerpt}
                          attributes={article.attributes}
                          previewHeadings={article.previewHeadings}
                          compact
                        />
                        <div className="mt-3 flex items-center gap-3 text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                          <span>{article.readTime}</span>
                          {article.date && <span>{article.date}</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
