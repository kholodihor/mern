import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Locale, routing } from "@/i18n/routing";
import { PageProps } from "@/types";
import ConditionalContactLink from "@/components/shared/conditional-contact-link";
import CookieBanner from "@/components/shared/cookie-banner";
import Footer from "@/components/shared/footer";
import GoogleAnalytics from "@/components/shared/google-analytics";
import Header from "@/components/shared/header";
import SubHeader from "@/components/shared/sub-header";
import "../globals.css";

const open_sans = Open_Sans({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-open-sans",
  display: "swap",
});

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

  // Set the canonical URL for the root page
  const canonicalUrl = `${baseUrl}/${locale}`;

  // No need for helper functions, we'll use direct string interpolation

  return {
    metadataBase: baseUrl,
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
    <html lang={locale}>
      <head>
        {/* Add canonical URL tag */}
        <link rel="canonical" href={`${baseUrl}/${locale}`} />

        {/* Add hreflang tags for all supported languages */}
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
        <link rel="alternate" hrefLang="pl" href={`${baseUrl}/pl`} />
        <link rel="alternate" hrefLang="uk" href={`${baseUrl}/ua`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/pl`} />

        <meta
          name="description"
          content={
            descriptions[locale as keyof typeof descriptions] || descriptions.pl
          }
        />

        <meta property="og:url" content={`${baseUrl}/${locale}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={titles[locale as keyof typeof titles] || titles.pl}
        />
        <meta
          property="og:description"
          content={
            descriptions[locale as keyof typeof descriptions] || descriptions.pl
          }
        />
        <meta property="og:image" content={`${baseUrl}/opengraph-image.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mernserwis.com" />
        <meta property="twitter:url" content={`${baseUrl}/${locale}`} />
        <meta
          name="twitter:title"
          content={titles[locale as keyof typeof titles] || titles.pl}
        />
        <meta
          name="twitter:description"
          content={
            descriptions[locale as keyof typeof descriptions] || descriptions.pl
          }
        />
        <meta name="twitter:image" content={`${baseUrl}/opengraph-image.png`} />
      </head>
      <body className={`min-w-[320px] ${open_sans.variable}`}>
        <GoogleAnalytics
          GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ConditionalContactLink />
          <SubHeader />
          <Header />
          {children}
          <CookieBanner />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
