"use client";

import { useTranslations } from "next-intl";
import HeroSlider from "./hero-slider";
import ContactsBubble from "@/components/shared/contacts-bubble";

const Hero = () => {
  const t = useTranslations("Menu");

  return (
    <section className="relative w-full min-h-[80vh] sm:h-screen overflow-hidden 
     font-open-sans">

      <HeroSlider />

      <header className="absolute w-full sm:w-2/3 text-center 
      sm:text-left top-[50%] sm:top-[40%] md:top-[70%] sm:left-0 z-10 
      flex flex-col justify-end gap-6 px-6">
        <h1
          className="uppercase text-[10vh] mb-4 md:-mb-4 sm:text-[13vh]
           md:text-[17vh] font-bold text-white">
          MERN
        </h1>

        <section aria-labelledby="motto-section">
          <div
            className='w-full -mt-[4rem] sm:-mt-[3rem] h-full flex 
            flex-col justify-between items-center md:flex-row'
          >
            <p
              id="motto-section"
              className="uppercase text-[1.5rem] sm:text-[2rem] font-bold 
              text-white"
            >
              {t("motto")}
            </p>
          </div>
        </section>
      </header>

      <ContactsBubble />
    </section>

  );
};

export default Hero;
