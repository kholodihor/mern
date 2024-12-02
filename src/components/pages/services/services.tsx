'use client'

import { useTranslations } from "next-intl";
import { services } from "@/data/services";
import SectionTitle from "@/components/shared/section-title";
import ServicesCard from "./services-card";

const ServicesPage = () => {
  const t = useTranslations("Services");

  return (
    <section
      id="gallery"
      className="flex flex-col w-full min-h-screen pt-[18vh] md:pt-[25vh] px-2 md:px-4"
      aria-labelledby="gallery-title"
    >
      <SectionTitle id='gallery-title' title={t("title")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
      xl:grid-cols-4 gap-6 py-[2rem] lg:px-4 mx-auto place-items-center">
        {services.length ? services.map((item, index) => (
          <ServicesCard key={index} data={item} />
        )) : null}
      </div>
    </section>
  )
}

export default ServicesPage


