export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/public/", "/login"],
      },
    ],
    sitemap: [
      `https://mernserwis.pl/sitemap.xml`,
      `https://mernserwis.pl/ua/sitemap.xml`,
      `https://mernserwis.pl/en/sitemap.xml`,
      `https://mernserwis.pl/pl/sitemap.xml`,
    ],
  };
}
