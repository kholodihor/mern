import { Metadata } from 'next';
import { PageProps } from '@/types';
import About from "@/components/About";


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `${params.locale === 'pl' ? 'O Nas | MERN Serwis ': params.locale === 'en' ? 'About Us | MERN Car Service ' : 'Про нас | Автосервіс MERN'} '} `,
    description: `MERN Serwis | https://mernserwis.pl ${params.locale === 'pl' ? 'Informacja o nas' : params.locale === 'en' ? 'Information about us' : 'Інформація про нас'} `,
  };
}

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
