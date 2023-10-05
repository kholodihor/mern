'use client';
import Lottie from 'lottie-react';
import { TServiceCard } from '@/types';
import { useTranslations } from 'next-intl';

const ServiceCard = ({ card }: { card: TServiceCard }) => {
  const t = useTranslations('Services');
  return (
    <div
      className="flex flex-1 justify-center items-center flex-col gap-8 p-8 text-center rounded-lg min-w-[15rem]  cursor-pointer hover:text-purple-600 shadow-xl shadow-[#666]"
    >
      <div className="h-full flex justify-center items-start w-full">
        <a href={card.link} target="_blank" rel="noreferrer">
          <Lottie animationData={card.image} className="w-[10rem]" />
        </a>
      </div>
      <div className="h-full flex justify-center items-start w-full">
        <a href={card.link} target="_blank" rel="noreferrer">
          <h1 className="uppercase">{t(`${card.title}`)}</h1>
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
