"use client";

import SuccessModal from "@/components/modals/SuccessModal";
import {
  TFormScheme,
  formValidation,
} from "@/components/pages/contacts/formScheme";
import TextArea from "@/components/ui/text-area";
import TextInput from "@/components/ui/text-input";
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const Form = () => {
  const t = useTranslations("Form");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
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
      const data = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        vin: values.vin,
        message: values.message,
        status: "new",
        created_at: new Date(Date.now()).toLocaleDateString(),
      };
      const ref = collection(db, "applications");
      await addDoc(ref, data);
      setIsModalOpen(true);
      reset();
      setIsProcessing(false);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[2rem] flex w-full flex-col items-center justify-center gap-4 space-y-2 md:mt-0 md:w-1/2 "
      >
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
              errorText={
                errors.message?.message && t(`${errors.message?.message}`)
              }
              placeholder={t("message")}
            />
          )}
        />

        <div className="space-y-2 text-[13px] text-gray-400 max-w-[600px]">
          <h5 className="text-[20px] font-semibold">{t("policies.title")}</h5>
          <p>
            {t("policies.paragraph_1")}{" "}
            <a
              href="/Polityka Prywatności.pdf"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-white"
            >
              {t("policies.policy")}
            </a>
            .
          </p>
          <p>
            {t("policies.paragraph_2")}{" "}
            <a
              href="mailto:mern.serwis@gmail.com"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              mern.serwis@gmail.com
            </a>{" "}
            {t("policies.paragraph_3")}{" "}
            <a
              href="tel:+48509159158"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              +48 509 159 158
            </a>
            .
          </p>
        </div>

        <button
          className={`mx-auto w-full min-w-[325px] rounded-[1rem] border px-4 py-2 transition-all hover:bg-gray-400/50 md:w-[200px]`}
          type="submit"
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
    </>
  );
};

export default Form;
