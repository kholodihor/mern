import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 86400; // 24 hours in seconds

export async function GET() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://mernserwis.com";
    // Reorder locales to prioritize Polish (pl) as the main language
    const locales = ["pl", "en", "ua"];
    const now = new Date().toISOString();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml +=
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add entries for each locale sitemap, with Polish first as the main language
    for (const locale of locales) {
      const sitemapUrl = `${baseUrl}/${locale}/sitemap.xml`;

      // In a real app, you might want to fetch the last modified date of each sitemap
      // For now, we'll use the current time
      const lastMod = now;

      xml += "  <sitemap>\n";
      xml += `    <loc>${sitemapUrl}</loc>\n`;
      xml += `    <lastmod>${lastMod}</lastmod>\n`;
      xml += "  </sitemap>\n";
    }

    xml += "</sitemapindex>";

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
        "X-Robots-Tag": "index, follow",
        // Ensure proper encoding and indexing
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
