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
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      url: `https://searchenginebasics.io/${params.slug}/${article.slug}`,
      type: "article",
      images: [{ url: article.image || "/Thumbnail.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      images: [article.image || "/Thumbnail.png"],
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
      image={article.image}
      date={article.date}
      updatedOn={article.updatedOn}
      readTime={article.readTime}
      relatedPosts={article.relatedPosts}
      seriesArticles={article.seriesArticles}
      seriesTitle={series.title}
      currentSlug={article.slug}
      toc={article.toc}
      attributes={article.attributes}
      author={article.author}
      updatedBy={article.updatedBy}
      additionalAuthors={article.additionalAuthors}
      reviewers={article.reviewers}
      editors={article.editors}
      faqs={article.faqs}
      shareLinks={article.shareLinks}
    >
      <ArticleContent html={article.content} />
    </ArticleLayout>
  );
}
