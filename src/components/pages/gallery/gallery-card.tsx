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
    <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm transition-all hover:border-white/30 sm:w-[400px]">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={data.images[0]}
          alt={data.car}
          fill
          className="object-cover grayscale transition-transform hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, 350px"
        />
      </div>

      <div className="flex flex-grow flex-col space-y-4 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-white sm:text-xl">
            {data.car}
          </h4>
          <span className="text-sm text-gray-400">
            {formatDate(data?.created_at)}
          </span>
        </div>

        <p className="line-clamp-3 text-sm text-gray-300 sm:text-base">
          {data.desc[locale]}
        </p>

        <div className="flex flex-wrap gap-2">
          {data.categories.slice(0, 2).map((item: any, index: number) => (
            <span
              key={index}
              className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-200"
            >
              {t(`Filters.categories.${CATEGORIES[item]}`)}
            </span>
          ))}
          {data.categories.length > 2 && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-200">
              +{data.categories.length - 2}
            </span>
          )}
        </div>

        <div className="flex-1"></div>

        <Link
          href={`/gallery/${data.slug}`}
          className="group inline-flex items-center justify-end text-white transition-colors hover:text-gray-300"
        >
          <span className="text-lg font-medium group-hover:underline">
            {t("Gallery.read_more")}
          </span>
          <span className="ml-2 text-xl transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
};

export default GalleryCard;
