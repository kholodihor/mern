import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { CATEGORIES } from "@/constants/categories";
import { formatDate } from "@/helpers/formatDate";
import { Link } from "@/i18n/routing";
import { IGalleryItem } from "@/types";

const GalleryCard = ({ data }: { data: IGalleryItem }) => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <article className="mx-auto flex h-[590px] w-full flex-col items-center justify-center overflow-hidden border border-white p-2 2xl:w-[350px]">
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

        <div className="tags mt-[24px] flex flex-wrap gap-2 text-[18px] text-white">
          {data.categories.slice(0, 2).map((item: any, index: number) => (
            <span
              key={index}
              className="flex w-fit min-w-[60%] items-center justify-center rounded-[1rem] bg-gray-500/30 px-2 py-[1px]"
            >
              {t(`Filters.categories.${CATEGORIES[item]}`)}&nbsp;
            </span>
          ))}
          {data.categories.length > 2 && (
            <span className="rounded-[1rem] bg-gray-500/30 px-2 py-[1px] text-white">
              {" "}
              +{data.categories.length - 2}
            </span>
          )}
        </div>

        <div className="flex-grow"></div>

        <div className="my-2 flex justify-end px-2">
          <Link href={`/gallery/${data.slug}`}>
            <button className="text-[24px] transition-all hover:underline">
              {`${t("Gallery.read_more")}  >`}
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default GalleryCard;
