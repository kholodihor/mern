import { useTranslations } from "next-intl";

import { TServiceCard } from "@/types";

const ServicesCard = ({ data: card }: { data: TServiceCard }) => {
  const t = useTranslations("Services");

  return (
    <article
      id={card.title}
      className="mx-auto flex h-[315px] w-[90%] flex-col items-center justify-center rounded-[2.5rem] border border-white px-4 py-[20%] sm:w-[75%] md:w-[300px]"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 md:justify-between">
        {card.title === "coding" ? (
          <a href={card.link} target="_blank" rel="noreferrer">
            <h4 className="text-center text-[24px]">{t(`${card.title}`)}</h4>
          </a>
        ) : (
          <h4 className="text-center text-[24px]">{t(`${card.title}`)}</h4>
        )}
        <div className="flex-grow" />
        <p className="text-center text-gray-400">{t(`${card.text}`)}</p>
      </div>
    </article>
  );
};

export default ServicesCard;
