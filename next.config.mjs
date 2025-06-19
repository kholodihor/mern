import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove trailing slashes from all URLs for consistency
  trailingSlash: false,
  
  // Configure image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  
  // Add redirects for common patterns
  async redirects() {
    return [
      // Redirect root to default locale (Polish)
      {
        source: '/',
        destination: '/pl',
        permanent: true,
      },
      // Ensure consistent trailing slashes for all other paths
      // Exclude paths that are handled by the internationalization middleware
      {
        source: '/:locale((?!_next|api|favicon.ico).*)/',
        has: [
          {
            type: 'header',
            key: 'x-middleware-rewrite',
            value: '(?!.*)',
          }
        ],
        destination: '/:locale',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
      {
        // Special headers for sitemap files
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/:locale/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=3600',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
