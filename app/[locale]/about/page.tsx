import { Metadata } from 'next';
import { PageProps } from '@/types';
import About from "@/components/About";


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const baseUrl = "https://mernserwis.pl";

  const metadata = {
    pl: {
      title: 'O Nas | MERN Serwis',
      description: `MERN Serwis | ${baseUrl} Informacja o nas`,
    },
    en: {
      title: 'About Us | MERN Car Service',
      description: `MERN Serwis | ${baseUrl} Information about us`,
    },
    ua: {
      title: 'Про нас | Автосервіс MERN',
      description: `MERN Serwis | ${baseUrl} Інформація про нас`,
    },
  };

  const localeMetadata = metadata[params.locale] || metadata.pl;

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
  };
}


const AboutPage = () => {
  return <About />;
};

export default AboutPage;
