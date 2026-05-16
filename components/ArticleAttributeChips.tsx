"use client";

import { useState } from "react";
import type { ArticleAttribute } from "@/lib/cms";

type ArticleAttributeChipsProps = {
  attributes?: ArticleAttribute[];
  defaultExpanded?: boolean;
};

const VISIBLE_COUNT = 3;
/** Max visible characters before truncating (monospace font, ~6px/char at 10px size) */
const MAX_CHARS = 18;

export default function ArticleAttributeChips({ attributes = [], defaultExpanded = false }: ArticleAttributeChipsProps) {
  const cleanAttributes = attributes.filter((attribute) => attribute.label?.trim());
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (!cleanAttributes.length) return null;

  const visibleAttributes = expanded ? cleanAttributes : cleanAttributes.slice(0, VISIBLE_COUNT);
  const hiddenCount = cleanAttributes.length - VISIBLE_COUNT;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="flex max-w-full min-w-0 flex-wrap items-center gap-1.5"
      onClickCapture={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("[data-expand-toggle]")) {
          e.stopPropagation();
          e.preventDefault();
          setExpanded((prev) => !prev);
        }
      }}
    >
      {visibleAttributes.map((attribute, index) => {
        const label = attribute.label || "";
        const isTruncated = !expanded && label.length > MAX_CHARS;

        return (
          <span
            key={`${label}-${index}`}
            title={label}
            {...(isTruncated
              ? { "data-expand-toggle": true, role: "button" as const, tabIndex: 0 }
              : {})}
            className={`inline-block min-w-0 rounded-[3px] border px-2 py-0.5 text-[10px] font-medium leading-[1.25]${
              isTruncated ? " cursor-pointer" : ""
            }`}
            style={{
              borderColor: `${attribute.color}55`,
              background: `${attribute.color}18`,
              color: attribute.color,
              fontFamily: "var(--font-dm-mono)",
              whiteSpace: expanded ? "normal" : "nowrap",
              overflowWrap: expanded ? "break-word" : undefined,
            }}
          >
            {isTruncated ? label.slice(0, MAX_CHARS) : label}
            {isTruncated && (
              <span
                style={{
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                …
              </span>
            )}
          </span>
        );
      })}

      {hiddenCount > 0 && (
        <span
          role="button"
          tabIndex={0}
          data-expand-toggle
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              e.preventDefault();
              setExpanded((prev) => !prev);
            }
          }}
          className="inline-flex shrink-0 cursor-pointer select-none items-center rounded-[3px] border px-1.5 py-0.5 text-[10px] font-bold leading-[1.25] transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            borderColor: "#6B6B8055",
            background: "#6B6B8018",
            color: "#6B6B80",
            fontFamily: "var(--font-dm-mono)",
            textDecoration: "underline",
            textDecorationStyle: "dotted",
            textUnderlineOffset: "2px",
          }}
          aria-label={expanded ? "Show fewer attributes" : `Show ${hiddenCount} more attributes`}
        >
          {expanded ? "−" : `+${hiddenCount}`}
        </span>
      )}
    </div>
  );
}
