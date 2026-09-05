import Link from "next/link";
import ArticleAttributeChips from "@/components/ArticleAttributeChips";
import ContentImage from "@/components/ContentImage";
import ArticleToc from "@/components/ArticleToc";
import JsonLd from "@/components/JsonLd";
import MathJaxLoader from "@/components/MathJaxLoader";
import PageShell from "@/components/PageShell";
import ShareButtons from "@/components/ShareButtons";
import { absoluteSiteUrl } from "@/lib/site";
import type { ArticleAttribute, ArticleFaq, ArticleSummary, Author, ShareLinks } from "@/lib/cms";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

type RelatedPost = {
  title: string;
  href: string;
  tag: string;
  tagColor: string;
  isCurrent?: boolean;
};

type SidebarArticle = {
  title: string;
  href: string;
  label: string;
  tagColor: string;
  readTime: string;
  isCurrent: boolean;
};

interface ArticleLayoutProps {
  tag: string;
  tagColor: string;
  title: string;
  excerpt: string;
  image?: string | null;
  date: string;
  updatedOn?: string | null;
  readTime: string;
  children: React.ReactNode;
  toc?: TocItem[];
  attributes?: ArticleAttribute[];
  author?: Author;
  updatedBy?: Author | null;
  additionalAuthors?: Author[];
  reviewers?: Author[];
  editors?: Author[];
  relatedPosts?: RelatedPost[];
  relatedHeading?: string | null;
  relatedIntro?: string | null;
  seriesArticles?: ArticleSummary[];
  seriesTitle?: string;
  faqs?: ArticleFaq[];
  currentSlug?: string;
  canonicalPath?: string;
  shareLinks?: ShareLinks;
  hasMath?: boolean;
}

function slugFromHref(href: string) {
  return href.replace(/^\//, "").split("#")[0];
}

function seriesHeading(title: string) {
  const cleanTitle = title.trim();
  if (!cleanTitle) return "Related Articles";
  return /\bseries\b/i.test(cleanTitle) ? cleanTitle : `${cleanTitle} Series`;
}

function AuthorAvatar({ author }: { author: Author }) {
  const avatarUrlRaw = author.avatar_url || author.avatar;
  const avatarUrl = avatarUrlRaw && !avatarUrlRaw.startsWith("http") && !avatarUrlRaw.startsWith("/") ? `/${avatarUrlRaw}` : avatarUrlRaw;
  return (
    <Link href={`/authors/${author.slug}`} className="flex items-start gap-3 group/avatar block">
      <div
        className="flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold transition-transform group-hover/avatar:scale-105"
        style={{
          width: 44,
          height: 44,
          background: avatarUrl ? undefined : "linear-gradient(135deg, #B8FF3520, #B8FF3560)",
          border: "1px solid #B8FF3530",
          overflow: "hidden",
        }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={author.name}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#B8FF35", fontFamily: "var(--font-syne)" }}>
            {author.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#E8E8F0] leading-tight transition-colors group-hover/avatar:text-[#B8FF35]" style={{ fontFamily: "var(--font-syne)" }}>
          {author.name}
        </p>
        {author.role && (
          <p className="text-xs text-[#6B6B80] mt-0.5" style={{ fontFamily: "var(--font-dm-mono)" }}>
            {author.role}
          </p>
        )}
        {author.bio && (
          <p className="text-xs text-[#6B6B80] mt-1 leading-relaxed animate-fade-in" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {author.bio}
          </p>
        )}
      </div>
    </Link>
  );
}

function ContributorGroup({ label, authors }: { label: string; authors: Author[] }) {
  if (!authors || authors.length === 0) return null;
  return (
    <div>
      <p className="text-xs font-semibold text-[#6B6B80] tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-dm-mono)" }}>
        {label}
      </p>
      <div className="space-y-4">
        {authors.map((author) => (
          <AuthorAvatar key={author.id} author={author} />
        ))}
      </div>
    </div>
  );
}

function ArticleSidePanel({
  toc,
  articles,
  seriesTitle,
  className = "",
}: {
  toc: TocItem[];
  articles: SidebarArticle[];
  seriesTitle: string;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-[#1E1E30] p-5 ${className}`} style={{ background: "var(--card)" }}>
      <nav aria-label="In this article">
        <p className="text-xs font-semibold text-[#6B6B80] tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-dm-mono)" }}>
          In this article
        </p>
        <ArticleToc toc={toc} />
      </nav>
      <SeriesList articles={articles} title={seriesTitle} />
      <div className="section-line my-4" />
      <Link href="/blog" className="btn-ghost w-full py-2.5 rounded-full text-xs text-center block">
        All Articles -&gt;
      </Link>
    </div>
  );
}

