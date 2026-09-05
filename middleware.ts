import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CANONICAL_HOST = "searchenginebasics.io";
const RETIRED_PATH_PREFIXES = ["/search-engine-crawling"];
const LEGACY_REDIRECTS: Record<string, string> = {
  "/search-engine-crawling": "/crawling",
};

function isRetiredPath(pathname: string) {
  return RETIRED_PATH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function middleware(request: NextRequest) {
  const requestHost = (request.headers.get("host") || "").split(":")[0].toLowerCase();

  if (requestHost === `www.${CANONICAL_HOST}`) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.hostname = CANONICAL_HOST;
    canonicalUrl.port = "";

    return NextResponse.redirect(canonicalUrl, 301);
  }

  const legacyTarget = LEGACY_REDIRECTS[request.nextUrl.pathname];
  if (legacyTarget) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = legacyTarget;
    return NextResponse.redirect(redirectUrl, 301);
  }

  if (isRetiredPath(request.nextUrl.pathname)) {
    return new NextResponse(
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page retired | Search Engine Basics</title></head><body><main><h1>This page has been retired</h1><p>The requested resource is no longer available. Visit <a href="/">Search Engine Basics</a> to continue learning.</p></main></body></html>`,
      {
        status: 410,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "X-Robots-Tag": "noindex, follow",
        },
      },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
