'use client';
import React from 'react';
import StepsCard from './StepsCard';
import { steps } from '@/constants';

const Steps = () => {
  return (
    <section
      id="services"
      className="w-full flex justify-center items-center flex-col gap-4  sm:p-8 text-center"
    >
      <h1 className="mainTitle">jak to zrobić</h1>
      <div className="flex justify-center items-center flex-col gap-[0.8rem]">
        {steps.map((step, index) => (
          <StepsCard
            key={index}
            step={step}
   
          />
        ))}
      </div>
    </section>
  );
};

export default Steps;
