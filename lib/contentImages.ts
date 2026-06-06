const CONTENT_AVIF_BY_FILE: Record<string, string> = {
  "article1.png": "/images/content/what-is-information-retrieval-core-search-engine-problem.avif",
  "article2.png": "/images/content/vector-space-model-documents-become-numbers.avif",
  "article3.png": "/images/content/tf-idf-bm25-keyword-relevance-mathematics.avif",
  "article4.png": "/images/content/pagerank-link-counting-search-ranking-algorithm.avif",
  "article5.png": "/images/content/hits-algorithm-hubs-authorities-niche-links.avif",
  "article6.png": "/images/content/crawl-index-rank-search-engine-pipeline.avif",
  "article7.png": "/images/content/knowledge-graph-hummingbird-semantic-search-relevance.avif",
  "article8.png": "/images/content/learning-to-rank-machine-learning-search-rankings.avif",
  "article9.png": "/images/content/map-mrr-ndcg-search-ranking-metrics.avif",
  "article10.png": "/images/content/seo-ethics-search-business-model.avif",
  "1779808925-how-web-crawlers-work-seeds-url-frontiers-crawl-rate.png":
    "/images/content/web-crawlers-seeds-url-frontiers-crawl-rate.avif",
  "Thumbnail.png": "/images/content/search-engine-basics-default-thumbnail.avif",
  "1779443913-thumbnail.png": "/images/content/search-engine-basics-default-thumbnail.avif",
  "1779447319-crawling.png": "/images/content/search-engine-crawling-series.avif",
  "1779447653-indexing.png": "/images/content/search-engine-indexing-series.avif",
  "1779448496-ranking.png": "/images/content/search-engine-ranking-series.avif",
};

function fileNameFromUrl(src: string) {
  const cleanSrc = src.split("?")[0].split("#")[0];
  return cleanSrc.substring(cleanSrc.lastIndexOf("/") + 1);
}

export function contentAvifFor(src?: string | null) {
  if (!src) return null;
  return CONTENT_AVIF_BY_FILE[fileNameFromUrl(src)] || null;
}
