"use client";

import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { formValidation, TFormScheme } from "../schemes/formScheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { createApplication } from "@/utils/api/applications";
import TextArea from "./ui/TextArea";
import TextInput from "./ui/TextInput";
import SuccessModal from "./modals/SuccessModal";

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

  const onSubmit: SubmitHandler<TFormScheme> = async (values) => {
    try {
      setIsProcessing(true);
      const response = await createApplication(values);
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
    <section
      id="send-application"
      className="relative min-h-[100vh] gap-[2rem] w-full flex flex-col justify-center items-center"
    >
      <h1 className="mainTitle">{t("title")}</h1>
      <div className="p-2">
        <p className="max-w-[700px] text-center">{t("paragraph_1")}</p>
        <br />
        <p className="max-w-[700px] text-center">{t("paragraph_2")}</p>
        <br />
        <p className="max-w-[700px] text-center">{t("paragraph_3")}</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[1rem] w-[90vw] sm:w-[70vw] md:w-[50vw] bg-transparent justify-center items-center mt-[2rem]"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
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
      </form>
      {isModalOpen && (
        <SuccessModal
          handleClose={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
        />
      )}
    </section>
  );
};

export default ApplicationForm;
