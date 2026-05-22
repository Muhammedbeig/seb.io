import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Link from "next/link";
import ArticlePeekCard from "@/components/ArticlePeekCard";
import { getSearchResults, recordSearchQuery } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Search Results - SEB.io",
  description: "Search results for Search Engine Basics.",
};

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const results = query ? await getSearchResults(query) : [];

  if (query) {
    recordSearchQuery(query, results.length, "/search", "website").catch(console.error);
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#07070F]">
      <PageShell>
        <section className="pt-32 pb-16 relative overflow-hidden flex-1">
          <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 w-full">
            <div className="mb-8 border-b border-[#1E1E30] pb-6">
              <h1 className="text-2xl text-[#E8E8F0] font-normal" style={{ fontFamily: "var(--font-syne)" }}>
                Search results for: <span className="font-bold">&quot;{query}&quot;</span>
              </h1>
              {query && (
                <p className="text-sm text-[#6B6B80] mt-2" style={{ fontFamily: "var(--font-dm-mono)" }}>
                  About {results.length} results
                </p>
              )}
            </div>

            <div className="space-y-10">
              {!query ? (
                <p className="text-[#6B6B80]">Please enter a search term in the navigation bar.</p>
              ) : results.length === 0 ? (
                <p className="text-[#6B6B80]">No pages found matching your query.</p>
              ) : (
                results.map((result) => (
                  <div key={result.slug} className="group max-w-3xl">
                    <div className="flex items-center gap-2 text-xs text-[#E8E8F0] mb-1.5 opacity-80" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      <span className="font-medium bg-[#1E1E30] px-2 py-0.5 rounded">searchenginebasics.io</span>
                      <span className="text-[#6B6B80]">&gt;</span>
                      <span className="text-[#6B6B80]">{result.slug}</span>
                    </div>
                    <Link href={result.href} className="block">
                      <ArticlePeekCard
                        title={result.title}
                        excerpt={result.date ? `${result.date} - ${result.excerpt}` : result.excerpt}
                        attributes={result.attributes}
                        previewHeadings={result.previewHeadings}
                        compact
                        minHeightClassName="min-h-[70px]"
                        titleClassName="text-xl text-[#4A4AFF] group-hover:underline mb-1.5"
                        excerptClassName="text-sm text-[#9090A8] leading-relaxed line-clamp-2"
                        titleTag="h2"
                      />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </PageShell>
    </main>
  );
}
