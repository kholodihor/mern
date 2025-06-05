import { Metadata } from "next";
import dynamic from "next/dynamic";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { PageMetadata } from "@/types";
import Spiral from "@/components/shared/spiral/Spiral";

const DynamicPage = dynamic(
  () => import("@/components/pages/news/news"),

  { ssr: false, loading: () => <Spiral /> }
);

const metadata: PageMetadata = {
  pl: {
    title: "Aktualności | MERN Serwis",
    description:
      "Najnowsze informacje i aktualności z naszego serwisu samochodowego. Sprawdź co nowego w MERN Serwis.",
  },
  en: {
    title: "News | MERN Service",
    description:
      "Latest information and news from our car service. Check what's new at MERN Service.",
  },
  ua: {
    title: "Новини | Автосервіс MERN",
    description:
      "Найновіша інформація та новини з нашого автосервісу. Перевірте, що нового в Автосервісі MERN.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const localeMetadata = metadata[locale] || metadata.pl;
  const canonicalUrl = `${baseUrl}/${locale}/news`;

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${baseUrl}/en/news`,
        "pl-PL": `${baseUrl}/pl/news`,
        "uk-UA": `${baseUrl}/ua/news`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: localeMetadata.title,
      description: localeMetadata.description,
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: localeMetadata.title,
        },
      ],
      locale: locale === "en" ? "en_US" : locale === "pl" ? "pl_PL" : "uk_UA",
      siteName: "MERN Serwis",
    },
    twitter: {
      card: "summary_large_image",
      title: localeMetadata.title,
      description: localeMetadata.description,
      images: [`${baseUrl}/opengraph-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const Page = () => {
  return <DynamicPage />;
};

export default Page;
