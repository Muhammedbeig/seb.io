import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import ArticleContent from "@/components/ArticleContent";
import ArticleLayout from "@/components/ArticleLayout";
import ArticlePeekCard from "@/components/ArticlePeekCard";
import PageShell from "@/components/PageShell";
import { getBlogArticle, getSeriesBySlug } from "@/lib/cms";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const [series, article] = await Promise.all([
    getSeriesBySlug(params.slug),
    getBlogArticle(params.slug),
  ]);

  if (series) {
    return {
      title: series.meta_title || series.title,
      description: series.meta_description || series.description,
      alternates: {
        canonical: `https://searchenginebasics.io/${series.slug}`,
      },
    };
  }

  if (article) {
    const canonicalPath = article.categorySlug ? `/${article.categorySlug}/${article.slug}` : `/${article.slug}`;
    return {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      alternates: {
        canonical: `https://searchenginebasics.io${canonicalPath}`,
      },
    };
  }

  return {};
}

export default async function DynamicSlugPage({ params }: PageProps) {
  const [series, article] = await Promise.all([
    getSeriesBySlug(params.slug),
    getBlogArticle(params.slug),
  ]);

  if (series) {
    const accent = series.accent || "#B8FF35";

    return (
      <main>
        <PageShell>
          <section className="pt-32 pb-14 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
            <div
              className="absolute pointer-events-none"
              style={{
                top: "18%",
                right: "8%",
                width: 420,
                height: 420,
                background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)`,
              }}
            />
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="tag">Series</span>
                    {series.isComingSoon && (
                      <span className="rounded-full border border-[#B8FF35]/35 bg-[#B8FF35]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#B8FF35]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h1
                    className="mt-5 text-[#E8E8F0] leading-tight"
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
                      fontWeight: 800,
                    }}
                  >
                    {series.title}
                  </h1>
                  {series.description && (
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#8F8FA3]">
                      {series.description}
                    </p>
                  )}
                  <p className="mt-4 text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                    {series.isComingSoon && series.articles.length === 0
                      ? "Articles are being prepared"
                      : `${series.articles.length} articles in this series`}
                  </p>
                </div>

                {series.image && (
                  <div className="overflow-hidden rounded-lg border border-[#1E1E30] aspect-[4/3]">
                    <img src={series.image} alt={series.title} className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </section>

          {series.content && (
            <section className="border-y border-[#1E1E30] py-10" style={{ background: "var(--surface)" }}>
              <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <div
                  className="prose-custom"
                  dangerouslySetInnerHTML={{ __html: series.content }}
                />
              </div>
            </section>
          )}

          <section className="pb-24 pt-10">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              {series.isComingSoon && series.articles.length === 0 ? (
                <div className="rounded-lg border border-[#1E1E30] p-6" style={{ background: "var(--card)" }}>
                  <p className="text-sm font-semibold text-[#E8E8F0]" style={{ fontFamily: "var(--font-syne)" }}>
                    Coming Soon
                  </p>
                  <p className="mt-2 text-sm text-[#6B6B80]">
                    This series is visible now, and articles will appear here when they are published.
                  </p>
                </div>
              ) : series.articles.length === 0 ? (
                <p className="text-[#6B6B80]">No articles are available in this series yet.</p>
              ) : (
                <div className="overflow-hidden rounded-lg border border-[#1E1E30]">
                  {series.articles.map((article, index) => (
                    <Link
                      key={article.slug}
                      href={article.href || `/${article.slug}`}
                      className="group grid grid-cols-[52px_minmax(0,1fr)] border-b border-[#1E1E30] transition-colors last:border-b-0 hover:bg-[#0F0F1A]"
                    >
                      <div
                        className="flex justify-center border-r border-[#1E1E30] pt-4 text-[11px] text-[#6B6B80]"
                        style={{ fontFamily: "var(--font-dm-mono)" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="px-4 py-4 sm:px-5">
                        <ArticlePeekCard
                          title={article.title}
                          excerpt={article.excerpt}
                          attributes={article.attributes}
                          previewHeadings={article.previewHeadings}
                        />
                        <div
                          className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#6B6B80]"
                          style={{ fontFamily: "var(--font-dm-mono)" }}
                        >
                          <span>{article.readTime}</span>
                          {article.date && <span>{article.date}</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </PageShell>
      </main>
    );
  }

  if (!article) {
    notFound();
  }

  if (article.categorySlug) {
    permanentRedirect(`/${article.categorySlug}/${article.slug}`);
  }

  return (
    <ArticleLayout
      tag={article.tag}
      tagColor={article.accent}
      title={article.title}
      excerpt={article.excerpt}
      date={article.date}
      updatedOn={article.updatedOn}
      readTime={article.readTime}
      relatedPosts={article.relatedPosts}
      seriesArticles={article.seriesArticles}
      currentSlug={article.slug}
      toc={article.toc}
      attributes={article.attributes}
      author={article.author}
      updatedBy={article.updatedBy}
      additionalAuthors={article.additionalAuthors}
      reviewers={article.reviewers}
      editors={article.editors}
      faqs={article.faqs}
    >
      <ArticleContent html={article.content} />
    </ArticleLayout>
  );
}
