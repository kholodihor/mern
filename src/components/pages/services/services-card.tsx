import { useRouter } from "@/i18n/routing";
import { useFilters } from "@/stores/useFilters";
import { TServiceCard } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ServicesCard = ({ data: card }: { data: TServiceCard }) => {
  const t = useTranslations("Services");
  const router = useRouter();
  const { setFilters } = useFilters();

  const handleRedirect = () => {
    setFilters(card.tags);
    router.push("/gallery");
  };

  return (
    <article
      onClick={handleRedirect}
      id={card.title}
      className="mx-auto flex h-[420px] w-[90%] md:w-[400px] 
      flex-col items-center justify-center overflow-hidden 
      rounded-[2.5rem] border border-white sm:w-[75%] mb-6"
    >
      <div className="relative  h-full w-full cursor-pointer gap-2 hover:cursor-pointer">
        <Image
          src={card.image!}
          alt="Car image"
          width={300}
          height={300}
          className="h-auto w-full rounded-[2.5rem] object-cover"
        />
        <div className="absolute top-0  w-full h-full flex flex-col 
        items-center justify-end gap-2 p-2 pb-4">
          <h4 className="text-center text-[26px] xl:mb-4 2xl:text-[28px] font-bold leading-tight">{t(`${card.title}`)}</h4>
          <p className="text-center text-[18px] font-[500] xl:text-[24px] leading-7 mb-2 text-gray-400">
            {t(`${card.text}`)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ServicesCard;
