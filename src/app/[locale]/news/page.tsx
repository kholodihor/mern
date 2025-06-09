import { Metadata } from "next";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { fetchNewsArticles } from "@/lib/server-data-fetchers";
import { PageMetadata } from "@/types";
import NewsServer from "@/components/pages/news/news-server";

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
        en: `${baseUrl}/en/news`,
        pl: `${baseUrl}/pl/news`,
        uk: `${baseUrl}/ua/news`,
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

const Page = async () => {
  // Fetch data server-side for SEO
  const initialData = await fetchNewsArticles();

  return <NewsServer initialData={initialData} />;
};

export default Page;
