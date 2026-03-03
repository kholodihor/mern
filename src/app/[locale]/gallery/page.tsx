import type { Metadata } from "next";
import Gallery from "@/components/gallery/gallery";
import { baseUrl } from "@/constants";
import type { Locale } from "@/i18n/routing";
import { fetchGalleryItems } from "@/lib/server-data-fetchers";
import type { PageMetadata } from "@/types";

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
      canonical: new URL(`/${locale}/gallery`, baseUrl).toString(),
      languages: {
        en: `${baseUrl}/en/gallery`,
        pl: `${baseUrl}/pl/gallery`,
        uk: `${baseUrl}/ua/gallery`,
      },
    },
    openGraph: {
      type: "website",
      url: new URL(`/${locale}/gallery`, baseUrl).toString(),
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
  return [{ locale: "en" }, { locale: "pl" }, { locale: "ua" }];
}

const GalleryPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;

  // Server-side fetch for SEO: render crawlable links for Googlebot
  let galleryItems: Awaited<ReturnType<typeof fetchGalleryItems>> = [];
  try {
    galleryItems = await fetchGalleryItems();
  } catch (error) {
    console.error("Failed to fetch gallery items for SSR:", error);
  }

  return (
    <>
      <Gallery />
      {/* Server-rendered crawlable links for SEO — hidden visually but discoverable by search engines */}
      <nav aria-label="Gallery items" className="sr-only">
        <ul>
          {galleryItems.map((item) => (
            <li key={item.id}>
              <a href={`/${locale}/gallery/${item.slug}`}>
                {item.car} — {item.desc?.[locale] || item.car}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default GalleryPage;
