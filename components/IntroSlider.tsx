"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

SwiperCore.use([EffectFade, Autoplay]);

const IntroSlider = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  const handleResize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 550) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 550) {
      setIsMobileView(true);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
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
      className="h-screen z-0"
    >
      <SwiperSlide>
        <div>
          <Image
            src={
              isMobileView ? "/intro/intro1_mobile.webp" : "/intro/intro1.webp"
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
              isMobileView ? "/intro/intro2_mobile.webp" : "/intro/intro2.webp"
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
              isMobileView ? "/intro/intro3_mobile.webp" : "/intro/intro3.webp"
            }
            alt="Slide 3"
            fill
            className="w-full object-cover"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default IntroSlider;
