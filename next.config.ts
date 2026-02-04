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
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    qualities: [75, 85, 90],
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
