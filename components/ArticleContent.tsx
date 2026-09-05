"use client";

import { useEffect, useRef } from "react";

type ArticleContentProps = {
  html: string;
};

function decodeBlockPayload(value: string) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function runWhenIdle(callback: () => void) {
  const idleWindow = window as Window & {
    requestIdleCallback?: (handler: () => void) => number;
  };

  if (idleWindow.requestIdleCallback) {
    idleWindow.requestIdleCallback(callback);
    return;
  }

  window.setTimeout(callback, 1);
}

function normalizeDisplayText(value: string) {
  return String(value || "")
    .replace(/â€œ|â€/g, '"')
    .replace(/â€˜|â€™/g, "'")
    .replace(/â€“|â€”/g, "-")
    .replace(/â€¦/g, "...")
    .replace(/(\d)\?(\d)/g, "$1-$2");
}

function skeletonMarkup() {
  return `
    <div class="html-block-skeleton" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
}

function escapeCodeText(value: string) {
  return String(value || "").replace(/[&<>"']/g, (char) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[char] as string;
  });
}

function highlightCodeLine(value: string) {
  const keywords = /^(async|await|break|case|catch|class|const|continue|def|default|delete|do|elif|else|except|export|extends|finally|for|from|function|if|import|in|interface|let|new|return|try|type|var|while|with|yield)$/;
  const literals = /^(false|null|none|self|this|true|undefined|False|None|True)$/;
  const tokenPattern = /(&lt;\/?[a-zA-Z][^&]*?&gt;|\/\*[\s\S]*?\*\/|\/\/[^\n]*|#[^\n]*|&quot;(?:\\.|(?!&quot;).)*&quot;|&#039;(?:\\.|(?!&#039;).)*&#039;|`(?:\\.|[^`\\])*`|\b[A-Za-z_$][\w$]*(?=\s*:)|\b[A-Za-z_$][\w$]*\b|\b\d+(?:\.\d+)?\b|&lt;=?|&gt;=?|&amp;&amp;|\|\||[{}()[\],.;:+\-*/=%!&|?])/g;

  return escapeCodeText(value).replace(tokenPattern, (token) => {
    let className = "code-punctuation";

    if (/^(\/\*|\/\/|#)/.test(token)) {
      className = "code-comment";
    } else if (/^(&quot;|&#039;|`)/.test(token)) {
      className = "code-string";
    } else if (/^&lt;\/?[a-zA-Z]/.test(token)) {
      className = "code-tag";
    } else if (/^\d/.test(token)) {
      className = "code-number";
    } else if (keywords.test(token)) {
      className = "code-keyword";
    } else if (literals.test(token)) {
      className = "code-literal";
    } else if (/^[A-Za-z_$][\w$]*$/.test(token)) {
      className = "code-property";
    }

    return `<span class="code-token ${className}">${token}</span>`;
  });
}

function highlightCodeText(value: string) {
  return String(value || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => `<span class="code-line">${highlightCodeLine(line || " ")}</span>`)
    .join("");
}

function readableCodeText(code: HTMLElement) {
  if (code.innerText) {
    return code.innerText;
  }

  const clone = code.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("br").forEach((breakElement) => {
    breakElement.replaceWith("\n");
  });

  return clone.textContent || "";
}

function highlightCodeBlocks(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("pre > code").forEach((code) => {
    if (code.dataset.highlighted === "true") return;

    const pre = code.closest("pre");
    if (!pre) return;

    pre.classList.remove("cm-content", "q9tKkq_readonly", "m-0");
    pre.classList.add("custom-block", "block-code");
    code.innerHTML = highlightCodeText(readableCodeText(code));
    code.dataset.highlighted = "true";
  });
}

function unwrapImportedCodeBlocks(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("pre.block-code").forEach((pre) => {
    if (pre.dataset.importedCodeUnwrapped === "true") return;

    const scroller = pre.parentElement;
    const importedWrapper = pre.closest<HTMLElement>("div.relative.w-full.mt-4.mb-1");

    if (!scroller?.classList.contains("cm-scroller") || !importedWrapper) return;

    const trailingNodes: ChildNode[] = [];
    let sibling = pre.nextSibling;

    while (sibling) {
      const nextSibling = sibling.nextSibling;
      if (!(sibling.nodeType === Node.TEXT_NODE && !sibling.textContent?.trim())) {
        trailingNodes.push(sibling);
      }
      sibling = nextSibling;
    }

    pre.dataset.importedCodeUnwrapped = "true";
    importedWrapper.replaceWith(pre, ...trailingNodes);
  });
}

function wrapArticleTables(root: HTMLElement) {
  root.querySelectorAll<HTMLTableElement>("table").forEach((table) => {
    if (table.parentElement?.classList.contains("article-table-scroll")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "article-table-scroll";
    wrapper.setAttribute("role", "region");
    wrapper.setAttribute("aria-label", "Scrollable data table");
    wrapper.tabIndex = 0;

    table.before(wrapper);
    wrapper.append(table);
  });
}

function resolveCitationSource(sourceId: string) {
  const decodedSourceId = decodeURIComponent(sourceId);
  const directSource = document.getElementById(decodedSourceId);

  if (directSource) {
    return { element: directSource, id: decodedSourceId };
  }

  const numericSource = decodedSourceId.replace(/^source-/, "");

  if (!/^\d+$/.test(numericSource)) {
    return null;
  }

  const sources = Array.from(document.querySelectorAll<HTMLElement>(".article-sources li[id]"));
  const exactFallback = sources.find((source) => source.id === `source-${numericSource}`);

  if (exactFallback) {
    return { element: exactFallback, id: exactFallback.id };
  }

  const suffixFallback = sources.find((source) => source.id.endsWith(`-${numericSource}`));

  if (suffixFallback) {
    return { element: suffixFallback, id: suffixFallback.id };
  }

  const positionedFallback = sources[Number(numericSource) - 1];

  if (positionedFallback) {
    return { element: positionedFallback, id: positionedFallback.id || decodedSourceId };
  }

  return null;
}

function linkedLegacySourceHtml(sourceText: string, href: string) {
  const cleanSourceText = String(sourceText || "").replace(/\s*\[link\]\s*$/i, "").trim();
  const quotedTitle = cleanSourceText.match(/[“"]([^”"]{2,})[”"]/);
  const title = quotedTitle?.[1] || "";
  const titleStart = title ? cleanSourceText.indexOf(title, quotedTitle?.index || 0) : -1;
  const linkStart = titleStart >= 0 ? titleStart : 0;
  const linkEnd = titleStart >= 0 ? titleStart + title.length : cleanSourceText.length;

  return `${escapeCodeText(cleanSourceText.slice(0, linkStart))}<a href="${escapeCodeText(href)}" target="_blank" rel="noopener noreferrer">${escapeCodeText(cleanSourceText.slice(linkStart, linkEnd))}</a>${escapeCodeText(cleanSourceText.slice(linkEnd))}`;
}

function normalizeLegacySourceLinks(root: HTMLElement) {
  root.querySelectorAll<HTMLAnchorElement>(".article-sources a[href]").forEach((anchor) => {
    if (anchor.textContent?.trim().toLowerCase() !== "[link]") return;

    const parent = anchor.closest("p");
    const href = anchor.getAttribute("href");
    if (!parent || !href) return;

    parent.innerHTML = linkedLegacySourceHtml(parent.textContent || "", href);
  });
}

function normalizeSourceText(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>(".article-sources p").forEach((paragraph) => {
    const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode as Text);
    }

    textNodes.forEach((textNode) => {
      const nextValue = normalizeDisplayText(textNode.nodeValue || "");
      if (nextValue !== textNode.nodeValue) {
        textNode.nodeValue = nextValue;
      }
    });
  });
}

function synchronizeCitationPopovers(root: HTMLElement) {
  root.querySelectorAll<HTMLAnchorElement>('a.citation-ref[href^="#"]').forEach((link) => {
    const sourceId = link.getAttribute("href")?.slice(1);
    if (!sourceId) return;

    const source = resolveCitationSource(sourceId);
    const popover = link.querySelector<HTMLElement>(".citation-popover");
    if (!source || !popover) return;

    const popoverTitle = popover.querySelector<HTMLElement>(".citation-popover-title");
    const existingPopoverLink = popover.querySelector<HTMLElement>(".citation-popover-link");
    const sourceParagraph = source.element.querySelector<HTMLElement>("p") || source.element;
    const sourceAnchor = sourceParagraph.querySelector<HTMLAnchorElement>("a[href]");
    const popoverLink = existingPopoverLink || document.createElement("span");

    popoverLink.className = "citation-popover-link";
    popoverLink.textContent = "View source";
    if (sourceAnchor?.href) {
      popoverLink.dataset.href = sourceAnchor.href;
    }

    popover.replaceChildren();
    if (popoverTitle) {
      popover.append(popoverTitle);
    }
    popover.append(document.createTextNode(normalizeDisplayText(sourceParagraph.textContent || "")));
    popover.append(popoverLink);
  });
}

function iframeDocument(html: string) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root {
    color-scheme: dark;
    --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-mono: "DM Mono", ui-monospace, SFMono-Regular, Consolas, monospace;
    --color-background-primary: #07070F;
    --color-background-secondary: #0F0F1A;
    --color-background-info: rgba(184, 255, 53, 0.1);
    --color-text-primary: #E8E8F0;
    --color-text-secondary: #8E8EA8;
    --color-text-info: #B8FF35;
    --color-border-primary: #B8FF35;
    --color-border-secondary: rgba(184, 255, 53, 0.55);
    --color-border-tertiary: #1E1E30;
    --color-border-info: #B8FF35;
    --border-radius-md: 8px;
    --border-radius-lg: 8px;
  }
  html {
    background: transparent;
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    min-height: 0 !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    overscroll-behavior-x: contain;
    scrollbar-color: rgba(184, 255, 53, 0.45) transparent;
    scrollbar-width: thin;
  }
  body {
    background: transparent;
    margin: 0;
    min-height: 0 !important;
    overflow-x: visible !important;
    overflow-y: hidden !important;
  }
  html::-webkit-scrollbar {
    height: 8px;
    width: 0;
  }
  html::-webkit-scrollbar-track {
    background: transparent;
  }
  html::-webkit-scrollbar-thumb {
    background: rgba(184, 255, 53, 0.45);
    border-radius: 999px;
  }
  body::-webkit-scrollbar {
    display: none;
  }
  .doc-slot[draggable="true"],
  [data-list-key][data-idx] {
    touch-action: none;
  }
  .touch-dragging {
    opacity: 0.65;
  }
  .touch-drop-target {
    outline: 2px solid rgba(184, 255, 53, 0.72) !important;
    outline-offset: 2px;
  }
  @media (max-width: 640px) {
    [style*="grid-template-columns:1fr 1fr 1fr"],
    [style*="grid-template-columns: 1fr 1fr 1fr"] {
      min-width: 680px !important;
    }
  }
  button.tab,
  .tab {
    appearance: none !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 2.35rem;
    max-width: 100%;
    margin: 0.25rem 0.35rem 0.25rem 0 !important;
    border: 1px solid rgba(184, 255, 53, 0.24) !important;
    border-radius: 999px !important;
    background: rgba(15, 15, 26, 0.92) !important;
    color: #B8B8CC !important;
    cursor: pointer !important;
    font-family: var(--font-mono) !important;
    font-size: 0.72rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.04em !important;
    line-height: 1.2 !important;
    padding: 0.62rem 0.95rem !important;
    text-align: center !important;
    text-transform: uppercase !important;
    transition: border-color 160ms ease, background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease !important;
    white-space: normal !important;
  }
  button.tab:hover,
  button.tab:focus-visible,
  .tab:hover,
  .tab:focus-visible {
    border-color: rgba(184, 255, 53, 0.78) !important;
    background: rgba(184, 255, 53, 0.1) !important;
    color: #B8FF35 !important;
    box-shadow: 0 0 0 3px rgba(184, 255, 53, 0.08) !important;
    outline: none !important;
    transform: translateY(-1px);
  }
  button.tab.active,
  button.tab[aria-selected="true"],
  .tab.active,
  .tab[aria-selected="true"] {
    border-color: #B8FF35 !important;
    background: #B8FF35 !important;
    color: #07070F !important;
    box-shadow: 0 10px 30px rgba(184, 255, 53, 0.16) !important;
  }
  svg .arr {
    stroke: rgba(184, 255, 53, 0.5);
    stroke-width: 1;
  }
  svg .node rect {
    fill: rgba(15, 15, 26, 0.94);
    stroke: rgba(184, 255, 53, 0.35);
  }
  svg .node .th {
    fill: #E8E8F0;
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 800;
  }
  svg .node .ts {
    fill: #A8A8BE;
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 600;
  }
  svg .node.c-teal rect,
  svg .node.c-green rect {
    fill: #E1F5EE;
    stroke: #5DCAA5;
  }
  svg .node.c-purple rect,
  svg .node.c-violet rect {
    fill: #EEE9FF;
    stroke: #8B6CFF;
  }
  svg .node.c-coral rect,
  svg .node.c-orange rect {
    fill: #FAECE7;
    stroke: #FF7A45;
  }
  svg .node.c-blue rect {
    fill: #E6F1FB;
    stroke: #185FA5;
  }
  svg .node.c-lime rect {
    fill: #EAF3DE;
    stroke: #7FB02E;
  }
  svg .node-circle.c-teal circle,
  svg g.c-teal > circle,
  svg .node-circle.c-green circle,
  svg g.c-green > circle {
    fill: #E1F5EE;
    stroke: #5DCAA5;
  }
  svg .node-circle.c-purple circle,
  svg g.c-purple > circle,
  svg .node-circle.c-violet circle,
  svg g.c-violet > circle {
    fill: #EEE9FF;
    stroke: #8B6CFF;
  }
  svg .node-circle.c-coral circle,
  svg g.c-coral > circle,
  svg .node-circle.c-orange circle,
  svg g.c-orange > circle {
    fill: #FAECE7;
    stroke: #FF7A45;
  }
  svg .node-circle.c-blue circle,
  svg g.c-blue > circle {
    fill: #E6F1FB;
    stroke: #185FA5;
  }
  svg .node-circle.c-lime circle,
  svg g.c-lime > circle {
    fill: #EAF3DE;
    stroke: #7FB02E;
  }
  svg .node.c-teal .th,
  svg .node.c-green .th,
  svg .node.c-purple .th,
  svg .node.c-violet .th,
  svg .node.c-coral .th,
  svg .node.c-orange .th,
  svg .node.c-blue .th,
  svg .node.c-lime .th {
    fill: #171724;
  }
  svg .node-circle.c-teal .th,
  svg .node-circle.c-green .th,
  svg .node-circle.c-purple .th,
  svg .node-circle.c-violet .th,
  svg .node-circle.c-coral .th,
  svg .node-circle.c-orange .th,
  svg .node-circle.c-blue .th,
  svg .node-circle.c-lime .th,
  svg g.c-teal > .th,
  svg g.c-green > .th,
  svg g.c-purple > .th,
  svg g.c-violet > .th,
  svg g.c-coral > .th,
  svg g.c-orange > .th,
  svg g.c-blue > .th,
  svg g.c-lime > .th {
    fill: #171724;
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 800;
  }
  svg .node.c-teal .ts,
  svg .node.c-green .ts,
  svg .node.c-purple .ts,
  svg .node.c-violet .ts,
  svg .node.c-coral .ts,
  svg .node.c-orange .ts,
  svg .node.c-blue .ts,
  svg .node.c-lime .ts {
    fill: #3C3C52;
  }
  svg .node-circle.c-teal .ts,
  svg .node-circle.c-green .ts,
  svg .node-circle.c-purple .ts,
  svg .node-circle.c-violet .ts,
  svg .node-circle.c-coral .ts,
  svg .node-circle.c-orange .ts,
  svg .node-circle.c-blue .ts,
  svg .node-circle.c-lime .ts,
  svg g.c-teal > .ts,
  svg g.c-green > .ts,
  svg g.c-purple > .ts,
  svg g.c-violet > .ts,
  svg g.c-coral > .ts,
  svg g.c-orange > .ts,
  svg g.c-blue > .ts,
  svg g.c-lime > .ts {
    fill: #3C3C52;
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 600;
  }
</style>
</head>
<body>
${html}
<script>
(() => {
  const measureHeight = () => {
    const body = document.body;
    if (!body) return 220;

    const bodyRect = body.getBoundingClientRect();
    const bodyStyle = getComputedStyle(body);
    const bottomPadding = Number.parseFloat(bodyStyle.paddingBottom) || 0;
    let contentBottom = 0;

    Array.from(body.children).forEach((child) => {
      const rect = child.getBoundingClientRect();
      const style = getComputedStyle(child);
      const marginBottom = Number.parseFloat(style.marginBottom) || 0;
      if (rect.width > 0 || rect.height > 0) {
        contentBottom = Math.max(contentBottom, rect.bottom - bodyRect.top + marginBottom);
      }
    });

    return Math.ceil(Math.max(contentBottom + bottomPadding, 220)) + 2;
  };
  const sendHeight = () => {
    const height = measureHeight();
    parent.postMessage({ type: "seb-html-block-height", height }, "*");
  };
  const scheduleHeight = () => {
    requestAnimationFrame(sendHeight);
    setTimeout(sendHeight, 80);
    setTimeout(sendHeight, 240);
    setTimeout(sendHeight, 600);
  };
  window.addEventListener("load", scheduleHeight);
  window.addEventListener("resize", scheduleHeight);
  document.addEventListener("click", scheduleHeight, true);
  document.addEventListener("input", scheduleHeight, true);
  document.addEventListener("change", scheduleHeight, true);
  document.addEventListener("transitionend", scheduleHeight, true);
  document.addEventListener("animationend", scheduleHeight, true);
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(scheduleHeight);
    observer.observe(document.documentElement);
    if (document.body) observer.observe(document.body);
  }
  if ("MutationObserver" in window) {
    new MutationObserver(scheduleHeight).observe(document.documentElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  const installTouchSortable = () => {
    let dragState = null;
    let activeTarget = null;

    const rows = () => Array.from(document.querySelectorAll(".doc-slot[data-list-key][data-idx], [data-list-key][data-idx]"));
    const setTarget = (target) => {
      if (activeTarget === target) return;
      rows().forEach((row) => row.classList.remove("touch-drop-target"));
      activeTarget = target;
      if (activeTarget) activeTarget.classList.add("touch-drop-target");
    };
    const clearTarget = () => {
      rows().forEach((row) => row.classList.remove("touch-drop-target", "touch-dragging"));
      activeTarget = null;
    };
    const currentState = () => {
      try {
        return typeof state !== "undefined" ? state : null;
      } catch {
        return null;
      }
    };
    const refresh = () => {
      try {
        if (typeof refreshAll === "function") refreshAll();
      } catch {}
    };
    const rowAtPoint = (x, y, listKey) => {
      const element = document.elementFromPoint(x, y);
      const row = element && element.closest ? element.closest(".doc-slot[data-list-key][data-idx], [data-list-key][data-idx]") : null;
      return row && row.dataset.listKey === listKey ? row : null;
    };

    document.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse") return;

      const row = event.target && event.target.closest ? event.target.closest(".doc-slot[data-list-key][data-idx], [data-list-key][data-idx]") : null;
      if (!row || row.getAttribute("draggable") === "false") return;

      const sourceState = currentState();
      const listKey = row.dataset.listKey;
      const index = Number(row.dataset.idx);
      if (!sourceState || !listKey || !Array.isArray(sourceState[listKey]) || !Number.isFinite(index)) return;

      dragState = { pointerId: event.pointerId, listKey, index, source: row };
      row.classList.add("touch-dragging");
      try {
        row.setPointerCapture(event.pointerId);
      } catch {}
      event.preventDefault();
    }, { passive: false });

    document.addEventListener("pointermove", (event) => {
      if (!dragState || event.pointerId !== dragState.pointerId) return;
      setTarget(rowAtPoint(event.clientX, event.clientY, dragState.listKey));
      event.preventDefault();
    }, { passive: false });

    const finishDrag = (event) => {
      if (!dragState || event.pointerId !== dragState.pointerId) return;

      const sourceState = currentState();
      const target = activeTarget || rowAtPoint(event.clientX, event.clientY, dragState.listKey);
      const toIndex = target ? Number(target.dataset.idx) : NaN;
      let handledByNativeDrag = false;

      if (dragState.source && target) {
        try {
          const dataTransfer = new DataTransfer();
          dragState.source.dispatchEvent(new DragEvent("dragstart", {
            bubbles: true,
            cancelable: true,
            dataTransfer,
          }));
          target.dispatchEvent(new DragEvent("dragover", {
            bubbles: true,
            cancelable: true,
            dataTransfer,
            clientX: event.clientX,
            clientY: event.clientY,
          }));
          handledByNativeDrag = !target.dispatchEvent(new DragEvent("drop", {
            bubbles: true,
            cancelable: true,
            dataTransfer,
            clientX: event.clientX,
            clientY: event.clientY,
          }));
        } catch {}
      }

      if (
        !handledByNativeDrag &&
        sourceState &&
        Array.isArray(sourceState[dragState.listKey]) &&
        Number.isFinite(toIndex) &&
        toIndex !== dragState.index
      ) {
        const list = sourceState[dragState.listKey];
        const [moved] = list.splice(dragState.index, 1);
        list.splice(toIndex, 0, moved);
        refresh();
      }

      dragState = null;
      clearTarget();
      scheduleHeight();
      event.preventDefault();
    };

    document.addEventListener("pointerup", finishDrag, { passive: false });
    document.addEventListener("pointercancel", (event) => {
      if (!dragState || event.pointerId !== dragState.pointerId) return;
      dragState = null;
      clearTarget();
    }, { passive: false });
  };

  installTouchSortable();
  scheduleHeight();
  setTimeout(scheduleHeight, 1200);
})();
</script>
</body>
</html>`;
}

function mountHtmlBlock(block: HTMLElement) {
  if (block.dataset.htmlBlockMounted === "true") return;
  block.dataset.htmlBlockMounted = "true";

  const encoded = block.dataset.htmlBlock || "";
  if (!encoded) return;

  block.innerHTML = skeletonMarkup();
  block.classList.add("is-loading");

  runWhenIdle(() => {
    let html = "";
    try {
      html = decodeBlockPayload(encoded);
    } catch {
      block.innerHTML = '<div class="html-block-error">HTML block could not be loaded.</div>';
      block.classList.remove("is-loading");
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.className = "html-block-frame";
    iframe.title = block.getAttribute("aria-label") || block.getAttribute("title") || "Html Block";
    iframe.loading = "lazy";
    iframe.scrolling = "auto";
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.srcdoc = iframeDocument(html);

    block.replaceChildren(iframe);
    block.classList.remove("is-loading");
    block.classList.add("is-ready");
  });
}

export default function ArticleContent({ html }: ArticleContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    wrapArticleTables(root);
    unwrapImportedCodeBlocks(root);
    highlightCodeBlocks(root);
    normalizeLegacySourceLinks(root);
    normalizeSourceText(root);
    synchronizeCitationPopovers(root);

    root.querySelectorAll<HTMLElement>(".custom-html-block[data-html-block]").forEach(mountHtmlBlock);

    root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
      if (!anchor.getAttribute("href")?.startsWith("#")) {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
      }
    });

    const handleHtmlBlockMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== "seb-html-block-height") return;

      const iframes = root.querySelectorAll<HTMLIFrameElement>(".html-block-frame");
      iframes.forEach((iframe) => {
        if (iframe.contentWindow === event.source) {
          const nextHeight = Math.min(Math.max(Number(event.data.height) || 220, 220), 1800);
          iframe.style.height = `${nextHeight}px`;
        }
      });
    };

    const handleCitationClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      // Popover external links take priority - open URL in new tab
      const popoverLink = target.closest<HTMLElement>(".citation-popover-link");
      if (popoverLink) {
        const href = popoverLink.dataset.href;
        if (href) {
          event.preventDefault();
          event.stopImmediatePropagation();
          window.open(href, "_blank", "noopener,noreferrer");
        }
        return;
      }

      const link = target.closest<HTMLAnchorElement>('a.citation-ref[href^="#"]');
      if (!link) return;

      const sourceId = link.getAttribute("href")?.slice(1);
      if (!sourceId) return;

      const source = resolveCitationSource(sourceId);
      if (!source) return;

      event.preventDefault();
      const hash = `#${source.id}`;
      if (window.location.hash === hash) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
      window.location.hash = source.id;
    };

    window.addEventListener("message", handleHtmlBlockMessage);
    root.addEventListener("click", handleCitationClick);

    return () => {
      window.removeEventListener("message", handleHtmlBlockMessage);
      root.removeEventListener("click", handleCitationClick);
    };
  }, [html]);

  return <div ref={rootRef} className="article-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
