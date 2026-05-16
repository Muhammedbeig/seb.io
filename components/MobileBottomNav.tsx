"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavSeries } from "./Navbar";

const fallbackSeriesIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>';

const blogIconHtml = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>';

function buildMobileNavItems(series: NavSeries[]) {
  const seriesLinks = series.map((s) => ({
    label: s.title,
    href: `/${s.slug}`,
    iconHtml: s.icon || fallbackSeriesIcon,
  }));
  return [...seriesLinks, { label: "Blog", href: "/blog", iconHtml: blogIconHtml }];
}

export default function MobileBottomNav({ series = [] }: { series?: NavSeries[] }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const mobileNavItems = buildMobileNavItems(series);

  useEffect(() => {
    const show = () => setHidden(false);
    const hide = () => {
      if (window.scrollY > 80) setHidden(true);
    };
    const scheduleHide = () => window.setTimeout(hide, 60);

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 40 || delta < -4) {
        show();
      } else if (delta > 8 && currentY > 120) {
        hide();
      }

      lastScrollY.current = currentY;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY > 8) scheduleHide();
      if (event.deltaY < -4) show();
    };

    let lastTouchY = 0;
    const onTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      const currentTouchY = event.touches[0]?.clientY ?? lastTouchY;
      const delta = lastTouchY - currentTouchY;
      if (delta > 8) scheduleHide();
      if (delta < -4) show();
      lastTouchY = currentTouchY;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (["PageDown", " ", "ArrowDown"].includes(event.key)) scheduleHide();
      if (["PageUp", "ArrowUp"].includes(event.key)) show();
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <nav
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#1E1E30] transition-transform duration-300 ease-out ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{
        background: "rgba(7, 7, 15, 0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <div className="flex items-center justify-around h-14 px-1">
        {mobileNavItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors duration-200"
              style={{
                color: isActive ? "#B8FF35" : "#6B6B80",
              }}
            >
              <span
                className="transition-transform duration-200 flex items-center [&>svg]:w-5 [&>svg]:h-5"
                style={{
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                }}
                dangerouslySetInnerHTML={{ __html: item.iconHtml }}
              />
              <span
                className="leading-none"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.04em",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-1 rounded-full"
                  style={{
                    width: 4,
                    height: 4,
                    background: "#B8FF35",
                    boxShadow: "0 0 6px #B8FF3580",
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
