type RenderedMarkdown = {
  introHtml: string;
  sections: HomeMarkdownSection[];
  fallbackHtml: string;
};

export type HomeMarkdownSection = {
  id: string;
  title: string;
  html: string;
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(input: string) {
  let html = escapeHtml(input);

  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(^|[\s(])\*(?!\s)(.+?)(?<!\s)\*/g, "$1<em>$2</em>");

  return html;
}

function plainMarkdownText(input: string) {
  return input
    .replace(/\[([^\]]+)\]\((?:https?:\/\/)?[^)\s]+[^)]*\)/g, "$1")
    .replace(/[*_`#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(input: string) {
  return plainMarkdownText(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "section";
}

function uniqueId(base: string, usedIds: Set<string>) {
  let id = base;
  let index = 2;

  while (usedIds.has(id)) {
    id = `${base}-${index}`;
    index += 1;
  }

  usedIds.add(id);
  return id;
}

function isTableSeparator(line: string) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderTable(lines: string[]) {
  const rows = lines.filter((line) => !isTableSeparator(line)).map(splitTableRow);
  if (!rows.length) return "";

  return `<div><table><tbody>${rows
    .map((row, rowIndex) => `<tr>${row.map((cell) => {
      const tag = rowIndex === 0 ? "th" : "td";
      return `<${tag}>${inlineMarkdown(cell)}</${tag}>`;
    }).join("")}</tr>`)
    .join("")}</tbody></table></div>`;
}

function renderHeading(line: string) {
  const match = /^(#{1,6})\s+(.+)$/.exec(line.trim());
  if (!match) return null;

  const level = match[1].length <= 2 ? 2 : 3;
  return `<h${level}>${inlineMarkdown(match[2].trim())}</h${level}>`;
}

function renderLines(lines: string[]) {
  const html: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    const heading = renderHeading(trimmed);
    if (heading) {
      html.push(heading);
      index += 1;
      continue;
    }

    if (/^-{3,}$/.test(trimmed)) {
      html.push("<hr />");
      index += 1;
      continue;
    }

    if (trimmed.includes("|") && lines[index + 1] && isTableSeparator(lines[index + 1])) {
      const tableLines = [trimmed, lines[index + 1]];
      index += 2;
      while (index < lines.length && lines[index].trim().includes("|")) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      html.push(renderTable(tableLines));
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(`<li>${inlineMarkdown(lines[index].trim().replace(/^[-*]\s+/, ""))}</li>`);
        index += 1;
      }
      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(`<li>${inlineMarkdown(lines[index].trim().replace(/^\d+\.\s+/, ""))}</li>`);
        index += 1;
      }
      html.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    const paragraph = [trimmed];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !renderHeading(lines[index].trim()) &&
      !/^-{3,}$/.test(lines[index].trim()) &&
      !/^[-*]\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim()) &&
      !(lines[index].trim().includes("|") && lines[index + 1] && isTableSeparator(lines[index + 1]))
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
  }

  return html.join("");
}

function headingLevel(line: string) {
  const match = /^(#{1,6})\s+/.exec(line.trim());
  return match ? match[1].length : null;
}

function majorHeadingLevel(lines: string[]) {
  const levels = lines
    .map(headingLevel)
    .filter((level): level is number => level !== null);

  if (levels.includes(2)) return 2;
  return levels.length > 0 ? Math.min(...levels) : null;
}

function splitMarkdownIntoSections(lines: string[]) {
  const sectionLevel = majorHeadingLevel(lines);
  if (sectionLevel === null) {
    return { preamble: [lines], headingSections: [], sectionLevel };
  }

  const sections: string[][] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (headingLevel(line) === sectionLevel && current.length > 0) {
      sections.push(current);
      current = [line];
      continue;
    }

    current.push(line);
  }

  if (current.length > 0) {
    sections.push(current);
  }

  const firstHeadingIndex = sections.findIndex((section) => section.some((line) => headingLevel(line) === sectionLevel));
  const preamble = firstHeadingIndex > 0 ? sections.slice(0, firstHeadingIndex) : [];
  const headingSections = firstHeadingIndex >= 0 ? sections.slice(firstHeadingIndex) : sections;

  return { preamble, headingSections, sectionLevel };
}

function renderGuideSections(headingSections: string[][], sectionLevel: number | null): HomeMarkdownSection[] {
  const usedIds = new Set<string>();

  return headingSections
    .map((section) => {
      const headingIndex = section.findIndex((line) => headingLevel(line) === sectionLevel);
      if (headingIndex < 0) return null;

      const headingLine = section[headingIndex];
      const match = /^(#{1,6})\s+(.+)$/.exec(headingLine.trim());
      if (!match) return null;

      const rawTitle = match[2].trim();
      const id = uniqueId(slugify(rawTitle), usedIds);
      const contentLines = section.slice(headingIndex + 1);

      return {
        id,
        title: plainMarkdownText(rawTitle),
        html: renderLines(contentLines),
      };
    })
    .filter((section): section is HomeMarkdownSection => Boolean(section));
}

export function renderHomeMarkdown(markdown?: string | null): RenderedMarkdown {
  if (!markdown?.trim()) {
    return { introHtml: "", sections: [], fallbackHtml: "" };
  }

  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const { preamble, headingSections, sectionLevel } = splitMarkdownIntoSections(lines);
  const initialSections = [...preamble, ...headingSections.slice(0, 2)];
  const guideSections = renderGuideSections(headingSections, sectionLevel);

  return {
    introHtml: renderLines(preamble.flat()),
    sections: guideSections,
    fallbackHtml: renderLines(initialSections.flat()),
  };
}
