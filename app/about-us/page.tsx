import PageShell from "@/components/PageShell";
import Link from "next/link";
import { getAuthors, getBlogSummaries, getCompanyPage, getSeries } from "@/lib/cms";

export default async function AboutPage() {
  const [page, articles, series, authors] = await Promise.all([
    getCompanyPage("about-us"),
    getBlogSummaries(1000),
    getSeries(),
    getAuthors(),
  ]);

  return (
    <main>
      <PageShell>

      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            left: "60%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(74,74,255,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <span className="tag">About Search Engine Basics</span>
          <h1
            className="mt-6 text-[#E8E8F0] leading-[0.92]"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 800,
            }}
          >
            We teach the
            <br />
            <span className="text-stroke">machinery</span>
            <br />
            behind search.
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              {page?.content ? (
                <article className="prose-custom" dangerouslySetInnerHTML={{ __html: page.content }} />
              ) : (
                <div className="space-y-8 prose-custom">
                  <p className="text-lg text-[#E8E8F0] font-semibold">We teach you how search engines think, not just how to trick them.</p>
                  <p>Most SEO content on the internet hands you a checklist. Put your keyword in the H1. Write a meta description under 160 characters. Get backlinks. Done.</p>
                  <p>But nobody explains why any of that works.</p>
                  <p>That's exactly the gap we built this site to fill.</p>

                  <h3 className="text-xl font-bold text-[#E8E8F0] mt-8" style={{ fontFamily: "var(--font-syne)" }}>Who We Are</h3>
                  <p>We are a team of SEO practitioners, researchers, and educators who got tired of surface-level advice. We spent years studying how search engines actually work, the crawling, the indexing, the ranking signals, the algorithms — and we noticed something: people who understand the system never have to memorize tactics. The right moves become obvious.</p>
                  <p>So we built a place where that understanding comes first.</p>

                  <h3 className="text-xl font-bold text-[#E8E8F0] mt-8" style={{ fontFamily: "var(--font-syne)" }}>What We Actually Teach</h3>
                  <p>Every piece of content on this site starts from the ground up. Before we tell you what to put in an H1 tag, we explain what an H1 tag actually communicates to a search engine and why it was designed that way. Before we talk about meta descriptions, we show you how a search result page works and what job the description is really doing.</p>
                  <p>By the time you finish reading our content, you will not just know what to do, you will know why it works, which means you can apply it to any situation, any niche, any website, without needing a new checklist every time Google updates its algorithm.</p>

                  <h3 className="text-xl font-bold text-[#E8E8F0] mt-8" style={{ fontFamily: "var(--font-syne)" }}>What Makes Us Different</h3>
                  <ul className="space-y-3 list-disc pl-5 text-[#6B6B80]">
                    <li><strong>We go foundational.</strong> Every article is built from first principles. No assumed knowledge, no jargon without explanation.</li>
                    <li><strong>We make it interactive.</strong> We do not just describe concepts, we show you how they behave, with real examples you can see and test yourself.</li>
                    <li><strong>We teach the system, not the shortcut.</strong> Shortcuts expire. System knowledge compounds. Our goal is to turn you into someone who understands search engines deeply enough to figure out any SEO challenge on your own.</li>
                    <li><strong>We cover the whys.</strong> Why does Google care about page speed? Why does keyword placement in a title matter? Why do some backlinks count and others do not? Every lesson answers the question underneath the question.</li>
                  </ul>

                  <h3 className="text-xl font-bold text-[#E8E8F0] mt-8" style={{ fontFamily: "var(--font-syne)" }}>What You Will Walk Away With</h3>
                  <p>After going through our content, you will understand:</p>
                  <ul className="space-y-3 list-disc pl-5 text-[#6B6B80]">
                    <li>How search engines crawl and index the web</li>
                    <li>Why certain HTML elements carry more weight than others</li>
                    <li>How to write title tags and meta descriptions that actually work, and why they work</li>
                    <li>What signals search engines use to decide which page deserves to rank</li>
                    <li>How to think about any SEO decision from a logical, system-level perspective</li>
                  </ul>
                  <p>You will not just be better at SEO. You will understand SEO, and that is something no algorithm update can take away from you.</p>

                  <h3 className="text-xl font-bold text-[#E8E8F0] mt-8" style={{ fontFamily: "var(--font-syne)" }}>Our Promise</h3>
                  <p>We will never publish content that tells you what to do without explaining why. If we cover a topic, we cover it properly, from the foundation up, in plain language, with real examples.</p>
                  <p>Because we believe the internet deserves more people who actually understand how it works.</p>
                  <p className="font-semibold text-[#B8FF35] mt-6">Welcome. Let's start from the beginning.</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-2xl border border-[#1E1E30] p-7" style={{ background: "var(--card)" }}>
                <p className="text-xs font-semibold text-[#6B6B80] tracking-widest uppercase mb-5" style={{ fontFamily: "var(--font-mono)" }}>
                  By the numbers
                </p>
                {[
                  { label: "Articles published", value: `${articles.length}` },
                  { label: "Reading series", value: `${series.length}` },
                  { label: "Contributors", value: `${authors.length}` },
                  { label: "Access cost", value: "Free" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-3 border-b border-[#1E1E30] last:border-0">
                    <span className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {stat.label}
                    </span>
                    <span className="text-sm font-bold gradient-text" style={{ fontFamily: "var(--font-syne)" }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/contact-us" className="btn-ghost w-full py-3.5 rounded-full text-sm text-center block">
                Get in Touch -&gt;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-[#E8E8F0]" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}>
            Ready to start reading?
          </h2>
          <p className="mt-3 text-[#6B6B80] text-sm max-w-sm mx-auto" style={{ fontFamily: "var(--font-dm-sans)" }}>
            No account needed. Open a series and follow the articles in order.
          </p>
          <Link href="/series" className="btn-lime inline-block mt-7 px-8 py-3.5 rounded-full text-sm">
            Browse Series -&gt;
          </Link>
        </div>
      </section>

      </PageShell>
    </main>
  );
}
