import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Locale, routing } from "@/i18n/routing";
import { PageProps } from "@/types";
// Import critical components directly
import ConditionalContactLink from "@/components/shared/conditional-contact-link";
import Header from "@/components/shared/header";
import SubHeader from "@/components/shared/sub-header";
import "../globals.css";

// Dynamically import non-critical components
const BfCacheHandler = dynamic(
  () => import("@/components/shared/bfcache-handler")
);
const ScriptOptimizer = dynamic(
  () => import("@/components/shared/script-optimizer")
);
const GoogleAnalytics = dynamic(
  () => import("@/components/shared/google-analytics")
);
// Use client wrapper for components that need ssr: false
const CookieBannerClient = dynamic(
  () => import("@/components/client-wrappers/cookie-banner-client")
);
const Footer = dynamic(() => import("@/components/shared/footer"));

// Preload critical fonts
export const fontSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-open-sans",
  display: "swap",
  preload: true,
  weight: ["400", "700"],
  fallback: ["system-ui", "arial"],
});

// Font is now defined at the top level for better performance

const baseUrl = new URL("https://mernserwis.com");
const contactInfo =
  "+48 509 158 159 | Przyszłość 2A, 05-126 Stanisławów Pierwszy";

const titles = {
  ua: "Mern Сервіс - Незалежний сервіс BMW | Механік BMW у Варшаві",
  en: "Mern Service - Independent BMW Service | BMW Mechanic in Warsaw",
  pl: "Mern Serwis - Niezależny serwis BMW | Mechanik BMW w Warszawie",
};

const descriptions = {
  pl: `MERN Serwis to najlepszy serwis dla naprawy twojego BMW, Rolls Royce, Mini Cooper`,
  en: `MERN Serwis is the best service for repairing your BMW, Rolls Royce, Mini Cooper`,
  ua: `Автосервіс MERN це найкращий сервіс для ремонту ваших BMW, Rolls Royce, Mini Cooper`,
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const defaultTitle = titles[locale] || titles.pl;
  const defaultDescription = descriptions[locale] || descriptions.pl;

  // Set the canonical URL for the root page - ensure we don't duplicate the locale
  // Create a new URL object to avoid modifying the original baseUrl
  const canonicalUrlObj = new URL(baseUrl);
  canonicalUrlObj.pathname = `/${locale}`;
  const canonicalUrl = canonicalUrlObj.toString();

  // No need for helper functions, we'll use direct string interpolation

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en`,
        pl: `${baseUrl}/pl`,
        uk: `${baseUrl}/ua`,
      },
    },
    title: {
      default: defaultTitle,
      template: `%s | Mern Serwis - Niezależny serwis BMW | Mechanik BMW w Warszawie`,
    },
    description: `${contactInfo} | ${defaultDescription}`,
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : locale === "pl" ? "pl_PL" : "uk_UA",
      url: canonicalUrl,
      title: defaultTitle,
      description: defaultDescription,
      siteName: defaultTitle,
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: "MERN Serwis Samochodowy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: [`${baseUrl}/opengraph-image.png`],
    },
    keywords: [
      "MERN",
      "BMW",
      "Serwis Samochodowy",
      "Автосервіс",
      "Варшава",
      "Rolls Royce",
      "Mini Cooper",
      "Warszawa",
    ],
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={fontSans.variable}>
      <head>
        {/* These tags are now handled by Next.js Metadata API in generateMetadata */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-w-[320px]">
        {/* Performance optimization components */}
        <ScriptOptimizer />
        <BfCacheHandler />

        {/* Defer non-critical components */}
        <Suspense fallback={null}>
          <GoogleAnalytics
            GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""}
          />
        </Suspense>

        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Critical path components */}
          <ConditionalContactLink />
          <SubHeader />
          <Header />
          {children}

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
