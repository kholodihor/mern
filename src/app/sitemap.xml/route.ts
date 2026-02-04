import { NextResponse } from "next/server";
import { SEO_CONFIG, SITEMAP_CONFIG } from "@/config/seo-config";

export const dynamic = "force-dynamic";
export const revalidate = SITEMAP_CONFIG.REVALIDATE_TIME;

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SEO_CONFIG.BASE_URL;
    const now = new Date().toISOString();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml +=
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add entries for each locale sitemap, with Polish first as the main language
    for (const locale of SITEMAP_CONFIG.LOCALES) {
      const sitemapUrl = `${baseUrl}/${locale}/sitemap.xml`;
      const lastMod = now;

      xml += "<sitemap>\n";
      xml += `<loc>${sitemapUrl}</loc>\n`;
      xml += `<lastmod>${lastMod}</lastmod>\n`;
      xml += "</sitemap>\n";
    }

    xml += "</sitemapindex>";

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": SITEMAP_CONFIG.CACHE_CONTROL,
        "X-Robots-Tag": "index, follow",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
