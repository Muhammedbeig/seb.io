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
                <div className="space-y-6">
                  {[
                    {
                      heading: "Why we built this",
                      body: "Most SEO content tells you what to do without explaining why it works. We teach the system behind the advice, so the tactics make sense.",
                    },
                    {
                      heading: "Our philosophy",
                      body: "We teach how crawlers discover pages, how indexes are built, and what ranking signals measure. When you understand the machinery, algorithm updates become easier to reason about.",
                    },
                    {
                      heading: "Who this is for",
                      body: "Beginners, marketers, developers, and anyone who wants a real foundation in how search engines work.",
                    },
                  ].map((block) => (
                    <div key={block.heading}>
                      <h3 className="text-lg font-bold text-[#E8E8F0] mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                        {block.heading}
                      </h3>
                      <p className="text-[#6B6B80] text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {block.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-2xl border border-[#1E1E30] p-7" style={{ background: "var(--card)" }}>
                <h4 className="text-xs font-semibold text-[#6B6B80] tracking-widest uppercase mb-5" style={{ fontFamily: "var(--font-mono)" }}>
                  By the numbers
                </h4>
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
