"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type ArticleTocProps = {
  toc: TocItem[];
};

const anchorOffset = 108;

function scrollToHeading(id: string, behavior: ScrollBehavior = "smooth") {
  const element = document.getElementById(id);
  if (!element) return;

  if (element instanceof HTMLDetailsElement) {
    element.open = true;
  }

  const top = window.scrollY + element.getBoundingClientRect().top - anchorOffset;
  window.scrollTo({ top, behavior });
}

export default function ArticleToc({ toc }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(toc[0]?.id || "");

  useEffect(() => {
    if (toc.length === 0) return;

    const updateActiveHeading = () => {
      let current = toc[0]?.id || "";

      for (const item of toc) {
        const element = document.getElementById(item.id);
        if (!element) continue;

        if (element.getBoundingClientRect().top <= anchorOffset + 8) {
          current = item.id;
        } else {
          break;
        }
      }

      setActiveId(current);
    };

    updateActiveHeading();
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [toc]);

  if (toc.length === 0) {
    return (
      <p className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-sans)" }}>
        No headings found.
      </p>
    );
  }

  return (
    <ul className={`space-y-1.5 pr-1 ${toc.length > 4 ? "max-h-[18rem] overflow-y-auto" : ""}`}>
      {toc.map((item) => {
        const isActive = item.id === activeId;

        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                window.history.replaceState(null, "", `#${item.id}`);
                setActiveId(item.id);
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => scrollToHeading(item.id));
                });
              }}
              className={`block rounded-md border px-3 py-2 text-xs leading-snug transition-colors ${
                isActive
                  ? "border-transparent text-[#B8FF35]"
                  : "border-transparent text-[#6B6B80] hover:text-[#B8FF35]"
              }`}
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
