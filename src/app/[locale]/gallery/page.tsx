import { Metadata } from "next";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { fetchGalleryItems } from "@/lib/server-data-fetchers";
import { PageMetadata } from "@/types";
import GalleryServer from "@/components/pages/gallery/gallery-server";

const metadata: PageMetadata = {
  pl: {
    title: "Galeria | MERN Serwis",
    description:
      "Przeglądaj nasze prace i projekty serwisowe. Zdjęcia i opisy napraw samochodów wykonanych w naszym warsztacie.",
  },
  en: {
    title: "Gallery | MERN Service",
    description:
      "Browse our work and service projects. Photos and descriptions of car repairs performed in our workshop.",
  },
  ua: {
    title: "Галерея | Автосервіс MERN",
    description:
      "Переглядайте наші роботи та сервісні проекти. Фотографії та описи ремонтів автомобілів, виконаних в нашій майстерні.",
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
        en: `${baseUrl}/en/gallery`,
        pl: `${baseUrl}/pl/gallery`,
        uk: `${baseUrl}/ua/gallery`,
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

// Add generateStaticParams to enable static generation for better performance
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }, { locale: 'ua' }];
}

const GalleryPage = async () => {
  // Fetch data server-side for SEO
  const initialData = await fetchGalleryItems();

  return (
    <>
      {/* Add preload links for critical images */}
      {initialData.slice(0, 2).map((item, index) => (
        <link
          key={`preload-${index}`}
          rel="preload"
          href={item.images[0]}
          as="image"
          type="image/webp"
          fetchPriority="high"
          crossOrigin="anonymous"
        />
      ))}
      <GalleryServer initialData={initialData} />
    </>
  );
};

export default GalleryPage;
