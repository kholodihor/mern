import { Metadata } from "next";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { PageMetadata } from "@/types";
import About from "@/components/pages/about/about";

const metadata: PageMetadata = {
  pl: {
    title: "O Nas | MERN Serwis",
    description: `MERN Serwis | ${baseUrl} | Informacja o nas`,
  },
  en: {
    title: "About Us | MERN Service",
    description: `MERN Serwis | ${baseUrl} | Information about us`,
  },
  ua: {
    title: "Про нас | Автосервіс MERN",
    description: `MERN Serwis | ${baseUrl} | Інформація про нас`,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const localeMetadata = metadata[locale] || metadata.pl;
  const canonicalUrl = `${baseUrl}/${locale}/about`;

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${baseUrl}/en/about`,
        "pl-PL": `${baseUrl}/pl/about`,
        "uk-UK": `${baseUrl}/ua/about`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: localeMetadata.title,
      description: localeMetadata.description,
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
