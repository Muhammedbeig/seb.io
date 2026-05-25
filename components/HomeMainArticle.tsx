import ArticleToc from "@/components/ArticleToc";
import { getHomeMainArticleSettings } from "@/lib/cms";
import { renderHomeMarkdown } from "@/lib/homeMarkdown";

export default async function HomeMainArticle() {
  const settings = await getHomeMainArticleSettings();
  const guide = renderHomeMarkdown(settings.home_main_article_markdown);
  const toc = guide.sections.map((section) => ({ id: section.id, text: section.title, level: 2 }));
  const visibleSections = guide.sections.slice(0, 2);
  const collapsedSections = guide.sections.slice(2);

  if (!guide.fallbackHtml) {
    return null;
  }

  return (
    <section id="main-guide" className="py-24 border-y border-[#1E1E30]" style={{ background: "var(--surface)" }}>
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
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
