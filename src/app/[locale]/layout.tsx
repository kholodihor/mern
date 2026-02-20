import ConditionalContactLink from "@/components/shared/conditional-contact-link";
import Header from "@/components/shared/header";
import SubHeader from "@/components/shared/sub-header";
import {
  DESCRIPTIONS,
  KEYWORDS,
  OG_LOCALES,
  ROBOTS_CONFIG,
  SEO_CONFIG,
  TITLES,
} from "@/config/seo-config";
import { routing } from "@/i18n/routing";
import type { PageProps } from "@/types";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import dynamic from "next/dynamic";
import { Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import "../globals.css";

// ============================================================================
// Dynamic Imports (non-critical components)
// ============================================================================

const BfCacheHandler = dynamic(
  () => import("@/components/shared/bfcache-handler"),
);
const ScriptOptimizer = dynamic(
  () => import("@/components/shared/script-optimizer"),
);
const GoogleAnalytics = dynamic(
  () => import("@/components/shared/google-analytics"),
);
const CookieBannerClient = dynamic(
  () => import("@/components/client-wrappers/cookie-banner-client"),
);
const Footer = dynamic(() => import("@/components/shared/footer"));

// ============================================================================
// Font Configuration
// ============================================================================

export const fontSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-open-sans",
  display: "swap",
  preload: true,
  weight: ["400", "700"],
  fallback: ["system-ui", "arial"],
});

// ============================================================================
// Helper Functions
// ============================================================================

const getLocalizedValue = <T,>(
  map: Record<string, T>,
  locale: string,
  fallback: string = SEO_CONFIG.DEFAULT_LOCALE,
): T => map[locale] || map[fallback];

const buildCanonicalUrl = (locale: string): string =>
  `${SEO_CONFIG.BASE_URL}/${locale}`;

// ============================================================================
// Metadata Generation
// ============================================================================

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title = getLocalizedValue(TITLES, locale);
  const description = getLocalizedValue(DESCRIPTIONS, locale);
  const canonicalUrl = buildCanonicalUrl(locale);
  const ogImageUrl = `${SEO_CONFIG.BASE_URL}${SEO_CONFIG.OG_IMAGE_PATH}`;

  return {
    metadataBase: new URL(SEO_CONFIG.BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SEO_CONFIG.BASE_URL}/en`,
        pl: `${SEO_CONFIG.BASE_URL}/pl`,
        uk: `${SEO_CONFIG.BASE_URL}/ua`,
      },
    },
    robots: ROBOTS_CONFIG,
    title: {
      default: title,
      template: `%s | ${TITLES[SEO_CONFIG.DEFAULT_LOCALE]}`,
    },
    description: `${SEO_CONFIG.CONTACT_INFO} | ${description}`,
    openGraph: {
      type: "website",
      locale: getLocalizedValue(OG_LOCALES, locale),
      url: canonicalUrl,
      title,
      description,
      siteName: title,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "MERN Serwis Samochodowy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    keywords: KEYWORDS,
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} className={fontSans.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body className="min-w-[320px] bg-background text-foreground">
        {/* Performance optimization components */}
        <ScriptOptimizer />
        <BfCacheHandler />

        {/* Defer non-critical components */}
        <Suspense fallback={null}>
          <GoogleAnalytics
            GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""}
          />
        </Suspense>

        <NextIntlClientProvider>
          {/* Critical path components */}
          <ConditionalContactLink />
          <SubHeader />
          <Header />
          {children}
          <SpeedInsights />
          {/* Non-critical components */}
          <Suspense fallback={null}>
            <CookieBannerClient />
          </Suspense>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
