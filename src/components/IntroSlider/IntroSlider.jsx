/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper';
import styles from './IntroSlider.module.scss';
import 'swiper/css';
import 'swiper/css/effect-fade';

const IntroSlider = () => {
  return (
    <div className={styles.IntroSlider}>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        loop={true}
        modules={[EffectFade, Autoplay]}
        className={styles.swiper}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
      >
        <SwiperSlide
          className={styles.swiperSlide}
          style={{
            background: `url("/intro/intro1.webp")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></SwiperSlide>
        <SwiperSlide
          className={styles.swiperSlide}
          style={{
            background: `url("/intro/intro2.webp")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></SwiperSlide>
        <SwiperSlide
          className={styles.swiperSlide}
          style={{
            background: `url("/intro/intro3.webp")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default IntroSlider;
