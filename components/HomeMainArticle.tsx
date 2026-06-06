import ArticleToc from "@/components/ArticleToc";
import { getRenderedHomeGuide } from "@/lib/homeGuide";
import type { HomeFaqItem } from "@/lib/homeMarkdown";

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function HomeFaqSchema({ faqs }: { faqs: HomeFaqItem[] }) {
  if (faqs.length === 0) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(faq.answer),
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

function HomeFaqSection({ faqs }: { faqs: HomeFaqItem[] }) {
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

export default async function HomeMainArticle() {
  const { guide, toc } = await getRenderedHomeGuide();
  const visibleSections = guide.sections.slice(0, 2);
  const collapsedSections = guide.sections.slice(2);

  if (!guide.fallbackHtml && guide.sections.length === 0 && guide.faqs.length === 0) {
    return null;
  }

  return (
    <section id="main-guide" className="py-24 border-y border-[#1E1E30]" style={{ background: "var(--surface)" }}>
      <HomeFaqSchema faqs={guide.faqs} />
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="tag">Main Guide</span>
          <h1
            className="mt-5 text-[#E8E8F0] leading-tight"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
              fontWeight: 800,
            }}
          >
            Search Engine Basics
          </h1>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-12">
          {guide.sections.length > 0 && (
            <aside className="lg:order-2 lg:col-span-1">
              <div className="home-guide-sidebar">
                <nav aria-label="In this guide">
                  <p
                    className="text-xs font-semibold text-[#6B6B80] tracking-widest uppercase mb-4"
                    style={{ fontFamily: "var(--font-dm-mono)" }}
                  >
                    In this guide
                  </p>
                  <ArticleToc toc={toc} />
                </nav>
              </div>
            </aside>
          )}

          <article className="home-guide min-w-0 lg:order-1 lg:col-span-2">
            <div>
              {guide.introHtml && (
                <div className="prose-custom home-guide-intro" dangerouslySetInnerHTML={{ __html: guide.introHtml }} />
              )}

              {guide.sections.length > 0 ? (
                <>
                  <div className="space-y-10">
                    {visibleSections.map((section) => (
                      <section key={section.id} id={section.id} className="home-guide-section prose-custom">
                        <h2>{section.title}</h2>
                        {section.html && <div dangerouslySetInnerHTML={{ __html: section.html }} />}
                      </section>
                    ))}
                  </div>

                  {collapsedSections.length > 0 && (
                    <div className="home-guide-accordion">
                      {collapsedSections.map((section, index) => (
                        <details key={section.id} id={section.id} className="home-guide-details">
                          <summary>
                            <span className="home-guide-summary-index">
                              {String(index + visibleSections.length + 1).padStart(2, "0")}
                            </span>
                            <h2 className="home-guide-summary-title">{section.title}</h2>
                            <span className="home-guide-summary-icon" aria-hidden="true" />
                          </summary>
                          {section.html && (
                            <div
                              className="prose-custom home-guide-details-content"
                              dangerouslySetInnerHTML={{ __html: section.html }}
                            />
                          )}
                        </details>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="prose-custom" dangerouslySetInnerHTML={{ __html: guide.fallbackHtml }} />
              )}

              <HomeFaqSection faqs={guide.faqs} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
