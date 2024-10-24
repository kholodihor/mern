"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { formValidation, TFormScheme } from "../schemes/formScheme"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { sendApplication } from "@/app/actions/applications"
import TextArea from "./ui/TextArea"
import TextInput from "./ui/TextInput"
import SuccessModal from "./modals/SuccessModal"
import FuturisticCard from "./futuristic-card/FuturisticCard"

export default function ApplicationForm() {
  const t = useTranslations("Form")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid, errors },
  } = useForm<TFormScheme>({
    resolver: zodResolver(formValidation),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vin: "",
      message: "",
    },
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const onSubmit: SubmitHandler<TFormScheme> = async (values) => {
    try {
      setIsProcessing(true)
      const response = await sendApplication(values)
      if (response && response.status === 200) {
        setIsModalOpen(true)
        reset()
        setIsProcessing(false)
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <motion.section
      className="container mx-auto px-4 pt-[18vh] md:pt-[25vh]"
      id="send-application"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className="mainTitle" variants={itemVariants}>{t("title")}</motion.h1>

      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
          <FuturisticCard />
        </motion.div>

        <motion.div className="w-full lg:w-1/2 space-y-8" variants={containerVariants}>
          <motion.div className="space-y-4" variants={itemVariants}>
            <p className="text-center">{t("paragraph_1")}</p>
            <p className="text-center">{t("paragraph_2")}</p>
            <p className="text-center">{t("paragraph_3")}</p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 gap-4 flex flex-col justify-center items-center">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  aria-describedby="name-error"
                  errorText={errors.name?.message && t(`${errors.name?.message}`)}
                  placeholder={t("name")}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  aria-describedby="phone-error"
                  errorText={errors.phone?.message && t(`${errors.phone?.message}`)}
                  placeholder={t("phone")}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  aria-describedby="email-error"
                  errorText={errors.email?.message && t(`${errors.email?.message}`)}
                  placeholder={t("email")}
                />
              )}
            />
            <Controller
              name="vin"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  aria-describedby="vin-error"
                  errorText={errors.vin?.message && t(`${errors.vin?.message}`)}
                  placeholder={t("vin")}
                />
              )}
            />
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  aria-describedby="message-error"
                  errorText={errors.message?.message && t(`${errors.message?.message}`)}
                  placeholder={t("message")}
                />
              )}
            />

            <div className="text-sm text-gray-400 space-y-2">
              <h5 className="font-semibold underline">{t("policies.title")}</h5>
              <p>
                {t("policies.paragraph_1")}{" "}
                <a
                  href="/Polityka Prywatności.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {t("policies.policy")}
                </a>.
              </p>
              <p>
                {t("policies.paragraph_2")}{" "}
                <a
                  href="mailto:mern.serwis@gmail.com"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  mern.serwis@gmail.com
                </a>{" "}
                {t("policies.paragraph_3")}{" "}
                <a
                  href="tel:+48509159158"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  +48 509 159 158
                </a>.
              </p>
            </div>

            <button
              className={`w-full md:w-[200px] rounded-md border py-2 px-4 transition-all ${isValid
                  ? "border-green-700 shadow-md hover:shadow-lg shadow-green-700 hover:shadow-green-700"
                  : "border-blue-700 shadow-sm shadow-blue-700"
                } disabled:border-gray-200 disabled:shadow-none disabled:cursor-not-allowed`}
              type="submit"
              disabled={!isValid}
            >
              {isProcessing ? t("processing") : t("send")}
            </button>
          </form>
        </motion.div>
      </div>

      {isModalOpen && (
        <SuccessModal handleClose={() => setIsModalOpen(false)} isModalOpen={isModalOpen} />
      )}
    </motion.section>
  )
}