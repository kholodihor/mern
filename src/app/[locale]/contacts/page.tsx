import type { Metadata } from "next";
import Contacts from "@/components/contacts/contacts";
import { createPageMetadata } from "@/config/seo-config";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata("contacts", locale, "contacts");
}

const ContactsPage = () => {
  return <Contacts />;
};

export default ContactsPage;
