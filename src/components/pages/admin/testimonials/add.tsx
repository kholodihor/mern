"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useRouter } from "@/i18n/routing";
import { db } from "@/lib/firebase";

import TextArea from "@/components/ui/text-area";
import TextInput from "@/components/ui/text-input";

import { TestimonialScheme, testimonialScheme } from "./schema";

const AddTestimonial = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TestimonialScheme>({
    resolver: zodResolver(testimonialScheme),
    mode: "onChange",
    defaultValues: {
      name: "",
      review: "",
      rating: "",
    },
  });

  const onSubmit: SubmitHandler<TestimonialScheme> = async (values) => {
    try {
      setIsProcessing(true);

      const data = {
        name: values.name,
        rating: parseInt(values.rating),
        review: values.review,
        created_at: new Date(Date.now()),
      };

      const ref = collection(db, "testimonials");
      await addDoc(ref, data);
      alert("Відгук успішно додано!");
      reset();
      setIsProcessing(false);
      router.push("/admin/testimonials");
    } catch (error) {
      setIsProcessing(false);
      alert(error);
    }
  };

  return (
    <div className="p-[24px]">
      <h1 className="mb-[24px] text-3xl font-bold">Додати відгук</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[2rem] flex w-full flex-col items-start justify-start gap-4 space-y-2 md:mt-0"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              errorText={errors.name?.message}
              placeholder="Ім'я"
            />
          )}
        />

        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              errorText={errors.rating?.message}
              placeholder="Оцінка"
            />
          )}
        />

        <Controller
          name="review"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              errorText={errors.review?.message}
              placeholder="Текст відгуку польскою мовою"
            />
          )}
        />

        <button
          className={`w-full min-w-[325px] rounded-[1rem] border px-4 py-2 transition-all hover:bg-gray-400/50 md:w-[200px]`}
          type="submit"
        >
          {isProcessing ? "Обробка" : "Додати"}
        </button>
      </form>
    </div>
  );
};

export default AddTestimonial;
