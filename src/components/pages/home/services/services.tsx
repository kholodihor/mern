"use client";

import SectionTitle from "@/components/shared/section-title";
import { services } from "@/data/services";
import { useTranslations } from "next-intl";
import Slider from "../shared/slider/slider";
import ServicesCard from "./services-card";

const Services = () => {
  const t = useTranslations("Services");
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <SectionTitle id="services-title" title={t("title")} />
      <Slider
        data={services}
        Component={ServicesCard}
        nextElName="nextPosts"
        prevElName="prevPosts"
        breakpoints={{
          550: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          1560: {
            slidesPerView: 4,
            spaceBetween: 64,
          },
        }}
      />
    </section>
  );
};

export default Services;
