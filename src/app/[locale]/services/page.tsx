import { Metadata } from 'next';
import { PageMetadata } from '@/types';
import { Locale } from '@/i18n/routing';
import { baseUrl } from '@/constants';
import ServicesPage from '@/components/pages/services/services';
// import ServicesList from "@/components/ServicesList";

const metadata: PageMetadata = {
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;

  const localeMetadata = metadata[locale] || metadata.pl;

  return {
    title: localeMetadata.title,
    description: `${localeMetadata.description} | ${baseUrl}`,
  };
}

const Services = () => {
  return <ServicesPage />
};

export default Services;
