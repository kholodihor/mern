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
    description: `MERN Serwis | ${baseUrl} Galeria`,
  },
  en: {
    title: "Gallery | MERN Service",
    description: `MERN Serwis | ${baseUrl} Gallery`,
  },
  ua: {
    title: "Галерея | Автосервіс MERN",
    description: `MERN Serwis | ${baseUrl} Галерея`,
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
    alternates: {
      canonical: `${baseUrl}/${locale}/gallery`,
      languages: {
        "en-US": `${baseUrl}/en/gallery`,
        "pl-PL": `${baseUrl}/pl/gallery`,
        "uk-UK": `${baseUrl}/ua/gallery`,
      },
    },
  };
}

const GalleryPage = () => {
  return <DynamicPage />;
};

export default GalleryPage;
