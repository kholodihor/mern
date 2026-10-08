import { SEO_CONFIG } from "@/config/seo-config";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SEO_CONFIG.BASE_URL;

  const robotsTxt = `# Allow all crawlers to access all parts of the site
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and API routes
Disallow: /api/
Disallow: /*/admin
Disallow: /*/login
Allow: /favicon.ico

# Set crawl delay if needed
# Crawl-delay: 10
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
