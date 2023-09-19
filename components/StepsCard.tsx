/* eslint-disable @next/next/no-img-element */
'use client';
import { TStep } from '@/types';
import { useTranslations } from 'next-intl';

type Props = {
  step: TStep;
};

const ServiceCard = ({ step }: Props) => {
  const t = useTranslations('Steps');
  return (
    <article
      className="flex flex-wrap sm:flex-nowrap justify-around items-center p-8 gap-8 w-full sm:w-[90%]"
      id="step"
      data-aos="fade-up"
    >
      <div className="w-full sm:w-6/12 text-center sm:text-left p-1 sm:p-4">
        <h1 className="underline text-2xl">{t(step.title)}</h1>
        <p className="w-full  mt-2">{t(step.text)}</p>
      </div>
      <div className="w-full h-full sm:w-1/2">
        <img
          src={step.image}
          alt={t(step.title)}
          className="w-full h-full object-cover"
        />
      </div>
    </article>
  );
};

export default ServiceCard;
