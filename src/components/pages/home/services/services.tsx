"use client";

import { useTranslations } from "next-intl";
import { services } from "@/data/services";
import SectionTitle from "@/components/shared/section-title";
import Slider from "../shared/slider/slider";
import ServicesCard from "./services-card";

const Services = () => {
  const t = useTranslations("Services");
  return (
    <section className="mb-[5rem] sm:my-[8rem]">
      <SectionTitle id="services-title" title={t("title")} />
      <Slider
        data={services}
        Component={ServicesCard}
        aria-label="Services Slider"
        nextElName="nextPosts"
        prevElName="prevPosts"
        breakpoints={{
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
