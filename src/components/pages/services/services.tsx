"use client";

import SectionTitle from "@/components/shared/section-title";
import { services } from "@/data/services";
import { useTranslations } from "next-intl";
import ServicesCard from "./services-card";

const ServicesPage = () => {
  const t = useTranslations("Services");

  return (
    <section
      id="services"
      className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[17vh] lg:px-8 lg:py-20"
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="services-title" title={t("title")} />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-12">
          {services.length > 0 &&
            services.map((item, index) => (
              <div 
                key={index} 
                className={`${index === services.length - 1 && services.length % 3 === 1 ? 'lg:col-start-2' : ''}`}
              >
                <ServicesCard data={item} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
