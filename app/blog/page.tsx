import PageShell from "@/components/PageShell";
import BlogArticleExplorer from "@/components/BlogArticleExplorer";
import { getBlogSummaries } from "@/lib/cms";

export const metadata = {
  title: "SEO Articles: Crawling, Indexing & Ranking Deep Dives | SEB",
  description:
    "Browse every technical article on how search engines work — covering crawling, indexing, ranking algorithms, and query processing. Structured for methodical learning.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "SEO Articles: Crawling, Indexing & Ranking Deep Dives | SEB",
    description:
      "Browse every technical article on how search engines work — covering crawling, indexing, ranking algorithms, and query processing. Structured for methodical learning.",
    url: "/blog",
  },
};

export default async function BlogPage() {
  const allPosts = await getBlogSummaries(1000);
  const categories = ["All", ...Array.from(new Set(allPosts.map((post) => post.tag))).filter(Boolean)];

  return (
    <main>
      <PageShell>

      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: 0,
            left: "40%",
            width: "500px",
            height: "300px",
            background: "radial-gradient(circle, rgba(184,255,53,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <span className="tag">All Articles</span>
          <h1
            className="mt-5 text-[#E8E8F0]"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
            }}
          >
            THE<br />
            <span className="text-stroke">KNOWLEDGE</span><br />
            BASE.
          </h1>
          <p
            className="mt-5 text-[#6B6B80] max-w-md text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Every article in one place. Structured articles on how search engines
            crawl, index, rank, and everything in between.
          </p>
        </div>
      </section>

      <BlogArticleExplorer posts={allPosts} categories={categories} />

      </PageShell>
    </main>
  );
}
