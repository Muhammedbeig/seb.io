"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: Element[]) => Promise<void>;
      startup?: {
        promise?: Promise<void>;
      };
    };
  }
}

function hasRawTex(text: string) {
  return /\\\[|\\\(|\$\$|\\(?:frac|mathrm|sum|sqrt|left|right|times|cdot|text|operatorname)\b/.test(text);
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
    let cancelled = false;
    const retryDelays = [0, 100, 250, 500, 1000, 2000, 4000, 8000];
    const timers: number[] = [];

    const typesetEquations = async () => {
      if (cancelled || !window.MathJax?.typesetPromise) return false;
      await window.MathJax.startup?.promise;

      const equationBlocks = Array.from(document.querySelectorAll(".prose-custom .block-equation"));
      const preparedBlocks: Element[] = [];

      equationBlocks.forEach((block) => {
        const element = block as HTMLElement;
        const rawText = element.textContent || "";

        if (element.dataset.mathjaxPrepared === "true") {
          if (element.querySelector("mjx-container")) return;
          if (!hasRawTex(rawText)) return;
          delete element.dataset.mathjaxPrepared;
        }
        if (element.dataset.mathjaxPrepared === "loading") return;
        if (element.querySelector("mjx-container")) {
          element.dataset.mathjaxPrepared = "true";
          return;
        }
        if (element.querySelector(".citation-cluster")) return;

        if (!rawText.trim()) return;

        element.textContent = asDisplayMath(rawText);
        element.dataset.mathjaxPrepared = "loading";
        preparedBlocks.push(element);
      });

      if (preparedBlocks.length > 0) {
        try {
          await window.MathJax.typesetPromise(preparedBlocks);
          preparedBlocks.forEach((block) => {
            const element = block as HTMLElement;
            if (element.querySelector("mjx-container")) {
              element.dataset.mathjaxPrepared = "true";
            } else {
              delete element.dataset.mathjaxPrepared;
            }
          });
        } catch {
          preparedBlocks.forEach((block) => {
            delete (block as HTMLElement).dataset.mathjaxPrepared;
          });
        }
      }

      return true;
    };

    retryDelays.forEach((delay) => {
      timers.push(window.setTimeout(() => {
        void typesetEquations();
      }, delay));
    });

    const observer = new MutationObserver(() => {
      timers.push(window.setTimeout(() => {
        void typesetEquations();
      }, 50));
    });

    const article = document.querySelector(".prose-custom");
    if (article) {
      observer.observe(article, { childList: true, subtree: true });
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
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
