import {
  DocumentData,
  Timestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Set to revalidate every 24 hours
export const revalidate = 86400;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mernserwis.com";

// Helper function to convert Firestore Timestamp to ISO string
const toIsoString = (date: Date | Timestamp | string | undefined): string => {
  if (!date) return new Date().toISOString();
  if (date instanceof Date) return date.toISOString();
  if (date && typeof date === "object" && "toDate" in date) {
    return (date as unknown as { toDate: () => Date }).toDate().toISOString();
  }
  return new Date(date).toISOString();
};

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

// List of static routes and their paths
const staticRoutes = [
  {
    path: "",
    lastModified: new Date(),
    priority: 1.0, // Highest priority for the main page
    changeFreq: "daily" as const,
  },
  {
    path: "about",
    lastModified: new Date(),
    priority: 0.8,
    changeFreq: "weekly" as const,
  },
  {
    path: "services",
    lastModified: new Date(),
    priority: 0.8,
    changeFreq: "weekly" as const,
  },
  {
    path: "contacts",
    lastModified: new Date(),
    priority: 0.7,
    changeFreq: "monthly" as const,
  },
  {
    path: "news",
    lastModified: new Date(),
    priority: 0.9,
    changeFreq: "daily" as const,
  },
  {
    path: "gallery",
    lastModified: new Date(),
    priority: 0.8,
    changeFreq: "weekly" as const,
  },
];

async function fetchDynamicRoutes(): Promise<SitemapEntry[]> {
  const routes: SitemapEntry[] = [];

  try {
    // Fetch gallery routes
    const galleryRef = collection(db, "gallery");
    const gallerySnapshot = await getDocs(galleryRef);

    gallerySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      if (!data.slug) return;

      // Clean up slug - ensure it doesn't end with a dash
      const cleanSlug =
        typeof data.slug === "string" && data.slug.endsWith("-")
          ? data.slug.slice(0, -1)
          : data.slug;

      routes.push({
        url: `/gallery/${cleanSlug}`,
        lastModified: toIsoString(data.lastModified),
        priority: 0.7,
        changeFreq: "weekly",
      });
    });

    // Fetch news routes
    const newsRef = collection(db, "news");
    const newsSnapshot = await getDocs(newsRef);

    newsSnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      if (!data.slug) return;

      routes.push({
        url: `/news/${data.slug}`,
        lastModified: toIsoString(
          data.lastModified || data.updatedAt || data.createdAt || new Date()
        ),
        priority: 0.8,
        changeFreq: "daily",
      });
    });
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
  }

  return routes;
}

async function generateSitemap(locale: string): Promise<SitemapEntry[]> {
  const dynamicRoutes = await fetchDynamicRoutes();
  // Removed unused 'now' variable

  // Generate static routes with locale
  const staticRoutesWithLocale: SitemapEntry[] = staticRoutes.map((route) => ({
    url: `${baseUrl}/${locale}${route.path ? `/${route.path}` : ""}`,
    lastModified: toIsoString(route.lastModified),
    changeFreq: route.changeFreq,
    priority: route.priority,
  }));

  // Generate dynamic routes with locale
  const dynamicRoutesWithLocale: SitemapEntry[] = dynamicRoutes.map(
    (route) => ({
      ...route,
      url: `${baseUrl}/${locale}${route.url}`,
    })
  );

  return [...staticRoutesWithLocale, ...dynamicRoutesWithLocale];
}

// Generate XML from sitemap entries
function generateSitemapXml(entries: SitemapEntry[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml +=
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

  for (const entry of entries) {
    if (!entry.url) continue;

    xml += "  <url>\n";
    xml += `    <loc>${entry.url}</loc>\n`;

    if (entry.lastModified) {
      xml += `    <lastmod>${entry.lastModified}</lastmod>\n`;
    }

    if (entry.changeFreq) {
      xml += `    <changefreq>${entry.changeFreq}</changefreq>\n`;
    }

    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    }

    xml += "  </url>\n";
  }

  xml += "</urlset>";
  return xml;
}

export async function GET(request: Request, context: any): Promise<Response> {
  const { params } = context;
  try {
    const locale = params.locale;
    const sitemapEntries = await generateSitemap(locale);
    const xml = generateSitemapXml(sitemapEntries);

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
        // Remove noindex directive to allow search engines to index the sitemap
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
