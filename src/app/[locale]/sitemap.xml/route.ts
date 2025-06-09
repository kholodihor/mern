import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
      // Clean up slug - ensure it doesn't end with a dash
      const cleanSlug =
        data.slug && typeof data.slug === "string" && data.slug.endsWith("-")
          ? data.slug.slice(0, -1)
          : data.slug;

      return {
        path: `gallery/${cleanSlug}`,
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

async function generateSitemap(locale: string) {
  const dynamicRoutes = await fetchDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];
  const sitemapEntries = [];

  // Generate entries for this specific locale
  for (const route of allRoutes) {
    const url = `${baseUrl}/${locale}${route.path ? "/" + route.path : ""}`;

    // Common alternates configuration
    const alternates = {
      languages: {
        pl: `${baseUrl}/pl${route.path ? "/" + route.path : ""}`,
        en: `${baseUrl}/en${route.path ? "/" + route.path : ""}`,
        uk: `${baseUrl}/ua${route.path ? "/" + route.path : ""}`,
        "x-default": `${baseUrl}/pl${route.path ? "/" + route.path : ""}`,
      },
    };

    sitemapEntries.push({
      url,
      lastModified: route.lastModified,
      changeFrequency: "weekly",
      priority: route.path === "" ? 1 : 0.8,
      alternates,
    });
  }

  return sitemapEntries;
}

// Generate XML from sitemap entries
function generateSitemapXml(entries: any[]) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
  xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  entries.forEach((entry) => {
    xml += "  <url>\n";
    xml += `    <loc>${entry.url}</loc>\n`;
    xml += `    <lastmod>${entry.lastModified.toISOString()}</lastmod>\n`;
    xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;

    // Add language alternates
    if (entry.alternates && entry.alternates.languages) {
      Object.entries(entry.alternates.languages).forEach(([lang, url]) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />\n`;
      });
    }

    xml += "  </url>\n";
  });

  xml += "</urlset>";
  return xml;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
): Promise<Response> {
  const { locale } = await params;

  // Only generate sitemaps for valid locales
  if (!["pl", "en", "ua"].includes(locale)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const sitemapEntries = await generateSitemap(locale);
  const xml = generateSitemapXml(sitemapEntries);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
