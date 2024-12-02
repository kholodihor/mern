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
      className="mx-auto flex h-[350px] w-[90%] flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-white sm:w-[75%] md:w-[300px]"
    >
      <div className="relative flex h-full w-full cursor-pointer flex-col items-center justify-between gap-4 hover:cursor-pointer">
        <Image
          src={card.image!}
          alt="Car image"
          width={300}
          height={300}
          className="h-auto w-full rounded-[2.5rem] object-cover"
        />
        <div className="absolute top-[30%] flex flex-col items-center justify-center gap-2 p-2">
          <h4 className="text-center text-[20px]">{t(`${card.title}`)}</h4>

          <p className="text-center text-[16px] text-gray-400">
            {t(`${card.text}`)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ServicesCard;
