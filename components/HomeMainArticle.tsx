import HomeArticleExpandable from "@/components/HomeArticleExpandable";
import { getSiteSettings } from "@/lib/cms";
import { renderHomeMarkdown } from "@/lib/homeMarkdown";

export default async function HomeMainArticle() {
  const settings = await getSiteSettings();
  const { initialHtml, restHtml } = renderHomeMarkdown(settings.home_main_article_markdown);

  if (!initialHtml) {
    return null;
  }

  return (
    <section id="main-guide" className="py-24 border-y border-[#1E1E30]" style={{ background: "var(--surface)" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
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
        <div className="mt-8">
          <HomeArticleExpandable initialHtml={initialHtml} restHtml={restHtml} />
        </div>
      </div>
    </section>
  );
}
