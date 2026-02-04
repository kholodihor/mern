// ============================================================================
// Next.js Configuration Constants
// ============================================================================

export const DOMAIN = "mernserwis.com";
export const WWW_DOMAIN = `www.${DOMAIN}`;
export const HTTPS_URL = `https://${DOMAIN}`;
export const DEFAULT_LOCALE = "pl";
export const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Cache durations (in seconds)
export const CACHE = {
  STATIC_ASSETS: 31536000, // 1 year
  SITEMAP: 86400, // 1 day
  SITEMAP_REVALIDATE: 3600, // 1 hour
  IMAGE_MIN_TTL: 3600, // 1 hour
} as const;

// Allowed image hostnames
export const IMAGE_HOSTNAMES = [
  "ucarecdn.com",
  "firebasestorage.googleapis.com",
  "vsewr2yc7vc2psmw.public.blob.vercel-storage.com",
  "res.cloudinary.com",
] as const;

// ============================================================================
// Helper Functions
// ============================================================================

export const createHttpsPattern = (protocol = "https") => ({
  protocol: protocol as "http" | "https",
  port: "",
  pathname: "**",
});

export const createRedirect = (source: string, destination: string, has: any[] = [], permanent = true) => ({
  source,
  destination,
  ...(has.length && { has }),
  permanent,
});

export const hostCondition = (host: string) => ({ type: "host", value: host });

export const httpProtoCondition = () => ({
  type: "header",
  key: "x-forwarded-proto",
  value: "http",
});

export const createHeader = (key: string, value: string) => ({ key, value });

export const createHeaderRule = (source: string, headers: any[]) => ({ source, headers });

// ============================================================================
// SEO Redirects Configuration
// ============================================================================

export const getRedirects = () => {
  const redirects: ReturnType<typeof createRedirect>[] = [];

  if (IS_PRODUCTION) {
    redirects.push(
      // Redirect root to default locale (Polish)
      createRedirect("/", `/${DEFAULT_LOCALE}`, [], true),
      // Redirect www to non-www (HTTPS)
      createRedirect("/:path*", `${HTTPS_URL}/:path*`, [
        hostCondition(WWW_DOMAIN),
      ]),
      // Redirect HTTP www to HTTPS non-www
      createRedirect("/:path*", `${HTTPS_URL}/:path*`, [
        hostCondition(WWW_DOMAIN),
        httpProtoCondition(),
      ]),
      // Redirect HTTP to HTTPS for non-www
      createRedirect("/:path*", `${HTTPS_URL}/:path*`, [
        hostCondition(DOMAIN),
        httpProtoCondition(),
      ]),
      // Catch-all for any other HTTP requests
      createRedirect("/:path*", `${HTTPS_URL}/:path*`, [httpProtoCondition()])
    );
  }

  return redirects;
};

// ============================================================================
// Headers Configuration
// ============================================================================

export const sitemapHeaders = [
  createHeader("Content-Type", "application/xml"),
  createHeader(
    "Cache-Control",
    `public, s-maxage=${CACHE.SITEMAP}, stale-while-revalidate=${CACHE.SITEMAP_REVALIDATE}`
  ),
];

export const getHeaders = () => [
  // Apply these headers to all routes
  createHeaderRule("/:path*", [
    createHeader("X-Robots-Tag", "index, follow"),
    createHeader("Cache-Control", "public, max-age=0, must-revalidate"),
    createHeader("X-Content-Type-Options", "nosniff"),
  ]),
  // Sitemap headers
  createHeaderRule("/sitemap.xml", sitemapHeaders),
  createHeaderRule("/:locale/sitemap.xml", sitemapHeaders),
  // Static assets cache
  createHeaderRule("/_next/static/:path*", [
    createHeader("Cache-Control", `public, max-age=${CACHE.STATIC_ASSETS}, immutable`),
  ]),
];

// ============================================================================
// Webpack Configuration
// ============================================================================

export const configureWebpack = (config: any, { dev, isServer }: { dev: boolean; isServer: boolean }) => {
  if (!dev && !isServer) {
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
};
