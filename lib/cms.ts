export type Author = {
  id: number;
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  avatar?: string;
  avatar_url?: string;
  website_url?: string;
  social_links?: Record<string, string>;
  blogs_count?: number;
  articles?: BlogSummary[];
  status?: boolean;
};

export type BlogSummary = {
  id?: number;
  tag: string;
  title: string;
  excerpt: string;
  href: string;
  slug: string;
  readTime: string;
  date: string;
  updatedOn?: string | null;
  accent: string;
  featured?: boolean;
  isFeatured?: boolean;
  image?: string | null;
  categoryId?: number | null;
  categorySlug?: string | null;
  categoryTitle?: string | null;
  attributes?: ArticleAttribute[];
  previewHeadings?: string[];
};

export type ArticleAttribute = {
  label: string;
  color: string;
};

export type ArticleFaq = {
  id?: number;
  question: string;
  answer: string;
  sortOrder?: number;
  includeInSchema?: boolean;
  schemaQuestion?: string | null;
  schemaAnswer?: string | null;
  options?: Record<string, unknown>;
};

export type BlogArticle = BlogSummary & {
  content: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  author?: Author;
  updatedBy?: Author | null;
  additionalAuthors?: Author[];
  reviewers?: Author[];
  editors?: Author[];
  toc?: { id: string; text: string; level: number }[];
  relatedPosts?: Array<{ title: string; href: string; tag: string; tagColor: string; isCurrent?: boolean }>;
  seriesArticles?: ArticleSummary[];
  faqs?: ArticleFaq[];
  shareLinks?: ShareLinks;
};

export type SharePlatform = "facebook" | "instagram" | "tiktok" | "whatsapp" | "link";

export type ShareLinks = Partial<Record<SharePlatform, {
  shortUrl: string;
  targetUrl: string;
}>>;

export type SiteSettings = {
  brand_name?: string;
  domain?: string;
  site_url?: string;
  contact_email?: string;
  google_site_verification?: string;
  gtm_container_id?: string;
  default_thumbnail?: string | null;
  home_main_article_markdown?: string | null;
};

export type HomeMainArticleSettings = {
  home_main_article_markdown?: string | null;
};

export type CompanyPage = {
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
};

type CmsResponse<T> = {
  error?: boolean;
  message?: string;
  data?: T;
  related?: BlogSummary[];
  seriesArticles?: ArticleSummary[];
};

type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

function articleHref(slug: string, categorySlug?: string | null): string {
  return categorySlug ? `/${categorySlug}/${slug}` : `/${slug}`;
}

const fallbackArticles: BlogSummary[] = [
  {
    tag: "Algorithms",
    title: "Search Engine Algorithms Explained: How Google Finds and Ranks Websites",
    excerpt:
      "A deep dive into the systems Google uses to evaluate billions of pages and return the most relevant result in milliseconds.",
    href: "/search-engine-algorithms-explained",
    slug: "search-engine-algorithms-explained",
    readTime: "8 min",
    date: "Mar 16, 2026",
    accent: "#B8FF35",
    featured: true,
    isFeatured: true,
  },
  {
    tag: "Basics",
    title: "Search Engine Basics: Complete Beginner Guide to How Search Engines Work",
    excerpt: "Search engines have become a daily part of our lives. This is your starting point for understanding all of it.",
    href: "/search-engine-basics",
    slug: "search-engine-basics",
    readTime: "12 min",
    date: "Mar 13, 2026",
    accent: "#4A4AFF",
  },
  {
    tag: "Ranking",
    title: "How Google Ranks Websites: 10 Key Factors Explained (2026 Guide)",
    excerpt: "From E-E-A-T to Core Web Vitals, the signals that matter most and how to optimize for them.",
    href: "/how-google-ranks-websites",
    slug: "how-google-ranks-websites",
    readTime: "10 min",
    date: "Mar 13, 2026",
    accent: "#FF9F43",
  },
  {
    tag: "Ranking",
    title: "What Is Search Engine Ranking: Complete Guide",
    excerpt: "Search engine ranking is the process that decides which web pages appear first. Here's how it works in detail.",
    href: "/search-engine-ranking",
    slug: "search-engine-ranking",
    readTime: "9 min",
    date: "Feb 25, 2026",
    accent: "#FF6B6B",
  },
  {
    tag: "Indexing",
    title: "What Is Search Engine Indexing: Complete Beginner Guide",
    excerpt: "After crawling, Google stores and organizes your content in its index. See what that means for your site.",
    href: "/search-engine-indexing",
    slug: "search-engine-indexing",
    readTime: "6 min",
    date: "Feb 22, 2026",
    accent: "#FF6B6B",
  },
  {
    tag: "Crawling",
    title: "What Is Search Engine Crawling: How It Works (Beginner Guide)",
    excerpt: "Search engine crawling is the first and most important step in how search engines discover websites.",
    href: "/search-engine-crawling",
    slug: "search-engine-crawling",
    readTime: "7 min",
    date: "Feb 21, 2026",
    accent: "#4A4AFF",
  },
  {
    tag: "Basics",
    title: "How Search Engines Work: Crawling, Indexing, and Ranking Explained",
    excerpt: "A complete walkthrough of the three-stage process that powers every search result you've ever seen.",
    href: "/how-search-engine-works",
    slug: "how-search-engine-works",
    readTime: "11 min",
    date: "Feb 19, 2026",
    accent: "#B8FF35",
  },
];

