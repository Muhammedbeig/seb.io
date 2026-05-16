"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { postPanelApi } from "@/lib/panel-client";

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

export default function Hero() {
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

      {[
        { top: "20%", left: "8%", delay: "0s" },
        { top: "70%", left: "5%", delay: "1.2s" },
        { top: "15%", right: "12%", delay: "0.6s" },
        { top: "80%", right: "8%", delay: "2s" },
      ].map((pos, i) => (
        <div
          key={i}
          className="spider-node hidden lg:block"
          style={{ ...pos, animationDelay: pos.delay }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div>
            <div className="animate-fade-up animate-delay-1">
              <span className="tag">Free SEO Reading Series - 2026</span>
            </div>

            <h1
              className="mt-6 leading-[0.95] tracking-tight"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
              }}
            >
              <span className="animate-fade-up animate-delay-2 block text-[#E8E8F0]">
                READ HOW
              </span>
              <span className="animate-fade-up animate-delay-3 block text-stroke">
                SEARCH
              </span>
              <span className="animate-fade-up animate-delay-3 block text-stroke">
                ENGINES
              </span>
              <span className="animate-fade-up animate-delay-4 block text-[#E8E8F0]">
                ACTUALLY
              </span>
              <span className="animate-fade-up animate-delay-4 block gradient-text">
                WORK.
              </span>
            </h1>

            <p
              className="animate-fade-up animate-delay-5 mt-7 text-[#6B6B80] leading-relaxed max-w-md"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem" }}
            >
              From crawling and indexing to ranking algorithms, structured
              series let you move topic by topic, completely free.
            </p>

            <div className="animate-fade-up animate-delay-5 mt-8 flex flex-wrap gap-3">
              <Link
                href="/how-search-engine-works"
                className="btn-lime px-7 py-3.5 rounded-full text-sm"
              >
                Start Reading -&gt;
              </Link>
              <Link href="/series" className="btn-ghost px-7 py-3.5 rounded-full text-sm">
                Browse Series
              </Link>
            </div>

            <div className="animate-fade-up animate-delay-5 mt-10 flex flex-wrap gap-2">
              {["Series-first library", "No account needed", "Updated guides"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#1E1E30] px-3 py-1.5 text-xs text-[#8F8FA3]"
                  style={{ fontFamily: "var(--font-dm-mono)" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="float-anim"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
                boxShadow:
                  "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(184,255,53,0.05)",
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
                    <line
                      x1="6.5"
                      y1="6.5"
                      x2="9"
                      y2="9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
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
                  <line
                    x1="11.5"
                    y1="11.5"
                    x2="16"
                    y2="16"
                    stroke="#9AA0A6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-sm text-gray-800" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {typed}
                  {isTyping && (
                    <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 animate-pulse align-middle" />
                  )}
                </span>
              </div>

              <div className="space-y-3">
                {showResults && (
                  <p className="text-xs text-[#6B6B80] px-1 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    About 4,120,000 results (0.42 seconds)
                  </p>
                )}
                {snippetResults.slice(0, resultCount).map((result, i) => (
                  <div
                    key={i}
                    className="snippet-card"
                    style={{ animation: "fadeUp 0.4s ease forwards" }}
                  >
                    <p className="snippet-url">{result.url}</p>
                    <p className="snippet-title">{result.title}</p>
                    <p className="snippet-desc">{result.desc}</p>
                  </div>
                ))}
                {!showResults && (
                  <div className="text-center py-6 text-[#2A2A3F] text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                    searching...
                  </div>
                )}
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
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-[#6B6B80] tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
          SCROLL
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#6B6B80] to-transparent" />
      </div>
    </section>
  );
}
