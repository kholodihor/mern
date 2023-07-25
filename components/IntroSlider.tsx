'use client';
import React, { useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import SwiperCore from 'swiper';
import { EffectFade, Autoplay } from 'swiper/modules';

SwiperCore.use([EffectFade, Autoplay]);

const IntroSlider = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useLayoutEffect(() => {
    const controlSize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 650) {
          setIsMobileView(true);
        } else {
          setIsMobileView(false);
        }
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', controlSize);
      return () => {
        window.removeEventListener('resize', controlSize);
      };
    }
  }, []);

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      effect="fade"
      loop
      className="h-screen"
    >
      <SwiperSlide>
        <div>
          <Image
            src={
              isMobileView ? '/intro/intro1_mobile.webp' : '/intro/intro1.webp'
            }
            alt="Slide 1"
            fill
            className="w-full object-cover"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div>
          <Image
            src={
              isMobileView ? '/intro/intro2_mobile.webp' : '/intro/intro2.webp'
            }
            alt="Slide 2"
            fill
            className="w-full object-cover"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div>
          <Image
            src={
              isMobileView ? '/intro/intro3_mobile.webp' : '/intro/intro3.webp'
            }
            alt="Slide 3"
            fill
            className="w-full object-cover"
          />
        </div>
      </SwiperSlide>
      {/* Add more slides as needed */}
    </Swiper>
  );
};

export default IntroSlider;
