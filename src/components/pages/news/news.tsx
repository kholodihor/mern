import Image from "next/image";
import { news } from './data';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/shared/section-title';

const NewsPage = () => {
  const t = useTranslations("News");
  return (
    <section
      id="news"
      className="flex flex-col w-full min-h-screen pt-[18vh] md:pt-[25vh]"
      aria-labelledby="news-title"
    >
      <SectionTitle id='news-title' title={t("title")} />
      <div
        className="flex flex-col gap-10 mt-[10vh] py-8 px-4 md:px-8 lg:px-24 xl:px-36"
      >
        {news.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 lg:gap-14"
          >
            {/* Responsive Image */}
            <div className="w-full md:w-1/2 flex-shrink-0">
              <Image
                src={item.image}
                alt="Car image"
                width={500}
                height={500}
                className="object-cover w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-4 w-full md:w-1/2 text-center md:text-left">
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                {item.title}
              </h4>
              <p className="text-base md:text-lg lg:text-xl text-gray-500">
                {item.short_text}{' '}
                <Link
                  className="hover:text-white hover:underline"
                  href={`/news/${item.id}`}
                >
                  {t("read_more")}
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NewsPage
