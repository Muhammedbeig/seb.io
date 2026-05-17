"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: Element[]) => Promise<void>;
    };
  }
}

function asDisplayMath(rawText: string) {
  const trimmed = rawText.trim();
  if (/\\\(|\\\[|\$\$/.test(trimmed)) return trimmed;

  let expression = trimmed
    .replace(/·/g, "\\cdot")
    .replace(/×/g, "\\times")
    .replace(/Σ/g, "\\sum")
    .replace(/λ/g, "\\lambda")
    .replace(/Δ/g, "\\Delta");

  const equalsIndex = expression.indexOf("=");
  if (equalsIndex > 0) {
    const left = expression.slice(0, equalsIndex).trim();
    const right = expression.slice(equalsIndex + 1).trim();
    if (/\s/.test(left) && !left.includes("\\")) {
      expression = `\\text{${left.replace(/[{}]/g, "")}} = ${right}`;
    }
  }

  return `\\[${expression}\\]`;
}

export default function MathJaxLoader() {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded || !window.MathJax?.typesetPromise) return;

    const typesetEquations = () => {
      const equationBlocks = Array.from(document.querySelectorAll(".prose-custom .block-equation"));
      const preparedBlocks: Element[] = [];

      equationBlocks.forEach((block) => {
        const element = block as HTMLElement;
        if (element.dataset.mathjaxPrepared === "true" || element.querySelector("mjx-container")) return;
        if (element.querySelector(".citation-cluster")) return;

        const rawText = element.textContent || "";
        if (!rawText.trim()) return;

        element.textContent = asDisplayMath(rawText);
        element.dataset.mathjaxPrepared = "true";
        preparedBlocks.push(element);
      });

      if (preparedBlocks.length > 0) {
        window.MathJax?.typesetPromise?.(preparedBlocks).catch(() => undefined);
      }
    };

    typesetEquations();
    const retry = window.setTimeout(typesetEquations, 250);

    return () => window.clearTimeout(retry);
  }, [loaded, pathname]);

  return (
    <Script
      id="mathjax-script"
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
      strategy="afterInteractive"
      onLoad={() => setLoaded(true)}
      onReady={() => setLoaded(true)}
    />
  );
}
