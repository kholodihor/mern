import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.BASE_URL || "https://mernserwis.pl";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/login/"],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/ua/sitemap.xml`,
      `${baseUrl}/en/sitemap.xml`,
      `${baseUrl}/pl/sitemap.xml`,
    ],
  };
}
