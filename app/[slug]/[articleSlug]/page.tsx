import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";
import ArticleLayout from "@/components/ArticleLayout";
import { getBlogArticle, getSeriesBySlug } from "@/lib/cms";

type PageProps = {
  params: { slug: string; articleSlug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getBlogArticle(params.articleSlug);
  if (!article || article.categorySlug !== params.slug) {
    return {};
  }

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    alternates: {
      canonical: `https://searchenginebasics.io/${params.slug}/${article.slug}`,
    },
  };
}

export default async function NestedArticlePage({ params }: PageProps) {
  const [series, article] = await Promise.all([
    getSeriesBySlug(params.slug),
    getBlogArticle(params.articleSlug),
  ]);

  if (!series || !article || article.categorySlug !== params.slug) {
    notFound();
  }

  return (
    <ArticleLayout
      tag={article.tag}
      tagColor={article.accent}
      title={article.title}
      excerpt={article.excerpt}
      date={article.date}
      readTime={article.readTime}
      relatedPosts={article.relatedPosts}
      seriesArticles={article.seriesArticles}
      seriesTitle={series.title}
      currentSlug={article.slug}
      toc={article.toc}
      attributes={article.attributes}
      author={article.author}
      additionalAuthors={article.additionalAuthors}
      reviewers={article.reviewers}
      editors={article.editors}
      faqs={article.faqs}
    >
      <ArticleContent html={article.content} />
    </ArticleLayout>
  );
}
