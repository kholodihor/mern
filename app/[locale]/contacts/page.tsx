import { Metadata } from 'next';
import { PageProps } from '@/types';
import ApplicationForm from "@/components/ApplicationForm";
import Location from "@/components/Location";


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `${params.locale === 'pl' ? 'Kontakty | MERN Serwis' : params.locale === 'en' ? 'Contacts | MERN Car Service' : 'Контакти'} `,
    description: `MERN Serwis | https://mernserwis.pl | +48 509 158 159 | Przyszłość 2A, 05-126 Stanisławów Pierwszy ${params.locale === 'pl' ? 'Nasze Kontakty' : params.locale === 'en' ? 'Our Contacts' : 'Наші контакти'} `,
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
