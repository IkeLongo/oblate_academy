import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Redirect bare domain to www (permanent 301)
  if (request.nextUrl.hostname === "oblateacademy.com") {
    const url = request.nextUrl.clone();
    url.hostname = "www.oblateacademy.com";
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon\\.ico).*)",
  ],
};