function SeriesList({ articles, title }: { articles: SidebarArticle[]; title: string }) {
  if (articles.length === 0) return null;

  return (
    <>
      <div className="section-line mt-5 mb-4" />
      <nav aria-label={title}>
        <div className="mb-4">
          <p className="text-sm font-bold text-[#E8E8F0]" style={{ fontFamily: "var(--font-syne)" }}>
            {title}
          </p>
          <div className="mt-3 h-0.5 w-full bg-[#B8FF35]" />
        </div>
        <ul className={`divide-y divide-[#1E1E30] pr-1 ${articles.length > 3 ? "max-h-[15.25rem] overflow-y-auto" : ""}`}>
          {articles.map((post) => (
            <li key={post.href}>
              <Link
                href={post.href}
                aria-current={post.isCurrent ? "page" : undefined}
                className={`group relative flex gap-3 py-3 pl-2 pr-1 transition-colors ${
                  post.isCurrent
                    ? "bg-[#B8FF35]/[0.06] before:absolute before:left-0 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#B8FF35]"
                    : "hover:bg-[#0F0F1A]"
                }`}
              >
                <span
                  className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center text-[10px] font-bold"
                  style={{
                    background: post.isCurrent ? "#B8FF35" : `${post.tagColor}22`,
                    color: post.isCurrent ? "#07070F" : post.tagColor,
                    fontFamily: "var(--font-dm-mono)",
                    letterSpacing: "0.08em",
                    borderRadius: "2px",
                  }}
                >
                  {post.label}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-sm font-semibold leading-snug transition-colors ${
                      post.isCurrent ? "text-[#B8FF35]" : "text-[#E8E8F0] group-hover:text-[#B8FF35]"
                    }`}
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {post.title}
                  </span>
                  {post.readTime && (
                    <span className="mt-1 block text-[11px] text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                      {post.readTime}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function isoDate(value?: string | null) {
  if (!value) return undefined;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? undefined : new Date(timestamp).toISOString().slice(0, 10);
}

function articleAuthorSchema(author?: Author) {
  if (!author) {
    return {
      "@type": "Organization",
      name: "Search Engine Basics",
      url: absoluteSiteUrl("/"),
    };
  }

  return {
    "@type": "Person",
    "@id": `${absoluteSiteUrl(`/authors/${author.slug}`)}#person`,
    name: author.name,
    url: absoluteSiteUrl(`/authors/${author.slug}`),
  };
}

function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${absoluteSiteUrl("/")}#organization`,
    name: "Search Engine Basics",
    url: absoluteSiteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteSiteUrl("/icon-512.png"),
    },
  };
}

function ArticleFaqSection({ faqs }: { faqs: ArticleFaq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="mt-14 rounded-lg border border-[#1E1E30] p-6" style={{ background: "var(--card)" }}>
      <h2 className="text-xl font-bold text-[#E8E8F0]" style={{ fontFamily: "var(--font-syne)" }}>
        Frequently Asked Questions (FAQs)
      </h2>
      <div className="mt-5 divide-y divide-[#1E1E30]">
        {faqs.map((faq, index) => (
          <details key={`${faq.question}-${index}`} className="group py-4 first:pt-0 last:pb-0">
            <summary className="cursor-pointer list-none text-sm font-semibold text-[#E8E8F0] transition-colors group-open:text-[#B8FF35] hover:text-[#B8FF35]">
              <span className="inline-flex w-full items-start justify-between gap-4">
                {faq.question}
                <span className="mt-0.5 text-[#B8FF35] transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <div
              className="prose-custom mt-3 text-sm"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </details>
        ))}
      </div>
    </section>
  );
}

