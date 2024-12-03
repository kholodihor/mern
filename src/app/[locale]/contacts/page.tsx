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
    title: "Contacts | MERN Car Service",
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

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
  };
}

const ContactsPage = () => {
  return <Contacts />;
};

export default ContactsPage;
