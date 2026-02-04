import News from "@/components/news/news";
import { baseUrl } from "@/constants";
import type { Locale } from "@/i18n/routing";
import type { PageMetadata } from "@/types";
import type { Metadata } from "next";

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
  // Create a new URL object to avoid duplicate locale segments
  const canonicalUrlObj = new URL(baseUrl);
  canonicalUrlObj.pathname = `/${locale}/news`;
  const canonicalUrl = canonicalUrlObj.toString();

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

const Page = () => {
  return <News />;
};

export default Page;
