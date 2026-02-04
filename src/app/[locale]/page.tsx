import type { Metadata } from "next";
import Hero from "@/components/home/hero/hero";
import Location from "@/components/home/location/location";
import Reviews from "@/components/home/reviews/reviews";
import Services from "@/components/home/services/services";
import {
  DESCRIPTIONS,
  OG_LOCALES,
  ROBOTS_CONFIG,
  SEO_CONFIG,
  TITLES,
} from "@/config/seo-config";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `${SEO_CONFIG.BASE_URL}/${locale}`;
  const title = TITLES[locale] || TITLES.pl;
  const description = DESCRIPTIONS[locale] || DESCRIPTIONS.pl;

  return {
    title,
    description: `${SEO_CONFIG.CONTACT_INFO} | ${description}`,
    metadataBase: new URL(SEO_CONFIG.BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SEO_CONFIG.BASE_URL}/en`,
        pl: `${SEO_CONFIG.BASE_URL}/pl`,
        uk: `${SEO_CONFIG.BASE_URL}/ua`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: title,
      images: [
        {
          url: `${SEO_CONFIG.BASE_URL}${SEO_CONFIG.OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: OG_LOCALES[locale] || OG_LOCALES.pl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SEO_CONFIG.BASE_URL}${SEO_CONFIG.OG_IMAGE_PATH}`],
    },
    robots: ROBOTS_CONFIG,
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
