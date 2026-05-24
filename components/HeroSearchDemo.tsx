"use client";

import { useEffect, useState } from "react";

const searchQueries = [
  "how do search engines work",
  "what is crawling in SEO",
  "how does Google index pages",
  "what affects search ranking",
  "on-page SEO basics",
];

const snippetResults = [
  {
    url: "searchenginebasics.io > crawling",
    title: "What Is Web Crawling? Complete Beginner Guide",
    desc: "Search engine crawlers discover your pages by following links. See how Googlebot navigates the web and what you can do to help it.",
  },
  {
    url: "searchenginebasics.io > indexing",
    title: "Search Engine Indexing: How Your Page Gets Stored",
    desc: "After crawling, Google stores your content in its index. Understand canonical tags, duplicate content, and what keeps pages out of the index.",
  },
  {
    url: "searchenginebasics.io > ranking",
    title: "How Google Ranks Websites: 10 Key Factors (2026)",
    desc: "From E-E-A-T to Core Web Vitals, this guide breaks down the signals Google uses to decide which page earns position #1.",
  },
];

export default function HeroSearchDemo() {
  const [queryIndex, setQueryIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    const query = searchQueries[queryIndex];
    let i = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    setTyped("");
    setIsTyping(true);
    setShowResults(false);
    setResultCount(0);

    const typeInterval = setInterval(() => {
      if (i < query.length) {
        setTyped(query.slice(0, i + 1));
        i += 1;
        return;
      }

      clearInterval(typeInterval);
      setIsTyping(false);
      timeouts.push(setTimeout(() => setShowResults(true), 400));
      timeouts.push(setTimeout(() => setResultCount(1), 600));
      timeouts.push(setTimeout(() => setResultCount(2), 800));
      timeouts.push(setTimeout(() => setResultCount(3), 1000));
      timeouts.push(
        setTimeout(() => {
          setQueryIndex((prev) => (prev + 1) % searchQueries.length);
        }, 4000),
      );
    }, 40);

    return () => {
      clearInterval(typeInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [queryIndex]);

  return (
    <div className="relative">
      <div
        className="float-anim"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(184,255,53,0.05)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <div
            className="ml-3 flex-1 bg-[#07070F] rounded-full px-3 py-1.5 text-xs text-[#6B6B80] flex items-center gap-1.5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-50">
              <circle cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="1.2" />
              <line x1="6.5" y1="6.5" x2="9" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            google.com/search
          </div>
        </div>

        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-5"
          style={{
            background: "#fff",
            boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
            <circle cx="7.5" cy="7.5" r="5.5" stroke="#9AA0A6" strokeWidth="1.5" />
            <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="#9AA0A6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-sm text-gray-800" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {typed}
            {isTyping && (
              <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 animate-pulse align-middle" />
            )}
          </span>
        </div>

        <div className="hero-search-results space-y-3">
          <p
            className={`text-xs text-[#6B6B80] px-1 mb-2 transition-opacity duration-200 ${
              showResults ? "opacity-100" : "opacity-0"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            About 4,120,000 results (0.42 seconds)
          </p>

          {snippetResults.map((result, i) => {
            const isVisible = showResults && i < resultCount;

            return (
              <div
                key={i}
                className={`snippet-card ${isVisible ? "" : "snippet-card-placeholder"}`}
                style={isVisible ? { animation: "fadeUp 0.4s ease forwards" } : undefined}
                aria-hidden={!isVisible}
              >
                {isVisible ? (
                  <>
                    <p className="snippet-url">{result.url}</p>
                    <p className="snippet-title">{result.title}</p>
                    <p className="snippet-desc">{result.desc}</p>
                  </>
                ) : (
                  <>
                    <div className="snippet-placeholder-copy">
                      <p className="snippet-url">{result.url}</p>
                      <p className="snippet-title">{result.title}</p>
                      <p className="snippet-desc">{result.desc}</p>
                    </div>
                    <div className="snippet-placeholder-skeleton">
                      <span className="snippet-skeleton-line snippet-skeleton-url" />
                      <span className="snippet-skeleton-line snippet-skeleton-title" />
                      <span className="snippet-skeleton-line snippet-skeleton-desc" />
                      <span className="snippet-skeleton-line snippet-skeleton-desc short" />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-[#1E1E30] flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#B8FF35] animate-pulse" />
          <span className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-mono)" }}>
            Live search demo - see what happens behind the scenes
          </span>
        </div>
      </div>

      <div
        className="absolute -top-4 -right-4 bg-[#B8FF35] text-[#07070F] rounded-xl px-4 py-2.5 hidden lg:block"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "0.75rem",
          fontWeight: 700,
        }}
      >
        <div className="text-lg font-black leading-none">3</div>
        <div className="text-xs opacity-70 leading-tight">
          CORE
          <br />
          STEPS
        </div>
      </div>
    </div>
  );
}
