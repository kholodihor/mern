import { Metadata } from 'next';
import { PageProps } from '@/types';
import ApplicationForm from "@/components/ApplicationForm";
import Location from "@/components/Location";


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const baseUrl = "https://mernserwis.pl";
  const contactInfo = "+48 509 158 159 | Przyszłość 2A, 05-126 Stanisławów Pierwszy";

  const metadata = {
    pl: {
      title: 'Kontakty | MERN Serwis',
      description: `MERN Serwis | ${baseUrl} | ${contactInfo} Nasze Kontakty`,
    },
    en: {
      title: 'Contacts | MERN Car Service',
      description: `MERN Serwis | ${baseUrl} | ${contactInfo} Our Contacts`,
    },
    ua: {
      title: 'Контакти',
      description: `MERN Serwis | ${baseUrl} | ${contactInfo} Наші контакти`,
    },
  };

  // Fallback to Polish metadata if locale is not recognized
  const localeMetadata = metadata[params.locale] || metadata.pl;

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
  };
}



const ContactsPage = () => {
  return (
    <>
      <ApplicationForm />
      <Location />
    </>
  );
};

export default ContactsPage;
