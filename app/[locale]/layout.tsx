import type { Metadata } from "next";
import Script from "next/script";
import { PageProps } from "@/types";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { SWRProvider } from "../swr-provider";
import { getServerSession } from "next-auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import SessionWrapper from "../session-provider";
import SubHeader from "@/components/SubHeader";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "pl" }, { locale: "en" }, { locale: "ua" }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

  const defaultTitle = titles[params.locale] || titles.pl;
  const defaultDescription = descriptions[params.locale] || descriptions.pl;

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
    keywords: ["MERN", "BMW", "Serwis Samochodowy", "Автосервіс", "Варшава", "Rolls Royce", "Mini Cooper", "Warszawa"],
  };
}

const locales = ["pl", "en", "ua"];

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  const session = await getServerSession();
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
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
      <SessionWrapper session={session}>
        <SWRProvider>
          <body className="min-w-[320px]">
            <GoogleAnalytics
              GA_MEASUREMENT_ID={`G-MJ7BYHRN8T`}
            />
            <NextIntlClientProvider locale={locale} messages={messages}>
              <SubHeader />
              <Header />
              {children}
              <CookieBanner />
              <Footer />
            </NextIntlClientProvider>
          </body>
        </SWRProvider>
      </SessionWrapper>
    </html>
  );
}
