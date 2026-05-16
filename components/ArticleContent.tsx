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

function skeletonMarkup() {
  return `
    <div class="html-block-skeleton" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
}

function mountHtmlBlock(block: HTMLElement) {
  if (block.dataset.htmlBlockMounted === "true") return;
  block.dataset.htmlBlockMounted = "true";

  const encoded = block.dataset.htmlBlock || "";
  if (!encoded) return;

  block.innerHTML = skeletonMarkup();
  block.classList.add("is-loading");

  runWhenIdle(() => {
    const html = decodeBlockPayload(encoded);
    const template = document.createElement("template");
    template.innerHTML = html;

    const scripts = Array.from(template.content.querySelectorAll("script"));
    scripts.forEach((script) => script.remove());

    block.replaceChildren(template.content.cloneNode(true));
    block.classList.remove("is-loading");
    block.classList.add("is-ready");

    scripts.forEach((oldScript) => {
      const script = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attribute) => {
        script.setAttribute(attribute.name, attribute.value);
      });
      script.text = oldScript.textContent || "";
      block.appendChild(script);
    });
  });
}

export default function ArticleContent({ html }: ArticleContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.querySelectorAll<HTMLElement>(".custom-html-block[data-html-block]").forEach(mountHtmlBlock);

    const handleCitationClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a.citation-ref[href^="#"]');
      if (!link) return;

      const sourceId = link.getAttribute("href")?.slice(1);
      if (!sourceId) return;

      const source = document.getElementById(decodeURIComponent(sourceId));
      if (!source) return;

      event.preventDefault();
      source.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${sourceId}`);
    };

    root.addEventListener("click", handleCitationClick);

    return () => {
      root.removeEventListener("click", handleCitationClick);
    };
  }, [html]);

  return <div ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
