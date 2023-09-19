'use client';
import React from 'react';
import Lottie from 'lottie-react';
import carservice from '@/constants/animations/carservice.json';
import { useTranslations } from 'next-intl';

const About = () => {
  const t = useTranslations('About');
  return (
    <section
      id="about"
      className="p-8 w-full flex justify-center items-center flex-col text-center"
    >
      <h1 className="mainTitle">{t('title')}</h1>
      <div className="sm:flex justify-center items-center gap-4 ">
        <div
          className="w-full sm:w-3/5 flex justify-center items-center"
          data-aos="fade-right"
        >
          <p className="text-center text-[1.1rem]">
            {t('content')}
            <br />
            <br />
            <strong>{t('call')}</strong>
          </p>
        </div>
        <div className="w-full sm:w-2/5" data-aos="fade-left">
          <Lottie animationData={carservice} className="w-full invert" />
        </div>
      </div>
      <div
        className="w-screen h-12 flex justify-center items-center gap-4 mt-8"
        id="dots"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  );
};

export default About;
