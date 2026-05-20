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
    <section id="featured-articles" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="tag">Latest Articles</span>
            <span
              className="block mt-4 text-[#E8E8F0]"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Start reading.<br />Start ranking.
            </span>
          </div>
          <Link href="/blog" className="hidden md:inline-flex btn-ghost text-sm px-5 py-2.5 rounded-full">
            All Articles -&gt;
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href={featured.href}
            className="card-hover group relative overflow-hidden rounded-lg border border-[#1E1E30] md:col-span-2 lg:col-span-2"
            style={{ background: "var(--card)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${featured.accent}, transparent)` }} />

            {featured.image && (
              <div className="w-full aspect-[16/8] overflow-hidden border-b border-[#1E1E30] bg-[#0F0F1A]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            )}

            <div className="flex min-h-[270px] flex-col justify-between p-5 sm:p-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <TagChip label={featured.tag} accent={featured.accent} />
                  <span className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-mono)" }}>
                    Featured Article
                  </span>
                </div>

                <ArticlePeekCard
                  title={featured.title}
                  excerpt={featured.excerpt}
                  attributes={featured.attributes}
                  minHeightClassName="min-h-[132px]"
                  titleClassName="text-xl sm:text-2xl font-extrabold text-[#E8E8F0] leading-tight group-hover:text-[#B8FF35] transition-colors duration-300"
                  excerptClassName="mt-4 text-[#6B6B80] text-sm leading-relaxed line-clamp-3"
                  titleTag="span"
                />
              </div>

              <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#1E1E30]">
                <div className="flex items-center gap-4 text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-mono)" }}>
                  <span>{featured.date}</span>
                  <span>.</span>
                  <span>{featured.readTime} read</span>
                </div>
                <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200" style={{ color: featured.accent, fontFamily: "var(--font-syne)" }}>
                  Read Article -&gt;
                </span>
              </div>
            </div>
          </Link>

          {rest.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="card-hover group flex min-h-[270px] flex-col overflow-hidden rounded-lg border border-[#1E1E30] transition-all duration-300 hover:bg-[#0F0F1A]/80"
              style={{ background: "var(--card)" }}
            >
              {article.image && (
                <div className="aspect-[16/9] overflow-hidden border-b border-[#1E1E30] bg-[#0F0F1A]">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <TagChip label={article.tag} accent={article.accent} />
                  </div>
                  <ArticlePeekCard
                    title={article.title}
                    compact
                    minHeightClassName="min-h-[86px]"
                    titleClassName="text-base font-bold text-[#E8E8F0] leading-snug group-hover:text-[#B8FF35] transition-colors duration-300 line-clamp-3"
                    titleTag="span"
                  />
                </div>
                <div className="mt-5 border-t border-[#1E1E30] pt-4 text-[10px] text-[#6B6B80]" style={{ fontFamily: "var(--font-mono)" }}>
                  <span>{article.readTime} read</span>
                </div>
              </div>
            </Link>
          ))}
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
