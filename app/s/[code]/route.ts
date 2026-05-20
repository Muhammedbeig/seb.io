import { NextResponse } from "next/server";
import { resolveShareLink } from "@/lib/cms";
import { absoluteSiteUrl } from "@/lib/site";

export async function GET(_: Request, { params }: { params: { code: string } }) {
  const targetUrl = await resolveShareLink(params.code);

  return NextResponse.redirect(targetUrl || absoluteSiteUrl("/"));
}
