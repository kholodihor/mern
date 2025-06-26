import { NextResponse } from "next/server";

export async function GET() {
  const robotsTxt = `# Allow all crawlers to access all parts of the site
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://mernserwis.com/sitemap.xml

# Disallow admin and API routes
Disallow: /admin/
Disallow: /api/
Disallow: /*?*

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
