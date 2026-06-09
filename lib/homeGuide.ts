import { getHomeMainArticleSettings } from "@/lib/cms";
import { renderHomeMarkdown } from "@/lib/homeMarkdown";

let lastRenderedHomeGuide: Awaited<ReturnType<typeof renderHomeGuideFromCms>> | null = null;

async function renderHomeGuideFromCms() {
  const settings = await getHomeMainArticleSettings();
  const guide = renderHomeMarkdown(settings.home_main_article_markdown);

  return {
    guide,
    toc: guide.sections.map((section) => ({ id: section.id, text: section.title, level: 2 })),
  };
}

export async function getRenderedHomeGuide() {
  const rendered = await renderHomeGuideFromCms();

  if (rendered.guide.fallbackHtml) {
    lastRenderedHomeGuide = rendered;
    return rendered;
  }

  return lastRenderedHomeGuide ?? rendered;
}
