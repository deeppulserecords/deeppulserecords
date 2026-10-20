import { NextResponse } from "next/server";
import { getDeeppulseContent } from "@/lib/spotify";

export async function POST(request: Request) {
  const secret = process.env.MANUAL_REFRESH_SECRET;
  const provided = request.headers.get("x-refresh-secret");

  if (!secret) {
    return NextResponse.json({ error: "Manual refresh is not configured." }, { status: 503 });
  }

  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await getDeeppulseContent({ force: true });

  return NextResponse.json({
    refreshedAt: content.refreshedAt,
    nextRefreshAt: content.nextRefreshAt,
    releases: content.releases.length,
    artists: content.artists.length
  });
}
