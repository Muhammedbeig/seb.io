import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const defaultPaths = ["/", "/blog", "/series"];

function normalizePaths(paths: unknown): string[] {
  if (!Array.isArray(paths)) return defaultPaths;

  const normalized = paths
    .filter((path): path is string => typeof path === "string")
    .map((path) => path.trim())
    .filter((path) => path.startsWith("/") && !path.includes("://"));

  return normalized.length > 0 ? Array.from(new Set(normalized)) : defaultPaths;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({} as Record<string, unknown>));
  const configuredSecret = process.env.REVALIDATE_SECRET;
  const suppliedSecret =
    typeof body.secret === "string"
      ? body.secret
      : request.headers.get("x-revalidate-secret");

  if (!configuredSecret || suppliedSecret !== configuredSecret) {
    return NextResponse.json({ ok: false, message: "Invalid revalidation secret." }, { status: 401 });
  }

  revalidateTag("cms");
  revalidatePath("/", "layout");

  const paths = normalizePaths(body.paths);
  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: true, paths });
}
