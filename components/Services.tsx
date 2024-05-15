"use client";
import React from "react";
import ServiceCard from "./ServiceCard";
import { cards } from "@/constants";
import { useTranslations } from "next-intl";

const Services = () => {
  const t = useTranslations("Services");
  return (
    <section className="w-full flex justify-center items-center flex-col text-center  py-8 px-2">
      <h1 className="mainTitle">{t("title")}</h1>
      <div className="w-full flex gap-2 flex-wrap p-2">
        {cards.map((card, index) => (
          <ServiceCard key={index} card={card} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
