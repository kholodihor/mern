"use client";

import ContactsBubble from "@/components/shared/contacts-bubble";
import { prefetchGallery } from "@/hooks/useGallery";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import HeroSlider from "./hero-slider";

const Hero = () => {
  const t = useTranslations("Menu");

  // Prefetch gallery data when hero component mounts
  useEffect(() => {
    prefetchGallery();
  }, []);

  return (
    <section
      aria-label="Hero Section"
      className="relative flex w-full flex-col overflow-hidden font-open-sans sm:block sm:h-screen"
    >
      {/* Slider container */}
      <div className="w-full">
        <HeroSlider />
      </div>

      {/* Text content - stacked on mobile, absolute on desktop */}
      <header className="flex w-full flex-col justify-end gap-6 px-6 py-8 text-center sm:absolute sm:left-0 sm:top-[40%] sm:z-10 sm:w-2/3 sm:bg-transparent sm:py-0 sm:text-left md:top-[70%]">
        <h1 className="mb-8 font-open-sans text-[8vh] font-bold uppercase text-white sm:text-[13vh] md:-mb-4 md:text-[17vh]">
          <span className="sr-only">MERN Stack Development</span>
          <span aria-hidden="true">MERN</span>
        </h1>

        <div className="-mt-16 flex h-full w-full flex-col items-center justify-between sm:-mt-12 md:flex-row">
          <p
            id="motto-section"
            className="text-[1.2rem] font-bold uppercase text-white sm:text-[2rem]"
          >
            {t("motto")}
          </p>
        </div>
      </header>
      <ContactsBubble />
    </section>
  );
};

export default Hero;
