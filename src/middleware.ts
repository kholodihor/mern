import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// Create the intl middleware with our routing configuration
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get('host') || '';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  
  // Handle HTTP to HTTPS and www to non-www redirects for specific pages
  if (protocol === 'http' || host.startsWith('www.')) {
    const url = new URL(`https://mernserwis.com${pathname}${search}`);
    return NextResponse.redirect(url, 301);
  }
  
  // Continue with intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all paths except static files, API routes, and robots.txt
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|api/|_next/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff2?)$).*)",
  ],
};
