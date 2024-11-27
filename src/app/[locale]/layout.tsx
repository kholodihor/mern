import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import Script from "next/script";
import { PageProps } from "@/types";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Locale, routing } from '@/i18n/routing';
// import { SWRProvider } from "../swr-provider";
// import { getServerSession } from "next-auth";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
// import GoogleAnalytics from "@/components/GoogleAnalytics";
// import CookieBanner from "@/components/CookieBanner";
// import SessionWrapper from "../session-provider";
import SubHeader from "@/components/shared/sub-header";
import "../globals.css";

const open_sans = Open_Sans({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-open-sans',
  display: 'swap'
});


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = new URL("https://mernserwis.pl");
  const contactInfo = "+48 509 158 159 | Przyszłość 2A, 05-126 Stanisławów Pierwszy";

  const titles = {
    ua: 'Автосервіс MERN',
    en: 'MERN Car Service',
    pl: 'MERN Serwis Samochodowy',
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
    title: {
      default: defaultTitle,
      template: `%s | MERN Serwis Samochodowy`,
    },
    description: `${baseUrl} | ${contactInfo} | ${defaultDescription}`,
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "pl-PL": "/pl",
        "uk-UK": "/ua",
      },
    },
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      images: ["/og-image.png"],
    },
    keywords: ["MERN", "BMW", "Serwis Samochodowy",
      "Автосервіс", "Варшава", "Rolls Royce",
      "Mini Cooper", "Warszawa"
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
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=AW-11012610070`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-11012610070');
        `}
        </Script>
      </head>
      <body className={`min-w-[320px] ${open_sans.variable}`}>
        {/* <GoogleAnalytics
          GA_MEASUREMENT_ID={`G-MJ7BYHRN8T`}
        /> */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SubHeader />
          <Header />
          {children}
          {/* <CookieBanner /> */}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
