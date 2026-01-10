import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing url", { status: 400 });
  }

  // (Optional) basic allowlist to prevent open proxy abuse:
  // Only allow your known asset hosts (Sanity/R2/etc)
  const allowedHosts = [
    "cdn.sanity.io",
    // add your R2 public host, S3 host, etc.
  ];

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }

  if (!allowedHosts.includes(parsed.host)) {
    return new NextResponse("Host not allowed", { status: 403 });
  }

  const res = await fetch(url);
  if (!res.ok) {
    return new NextResponse("Failed to fetch PDF", { status: 502 });
  }

  const contentType = res.headers.get("content-type") || "application/pdf";
  const arrayBuffer = await res.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": contentType,
      // Inline allows iframe viewing; filename optional
      "Content-Disposition": 'inline; filename="resource.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
