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
    <article className="mx-auto flex h-[590px] w-full flex-col items-center 
    justify-center overflow-hidden border border-white p-2">
      <div className="flex h-full w-full flex-col justify-start gap-2">
        <Image
          src={data.images[0]}
          alt="Car image"
          width={350}
          height={150}
          className="h-[200px] w-full object-cover grayscale md:h-[150px] xl:h-[200px]"
        />

        <div className="flex items-center justify-between">
          <h4 className="text-[20px]">{data.car}</h4>
          <span className="text-sm text-gray-500">
            {formatDate(data?.created_at)}
          </span>
        </div>

        <p className="text-[16px] leading-8 text-gray-400">
          {data.desc[locale]}
        </p>

        <div className="flex-grow"></div>

        <div className="tags mt-[24px] flex flex-wrap gap-2 text-[16px] text-gray-400">
          {data.categories.slice(0, 2).map((item: any, index: number) => (
            <span
              key={index}
              className="flex min-w-[75%] items-center justify-center rounded-[1rem] bg-gray-400/30 px-2 py-[2px]"
            >
              {t(`Filters.categories.${CATEGORIES[item]}`)}&nbsp;
            </span>
          ))}
          {data.categories.length > 2 && `+${data.categories.length - 2}`}
        </div>

        <div className="flex-grow"></div>

        <div className="mt-[24px] flex justify-start md:justify-end">
          <Link href={`/gallery/${data.slug}`}>
            <button className="text-[20px] transition-all hover:underline">
              {`${t("Gallery.read_more")}  >`}
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default GalleryCard;
