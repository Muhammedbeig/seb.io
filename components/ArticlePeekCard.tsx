"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ArticleAttributeChips from "@/components/ArticleAttributeChips";
import type { ArticleAttribute } from "@/lib/cms";

type ArticlePeekCardProps = {
  title: string;
  excerpt?: string;
  previewHeadings?: string[];
  attributes?: ArticleAttribute[];
  compact?: boolean;
  minHeightClassName?: string;
  titleClassName?: string;
  excerptClassName?: string;
  titleTag?: "h2" | "h3" | "span";
};

export default function ArticlePeekCard({
  title,
  excerpt,
  previewHeadings = [],
  attributes = [],
  compact = false,
  minHeightClassName,
  titleClassName,
  excerptClassName,
  titleTag = "h3",
}: ArticlePeekCardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const phrases = useMemo(
    () => [title, ...previewHeadings.filter(Boolean).slice(0, 5)],
    [title, previewHeadings],
  );
  const [isActive, setIsActive] = useState(phrases.length <= 1);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(title.length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length <= 1 || isActive) return;

    const element = rootRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isActive, phrases.length]);

  useEffect(() => {
    if (phrases.length <= 1 || !isActive) {
      setPhraseIndex(0);
      setCharCount(title.length);
      setDeleting(false);
      return;
    }

    const phrase = phrases[phraseIndex] || title;
    const isComplete = charCount >= phrase.length;
    const isEmpty = charCount <= 0;
    const delay = !deleting && isComplete ? 1700 : deleting && isEmpty ? 120 : deleting ? 18 : 34;

    const timer = window.setTimeout(() => {
      if (!deleting && isComplete) {
        setDeleting(true);
        return;
      }

      if (deleting && isEmpty) {
        setPhraseIndex((current) => (current + 1) % phrases.length);
        setDeleting(false);
        return;
      }

      setCharCount((current) => current + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charCount, deleting, isActive, phraseIndex, phrases, title]);

  useEffect(() => {
    setPhraseIndex(0);
    setCharCount(title.length);
    setDeleting(false);
    setIsActive(phrases.length <= 1);
  }, [phrases.length, title]);

  const activePhrase = phrases[phraseIndex] || title;
  const animatedTitle = phrases.length > 1 ? activePhrase.slice(0, charCount) : title;
  const titleClasses =
    titleClassName ||
    `${compact ? "text-sm" : "text-base sm:text-lg"} font-semibold text-[#E8E8F0] leading-snug group-hover:text-[#B8FF35] transition-colors duration-200`;

  const Tag = titleTag;

  return (
    <div ref={rootRef} className="min-w-0">
      <div className={minHeightClassName || (compact ? "min-h-[78px]" : "min-h-[104px]")}>
        <Tag
          aria-label={title}
          className={`${titleClasses} line-clamp-2 h-[2.75em] overflow-hidden`}
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {animatedTitle}
          {phrases.length > 1 && (
            <span className="ml-0.5 inline-block h-[1em] w-px translate-y-0.5 animate-pulse bg-[#B8FF35]" aria-hidden="true" />
          )}
        </Tag>
        {excerpt && (
          <p
            className={
              excerptClassName ||
              `${compact ? "line-clamp-2" : "line-clamp-3"} mt-2 text-xs text-[#6B6B80] leading-relaxed`
            }
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {excerpt}
          </p>
        )}
      </div>
      {attributes.length > 0 && (
        <div className="mt-3">
          <ArticleAttributeChips attributes={attributes} />
        </div>
      )}
    </div>
  );
}
