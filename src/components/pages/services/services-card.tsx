import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useFilters } from "@/stores/useFilters";
import { TServiceCard } from "@/types";

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
      className="mx-auto mb-6 flex h-[420px] w-[90%] flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-white sm:w-[75%] md:w-[400px]"
    >
      <div className="relative h-full w-full cursor-pointer gap-2 hover:cursor-pointer">
        <Image
          src={card.image!}
          alt="Car image"
          width={300}
          height={300}
          className="h-auto w-full rounded-[2.5rem] object-cover"
        />
        <div className="absolute top-0 flex h-full w-full flex-col items-center justify-end gap-2 p-2 pb-4">
          <h4 className="text-center text-[26px] font-bold leading-tight xl:mb-4 2xl:text-[28px]">
            {t(`${card.title}`)}
          </h4>
          <p className="mb-2 text-center text-[18px] font-[500] leading-7 text-gray-400 xl:text-[24px]">
            {t(`${card.text}`)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ServicesCard;
