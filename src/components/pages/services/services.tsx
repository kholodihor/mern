"use client";

import { useTranslations } from "next-intl";
import { services } from "@/data/services";
import SectionTitle from "@/components/shared/section-title";
import ServicesCard from "./services-card";

const ServicesPage = () => {
  const t = useTranslations("Services");

  return (
    <section
      id="gallery"
      className="flex min-h-screen w-full flex-col px-2 pt-[18vh] md:px-4 md:pt-[25vh]"
      aria-labelledby="gallery-title"
    >
      <SectionTitle id="gallery-title" title={t("title")} />

      <div className="mx-auto grid grid-cols-1 place-items-center gap-6 py-[2rem] sm:grid-cols-2 lg:grid-cols-3 lg:px-4 xl:grid-cols-4">
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
