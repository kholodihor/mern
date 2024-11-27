// import { Metadata } from 'next';
// import dynamic from 'next/dynamic';
// import { INewsItem, PageMetadata } from '@/types';
// import { newsData } from '@/constants/news';
// import { Locale } from '@/i18n/routing';
// import { baseUrl } from '@/constants';
import NewsPage from '@/components/pages/news/news';
// import Spiral from '@/components/spiral/Spiral';


// const DynamicPage = dynamic(
//   () =>
//     import(
//       '@/components/news/News'
//     ),

//   { ssr: false, loading: () => <Spiral /> }
// );

// const cars = newsData.map((car: INewsItem) => car.car)
// const carsString = cars.join(',');

// const metadata: PageMetadata = {
//   pl: {
//     title: 'Nasze Aktualności | MERN Serwis',
//     description: `MERN Serwis | ${baseUrl} Nasze Aktualności ${carsString}`,
//   },
//   en: {
//     title: 'Our Last Works | MERN Car Service',
//     description: `MERN Serwis | ${baseUrl} Our Last Works ${carsString}`,
//   },
//   ua: {
//     title: 'Наші Останні Роботи | Автосервіс MERN',
//     description: `MERN Serwis | ${baseUrl} Наші Останні Роботи ${carsString}`,
//   },
// };

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: Locale }>
// }): Promise<Metadata> {
//   const { locale } = await params;

//   const localeMetadata = metadata[locale] || metadata.pl;

//   return {
//     title: localeMetadata.title,
//     description: localeMetadata.description,
//   };
// }



const Page = () => {
  return <NewsPage />
};

export default Page;
