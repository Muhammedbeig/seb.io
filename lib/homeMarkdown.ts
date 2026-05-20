type RenderedMarkdown = {
  initialHtml: string;
  restHtml: string;
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

export function renderHomeMarkdown(markdown?: string | null): RenderedMarkdown {
  if (!markdown?.trim()) {
    return { initialHtml: "", restHtml: "" };
  }

  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const sections: string[][] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (/^#{1,6}\s+/.test(line.trim()) && current.length > 0) {
      sections.push(current);
      current = [line];
      continue;
    }

    current.push(line);
  }

  if (current.length > 0) {
    sections.push(current);
  }

  const firstHeadingIndex = sections.findIndex((section) => section.some((line) => /^#{1,6}\s+/.test(line.trim())));
  const preamble = firstHeadingIndex > 0 ? sections.slice(0, firstHeadingIndex) : [];
  const headingSections = firstHeadingIndex >= 0 ? sections.slice(firstHeadingIndex) : sections;
  const initialSections = [...preamble, ...headingSections.slice(0, 2)];
  const restSections = headingSections.slice(2);

  return {
    initialHtml: renderLines(initialSections.flat()),
    restHtml: renderLines(restSections.flat()),
  };
}
