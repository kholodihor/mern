import { Link } from "@/i18n/routing";
import { INewsItem } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

const GalleryCard = ({ data }: { data: INewsItem }) => {
  const t = useTranslations();

  return (
    <article className="w-full  h-[590px] overflow-hidden
    border border-white flex flex-col justify-center items-center p-2 mx-auto">
      <div className="h-full flex flex-col justify-start w-full gap-2">
        <Image
          src={data.images[0]}
          alt="Car image"
          width={350}
          height={150}
          className="object-cover w-full h-[200px] md:h-[150px] xl:h-[200px] grayscale" />

        <h4 className="text-[20px] mb-[5px]">
          {data.car}
        </h4>

        <p className="text-gray-400 text-[18px] leading-8">
          {t(`Gallery.${data.desc}`)}
        </p>

        <div className="tags text-[16px] text-gray-400 flex gap-2 flex-wrap mt-[24px]">
          {data.categories.slice(0, 2).map((item, index) => (
            <span key={index} className="py-[2px] min-w-[70%] px-2 rounded-[1rem] bg-gray-400/30
              flex justify-center items-center">{t(`Filters.categories.${item}`)}</span>
          ))}
          {data.categories.length > 2 && `+${data.categories.length - 2}`}
        </div>
        <div className="flex-grow"></div>

        <div className="flex justify-start md:justify-end mt-[24px]">
          <Link href={`/gallery/${data.slug}`}>
            <button className="text-[20px] hover:underline transition-all">
              {`${t("Gallery.read_more")} >`}
            </button>
          </Link>
        </div>

      </div>
    </article>
  )
}

export default GalleryCard
