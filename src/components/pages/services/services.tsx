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
      className="flex min-h-screen w-full flex-col px-2 pt-[18vh] md:px-4 md:pt-[25vh]"
      aria-labelledby="services-title"
    >
      <SectionTitle id="services-title" title={t("title")} />

      {/* <div className="mx-auto grid grid-cols-1 place-items-center gap-6 py-[2rem] sm:grid-cols-2 lg:grid-cols-3 lg:px-4 xl:grid-cols-4">
        {services.length
          ? services.map((item, index) => (
              <ServicesCard key={index} data={item} />
            ))
          : null}
      </div> */}
      <div className="mx-auto flex flex-wrap justify-center gap-4 py-[2rem]">
        {services.length
          ? services.map((item, index) => (
            <ServicesCard key={index} data={item} />
          ))
          : null}
      </div>
    </section>
  );
};

export default ServicesPage;
