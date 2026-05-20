import PageShell from "@/components/PageShell";
import Link from "next/link";
import ArticlePeekCard from "@/components/ArticlePeekCard";
import { getBlogSummaries } from "@/lib/cms";

export default async function BlogPage() {
  const allPosts = await getBlogSummaries();
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

      <div className="border-y border-[#1E1E30] sticky top-16 z-40" style={{ background: "rgba(7,7,15,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs transition-all duration-200 ${
                i === 0
                  ? "bg-[#B8FF35] text-[#07070F] font-bold"
                  : "border border-[#1E1E30] text-[#6B6B80] hover:text-[#E8E8F0] hover:border-[#6B6B80]"
              }`}
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={post.href}
                className="card-hover group overflow-hidden rounded-2xl border border-[#1E1E30] flex flex-col justify-between"
                style={{ background: "var(--card)", minHeight: "280px" }}
              >
                {post.image && (
                  <div className="aspect-[16/8] overflow-hidden border-b border-[#1E1E30] bg-[#0F0F1A]">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      style={{
                        background: `${post.accent}15`,
                        border: `1px solid ${post.accent}30`,
                        color: post.accent,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "2px 8px",
                        borderRadius: "3px",
                      }}
                    >
                      {post.tag}
                    </span>
                    <span className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-mono)" }}>
                      {post.readTime}
                    </span>
                  </div>
                  <ArticlePeekCard
                    title={post.title}
                    excerpt={post.excerpt}
                    attributes={post.attributes}
                    previewHeadings={post.previewHeadings}
                    titleClassName="text-base font-bold text-[#E8E8F0] leading-snug group-hover:text-[#B8FF35] transition-colors duration-300"
                    excerptClassName="mt-2 text-xs text-[#6B6B80] leading-relaxed line-clamp-3"
                  />
                </div>
                <div className="flex items-center justify-between mt-0 p-6 pt-4 border-t border-[#1E1E30]">
                  <span className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-mono)" }}>
                    {post.date}
                  </span>
                  <span
                    className="text-xs font-semibold group-hover:translate-x-1 transition-transform duration-200"
                    style={{ color: post.accent, fontFamily: "var(--font-syne)" }}
                  >
                    Read {"->"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      </PageShell>
    </main>
  );
}
