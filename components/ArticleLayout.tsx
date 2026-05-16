import Link from "next/link";
import ArticleAttributeChips from "@/components/ArticleAttributeChips";
import ArticleToc from "@/components/ArticleToc";
import PageShell from "@/components/PageShell";
import type { ArticleAttribute, ArticleFaq, ArticleSummary, Author } from "@/lib/cms";

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
  date: string;
  readTime: string;
  children: React.ReactNode;
  toc?: TocItem[];
  attributes?: ArticleAttribute[];
  author?: Author;
  additionalAuthors?: Author[];
  reviewers?: Author[];
  editors?: Author[];
  relatedPosts?: RelatedPost[];
  seriesArticles?: ArticleSummary[];
  seriesTitle?: string;
  faqs?: ArticleFaq[];
  currentSlug?: string;
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
  const avatarUrl = author.avatar_url || author.avatar;
  return (
    <div className="flex items-start gap-3">
      <div
        className="flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold"
        style={{
          width: 44,
          height: 44,
          background: avatarUrl ? undefined : "linear-gradient(135deg, #B8FF3520, #B8FF3560)",
          border: "1px solid #B8FF3530",
          overflow: "hidden",
        }}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={author.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ color: "#B8FF35", fontFamily: "var(--font-syne)" }}>
            {author.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#E8E8F0] leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
          {author.name}
        </p>
        {author.role && (
          <p className="text-xs text-[#6B6B80] mt-0.5" style={{ fontFamily: "var(--font-dm-mono)" }}>
            {author.role}
          </p>
        )}
        {author.bio && (
          <p className="text-xs text-[#6B6B80] mt-1 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {author.bio}
          </p>
        )}
      </div>
    </div>
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
      <h4 className="text-xs font-semibold text-[#6B6B80] tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-dm-mono)" }}>
        In this article
      </h4>
      <ArticleToc toc={toc} />
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
      <div className="mb-4">
        <h4 className="text-sm font-bold text-[#E8E8F0]" style={{ fontFamily: "var(--font-syne)" }}>
          {title}
        </h4>
        <div className="mt-3 h-0.5 w-full bg-[#B8FF35]" />
      </div>
      <ul className="divide-y divide-[#1E1E30]">
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
    </>
  );
}

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
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

export default function ArticleLayout({
  tag,
  tagColor,
  title,
  excerpt,
  date,
  readTime,
  children,
  toc = [],
  attributes = [],
  author,
  additionalAuthors = [],
  reviewers = [],
  editors = [],
  relatedPosts = [],
  seriesArticles = [],
  seriesTitle,
  faqs = [],
  currentSlug,
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

  return (
    <main>
      <FaqSchema faqs={faqs} />
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
              <ArticleAttributeChips attributes={attributes} />
            </div>

            <div className="flex items-center gap-5 mt-6 text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
              <span>{date}</span>
              <span>.</span>
              <span>{readTime} read</span>
            </div>

            <div className="mt-8 h-px w-full" style={{ background: `linear-gradient(90deg, ${tagColor}50, transparent)` }} />
          </div>
        </header>

        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="lg:hidden mb-8">
              <ArticleSidePanel toc={toc} articles={sidebarArticles} seriesTitle={relatedSeriesTitle} />
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="min-w-0 lg:col-span-2">
                <article className="prose-custom min-w-0">
                  {children}
                </article>

                <ArticlePager previous={previousArticle} next={nextArticle} />

                {hasContributors && (
                  <div className="mt-12 rounded-lg border border-[#1E1E30] p-6 space-y-6" style={{ background: "var(--card)" }}>
                    <h4 className="text-xs font-semibold text-[#6B6B80] tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-mono)" }}>
                      About the Contributors
                    </h4>

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
                  </div>
                )}

                <ArticleFaqSection faqs={faqs} />
              </div>

              <aside className="hidden lg:block lg:col-span-1">
                <ArticleSidePanel toc={toc} articles={sidebarArticles} seriesTitle={relatedSeriesTitle} className="sticky top-24" />
              </aside>
            </div>
          </div>
        </section>
      </PageShell>
    </main>
  );
}
