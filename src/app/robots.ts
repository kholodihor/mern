import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.BASE_URL || "https://mernserwis.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/*.js",
          "/*.css",
          "/*.png",
          "/*.jpg",
          "/*.jpeg",
          "/*.gif",
          "/*.svg",
          "/*.ico",
        ],
        disallow: [
          "/admin/*",
          "/api/*",
          "/login/*",
          "/*?*", // Prevent crawling of URLs with query parameters
          "/*.json$", // Prevent crawling of JSON files
          "/*/admin/*", // Prevent crawling of admin pages in all locales
        ],
      },
    ],
    // Include both root sitemap and locale-specific sitemaps
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/pl/sitemap.xml`,
      `${baseUrl}/en/sitemap.xml`,
      `${baseUrl}/ua/sitemap.xml`,
    ],
  };
}
