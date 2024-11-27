import { useTranslations } from 'next-intl';
import { TServiceCard } from "@/types";

const ServicesCard = ({ data: card }: { data: TServiceCard }) => {
  const t = useTranslations("Services");

  return (
    <article id={card.title} className="w-[90%] sm:w-[75%] md:w-[300px] h-[315px] 
    border border-white rounded-[2.5rem] 
    flex flex-col justify-center items-center px-4 py-[20%] mx-auto">
      <div className="h-full flex flex-col justify-center md:justify-between items-center w-full gap-4">
        {card.title === 'coding' ? (
          <a href={card.link} target="_blank" rel="noreferrer">
            <h4 className="text-center text-[24px]">
              {t(`${card.title}`)}
            </h4>
          </a>
        ) : (
          <h4 className="text-center text-[24px]">
            {t(`${card.title}`)}
          </h4>
        )}
        <div className="flex-grow" />
        <p className="text-center text-gray-400">{t(`${card.text}`)}</p>
      </div>
    </article>
  );
};

export default ServicesCard;

