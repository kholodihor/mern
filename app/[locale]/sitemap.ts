import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mernserwis.pl";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: `${baseUrl}/ua`,
          en: `${baseUrl}/en`,
          pl: `${baseUrl}/pl`,
        },
      },
    },
  ];
}
