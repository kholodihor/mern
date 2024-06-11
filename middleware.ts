import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["pl", "en", "ua"],
  defaultLocale: "pl",
});

export const config = {
  matcher: ["/", "/(ua|en|pl)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
