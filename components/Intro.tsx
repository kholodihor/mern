"use client";
import React, { useEffect } from "react";
import IntroSlider from "./IntroSlider";
import { useTranslations } from "next-intl";
import ContactsBubble from "./ContactsBubble";

const Intro = () => {
  const t = useTranslations("Menu");

  return (
    <div className="relative top-0 left-0 w-full min-h-screen ">
      <IntroSlider />
      <div className="absolute w-full sm:w-2/3 text-center sm:text-left top-[40%] sm:top-[35%] sm:left-[10%] z-10">
        <h1
          className="uppercase text-[13vh] sm:text-[20vh] font-bold bg-clip-text text-transparent drop-shadow-[5px_5px_0_#000] bg-gradient-to-r from-sky-500 to-indigo-500 "
          data-aos="zoom-in"
          data-aos-once="true"
        >
          MERN
        </h1>
        <p
          className="uppercase text-[1.7rem] sm:text-[2rem] sm:-mt-[3rem] sm:ml-[2rem] font-bold bg-gradient-to-r from-[#f64f59]  via-[#c471ed] to-[#12c2e9] bg-clip-text text-transparent drop-shadow-[2px_2px_0_#000]"
          data-aos="fade-up"
          data-aos-once="true"
        >
          {t("motto")}
        </p>
      </div>
      <ContactsBubble />
    </div>
  );
};

export default Intro;
