import { Metadata } from "next";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { PageMetadata } from "@/types";
import CarPage from "@/components/pages/gallery/car-page";

const metadata: PageMetadata = {
  pl: {
    title: "Galeria | MERN Serwis",
    description: `MERN Serwis | ${baseUrl} Galeria `,
  },
  en: {
    title: "Gallery | MERN Service",
    description: `MERN Serwis | ${baseUrl} Gallery `,
  },
  ua: {
    title: "Галерея | Автосервіс MERN",
    description: `MERN Serwis | ${baseUrl} Галерея `,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const localeMetadata = metadata[locale] || metadata.pl;

  return {
    title: `${localeMetadata.title} | ${slug}`,
    description: `${localeMetadata.description} | ${slug}`,
    alternates: {
      canonical: `${baseUrl}/${locale}/gallery/${slug}`,
      languages: {
        "en-US": `${baseUrl}/en/gallery/${slug}`,
        "pl-PL": `${baseUrl}/pl/gallery/${slug}`,
        "uk-UK": `${baseUrl}/ua/gallery/${slug}`,
      },
    },
  };
}

const Car = ({ params }: { params: { slug: string } }) => {
  return <CarPage slug={params.slug} />;
};

export default Car;
