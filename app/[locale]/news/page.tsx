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

const cars = newsData.map((car)=>car.car)

const carsString = cars.join(',');


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `${params.locale === 'pl' ? 'Nasze Aktualnosci | MERN Serwis' : params.locale === 'en' ? 'Our Last Works | MERN Car Service' : 'Наші Останні Роботи | Автосервіс MERN'} `,
    description: `MERN Serwis | https://mernserwis.pl ${params.locale === 'pl' ? `Nasze Aktualności ${carsString}` : params.locale === 'en' ? `Our last Works ${carsString}` : `Наші останні Роботи ${carsString}`} `,
  };
}


const NewsPage = () => {
  return <DynamicPage/>;
};

export default NewsPage;
