import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import {
  CACHE,
  configureWebpack,
  createHttpsPattern,
  getHeaders,
  getRedirects,
  IMAGE_HOSTNAMES,
} from "@/constants/next-config";

const withNextIntl = createNextIntlPlugin();

// ============================================================================
// Next.js Configuration
// ============================================================================

const nextConfig: NextConfig = {
  devIndicators: false,

  // Pin the project root. Without it Next.js walks up to the first lockfile it
  // finds (e.g. a stray ~/package-lock.json) and Turbopack then scans and
  // watches that whole directory in dev.
  turbopack: {
    root: path.join(__dirname),
  },
  outputFileTracingRoot: path.join(__dirname),

  experimental: {
    optimizePackageImports: ["react-icons", "clsx", "next-intl", "swiper"],
  },

  webpack: configureWebpack,

  trailingSlash: false,

  async redirects() {
    return getRedirects();
  },

  images: {
    remotePatterns: IMAGE_HOSTNAMES.map((hostname) => ({
      ...createHttpsPattern(),
      hostname,
    })),
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: CACHE.IMAGE_MIN_TTL,
    qualities: [70, 75],
  },

  compress: true,

  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  productionBrowserSourceMaps: false,

  async headers() {
    return getHeaders();
  },
};

export default withNextIntl(nextConfig);
