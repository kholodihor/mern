"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import ServiceCard from "./ServiceCard";
import { cards } from "@/constants";
import { useTranslations } from "next-intl";

import "swiper/css";
import "swiper/css/effect-coverflow";

const Services = () => {
  const t = useTranslations("Services");

  return (
    <section className="w-full flex justify-center items-center flex-col text-center py-8 px-2">
      <h1 className="mainTitle">{t("title")}</h1>
      <div className="w-full flex gap-2 flex-wrap p-2 relative min-h-[80vh]">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          speed={2000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          loop={true}
          pagination={true}
          modules={[EffectCoverflow, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="w-full md:w-3/4"
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <ServiceCard card={card} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Services;
