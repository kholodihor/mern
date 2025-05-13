import { Metadata } from "next";
import { baseUrl, contactInfo } from "@/constants";
import { Locale } from "@/i18n/routing";
import { PageMetadata } from "@/types";
import Contacts from "@/components/pages/contacts/contacts";

const metadata: PageMetadata = {
  pl: {
    title: "Kontakty | MERN Serwis",
    description: `MERN Serwis | ${baseUrl} | ${contactInfo} | Nasze Kontakty`,
  },
  en: {
    title: "Contacts | MERN Service",
    description: `MERN Serwis | ${baseUrl} | ${contactInfo} | Our Contacts`,
  },
  ua: {
    title: "Контакти | Автосервіс MERN",
    description: `MERN Serwis | ${baseUrl} | ${contactInfo} | Наші контакти`,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const localeMetadata = metadata[locale] || metadata.pl;
  const canonicalUrl = `${baseUrl}/${locale}/contacts`;

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${baseUrl}/en/contacts`,
        "pl-PL": `${baseUrl}/pl/contacts`,
        "uk-UK": `${baseUrl}/ua/contacts`,
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

const ContactsPage = () => {
  return <Contacts />;
};

export default ContactsPage;
