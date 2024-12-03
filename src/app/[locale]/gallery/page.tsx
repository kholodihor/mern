import Spiral from "@/components/shared/spiral/Spiral";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { PageMetadata } from "@/types";
import { Metadata } from "next";
import dynamic from "next/dynamic";

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
    title: "Gallery | MERN Car Service",
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
  };
}

const GalleryPage = () => {
  return <DynamicPage />;
};

export default GalleryPage;
