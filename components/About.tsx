"use client";
import React from "react";
import Lottie from "lottie-react";
import carservice from "@/constants/animations/carservice.json";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("About");
  return (
    <section
      id="about"
      className="p-8 w-full flex justify-center items-center flex-col text-center min-h-[100vh] pt-[18vh] md:pt-[25vh]"
    >
      <h1 className="mainTitle">{t("title")}</h1>
      <div className="sm:flex justify-center items-center gap-4 ">
        <div className="w-full sm:w-3/5 flex justify-center items-center">
          <p className="text-center text-[1.1rem]">
            {t("content")}
            <br />
            <br />
            <a href="#contacts">
              <strong>{t("call")}</strong>
            </a>
          </p>
        </div>
        <div className="w-full sm:w-2/5 mt-6 sm:mt-0">
          <Lottie animationData={carservice} className="w-full invert" />
        </div>
      </div>
      <div
        className="w-screen h-12 flex justify-center items-center gap-4 mt-8"
        id="dots"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  );
};

export default About;
