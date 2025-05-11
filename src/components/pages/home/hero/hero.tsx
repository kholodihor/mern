"use client";

import ContactsBubble from "@/components/shared/contacts-bubble";
import { useTranslations } from "next-intl";
import HeroSlider from "./hero-slider";

const Hero = () => {
  const t = useTranslations("Menu");

  return (
    <section
      aria-label="Hero Section"
      className="relative w-full overflow-hidden font-open-sans flex flex-col sm:block sm:h-screen"
    >
      {/* Slider container */}
      <div className="w-full">
        <HeroSlider />
      </div>

      {/* Text content - stacked on mobile, absolute on desktop */}
      <header
        className="flex w-full flex-col justify-end gap-6 px-6 py-8 text-center sm:absolute sm:bg-transparent sm:py-0 sm:left-0 sm:top-[40%] sm:w-2/3 sm:text-left md:top-[70%] sm:z-10"
      >
        <h1
          className="mb-4 font-open-sans text-[8vh] font-bold uppercase text-white sm:text-[13vh] md:-mb-4 md:text-[17vh]"
        >
          <span aria-hidden="true">MERN</span>
        </h1>

        <section aria-labelledby="motto-section">
          <div className="-mt-[4rem] flex h-full w-full flex-col items-center justify-between sm:-mt-[3rem] md:flex-row">
            <p
              id="motto-section"
              className="text-[1.2rem] font-bold uppercase text-white sm:text-[2rem]"
            >
              {t("motto")}
            </p>
          </div>
        </section>
      </header>

      {/* Scroll indicator - only visible on mobile */}
      {/* <RiScrollToBottomFill
        className="absolute bottom-44 left-[48%] animate-bounce z-50 cursor-pointer text-[2.5rem] text-white sm:hidden"
        role="button"
        tabIndex={0}
        aria-label="Scroll down"
      /> */}

      <ContactsBubble />
    </section>
  );
};

export default Hero;
