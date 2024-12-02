"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  {
    desktop: "/hero/hero_1.png",
    mobile: "/hero/mobile_1.png",
  },
  {
    desktop: "/hero/hero_2.png",
    mobile: "/hero/mobile_2.png",
  },
  {
    desktop: "/hero/hero_3.png",
    mobile: "/hero/mobile_3.png",
  },
  {
    desktop: "/hero/hero_4.png",
    mobile: "/hero/mobile_4.png",
  },
  {
    desktop: "/hero/hero_5.png",
    mobile: "/hero/mobile_5.png",
  },
];

const HeroSlider = () => {
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
      modules={[EffectFade, Autoplay]}
      effect="fade"
      loop
      className="z-0 mt-[17vh] h-[300px] sm:h-[60vh] md:h-screen"
      role="region"
      aria-live="polite"
      aria-label="Intro slides"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          <Image
            src={isMobileView ? slide.mobile : slide.desktop}
            alt="A dynamic view of the first slide's content"
            fill
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
