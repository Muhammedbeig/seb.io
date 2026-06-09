"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ArticlePeekCard from "@/components/ArticlePeekCard";
import ContentImage from "@/components/ContentImage";
import type { BlogSummary } from "@/lib/cms";

type BlogArticleExplorerProps = {
  posts: BlogSummary[];
  categories: string[];
};

const postsPerPage = 12;

export default function BlogArticleExplorer({ posts, categories }: BlogArticleExplorerProps) {
  const listingTopId = "blog-article-listing";
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePage, setActivePage] = useState(1);
  const visiblePosts = useMemo(
    () => activeCategory === "All" ? posts : posts.filter((post) => post.tag === activeCategory),
    [activeCategory, posts],
  );
  const pageCount = Math.max(1, Math.ceil(visiblePosts.length / postsPerPage));
  const paginatedPosts = visiblePosts.slice((activePage - 1) * postsPerPage, activePage * postsPerPage);

  useEffect(() => {
    if (activePage > pageCount) {
      setActivePage(pageCount);
    }
  }, [activePage, pageCount]);

  function selectCategory(category: string) {
    setActiveCategory(category);
    setActivePage(1);
    scrollToListingTop();
  }

  function selectPage(page: number) {
    setActivePage(Math.min(Math.max(page, 1), pageCount));
    scrollToListingTop();
  }

  function scrollToListingTop() {
    window.requestAnimationFrame(() => {
      document.getElementById(listingTopId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <>
      <div id={listingTopId} className="scroll-mt-20 border-y border-[#1E1E30] sticky top-16 z-40" style={{ background: "rgba(7,7,15,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => selectCategory(cat)}
                aria-pressed={isActive}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs transition-all duration-200 ${
                  isActive
                    ? "bg-[#B8FF35] text-[#07070F] font-bold"
                    : "border border-[#1E1E30] text-[#6B6B80] hover:text-[#E8E8F0] hover:border-[#6B6B80]"
                }`}
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={post.href}
                className="card-hover group overflow-hidden rounded-2xl border border-[#1E1E30] flex flex-col justify-between"
                style={{ background: "var(--card)", minHeight: "280px" }}
              >
                {post.image && (
                  <div className="relative aspect-[16/8] overflow-hidden border-b border-[#1E1E30] bg-[#0F0F1A]">
                    <ContentImage
                      src={post.image}
                      alt={post.title}
                      imageClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
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
                    titleTag="h2"
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

          {pageCount > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-8" aria-label="Article pages">
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => {
                const isActive = page === activePage;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => selectPage(page)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative h-10 min-w-10 px-2 text-sm transition-colors ${
                      isActive ? "text-[#B8FF35]" : "text-[#6B6B80] hover:text-[#E8E8F0]"
                    }`}
                    style={{ fontFamily: "var(--font-dm-mono)" }}
                  >
                    {page}
                    {isActive && <span className="absolute inset-x-1 bottom-0 h-px bg-[#B8FF35]" aria-hidden="true" />}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => selectPage(activePage + 1)}
                disabled={activePage >= pageCount}
                aria-label="Next page"
                className="h-10 min-w-10 text-lg text-[#6B6B80] transition-colors hover:text-[#E8E8F0] disabled:pointer-events-none disabled:opacity-35"
                style={{ fontFamily: "var(--font-dm-mono)" }}
              >
                {">"}
              </button>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
