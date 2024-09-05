import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["pl", "en", "ua"],
  defaultLocale: "pl",
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/", "/(ua|en|pl)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
