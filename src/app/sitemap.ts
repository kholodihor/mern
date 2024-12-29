import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { MetadataRoute } from "next";

const baseUrl = "https://mernserwis.com";
const locales = ['pl', 'en', 'ua'];

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
    const galleryRef = collection(db, "gallery");
    const gallerySnapshot = await getDocs(galleryRef);

    return gallerySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        path: `gallery/${data.slug}`,
        lastModified: data.lastModified ? new Date(data.lastModified) : new Date(),
      };
    });
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes = await fetchDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each route in each locale
  for (const route of allRoutes) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route.path ? "/" + route.path : ""}`,
        lastModified: route.lastModified,
        changeFrequency: "weekly",
        priority: route.path === "" ? 1 : 0.8,
        alternates: {
          languages: {
            "pl-PL": `${baseUrl}/pl${route.path ? "/" + route.path : ""}`,
            "en-US": `${baseUrl}/en${route.path ? "/" + route.path : ""}`,
            "uk-UK": `${baseUrl}/ua${route.path ? "/" + route.path : ""}`,
          }
        },
      });
    }
  }

  return sitemapEntries;
}
