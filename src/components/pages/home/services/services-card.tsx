import { useTranslations } from "next-intl";
import { TServiceCard } from "@/types";

const ServicesCard = ({ data: card }: { data: TServiceCard }) => {
  const t = useTranslations("Services");

  return (
    <article
      id={card.title}
      className="group mx-auto flex h-[320px] w-full flex-col rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 sm:w-[300px]"
    >
      <div className="flex h-full flex-col items-center justify-center gap-6">
        {card.title === "coding" ? (
          <a
            href={card.link}
            target="_blank"
            rel="noreferrer"
            className="transition-transform group-hover:scale-105"
          >
            <h4 className="text-center text-2xl font-semibold group-hover:text-white/90">
              {t(`${card.title}`)}
            </h4>
          </a>
        ) : (
          <h4 className="text-center text-2xl font-semibold">
            {t(`${card.title}`)}
          </h4>
        )}

        <p className="max-w-[90%] text-center text-base leading-relaxed text-gray-300">
          {t(`${card.text}`)}
        </p>
      </div>
    </article>
  );
};

export default ServicesCard;
