"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import RouteLoadingSkeleton from "@/components/RouteLoadingSkeleton";
import HomeLoading from "@/app/loading";
import BlogLoading from "@/app/blog/loading";
import SearchLoading from "@/app/search/loading";
import SeriesIndexLoading from "@/app/series/loading";
import CategoryLoading from "@/app/[slug]/loading";
import ArticleLoading from "@/app/[slug]/[articleSlug]/loading";
import AuthorsLoading from "@/app/authors/loading";
import AuthorLoading from "@/app/authors/[slug]/loading";
import AboutUsLoading from "@/app/about-us/loading";
import ContactLoading from "@/app/contact-us/loading";
import PrivacyPolicyLoading from "@/app/privacy-policy/loading";
import TermsAndConditionsLoading from "@/app/terms-and-conditions/loading";

function normalizePath(pathname: string) {
  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function getDirectMain() {
  return Array.from(document.body.children).find((element) => element.tagName === "MAIN") as HTMLElement | undefined;
}

function loadingForPath(pathname: string) {
  const cleanPath = normalizePath(pathname);
  const segments = cleanPath.split("/").filter(Boolean);

  if (cleanPath === "/") return <HomeLoading />;
  if (cleanPath === "/about-us") return <AboutUsLoading />;
  if (cleanPath === "/blog") return <BlogLoading />;
  if (cleanPath === "/contact-us") return <ContactLoading />;
  if (cleanPath === "/privacy-policy") return <PrivacyPolicyLoading />;
  if (cleanPath === "/search") return <SearchLoading />;
  if (cleanPath === "/series") return <SeriesIndexLoading />;
  if (cleanPath === "/terms-and-conditions") return <TermsAndConditionsLoading />;
  if (segments[0] === "authors" && segments.length === 1) return <AuthorsLoading />;
  if (segments[0] === "authors" && segments.length === 2) return <AuthorLoading />;
  if (segments.length === 2) return <ArticleLoading />;
  if (segments.length === 1) return <CategoryLoading />;

  return <RouteLoadingSkeleton chrome={false} dense />;
}

export default function RouteTransitionFallback() {
  const pathname = usePathname();
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const pendingStartedAt = useRef(0);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const nextUrl = new URL(anchor.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      const nextPath = normalizePath(nextUrl.pathname);
      const currentPath = normalizePath(window.location.pathname);
      if (nextPath === currentPath) return;

      pendingStartedAt.current = performance.now();
      setPendingPath(nextPath);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useEffect(() => {
    if (!pendingPath) return;

    let frame = 0;
    let stableFrames = 0;
    const timeout = window.setTimeout(() => setPendingPath(null), 8000);

    const checkForLoadedContent = () => {
      const currentPath = normalizePath(window.location.pathname);
      const directMain = getDirectMain();
      const mainHeight = directMain?.getBoundingClientRect().height ?? 0;
      const visibleLongEnough = performance.now() - pendingStartedAt.current > 360;

      if (currentPath === pendingPath && directMain && mainHeight > 0 && visibleLongEnough) {
        stableFrames += 1;
        if (stableFrames >= 2) {
          window.clearTimeout(timeout);
          setPendingPath(null);
          return;
        }
      } else {
        stableFrames = 0;
      }

      frame = window.requestAnimationFrame(checkForLoadedContent);
    };

    frame = window.requestAnimationFrame(checkForLoadedContent);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname, pendingPath]);

  if (!pendingPath) return null;

  return (
    <div className="fixed inset-0 z-40 overflow-hidden bg-[#07070F] text-[#E8E8F0]" aria-hidden="true">
      {loadingForPath(pendingPath)}
    </div>
  );
}
