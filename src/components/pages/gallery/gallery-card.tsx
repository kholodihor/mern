import { CATEGORIES } from "@/constants/categories";
import { formatDate } from "@/helpers/formatDate";
import { Link } from "@/i18n/routing";
import { IGalleryItem } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const GalleryCard = ({ data }: { data: IGalleryItem }) => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <article className="w-full sm:w-[400px] flex flex-col border border-white/20 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-white/30 transition-all">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={data.images[0]}
          alt={data.car}
          fill
          className="object-cover transition-transform grayscale hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, 350px"
        />
      </div>

      <div className="flex flex-col flex-grow p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg sm:text-xl font-semibold text-white">
            {data.car}
          </h4>
          <span className="text-sm text-gray-400">
            {formatDate(data?.created_at)}
          </span>
        </div>

        <p className="text-sm sm:text-base text-gray-300 line-clamp-3">
          {data.desc[locale]}
        </p>

        <div className="flex flex-wrap gap-2">
          {data.categories.slice(0, 2).map((item: any, index: number) => (
            <span
              key={index}
              className="px-3 py-1 text-sm rounded-full bg-white/10 text-gray-200"
            >
              {t(`Filters.categories.${CATEGORIES[item]}`)}
            </span>
          ))}
          {data.categories.length > 2 && (
            <span className="px-3 py-1 text-sm rounded-full bg-white/10 text-gray-200">
              +{data.categories.length - 2}
            </span>
          )}
        </div>

        <Link
          href={`/gallery/${data.slug}`}
          className="inline-flex items-center justify-end text-white hover:text-gray-300 transition-colors group"
        >
          <span className="text-lg font-medium group-hover:underline">
            {t("Gallery.read_more")}
          </span>
          <span className="ml-2 text-xl group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </article>
  );
};

export default GalleryCard;
