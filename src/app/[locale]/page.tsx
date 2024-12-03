import type { Metadata } from "next";
import { Locale } from "@/i18n/routing";
import { PageMetadata } from "@/types";
import Hero from "@/components/pages/home/hero/hero";
import Location from "@/components/pages/home/location/location";
import Reviews from "@/components/pages/home/reviews/reviews";
import Services from "@/components/pages/home/services/services";

const metadata: PageMetadata = {
  ua: {
    title: "Автосервіс MERN",
    description:
      "MERN Service - найкращий сервіс для ремонту Ваших BMW, Rolls Royce, Mini Cooper",
  },
  en: {
    title: "MERN Car Service",
    description:
      "MERN Serwis is the best service for repairing your BMW, Rolls Royce, Mini Cooper",
  },
  pl: {
    title: "MERN Serwis Samochodowy",
    description:
      "MERN Serwis to najlepszy serwis dla naprawy twojego BMW ,Rolls Royce, Mini Cooper",
  },
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const localeMetadata = metadata[locale] || metadata.pl;
  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
  };
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Reviews />
      <Location />
    </>
  );
}
