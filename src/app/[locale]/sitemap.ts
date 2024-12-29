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

// Function to generate alternate URLs
const generateAlternates = (path: string) => ({
  canonical: `${baseUrl}/pl${path ? "/" + path : ""}`,
  languages: {
    "uk-UK": `${baseUrl}/ua${path ? "/" + path : ""}`,
    "en-US": `${baseUrl}/en${path ? "/" + path : ""}`,
    "pl-PL": `${baseUrl}/pl${path ? "/" + path : ""}`,
  },
});

// Function to generate sitemap entries
const generateSitemapEntries = (
  routes: { path: string; lastModified: Date }[]
): MetadataRoute.Sitemap => {
  return routes.map(({ path, lastModified }) => ({
    url: `${baseUrl}/pl${path ? "/" + path : ""}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
    alternates: generateAlternates(path),
  }));
};

async function fetchDynamicRoutes() {
  try {
    const galleryRef = collection(db, "gallery");
    const gallerySnapshot = await getDocs(galleryRef);

    const galleryItems = gallerySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        slug: data.slug,
        lastModified: data.lastModified
          ? new Date(data.lastModified)
          : new Date(),
      };
    });

    const newsRef = collection(db, "news");
    const newsSnapshot = await getDocs(newsRef);
    const newsItems = newsSnapshot.docs.map((doc) => ({
      id: doc.id,
      lastModified: doc.data().lastModified
        ? new Date(doc.data().lastModified)
        : new Date(),
    }));

    return {
      galleryItems,
      newsItems,
    };
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return {
      galleryItems: [],
      newsItems: [],
    };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { galleryItems, newsItems } = await fetchDynamicRoutes();

  const dynamicGalleryRoutes = galleryItems.map((item) => ({
    path: `gallery/${item.slug}`,
    lastModified: item.lastModified,
  }));

  const dynamicNewsRoutes = newsItems.map((item) => ({
    path: `news/${item.id}`,
    lastModified: new Date(),
  }));

  const allRoutes = [
    ...staticRoutes,
    ...dynamicGalleryRoutes,
    ...dynamicNewsRoutes,
  ];

  return generateSitemapEntries(allRoutes);
}
