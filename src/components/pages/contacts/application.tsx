"use client";

import { useTranslations } from "next-intl";
import Form from "./form";

const Application = () => {
  const t = useTranslations("Form");

  return (
    <section
      className="container mx-auto flex flex-col gap-8 px-4 pt-[4rem] md:flex-row"
      id="send-application"
    >
      <div className="w-full space-y-4 text-[18px] sm:text-[20px] md:w-1/2 ">
        <p>{t("paragraph_1")}</p>
        <p>{t("paragraph_2")}</p>
        <p>{t("paragraph_3")}</p>
      </div>
      <Form />
    </section>
  );
};
export default Application;
