import { TServiceCard } from "@/types";
import { useTranslations } from "next-intl";

const ServicesCard = ({ data: card }: { data: TServiceCard }) => {
  const t = useTranslations("Services");

  return (
    <article
      id={card.title}
      className="mx-auto h-[320px] w-full sm:w-[300px] flex flex-col rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm p-6 transition-all hover:border-white/30 hover:bg-white/10 group"
    >
      <div className="flex h-full flex-col items-center justify-center gap-6">
        {card.title === "coding" ? (
          <a
            href={card.link}
            target="_blank"
            rel="noreferrer"
            className="transition-transform group-hover:scale-105"
          >
            <h4 className="text-2xl font-semibold text-center group-hover:text-white/90">
              {t(`${card.title}`)}
            </h4>
          </a>
        ) : (
          <h4 className="text-2xl font-semibold text-center">
            {t(`${card.title}`)}
          </h4>
        )}

        <p className="text-gray-300 text-center text-base leading-relaxed max-w-[90%]">
          {t(`${card.text}`)}
        </p>
      </div>
    </article>
  );
};

export default ServicesCard;
