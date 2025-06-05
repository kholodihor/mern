import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create the middleware with improved SEO configuration
const intlMiddleware = createMiddleware(routing);

// Middleware function that handles requests
export default function middleware(request: NextRequest) {
  // Handle root path redirect with proper headers for SEO
  if (request.nextUrl.pathname === "/") {
    // Create a redirect to the default locale (pl)
    const response = NextResponse.redirect(
      new URL("/pl", request.url),
      { status: 308 } // Permanent Redirect
    );

    // Add Link header with canonical information for search engines
    const canonicalUrl = new URL("/pl", request.url).toString();
    response.headers.set("Link", `<${canonicalUrl}>; rel="canonical"`);

    return response;
  }

  // For all other paths, use the intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pl|en|ua)/:path*"],
};
