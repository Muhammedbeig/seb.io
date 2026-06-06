import { unstable_cache } from "next/cache";

import { getHomeMainArticleSettings } from "@/lib/cms";
import { renderHomeMarkdown } from "@/lib/homeMarkdown";

function homeGuideRevalidateSeconds() {
  const revalidate = Number(process.env.CMS_REVALIDATE_SECONDS);
  return Number.isFinite(revalidate) && revalidate > 0 ? revalidate : 60;
}

export const getRenderedHomeGuide = unstable_cache(
  async () => {
    const settings = await getHomeMainArticleSettings();
    const guide = renderHomeMarkdown(settings.home_main_article_markdown);

    return {
      guide,
      toc: guide.sections.map((section) => ({ id: section.id, text: section.title, level: 2 })),
    };
  },
  ["home-main-guide:v2"],
  {
    revalidate: homeGuideRevalidateSeconds(),
    tags: ["cms", "home-main-guide"],
  },
);
