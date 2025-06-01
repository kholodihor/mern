import { Metadata } from "next";
import dynamic from "next/dynamic";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { PageMetadata } from "@/types";
import Spiral from "@/components/shared/spiral/Spiral";

const DynamicPage = dynamic(
  () => import("@/components/pages/gallery/gallery"),

  { ssr: false, loading: () => <Spiral /> }
);

const metadata: PageMetadata = {
  pl: {
    title: "Galeria | MERN Serwis",
    description: "Przeglądaj nasze prace i projekty serwisowe. Zdjęcia i opisy napraw samochodów wykonanych w naszym warsztacie.",
  },
  en: {
    title: "Gallery | MERN Service",
    description: "Browse our work and service projects. Photos and descriptions of car repairs performed in our workshop.",
  },
  ua: {
    title: "Галерея | Автосервіс MERN",
    description: "Переглядайте наші роботи та сервісні проекти. Фотографії та описи ремонтів автомобілів, виконаних в нашій майстерні.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const localeMetadata = metadata[locale] || metadata.pl;

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/gallery`,
      languages: {
        "en-US": `${baseUrl}/en/gallery`,
        "pl-PL": `${baseUrl}/pl/gallery`,
        "uk-UA": `${baseUrl}/ua/gallery`,
      },
    },
    openGraph: {
      type: "website",
      url: `${baseUrl}/${locale}/gallery`,
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
      locale: locale === 'en' ? 'en_US' : locale === 'pl' ? 'pl_PL' : 'uk_UA',
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
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const GalleryPage = () => {
  return <DynamicPage />;
};

export default GalleryPage;
