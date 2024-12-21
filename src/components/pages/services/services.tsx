"use client";

import { useTranslations } from "next-intl";
import { services } from "@/data/services";
import SectionTitle from "@/components/shared/section-title";
import ServicesCard from "./services-card";

const ServicesPage = () => {
  const t = useTranslations("Services");

  return (
    <section
      id="services"
      className="min-h-screen w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-[15vh] md:mt-[20vh]"
      aria-labelledby="services-title"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle id="services-title" title={t("title")} />

        <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          {services.length > 0 && services.map((item, index) => (
            <ServicesCard key={index} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
