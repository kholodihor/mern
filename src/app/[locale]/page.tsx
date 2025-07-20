import { Metadata } from "next";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import Hero from "@/components/pages/home/hero/hero";
import Location from "@/components/pages/home/location/location";
import Reviews from "@/components/pages/home/reviews/reviews";
import Services from "@/components/pages/home/services/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Use baseUrl without adding locale again since it will be added by the layout
  const canonicalUrl = baseUrl;

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en`,
        pl: `${baseUrl}/pl`,
        uk: `${baseUrl}/ua`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      locale: locale === "en" ? "en_US" : locale === "pl" ? "pl_PL" : "uk_UA",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
