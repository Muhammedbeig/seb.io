import fs from "fs";
import path from "path";
import { getHomeMainArticleSettings } from "@/lib/cms";
import { renderHomeMarkdown } from "@/lib/homeMarkdown";

let lastRenderedHomeGuide: Awaited<ReturnType<typeof renderHomeGuideFromCms>> | null = null;

function getLocalPillarMarkdown(): string {
  try {
    const filePath = path.join(process.cwd(), "search-engines-basics.md");
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf-8");
    }
  } catch (err) {
    console.error("Failed to read local search-engines-basics.md fallback:", err);
  }
  return "";
}

async function renderHomeGuideFromCms() {
  const settings = await getHomeMainArticleSettings();
  const cmsMarkdown = settings.home_main_article_markdown?.trim();
  const markdown = cmsMarkdown || getLocalPillarMarkdown();

  const guide = renderHomeMarkdown(markdown);

  return {
    guide,
    toc: guide.sections.map((section) => ({ id: section.id, text: section.title, level: 2 })),
  };
}

export async function getRenderedHomeGuide() {
  const rendered = await renderHomeGuideFromCms();

  if (rendered.guide.fallbackHtml || rendered.guide.sections.length > 0) {
    lastRenderedHomeGuide = rendered;
    return rendered;
  }

  return lastRenderedHomeGuide ?? rendered;
}

