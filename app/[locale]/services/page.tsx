import { Metadata } from 'next';
import { PageProps } from '@/types';
import ServicesList from "@/components/ServicesList";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `${params.locale === 'pl' ? 'Usługi | MERN Serwis ': params.locale === 'en' ? 'Services | MERN Car Service ' : 'Послуги | Автосервіс MERN'} `,
    description: `MERN Serwis | https://mernserwis.pl ${params.locale === 'pl' ? 'Nasze Usługi' : params.locale === 'en' ? 'Our Services' : 'Наші послуги'} `,
  };
}

const ServicesPage = () => {
  return <ServicesList />;
};

export default ServicesPage;
