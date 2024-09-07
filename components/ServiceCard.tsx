"use client";
import Lottie from "lottie-react";
import { TServiceCard } from "@/types";
import { useTranslations } from "next-intl";

const ServiceCard = ({
  card,
  index,
}: {
  card: TServiceCard;
  index: number;
}) => {
  const t = useTranslations("Services");

  return (
    <div
      className="absolute top-[50%] left-[50%] bg-black -translate-y-[50%] -translate-x-[50%] flex flex-1 justify-center items-center flex-col gap-8 p-8 text-center rounded-lg w-[25rem] h-[25rem] cursor-pointer border-2 border-[#666] hover:border-purple-600"
      title={t(`${card.title}`)}
    >
      <div className="h-full flex justify-center items-start w-full">
        <a href={card.link} target="_blank" rel="noreferrer">
          <Lottie animationData={card.image} className="w-[10rem]" />
        </a>
      </div>
      <div className="h-full flex flex-col justify-center items-center w-full gap-2">
        {index === 5 ? (
          <a href={card.link} target="_blank" rel="noreferrer">
            <h2 className="uppercase">{t(`${card.title}`)}</h2>
          </a>
        ) : (
          <h1 className="uppercase text-center">{t(`${card.title}`)}</h1>
        )}
        <p>{t(`${card.text}`)}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
