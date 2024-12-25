import About from "@/components/pages/about/about";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { PageMetadata } from "@/types";
import { Metadata } from "next";

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

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
  };
}

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
