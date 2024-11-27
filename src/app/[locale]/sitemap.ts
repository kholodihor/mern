import { MetadataRoute } from "next";

const baseUrl = "https://mernserwis.pl";

// List of routes and their paths
const routes = [
  { path: "", lastModified: new Date("2024-01-01") }, // Replace with actual last modified date
  { path: "about", lastModified: new Date("2024-01-01") },
  { path: "services", lastModified: new Date("2024-01-01") },
  { path: "contacts", lastModified: new Date("2024-01-01") },
  { path: "news", lastModified: new Date("2024-01-01") },
];

// Function to generate alternate URLs
const generateAlternates = (path: string) => ({
  uk: `${baseUrl}/ua${path ? '/' + path : ''}`,
  en: `${baseUrl}/en${path ? '/' + path : ''}`,
  pl: `${baseUrl}/pl${path ? '/' + path : ''}`,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, lastModified }) => ({
    url: `${baseUrl}/${path}`,
    lastModified,
    alternates: {
      languages: generateAlternates(path),
    },
  }));
}