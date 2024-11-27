"use client"

import { useTranslations } from "next-intl"
import Form from "./form"

const Application = () => {
  const t = useTranslations("Form")

  return (
    <section
      className="container flex flex-col md:flex-row mx-auto gap-8 px-4 pt-[4rem]"
      id="send-application"
    >
      <div className="space-y-4 text-[18px] sm:text-[20px] w-full md:w-1/2">
        <p >{t("paragraph_1")}</p>
        <p >{t("paragraph_2")}</p>
        <p >{t("paragraph_3")}</p>
      </div>
      <Form />
    </section>
  )
}
export default Application