function decodeHtmlText(input: string): string {
  return input
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueHeadingId(text: string, usedIds: Set<string>): string {
  const base = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "section";
  let id = base;
  let suffix = 2;

  while (usedIds.has(id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }

  usedIds.add(id);
  return id;
}

function parseHtmlWithToc(html: string): { content: string; toc: { id: string; text: string; level: number }[] } {
  if (!html) return { content: "", toc: [] };
  const toc: { id: string; text: string; level: number }[] = [];
  const usedIds = new Set<string>();
  const content = html.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attributes, innerText) => {
    const plainText = decodeHtmlText(innerText.replace(/<[^>]*>?/gm, ""));
    const id = uniqueHeadingId(plainText, usedIds);
    const cleanedAttributes = attributes.replace(/\s+id=(["']).*?\1/i, "");

    toc.push({ id, text: plainText, level: 2 });

    return `<h2${cleanedAttributes} id="${id}">${innerText}</h2>`;
  });
  return { content, toc };
}

function cmsBases(): string[] {
  const bases = new Set<string>();
  const localBase = "http://localhost/PhpPanel/public/api";
  const allowHttpFallback =
    process.env.CMS_ALLOW_HTTP_FALLBACK === "1" ||
    (process.env.NODE_ENV !== "production" && process.env.CMS_ALLOW_HTTP_FALLBACK !== "0");
  const configuredBases = [process.env.CMS_API_URL, process.env.NEXT_PUBLIC_CMS_API_URL]
    .filter((base): base is string => Boolean(base?.trim()))
    .map((base) => base.replace(/\/$/, ""));

  const addBase = (base: string) => {
    if (!base) return;
    bases.add(base);

    if (allowHttpFallback && base.startsWith("https://")) {
      bases.add(`http://${base.slice("https://".length)}`);
    }
  };

  configuredBases.forEach(addBase);

  if (!bases.size || process.env.CMS_INCLUDE_LOCAL_FALLBACKS === "1") {
    addBase(localBase);
    addBase("http://127.0.0.1:8000/api");
  }

  return Array.from(bases);
}

function cmsTimeoutMs(): number {
  const timeout = Number(process.env.CMS_FETCH_TIMEOUT_MS);
  return Number.isFinite(timeout) && timeout > 0 ? timeout : 8000;
}

function cmsRevalidateSeconds(): number {
  const revalidate = Number(process.env.CMS_REVALIDATE_SECONDS);
  return Number.isFinite(revalidate) && revalidate >= 0 ? revalidate : 60;
}

function cmsHeaders(input?: HeadersInit, hasBody: boolean = false): Headers {
  const headers = new Headers(input);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (hasBody && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (!headers.has("User-Agent")) headers.set("User-Agent", "searchenginebasics-website/1.0");
  return headers;
}

const cmsWarnings = new Set<string>();

function cmsDebugEnabled(): boolean {
  return process.env.CMS_DEBUG === "1" || process.env.CMS_FETCH_WARNINGS === "1";
}

function describeCmsError(error: unknown): string {
  if (error instanceof Error) {
    if (error.name === "AbortError") return `timed out after ${cmsTimeoutMs()}ms`;
    return error.message || error.name;
  }
  return String(error);
}

function warnCms(url: string, detail: string) {
  if (!cmsDebugEnabled()) return;

  const key = `${url}:${detail}`;
  if (cmsWarnings.has(key)) return;
  cmsWarnings.add(key);
  console.warn(`[CMS] ${url} unavailable (${detail}); using fallback content when available.`);
}

async function cmsFetch(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), cmsTimeoutMs());
  const method = (init?.method || "GET").toUpperCase();
  const requestInit: NextFetchInit = {
    ...init,
    method,
    headers: cmsHeaders(init?.headers, Boolean(init?.body)),
    signal: controller.signal,
  };

  if (method === "GET") {
    const existingTags = requestInit.next?.tags ?? [];
    requestInit.next = {
      ...requestInit.next,
      revalidate: requestInit.next?.revalidate ?? cmsRevalidateSeconds(),
      tags: Array.from(new Set([...existingTags, "cms"])),
    };
  }

  try {
    return await fetch(url, requestInit);
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchCms<T>(path: string, init?: RequestInit): Promise<CmsResponse<T> | null> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  for (const base of cmsBases()) {
    const url = `${base}${normalizedPath}`;
    try {
      const response = await cmsFetch(url, init);

      if (!response.ok) {
        warnCms(url, `HTTP ${response.status}`);
        continue;
      }

      return (await response.json()) as CmsResponse<T>;
    } catch (err) {
      warnCms(url, describeCmsError(err));
    }
  }

  return null;
}

function normalizeBlog(input: Partial<BlogSummary> & { isFeatured?: boolean }): BlogSummary {
  const slug = input.slug || input.href?.replace(/^\//, "") || "";
  const categorySlug = input.categorySlug;
  return {
    id: input.id,
    tag: input.tag || "SEO",
    title: input.title || "Untitled article",
    excerpt: decodeHtmlText(input.excerpt || ""),
    href: articleHref(slug, categorySlug),
    slug,
    readTime: input.readTime || "5 min",
    date: input.date || "",
    updatedOn: typeof input.updatedOn === "string" ? input.updatedOn : null,
    accent: input.accent || "#B8FF35",
    featured: input.featured ?? input.isFeatured ?? false,
    isFeatured: input.isFeatured ?? input.featured ?? false,
    image: input.image,
    categoryId: input.categoryId,
    categorySlug,
    categoryTitle: input.categoryTitle,
    attributes: normalizeAttributes(input.attributes),
    previewHeadings: Array.isArray(input.previewHeadings) ? input.previewHeadings : [],
  };
}

function normalizeAttributes(input: unknown): ArticleAttribute[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((attribute) => {
      if (!attribute || typeof attribute !== "object") return null;
      const value = attribute as Partial<ArticleAttribute>;
      const label = typeof value.label === "string" ? value.label.trim() : "";
      if (!label) return null;

      return {
        label,
        color: typeof value.color === "string" && /^#[0-9a-fA-F]{6}$/.test(value.color) ? value.color : "#B8FF35",
      };
    })
    .filter((attribute): attribute is ArticleAttribute => Boolean(attribute));
}

function normalizeFaqs(input: unknown): ArticleFaq[] {
  if (!Array.isArray(input)) return [];

  const faqs: ArticleFaq[] = [];

  for (const faq of input) {
    if (!faq || typeof faq !== "object") continue;
    const value = faq as Partial<ArticleFaq>;
    const question = typeof value.question === "string" ? value.question.trim() : "";
    const answer = typeof value.answer === "string" ? value.answer.trim() : "";
    if (!question || !answer) continue;

    faqs.push({
      id: value.id,
      question,
      answer,
      sortOrder: typeof value.sortOrder === "number" ? value.sortOrder : 0,
      includeInSchema: value.includeInSchema !== false,
      schemaQuestion: typeof value.schemaQuestion === "string" ? value.schemaQuestion : null,
      schemaAnswer: typeof value.schemaAnswer === "string" ? value.schemaAnswer : null,
      options: value.options && typeof value.options === "object" ? value.options : {},
    });
  }

  return faqs.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

function normalizeArticleSummary(input: Partial<ArticleSummary>): ArticleSummary {
  const slug = input.slug || input.href?.replace(/^\//, "") || "";
  const categorySlug = input.categorySlug;
  return {
    id: input.id ?? 0,
    title: input.title || "Untitled article",
    slug,
    href: articleHref(slug, categorySlug),
    readTime: input.readTime || "5 min",
    sort_order: input.sort_order ?? 0,
    excerpt: decodeHtmlText(input.excerpt || ""),
    date: input.date || "",
    accent: input.accent || "#B8FF35",
    attributes: normalizeAttributes(input.attributes),
    previewHeadings: Array.isArray(input.previewHeadings) ? input.previewHeadings : [],
    isCurrent: Boolean(input.isCurrent),
    categorySlug,
    categoryTitle: input.categoryTitle,
    image: input.image,
  };
}

export async function getBlogSummaries(limit?: number): Promise<BlogSummary[]> {
  const response = await fetchCms<{ data?: BlogSummary[] } | BlogSummary[]>(`/site/blogs?per_page=${limit ?? 12}`);
  const payload = response?.data;
  const cmsBlogs = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : [];

  const normalized = cmsBlogs.map(normalizeBlog);
  const articles = normalized.length > 0 ? normalized : fallbackArticles;

  return typeof limit === "number" ? articles.slice(0, limit) : articles;
}

export async function getFeaturedArticles(): Promise<BlogSummary[]> {
  const [featuredResponse, recentArticles] = await Promise.all([
    fetchCms<{ data?: BlogSummary[] } | BlogSummary[]>(`/site/blogs?featured=1&per_page=1`),
    getBlogSummaries(6),
  ]);
  const featuredPayload = featuredResponse?.data;
  const featuredBlogs = Array.isArray(featuredPayload)
    ? featuredPayload
    : Array.isArray(featuredPayload?.data)
      ? featuredPayload.data
      : [];
  const featured = featuredBlogs.map(normalizeBlog)[0] || recentArticles.find((article) => article.featured || article.isFeatured);

  if (!featured) {
    return recentArticles.slice(0, 5);
  }

  return [featured, ...recentArticles.filter((article) => article.slug !== featured.slug)].slice(0, 5);
}

export async function getBlogArticle(slug: string): Promise<BlogArticle | null> {
  // Use any to bypass TS compilation errors if the backend response type is incomplete
  const response = await fetchCms<any>(`/site/blogs/${slug}`);
  if (response?.data) {
    const article = normalizeBlog(response.data);
    const rawContent = response.data.content || `<p>${article.excerpt}</p>`;
    const { content, toc } = parseHtmlWithToc(rawContent);

    return {
      ...article,
      content,
      toc,
      author: response.data.author,
      updatedBy: response.data.updatedBy,
      additionalAuthors: response.data.additionalAuthors,
      reviewers: response.data.reviewers,
      editors: response.data.editors,
      metaTitle: response.data.metaTitle,
      metaDescription: response.data.metaDescription,
      shareLinks: response.data.shareLinks,
      faqs: normalizeFaqs(response.data.faqs),
      relatedPosts: (response.seriesArticles || response.related)?.map((post: any) => {
        const postSlug = post.slug || post.href?.replace(/^\//, "") || "";
        return {
          title: post.title,
          href: articleHref(postSlug, post.categorySlug || article.categorySlug),
          tag: post.tag || article.tag,
          tagColor: post.accent || article.accent || "#B8FF35",
          isCurrent: Boolean(post.isCurrent),
        };
      }),
      seriesArticles: Array.isArray(response.seriesArticles)
        ? response.seriesArticles.map((post: any) => normalizeArticleSummary({
            ...post,
            categorySlug: post.categorySlug || article.categorySlug,
          }))
        : [],
    };
  }
  return null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const response = await fetchCms<SiteSettings>(`/site/settings`);
  return response?.data ?? {};
}

export async function getHomeMainArticleSettings(): Promise<HomeMainArticleSettings> {
  const response = await fetchCms<HomeMainArticleSettings>(`/site/home-main-article`);
  return response?.data ?? {};
}

export async function getAuthors(): Promise<Author[]> {
  const response = await fetchCms<Author[]>(`/site/authors`);
  return Array.isArray(response?.data) ? response.data : [];
}

export async function getAuthor(slug: string): Promise<Author | null> {
  const response = await fetchCms<Author>(`/site/authors/${slug}`);
  if (!response?.data) return null;

  return {
    ...response.data,
    articles: Array.isArray(response.data.articles)
      ? response.data.articles.map(normalizeBlog)
      : [],
  };
}

export async function resolveShareLink(code: string): Promise<string | null> {
  const response = await fetchCms<{ targetUrl?: string }>(`/site/share-links/${code}`);
  return response?.data?.targetUrl || null;
}

export async function getCompanyPage(slug: string): Promise<CompanyPage | null> {
  const response = await fetchCms<CompanyPage>(`/site/company-pages/${slug}`);
  return response?.data ?? null;
}

export type ArticleSummary = {
  id: number;
  title: string;
  slug: string;
  href: string;
  readTime: string;
  sort_order: number;
  excerpt?: string;
  date?: string;
  accent?: string;
  attributes?: ArticleAttribute[];
  previewHeadings?: string[];
  isCurrent?: boolean;
  categorySlug?: string | null;
  categoryTitle?: string | null;
  image?: string | null;
};

export type Series = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image?: string;
  icon?: string;
  accent?: string;
  show_in_nav?: boolean;
  nav_order?: number;
  show_in_header_nav?: boolean;
  header_nav_order?: number;
  show_in_mobile_nav?: boolean;
  mobile_nav_order?: number;
  meta_title?: string;
  meta_description?: string;
  isComingSoon?: boolean;
  is_coming_soon?: boolean;
  articles: ArticleSummary[];
};

export async function getSeries(): Promise<Series[]> {
  const response = await fetchCms<Series[]>(`/site/categories`);
  if (response?.data && Array.isArray(response.data)) {
    return response.data.map((series) => ({
      ...series,
      accent: series.accent || "#B8FF35",
      isComingSoon: Boolean(series.isComingSoon ?? series.is_coming_soon),
      articles: Array.isArray(series.articles)
        ? series.articles.map((article) => normalizeArticleSummary({ ...article, categorySlug: series.slug }))
        : [],
    }));
  }
  return [];
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  const response = await fetchCms<Series>(`/site/categories/${slug}`);
  if (response?.data) {
    return {
      ...response.data,
      accent: response.data.accent || "#B8FF35",
      isComingSoon: Boolean(response.data.isComingSoon ?? response.data.is_coming_soon),
      articles: Array.isArray(response.data.articles)
        ? response.data.articles.map((article) => normalizeArticleSummary({ ...article, categorySlug: response.data!.slug }))
        : [],
    };
  }
  return null;
}

export async function getSearchResults(query: string): Promise<BlogSummary[]> {
  const response = await fetchCms<{ data?: BlogSummary[] } | BlogSummary[]>(`/site/search?q=${encodeURIComponent(query)}&per_page=50`);
  const payload = response?.data;
  const rawResults = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : [];

  return rawResults.map(normalizeBlog);
}

export async function recordSearchQuery(query: string, resultsCount: number, path: string = "/search", source: string = "website") {
  for (const base of cmsBases()) {
    try {
      await cmsFetch(`${base}/site/search-query`, {
        method: "POST",
        body: JSON.stringify({ query, page: path, source, results_count: resultsCount }),
      });
      break;
    } catch {
      // Try next base
    }
  }
}

export { fallbackArticles };
