import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageProps } from '@/types';
import { newsData } from '@/components/news/newsData';
import Spiral from '@/components/spiral/Spiral';


const DynamicPage = dynamic(
  () =>
    import(
      '@/components/news/News'
    ),

  { ssr: false, loading: () => <Spiral /> }
);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const baseUrl = "https://mernserwis.pl";
  const cars = newsData.map((car) => car.car)
  const carsString = cars.join(',');

  const metadata = {
    pl: {
      title: 'Nasze Aktualności | MERN Serwis',
      description: `MERN Serwis | ${baseUrl} Nasze Aktualności ${carsString}`,
    },
    en: {
      title: 'Our Last Works | MERN Car Service',
      description: `MERN Serwis | ${baseUrl} Our Last Works ${carsString}`,
    },
    ua: {
      title: 'Наші Останні Роботи | Автосервіс MERN',
      description: `MERN Serwis | ${baseUrl} Наші Останні Роботи ${carsString}`,
    },
  };

  // Fallback to Polish metadata if locale is not recognized
  const localeMetadata = metadata[params.locale] || metadata.pl;

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
  };
}



const NewsPage = () => {
  return <DynamicPage />;
};

export default NewsPage;
