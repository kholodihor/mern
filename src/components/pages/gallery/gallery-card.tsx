import { Link } from "@/i18n/routing";
import { useLocale } from 'next-intl';
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CATEGORIES } from '@/constants/categories';
import { formatDate } from "@/helpers/formatDate";

const GalleryCard = ({ data }: { data: any }) => {
  const t = useTranslations();
  const locale = useLocale();

  console.log(formatDate(data.created_at))

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

        <div className="flex items-center justify-between">
          <h4 className="text-[20px]">
            {data.car}
          </h4>
          <span className='text-gray-500 text-sm'>{formatDate(data?.created_at)}</span>
        </div>

        <p className="text-gray-400 text-[18px] leading-8">
          {data.desc[locale]}
        </p>

        <div className="flex-grow"></div>

        <div className="tags text-[16px] text-gray-400 flex gap-2 flex-wrap mt-[24px]">
          {data.categories.slice(0, 2).map((item: any, index: number) => (
            <span key={index} className="py-[2px] min-w-[75%] px-2 rounded-[1rem] bg-gray-400/30
              flex justify-center items-center">{t(`Filters.categories.${CATEGORIES[item]}`)}&nbsp;</span>
          ))}
          {data.categories.length > 2 && `+${data.categories.length - 2}`}
        </div>

        <div className="flex-grow"></div>

        <div className="flex justify-start md:justify-end mt-[24px]">
          <Link href={`/gallery/${data.slug}`}>
            <button className="text-[20px] hover:underline transition-all">
              {`${t("Gallery.read_more")}  >`}
            </button>
          </Link>
        </div>

      </div>
    </article>
  )
}

export default GalleryCard
