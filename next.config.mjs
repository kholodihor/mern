import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    // Optimize JavaScript for modern browsers
    optimizePackageImports: ["react-icons", "clsx", "next-intl", "swiper"],
    // Optimize module loading
    optimizeCss: true,
  },

  // Configure webpack for better JavaScript performance
  webpack: (config, { dev, isServer: _isServer }) => {
    // Add module optimization
    if (!dev && !_isServer) {
      // Split chunks more aggressively for production
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 70000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: "~",
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
  // Remove trailing slashes from all URLs for consistency
  trailingSlash: false,

  // Configure redirects for www, HTTPS, and default locale
  async redirects() {
    // Always apply the root redirect
    const redirects = [
      // Redirect root to default locale (Polish)
      {
        source: "/",
        destination: "/pl",
        permanent: true,
      },
    ];

    // Only add production redirects in production
    if (process.env.NODE_ENV === "production") {
      redirects.push(
        // Redirect www to non-www (HTTPS)
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
        // Redirect HTTP www to HTTPS non-www
        {
          source: "/:path*",
          has: [
            {
              type: "host",
              value: "www.mernserwis.com",
            },
            {
              type: "header",
              key: "x-forwarded-proto",
              value: "http",
            },
          ],
          permanent: true,
          destination: "https://mernserwis.com/:path*",
        },
        // Redirect HTTP to HTTPS for non-www
        {
          source: "/:path*",
          has: [
            {
              type: "host",
              value: "mernserwis.com",
            },
            {
              type: "header",
              key: "x-forwarded-proto",
              value: "http",
            },
          ],
          destination: "https://mernserwis.com/:path*",
          permanent: true,
        },
        // Catch-all for any other HTTP requests
        {
          source: "/:path*",
          has: [
            {
              type: "header",
              key: "x-forwarded-proto",
              value: "http",
            },
          ],
          destination: "https://mernserwis.com/:path*",
          permanent: true,
        }
      );
    }

    return redirects;
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
      {
        protocol: "https",
        hostname: "vsewr2yc7vc2psmw.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // Improve image loading performance
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600, // 1 hour cache for better performance
    dangerouslyAllowSVG: true, // Allow SVG images for better performance
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable static compression
  compress: true,

  // Configure caching behavior
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Improve production builds
  productionBrowserSourceMaps: false,

  // Internationalization middleware handles language-specific redirects

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
          // Headers to optimize for bfcache
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
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
      {
        // Add cache headers for static assets
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
