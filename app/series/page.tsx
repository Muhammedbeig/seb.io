import PageShell from "@/components/PageShell";
import Link from "next/link";
import ArticlePeekCard from "@/components/ArticlePeekCard";
import { getSeries } from "@/lib/cms";

export default async function SeriesPage() {
  const series = await getSeries();
  const totalArticles = series.reduce((acc, item) => acc + item.articles.length, 0);

  return (
    <main>
      <PageShell>
        <section className="pt-32 pb-14 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
            <span className="tag">All Series</span>
            <h1
              className="mt-5 text-[#E8E8F0] leading-tight"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
                fontWeight: 800,
              }}
            >
              Topic paths for<br />
              <span className="text-stroke">search engine basics.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#6B6B80]">
              Browse each category as a reading series, with articles arranged into a clean path from first idea to
              deeper technical detail.
            </p>
            <p className="mt-4 text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
              {totalArticles} articles across {series.length} series
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-10">
            {series.length === 0 && <p className="text-[#6B6B80]">No categories are available yet.</p>}

            {series.map((seriesItem, seriesIndex) => {
              const accent = seriesItem.accent || "#B8FF35";

              return (
                <section key={seriesItem.id} className="overflow-hidden rounded-lg border border-[#1E1E30]">
                  <div className="border-b border-[#1E1E30] p-4 sm:p-5" style={{ background: "var(--surface)" }}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
                          <span className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                            {String(seriesIndex + 1).padStart(2, "0")}
                          </span>
                          <h2 className="text-2xl font-bold text-[#E8E8F0]" style={{ fontFamily: "var(--font-syne)" }}>
                            {seriesItem.title}
                          </h2>
                          {seriesItem.isComingSoon && (
                            <span className="tag tag-cyan">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        {seriesItem.description && (
                          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#8F8FA3]">
                            {seriesItem.description}
                          </p>
                        )}
                      </div>
                      <Link href={`/${seriesItem.slug}`} className="btn-ghost rounded-full px-4 py-2 text-xs text-center">
                        Open Series -&gt;
                      </Link>
                    </div>
                  </div>

                  {seriesItem.isComingSoon && seriesItem.articles.length === 0 ? (
                    <div className="px-4 py-5 text-sm text-[#6B6B80]">
                      Articles will appear here when this series is ready.
                    </div>
                  ) : seriesItem.articles.map((article, articleIndex) => (
                    <Link
                      key={article.slug}
                      href={article.href || `/${article.slug}`}
                      className="group grid grid-cols-[46px_minmax(0,1fr)] border-b border-[#1E1E30] transition-colors last:border-b-0 hover:bg-[#0F0F1A]"
                    >
                      <div className="flex justify-center border-r border-[#1E1E30] pt-4 text-[11px] text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                        {seriesIndex + 1}.{articleIndex + 1}
                      </div>
                      <div className={`grid gap-4 px-4 py-4 sm:px-5 ${article.image ? "sm:grid-cols-[104px_minmax(0,1fr)]" : ""}`}>
                        {article.image && (
                          <div className="aspect-[4/3] overflow-hidden rounded-md border border-[#1E1E30] bg-[#0F0F1A]">
                            <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <ArticlePeekCard
                            title={article.title}
                            excerpt={article.excerpt}
                            attributes={article.attributes}
                            previewHeadings={article.previewHeadings}
                          />
                        </div>
                        <div className={`${article.image ? "sm:col-start-2" : ""} mt-0 flex flex-wrap items-center gap-3 text-xs text-[#6B6B80]`} style={{ fontFamily: "var(--font-dm-mono)" }}>
                          <span>{article.readTime}</span>
                          {article.date && <span>{article.date}</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </section>
              );
            })}
          </div>
        </section>
      </PageShell>
    </main>
  );
}
