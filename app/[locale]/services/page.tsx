import { Metadata } from 'next';
import { PageProps } from '@/types';
import ServicesList from "@/components/ServicesList";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const baseUrl = "https://mernserwis.pl";

  // Define titles and descriptions based on locale
  const metadata = {
    pl: {
      title: 'Usługi | MERN Serwis',
      description: 'MERN Serwis | Nasze Usługi',
    },
    en: {
      title: 'Services | MERN Car Service',
      description: 'MERN Serwis | Our Services',
    },
    ua: {
      title: 'Послуги | Автосервіс MERN',
      description: 'MERN Serwis | Наші послуги',
    },
  };

  // Fallback to Polish if locale is not defined
  const localeMetadata = metadata[params.locale] || metadata.pl;

  return {
    title: localeMetadata.title,
    description: `${localeMetadata.description} | ${baseUrl}`,
  };
}

const ServicesPage = () => {
  return <ServicesList />;
};

export default ServicesPage;
