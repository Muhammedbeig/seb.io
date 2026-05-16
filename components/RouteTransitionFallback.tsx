"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import RouteLoadingSkeleton from "@/components/RouteLoadingSkeleton";

const STATIC_PATHS = new Set([
  "/",
  "/about-us",
  "/blog",
  "/contact-us",
  "/privacy-policy",
  "/search",
  "/series",
  "/terms-and-conditions",
]);

function normalizePath(pathname: string) {
  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function shouldGuardPath(pathname: string) {
  const cleanPath = normalizePath(pathname);
  return !STATIC_PATHS.has(cleanPath) && !cleanPath.startsWith("/search/");
}

function getDirectMain() {
  return Array.from(document.body.children).find((element) => element.tagName === "MAIN") as HTMLElement | undefined;
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
      if (!shouldGuardPath(nextPath)) return;

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
      const visibleLongEnough = performance.now() - pendingStartedAt.current > 120;

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
      <RouteLoadingSkeleton chrome={false} />
    </div>
  );
}
