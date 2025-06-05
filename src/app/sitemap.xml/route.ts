import { NextResponse } from "next/server";

export async function GET() {
  // Create a sitemap index file that references all locale-specific sitemaps
  const baseUrl = "https://mernserwis.com";
  const locales = ["pl", "en", "ua"];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add entries for each locale sitemap
  locales.forEach((locale) => {
    xml += "  <sitemap>\n";
    xml += `    <loc>${baseUrl}/${locale}/sitemap.xml</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += "  </sitemap>\n";
  });

  xml += "</sitemapindex>";

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