function FaqSchema({ faqs }: { faqs: ArticleFaq[] }) {
  const schemaFaqs = faqs.filter((faq) => faq.includeInSchema !== false);
  if (schemaFaqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: schemaFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.schemaQuestion || faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(faq.schemaAnswer || faq.answer),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ArticleStructuredData({
  title,
  excerpt,
  image,
  date,
  updatedOn,
  author,
  additionalAuthors,
  reviewers,
  canonicalPath,
  seriesTitle,
  tag,
}: {
  title: string;
  excerpt: string;
  image?: string | null;
  date: string;
  updatedOn?: string | null;
  author?: Author;
  additionalAuthors: Author[];
  reviewers: Author[];
  canonicalPath: string;
  seriesTitle?: string;
  tag: string;
}) {
  const canonicalUrl = absoluteSiteUrl(canonicalPath);
  const publishedDate = isoDate(date);
  const modifiedDate = isoDate(updatedOn) || publishedDate;
  const imageUrl = image ? absoluteSiteUrl(image) : absoluteSiteUrl("/Thumbnail.png");
  const firstPathSegment = canonicalPath.split("/").filter(Boolean)[0];
  const seriesPath = firstPathSegment ? `/${firstPathSegment}` : "/blog";
  const seriesName = seriesTitle || tag || "Articles";
  const namedAuthors = [author, ...additionalAuthors].filter((item): item is Author => Boolean(item));
  const schemaAuthors = namedAuthors.length > 0
    ? namedAuthors.map((item) => articleAuthorSchema(item))
    : [articleAuthorSchema()];

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonicalUrl,
    url: canonicalUrl,
    name: title,
    description: excerpt,
    isPartOf: {
      "@type": "WebSite",
      name: "Search Engine Basics",
      url: absoluteSiteUrl("/"),
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
    },
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    image: [imageUrl],
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: schemaAuthors,
    ...(reviewers.length > 0
      ? { reviewedBy: reviewers.map((reviewer) => articleAuthorSchema(reviewer)) }
      : {}),
    publisher: organizationSchema(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: seriesName,
        item: absoluteSiteUrl(seriesPath),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd id="article-webpage-schema" data={webPage} />
      <JsonLd id="article-schema" data={article} />
      <JsonLd id="article-breadcrumb-schema" data={breadcrumb} />
    </>
  );
}

function ArticlePager({
  previous,
  next,
}: {
  previous?: ArticleSummary;
  next?: ArticleSummary;
}) {
  if (!previous && !next) return null;
  const navClassName = previous && next ? "mt-12 grid gap-4 sm:grid-cols-2" : "mt-12 flex justify-start";
  const singleCardClassName = previous && next ? "" : "w-full sm:max-w-md";

  return (
    <nav className={navClassName} aria-label="Series article navigation">
      {previous ? (
        <Link
          href={previous.href || `/${previous.slug}`}
          className={`group rounded-lg border border-[#1E1E30] p-5 text-left transition-colors hover:border-[#B8FF35]/40 hover:bg-[#0F0F1A] ${singleCardClassName}`}
          style={{ background: "var(--card)" }}
        >
          <span className="text-[10px] uppercase tracking-widest text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
            Previous
          </span>
          <p className="mt-2 text-sm font-semibold text-[#E8E8F0] group-hover:text-[#B8FF35]" style={{ fontFamily: "var(--font-syne)" }}>
            {previous.title}
          </p>
        </Link>
      ) : null}

      {next && (
        <Link
          href={next.href || `/${next.slug}`}
          className={`group rounded-lg border border-[#1E1E30] p-5 text-left transition-colors hover:border-[#B8FF35]/40 hover:bg-[#0F0F1A] ${singleCardClassName}`}
          style={{ background: "var(--card)" }}
        >
          <span className="text-[10px] uppercase tracking-widest text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
            Next
          </span>
          <p className="mt-2 text-sm font-semibold text-[#E8E8F0] group-hover:text-[#B8FF35]" style={{ fontFamily: "var(--font-syne)" }}>
            {next.title}
          </p>
        </Link>
      )}
    </nav>
  );
}

function RelatedReading({
  posts,
  heading,
  intro,
}: {
  posts: RelatedPost[];
  heading?: string | null;
  intro?: string | null;
}) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="related-reading-heading">
      <h2
        id="related-reading-heading"
        className="text-xl font-bold text-[#E8E8F0]"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {heading?.trim() || "Continue Reading"}
      </h2>
      {intro?.trim() && (
        <p className="mt-2 text-sm leading-relaxed text-[#8F8FA3]">{intro}</p>
      )}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="group rounded-lg border border-[#1E1E30] p-5 transition-colors hover:border-[#B8FF35]/45 hover:bg-[#0F0F1A]"
            style={{ background: "var(--card)" }}
          >
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: post.tagColor || "#B8FF35", fontFamily: "var(--font-dm-mono)" }}
            >
              {post.tag}
            </span>
            <span
              className="mt-2 block text-sm font-semibold leading-snug text-[#E8E8F0] transition-colors group-hover:text-[#B8FF35]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {post.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ArticleLayout({
  tag,
  tagColor,
  title,
  excerpt,
  image,
  date,
  updatedOn,
  readTime,
  children,
  toc = [],
  attributes = [],
  author,
  updatedBy,
  additionalAuthors = [],
  reviewers = [],
  editors = [],
  relatedPosts = [],
  relatedHeading,
  relatedIntro,
  seriesArticles = [],
  seriesTitle,
  faqs = [],
  currentSlug,
  canonicalPath,
  shareLinks,
  hasMath = false,
}: ArticleLayoutProps) {
  const hasContributors =
    !!author || additionalAuthors.length > 0 || reviewers.length > 0 || editors.length > 0;
  const currentIndex = seriesArticles.findIndex((post) => post.slug === currentSlug || post.isCurrent);
  const previousArticle = currentIndex > 0 ? seriesArticles[currentIndex - 1] : undefined;
  const nextArticle = currentIndex >= 0 ? seriesArticles[currentIndex + 1] : undefined;
  const sidebarArticles: SidebarArticle[] =
    seriesArticles.length > 0
      ? seriesArticles.map((post, index) => ({
          title: post.title,
          href: post.href || `/${post.slug}`,
          label: String(index + 1).padStart(2, "0"),
          tagColor: post.accent || tagColor,
          readTime: post.readTime,
          isCurrent: Boolean(post.isCurrent || post.slug === currentSlug),
        }))
      : relatedPosts.map((post) => ({
          title: post.title,
          href: post.href,
          label: post.tag,
          tagColor: post.tagColor || tagColor,
          readTime: "",
          isCurrent: Boolean(post.isCurrent || slugFromHref(post.href) === currentSlug),
        }));
  const relatedSeriesTitle = seriesArticles.length > 0
    ? seriesHeading(seriesTitle || tag)
    : "Related Articles";
  const schemaCanonicalPath = canonicalPath || (currentSlug ? `/${currentSlug}` : "/blog");

  return (
    <main>
      <ArticleStructuredData
        title={title}
        excerpt={excerpt}
        image={image}
        date={date}
        updatedOn={updatedOn}
        author={author}
        additionalAuthors={additionalAuthors}
        reviewers={reviewers}
        canonicalPath={schemaCanonicalPath}
        seriesTitle={seriesTitle}
        tag={tag}
      />
      <FaqSchema faqs={faqs} />
      {hasMath && <MathJaxLoader />}
      <PageShell>
        <header className="pt-36 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div
            className="absolute pointer-events-none"
            style={{
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 700,
              height: 400,
              background: `radial-gradient(ellipse, ${tagColor}10 0%, transparent 65%)`,
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-5">
              <Link href="/blog">
                <span className="text-xs text-[#6B6B80] hover:text-[#E8E8F0] transition-colors" style={{ fontFamily: "var(--font-dm-mono)" }}>
                  {"<-"} Blog
                </span>
              </Link>
              <span className="text-[#1E1E30]">.</span>
              <span
                style={{
                  background: `${tagColor}15`,
                  border: `1px solid ${tagColor}30`,
                  color: tagColor,
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "2px 8px",
                  borderRadius: "3px",
                }}
              >
                {tag}
              </span>
            </div>

            <h1
              className="text-[#E8E8F0] leading-tight"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
              }}
            >
              {title}
            </h1>

            <p className="mt-4 text-[#6B6B80] text-base leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {excerpt}
            </p>

            <div className="mt-4">
              <ArticleAttributeChips attributes={attributes} defaultExpanded />
            </div>

            <div className="flex items-center gap-5 mt-6 text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
              <span>{date}</span>
              <span>.</span>
              <span>{readTime} read</span>
            </div>
            {(author || reviewers.length > 0) && (
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#8F8FA3]">
                {author && (
                  <span>
                    Written by{" "}
                    <Link href={`/authors/${author.slug}`} rel="author" className="font-semibold text-[#E8E8F0] hover:text-[#B8FF35]">
                      {author.name}
                    </Link>
                  </span>
                )}
                {reviewers.length > 0 && (
                  <span>
                    Reviewed by{" "}
                    {reviewers.map((reviewer, index) => (
                      <span key={reviewer.id}>
                        {index > 0 && ", "}
                        <Link href={`/authors/${reviewer.slug}`} className="font-semibold text-[#E8E8F0] hover:text-[#B8FF35]">
                          {reviewer.name}
                        </Link>
                      </span>
                    ))}
                  </span>
                )}
              </div>
            )}
            {(updatedOn || updatedBy) && (
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                {updatedOn && (
                  <span>
                    <span className="text-[#8F8FA3]">Updated on:</span> {updatedOn}
                  </span>
                )}
                {updatedBy && (
                  <span>
                    <span className="text-[#8F8FA3]">Updated by:</span> {updatedBy.name}
                  </span>
                )}
              </div>
            )}

            <div className="mt-8 h-px w-full" style={{ background: `linear-gradient(90deg, ${tagColor}50, transparent)` }} />

            {image && (
              <div className="mt-8 overflow-hidden rounded-lg border border-[#1E1E30] bg-[#0F0F1A]">
                <ContentImage
                  src={image}
                  alt={title}
                  width={1254}
                  height={936}
                  priority
                  className="block h-full w-full"
                  imageClassName="h-full max-h-[460px] w-full object-cover"
                />
              </div>
            )}
          </div>
        </header>

        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
              <aside className="lg:order-2 lg:col-span-1">
                <ArticleSidePanel toc={toc} articles={sidebarArticles} seriesTitle={relatedSeriesTitle} />
              </aside>

              <div className="min-w-0 lg:order-1 lg:col-span-2">
                <article className="prose-custom min-w-0">
                  {children}
                </article>

                <ShareButtons links={shareLinks} title={title} />

                <ArticlePager previous={previousArticle} next={nextArticle} />

                <RelatedReading posts={relatedPosts} heading={relatedHeading} intro={relatedIntro} />

                {hasContributors && (
                  <section className="mt-12 rounded-lg border border-[#1E1E30] p-6 space-y-6" style={{ background: "var(--card)" }} aria-labelledby="about-contributors">
                    <h2 id="about-contributors" className="text-xs font-semibold text-[#6B6B80] tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-mono)" }}>
                      About the Contributors
                    </h2>

                    {author && (
                      <div>
                        <p className="text-xs font-semibold text-[#6B6B80] tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-dm-mono)" }}>
                          Written by
                        </p>
                        <AuthorAvatar author={author} />
                      </div>
                    )}

                    {additionalAuthors.length > 0 && (
                      <>
                        <div className="section-line" />
                        <ContributorGroup label="Co-Authors" authors={additionalAuthors} />
                      </>
                    )}

                    {reviewers.length > 0 && (
                      <>
                        <div className="section-line" />
                        <ContributorGroup label="Reviewed by" authors={reviewers} />
                      </>
                    )}

                    {editors.length > 0 && (
                      <>
                        <div className="section-line" />
                        <ContributorGroup label="Edited by" authors={editors} />
                      </>
                    )}
                  </section>
                )}

                <ArticleFaqSection faqs={faqs} />
              </div>
            </div>
          </div>
        </section>
      </PageShell>
    </main>
  );
}
