import { Metadata } from "next";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { PageMetadata } from "@/types";
import ServicesPage from "@/components/pages/services/services";

const metadata: PageMetadata = {
  pl: {
    title: "Usługi | MERN Serwis",
    description:
      "Profesjonalne usługi serwisowe dla pojazdów. Naprawa, konserwacja i diagnostyka samochodowa.",
  },
  en: {
    title: "Services | MERN Service",
    description:
      "Professional vehicle service and maintenance. Car repair, maintenance and diagnostics.",
  },
  ua: {
    title: "Послуги | Автосервіс MERN",
    description:
      "Професійне обслуговування транспортних засобів. Ремонт, технічне обслуговування та діагностика автомобілів.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const localeMetadata = metadata[locale] || metadata.pl;
  // Create a new URL object to avoid duplicate locale segments
  const canonicalUrlObj = new URL(baseUrl);
  canonicalUrlObj.pathname = `/${locale}/services`;
  const canonicalUrl = canonicalUrlObj.toString();

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${baseUrl}/en/services`,
        "pl-PL": `${baseUrl}/pl/services`,
        "uk-UA": `${baseUrl}/ua/services`, // Fixed Ukrainian language code
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: localeMetadata.title,
      description: localeMetadata.description,
      images: [
        {
          url: `${baseUrl}/images/services-og.jpg`, // Add an OG image for better social sharing
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
      images: [`${baseUrl}/images/services-og.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const Services = () => {
  return <ServicesPage />;
};

export default Services;
