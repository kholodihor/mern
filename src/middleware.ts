import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create the intl middleware with our routing configuration
export default createMiddleware(routing);

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|_next/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff2?)$).*)',
  ],
};
