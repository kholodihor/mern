import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { MetadataRoute } from "next";

const baseUrl = "https://mernserwis.com";

// List of static routes and their paths
const staticRoutes = [
  { path: "", lastModified: new Date() },
  { path: "about", lastModified: new Date() },
  { path: "services", lastModified: new Date() },
  { path: "contacts", lastModified: new Date() },
  { path: "news", lastModified: new Date() },
  { path: "gallery", lastModified: new Date() },
];

async function fetchDynamicRoutes() {
  try {
    // Fetch gallery routes
    const galleryRef = collection(db, "gallery");
    const gallerySnapshot = await getDocs(galleryRef);
    const galleryRoutes = gallerySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        path: `gallery/${data.slug}`,
        lastModified: data.lastModified
          ? new Date(data.lastModified)
          : new Date(),
      };
    });

    // Fetch news routes
    const newsRef = collection(db, "news");
    const newsSnapshot = await getDocs(newsRef);
    const newsRoutes = newsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        path: `news/${data.slug}`,
        lastModified: data.lastModified
          ? new Date(data.lastModified)
          : new Date(),
      };
    });

    return [...galleryRoutes, ...newsRoutes];
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes = await fetchDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each route
  for (const route of allRoutes) {
    // Create entries for each locale
    const plUrl = `${baseUrl}/pl${route.path ? "/" + route.path : ""}`;
    const enUrl = `${baseUrl}/en${route.path ? "/" + route.path : ""}`;
    const uaUrl = `${baseUrl}/ua${route.path ? "/" + route.path : ""}`;

    // Common alternates configuration that includes all language variants
    const alternates = {
      languages: {
        "pl-PL": plUrl,
        "en-US": enUrl,
        "uk-UA": uaUrl,
        "x-default": enUrl, // Default to English for unsupported languages
      },
    };

    // Add entry for Polish version
    sitemapEntries.push({
      url: plUrl,
      lastModified: route.lastModified,
      changeFrequency: "weekly",
      priority: route.path === "" ? 1 : 0.8,
      alternates,
    });

    // Add entry for English version
    sitemapEntries.push({
      url: enUrl,
      lastModified: route.lastModified,
      changeFrequency: "weekly",
      priority: route.path === "" ? 1 : 0.8,
      alternates,
    });

    // Add entry for Ukrainian version
    sitemapEntries.push({
      url: uaUrl,
      lastModified: route.lastModified,
      changeFrequency: "weekly",
      priority: route.path === "" ? 1 : 0.8,
      alternates,
    });
  }

  return sitemapEntries;
}