"use client";

import { useTranslations } from "next-intl";
import { cards } from "@/constants";

const ServicesList = () => {
  const t = useTranslations("Services");
  return (
    <section className="w-full flex justify-center items-center flex-col text-center py-8 px-2 min-h-[100vh] pt-[18vh] md:pt-[25vh]">
      <h1 className="mainTitle">{t("title")}</h1>
      <ul className="w-full flex justify-center items-center flex-col gap-2 my-[24px]">
        {cards.map((card, i) => (
          <li
            key={i}
            className={`w-full flex flex-col lg:flex-row justify-center gap-2 lg:gap-0 lg:justify-between items-start lg:items-center p-4  bg-[rgba(255,255,255,0.1)] backdrop-blur-sm backdrop-brightness-10 lg:h-[5rem]`}
          >
            <h2 className="text-left lg:w-1/3 text-blue-400">
              {card.emoji} &nbsp; {t(card.title)}
            </h2>
            <p className="flex-1 text-left">{t(card.text)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesList;
