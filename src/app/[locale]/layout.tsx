import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Locale, routing } from "@/i18n/routing";
import { PageProps } from "@/types";
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = new URL("https://mernserwis.com");
  const contactInfo =
    "+48 509 158 159 | Przyszłość 2A, 05-126 Stanisławów Pierwszy";

  const titles = {
    ua: "Автосервіс MERN",
    en: "MERN Service",
    pl: "MERN Serwis",
  };

  const descriptions = {
    pl: `MERN Serwis to najlepszy serwis dla naprawy twojego BMW, Rolls Royce, Mini Cooper`,
    en: `MERN Serwis is the best service for repairing your BMW, Rolls Royce, Mini Cooper`,
    ua: `Автосервіс MERN це найкращий сервіс для ремонту ваших BMW, Rolls Royce, Mini Cooper`,
  };

  const defaultTitle = titles[locale] || titles.pl;
  const defaultDescription = descriptions[locale] || descriptions.pl;

  return {
    metadataBase: baseUrl,
    alternates: {
      canonical: `${baseUrl}/pl`,
      languages: {
        "en-US": `${baseUrl}/en`,
        "pl-PL": `${baseUrl}/pl`,
        "uk-UK": `${baseUrl}/ua`,
      },
    },
    title: {
      default: defaultTitle,
      template: `%s | MERN Serwis`,
    },
    description: `${baseUrl} | ${contactInfo} | ${defaultDescription}`,
    openGraph: {
      type: "website",
      locale: locale,
      url: baseUrl.toString(),
      title: defaultTitle,
      description: defaultDescription,
      siteName: "MERN Serwis",
      images: [
        {
          url: "/opengraph-image.png",
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
      images: ["/opengraph-image.png"],
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
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta
          name="description"
          content="MERN Serwis is the best service for repairing your BMW, Rolls Royce, Mini Cooper"
        />

        <meta property="og:url" content="https://mernserwis.com/en" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MERN Service" />
        <meta
          property="og:description"
          content="MERN Serwis is the best service for repairing your BMW, Rolls Royce, Mini Cooper"
        />
        <meta
          property="og:image"
          content="https://mernserwis.com/opengraph-image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mernserwis.com" />
        <meta property="twitter:url" content="https://mernserwis.com/en" />
        <meta name="twitter:title" content="MERN Service" />
        <meta
          name="twitter:description"
          content="MERN Serwis is the best service for repairing your BMW, Rolls Royce, Mini Cooper"
        />
        <meta
          name="twitter:image"
          content="https://mernserwis.com/opengraph-image.png"
        />
      </head>
      <body className={`min-w-[320px] ${open_sans.variable}`}>
        <GoogleAnalytics
          GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
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
