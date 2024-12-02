"use client";

import { useTranslations } from "next-intl";
import { RiScrollToBottomFill } from "react-icons/ri";

import ContactsBubble from "@/components/shared/contacts-bubble";

import HeroSlider from "./hero-slider";

const Hero = () => {
  const t = useTranslations("Menu");

  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden font-open-sans sm:h-screen">
      <HeroSlider />

      <header className="absolute top-[50%] z-10 flex w-full flex-col justify-end gap-6 px-6 text-center sm:left-0 sm:top-[40%] sm:w-2/3 sm:text-left md:top-[70%]">
        <h1 className="mb-4 font-open-sans text-[10vh] font-bold uppercase text-white sm:text-[13vh] md:-mb-4 md:text-[17vh]">
          MERN
        </h1>

        <section aria-labelledby="motto-section">
          <div className="-mt-[4rem] flex h-full w-full flex-col items-center justify-between sm:-mt-[3rem] md:flex-row">
            <p
              id="motto-section"
              className="text-[1.5rem] font-bold uppercase text-white sm:text-[2rem]"
            >
              {t("motto")}
            </p>
          </div>
        </section>
      </header>
      <RiScrollToBottomFill
        className="text-[3rem] absolute bottom-10 left-[45%] 
       animate-bounce cursor-pointer text-white sm:hidden"
      />
      <ContactsBubble />
    </section>
  );
};

export default Hero;
