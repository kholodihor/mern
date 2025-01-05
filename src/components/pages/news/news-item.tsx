import { Link } from "@/i18n/routing";
import { INewsArticle } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const NewsItem = ({ item, index }: { item: INewsArticle, index: number }) => {
  const t = useTranslations("News");
  const locale = useLocale();

  return (
    <article
      className="flex flex-col gap-6 sm:gap-8 md:flex-row lg:gap-12"
    >
      <div className="w-full md:w-1/3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
          <Image
            src={item.images[0] || "/images/placeholder-news.jpg"}
            alt={item.title[locale]}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={index === 0}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = "/images/placeholder-news.jpg";
            }}
          />
        </div>
      </div>

      <div className="flex w-full flex-col justify-center space-y-4 md:w-2/3">
        <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl hover:text-gray-200 transition-colors duration-300">
          {item.title[locale]}
        </h3>
        <p className="text-base text-gray-300 sm:text-lg leading-relaxed">
          {item.short_text[locale]}
        </p>
        <Link
          className="mt-2 inline-flex items-center text-lg font-medium text-white transition-all duration-300 hover:text-gray-300 hover:translate-x-1 group"
          href={`/news/${item.id}`}
        >
          {t("read_more")}
          <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  )
}

export default NewsItem
