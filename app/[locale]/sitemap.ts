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
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: `${baseUrl}/ua/about`,
          en: `${baseUrl}/en/about`,
          pl: `${baseUrl}/pl/about`,
        },
      },
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: `${baseUrl}/ua/services`,
          en: `${baseUrl}/en/services`,
          pl: `${baseUrl}/pl/services`,
        },
      },
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: `${baseUrl}/ua/contacts`,
          en: `${baseUrl}/en/contacts`,
          pl: `${baseUrl}/pl/contacts`,
        },
      },
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: `${baseUrl}/ua/news`,
          en: `${baseUrl}/en/news`,
          pl: `${baseUrl}/pl/news`,
        },
      },
    },
  ];
}
