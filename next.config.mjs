import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove trailing slashes from all URLs for consistency
  trailingSlash: false,

  // Configure redirects for www and HTTPS
  async redirects() {
    return [
      // Redirect root to default locale (Polish)
      {
        source: "/",
        destination: "/pl",
        permanent: true,
      },
      // Redirect www to non-www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.mernserwis.com",
          },
        ],
        permanent: true,
        destination: "https://mernserwis.com/:path*",
      },
      // Redirect HTTP to HTTPS
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?<host>.*)",
          },
        ],
        missing: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "https",
          },
        ],
        permanent: true,
        destination: "https://mernserwis.com/:path*",
      },
    ];
  },

  // Configure image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },

  // Add redirects for common patterns
  async redirects() {
    return [
      // Redirect root to default locale (Polish)
      {
        source: "/",
        destination: "/pl",
        permanent: true,
      },
      // Let the internationalization middleware handle all other redirects
    ];
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
      {
        // Special headers for sitemap files
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=3600",
          },
        ],
      },
      {
        source: "/:locale/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
