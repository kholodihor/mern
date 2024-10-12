"use client";

import React, { useState } from "react";
import { motion } from 'framer-motion'
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { formValidation, TFormScheme } from "../schemes/formScheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { sendApplication } from "@/utils/actions/applications";
import TextArea from "./ui/TextArea";
import TextInput from "./ui/TextInput";
import SuccessModal from "./modals/SuccessModal";
import FuturisticCard from "./futuristic-card/FuturisticCard";

const ApplicationForm = () => {
  const t = useTranslations("Form");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  });

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
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  }


  const onSubmit: SubmitHandler<TFormScheme> = async (values) => {
    try {
      setIsProcessing(true);
      const response = await sendApplication(values);
      if (response && response.status === 200) {
        setIsModalOpen(true);
        reset();
        setIsProcessing(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <motion.section
    className="flex flex-col justify-center items-center"
    id="send-application"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <motion.h1 className="mainTitle" variants={itemVariants}>{t("title")}</motion.h1>
    <div className="md:flex justify-center items-center px-2">
      <motion.div 
        className="w-full md:w-1/2 flex flex-col justify-center items-center min-h-[50vh] md:min-h-[150vh]"
        variants={itemVariants}
      >
        <FuturisticCard />
      </motion.div>
      <motion.div 
        className="w-full md:w-1/2 relative min-h-[100vh] gap-[2rem] flex flex-col justify-center items-center"
        variants={containerVariants}
      >
        <motion.div className="p-2" variants={containerVariants}>
          <motion.p className="max-w-[700px] text-center" variants={itemVariants}>{t("paragraph_1")}</motion.p>
          <br />
          <motion.p className="max-w-[700px] text-center" variants={itemVariants}>{t("paragraph_2")}</motion.p>
          <br />
          <motion.p className="max-w-[700px] text-center" variants={itemVariants}>{t("paragraph_3")}</motion.p>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[1rem] w-[90%] bg-transparent justify-center items-center mt-[2rem]"
          variants={containerVariants}
        >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  errorText={
                    errors.name?.message && t(`${errors.name?.message}`)
                  }
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
                  errorText={
                    errors.phone?.message && t(`${errors.phone?.message}`)
                  }
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
                  errorText={
                    errors.email?.message && t(`${errors.email?.message}`)
                  }
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
                  errorText={
                    errors.message?.message && t(`${errors.message?.message}`)
                  }
                  placeholder={t("message")}
                />
              )}
            />
            <div className="rules w-[90vw] sm:w-[50vw] xl:w-full mx-auto text-gray-400">
              <h5 className="text-[13px] mb-[1rem] underline">
                {t("policies.title")}
              </h5>
              <p className="text-[10px] mb-[0.5rem]">
                {t("policies.paragraph_1")}{" "}
                <a
                  href="/Polityka Prywatności.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {t("policies.policy")}
                </a>
                .
              </p>
              <p className="text-[10px]">
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
                  href="tel:+48509159158."
                  rel="noopener noreferrer"
                  className="hover:underline sm:hidden"
                >
                  +48 509 159 158.
                </a>
                <span className="hidden sm:block">+48 509 159 158.</span>
              </p>
            </div>
            <button
              className={`rounded-md border border-blue-700 shadow-sm shadow-blue-700 py-2 px-4 w-[250px] disabled:border-gray-200 disabled:shadow-none disabled:cursor-not-allowed ${
                !isValid
                  ? "border-blue-700 shadow-sm shadow-blue-700"
                  : "border-green-700 shadow-md hover:shadow-md shadow-green-700 hover:shadow-green-700"
              }`}
              type="submit"
              disabled={!isValid}
            >
              {isProcessing ? t("processing") : t("send")}
            </button>
        </motion.form>
        {isModalOpen && (
          <SuccessModal
            handleClose={() => setIsModalOpen(false)}
            isModalOpen={isModalOpen}
          />
        )}
      </motion.div>
    </div>
  </motion.section>
  );
};

export default ApplicationForm;
