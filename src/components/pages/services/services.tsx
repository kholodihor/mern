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
      className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20"
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="services-title" title={t("title")} />

        <div className="mt-8 flex flex-wrap justify-center gap-4 sm:mt-12 sm:gap-6 lg:mt-16 lg:gap-8">
          {services.length > 0 &&
            services.map((item, index) => (
              <ServicesCard key={index} data={item} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
