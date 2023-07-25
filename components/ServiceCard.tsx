'use client';
import Lottie from 'lottie-react';
import { TServiceCard } from '@/types';

const ServiceCard = ({ card }: { card: TServiceCard }) => {
  return (
    <div
      className="flex flex-1 justify-center items-center flex-col gap-8 p-8 text-center rounded-lg min-w-[15rem]  cursor-pointer hover:text-purple-600 shadow-xl shadow-[#666]"
      data-aos="flip-left"
      data-aos-duration="1500"
    >
      <div className="h-full flex justify-center items-start w-full">
        <a href={card.link} target="_blank" rel="noreferrer">
          <Lottie animationData={card.image} className="w-[10rem]" />
        </a>
      </div>
      <div className="h-full flex justify-center items-start w-full">
        <a href={card.link} target="_blank" rel="noreferrer">
          <h1 className="uppercase">{card.title}</h1>
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
