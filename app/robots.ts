export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api",
          "/public/",
          "/login",
        ],
      },
    ],
    sitemap: [
      `${process.env.BASE_URL}/ua/sitemap.xml`,
      `${process.env.BASE_URL}/en/sitemap.xml`,
      `${process.env.BASE_URL}/pl/sitemap.xml`,
    ],
  };
}
