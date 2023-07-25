'use client';
import React from 'react';
import ServiceCard from './ServiceCard';
import { cards } from '@/constants';

const Services = () => {
  return (
    <section className="w-full flex justify-center items-center flex-col text-center  py-8 px-2">
      <h1 className="mainTitle">co my robimy</h1>
      <div className="w-full flex gap-2 flex-wrap">
        {cards.map((card, index) => (
          <ServiceCard key={index} card={card} />
        ))}
      </div>
    </section>
  );
};

export default Services;
