import type { Metadata } from "next";
import { AOSInit } from "../aos";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { SWRProvider } from "../swr-provider";
import { getServerSession } from "next-auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import SessionWrapper from "../session-provider";
import "../globals.css";
import SubHeader from "@/components/SubHeader";

export function generateStaticParams() {
  return [{ locale: "pl" }, { locale: "en" }, { locale: "ua" }];
}

export const metadata: Metadata = {
  metadataBase: new URL("https://mernserwis.pl"),
  title: {
    default: "MERN Serwis Samochodowy",
    template: `%s | MERN Serwis Samochodowy `,
  },
  description:
    "MERN Serwis to najlepszy serwis dla naprawy twojego BMW ,Rolls Royce, Mini Cooper",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "pl-PL": "/pl",
      "uk-UK": "/ua",
    },
  },
  openGraph: {
    images: "/og-image.png",
  },
  keywords: ["MERN", "BMW", "Serwis", "Rolls Royce", "Mini Cooper", "Warszawa"],
};

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
      <SessionWrapper session={session}>
        <SWRProvider>
          <body className="min-w-[320px]">
            <AOSInit />
            <GoogleAnalytics
              GA_MEASUREMENT_ID={process.env.GA_MEASUREMENT_ID!}
            />
            <div>
              <NextIntlClientProvider locale={locale} messages={messages}>
                <SubHeader />
                <Header />
                {children}
                <CookieBanner />
                <Footer />
              </NextIntlClientProvider>
            </div>
          </body>
        </SWRProvider>
      </SessionWrapper>
    </html>
  );
}
