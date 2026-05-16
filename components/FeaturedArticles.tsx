import Link from "next/link";
import ArticlePeekCard from "@/components/ArticlePeekCard";
import { getFeaturedArticles } from "@/lib/cms";

function TagChip({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      style={{
        background: `${accent}15`,
        border: `1px solid ${accent}30`,
        color: accent,
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "2px 8px",
        borderRadius: "3px",
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}

export default async function FeaturedArticles() {
  const articles = await getFeaturedArticles();
  const [featured, ...rest] = articles;

  if (!featured) {
    return null;
  }

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="tag">Latest Articles</span>
            <h2
              className="mt-4 text-[#E8E8F0]"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Start reading.<br />Start ranking.
            </h2>
          </div>
          <Link href="/blog" className="hidden md:inline-flex btn-ghost text-sm px-5 py-2.5 rounded-full">
            All Articles -&gt;
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          <Link
            href={featured.href}
            className="card-hover lg:col-span-3 group relative rounded-2xl border border-[#1E1E30] overflow-hidden p-8 flex flex-col justify-between"
            style={{ background: "var(--card)", minHeight: "360px" }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${featured.accent}, transparent)` }} />

            <div>
              <div className="flex items-center gap-3 mb-5">
                <TagChip label={featured.tag} accent={featured.accent} />
                <span className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-mono)" }}>
                  Featured
                </span>
              </div>

              <ArticlePeekCard
                title={featured.title}
                excerpt={featured.excerpt}
                attributes={featured.attributes}
                previewHeadings={featured.previewHeadings}
                minHeightClassName="min-h-[160px]"
                titleClassName="text-2xl font-bold text-[#E8E8F0] leading-snug group-hover:text-[#B8FF35] transition-colors duration-300"
                excerptClassName="mt-4 text-[#6B6B80] text-sm leading-relaxed line-clamp-4"
              />
            </div>

            <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#1E1E30]">
              <div className="flex items-center gap-4 text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-mono)" }}>
                <span>{featured.date}</span>
                <span>.</span>
                <span>{featured.readTime} read</span>
              </div>
              <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200" style={{ color: featured.accent, fontFamily: "var(--font-syne)" }}>
                Read -&gt;
              </span>
            </div>
          </Link>

          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="card-hover group rounded-2xl border border-[#1E1E30] p-5 flex flex-col justify-between"
                style={{ background: "var(--card)", flex: 1 }}
              >
                <div>
                  <TagChip label={article.tag} accent={article.accent} />
                  <div className="mt-2.5">
                    <ArticlePeekCard
                      title={article.title}
                      excerpt={article.excerpt}
                      attributes={article.attributes}
                      previewHeadings={article.previewHeadings}
                      compact
                      minHeightClassName="min-h-[72px]"
                      titleClassName="text-sm font-bold text-[#E8E8F0] leading-snug group-hover:text-[#B8FF35] transition-colors duration-300 line-clamp-2"
                      excerptClassName="mt-1 text-xs text-[#6B6B80] leading-relaxed line-clamp-2"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-mono)" }}>
                  <span>{article.readTime} read</span>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200" style={{ color: article.accent }}>
                    -&gt;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 md:hidden text-center">
          <Link href="/blog" className="btn-ghost text-sm px-6 py-3 rounded-full inline-block">
            View All Articles -&gt;
          </Link>
        </div>
      </div>
    </section>
  );
}
