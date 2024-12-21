'use client'

import TextArea from "@/components/ui/text-area";
import TextInput from "@/components/ui/text-input";
import { useRouter } from "@/i18n/routing";
import { db } from "@/lib/firebase";
import { translateText } from "@/utils/translator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Widget } from "@uploadcare/react-widget";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { newsSchema, TNewsScheme } from "./schema";

const AddNews = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TNewsScheme>({
    resolver: zodResolver(newsSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      image: "",
      short_text: "",
      full_text: "",
    },
  });

  const onSubmit: SubmitHandler<TNewsScheme> = async (values) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      if (!values.image) {
        throw new Error("Please select an image");
      }

      const translatedTitleUA = await translateText(values.title, "uk");
      const translatedDescUA = await translateText(values.short_text, "uk");
      const translatedFullDescUA = await translateText(values.full_text, "uk");
      const translatedTitleEN = await translateText(values.title, "en");
      const translatedDescEN = await translateText(values.short_text, "en");
      const translatedFullDescEN = await translateText(values.full_text, "en");

      const imageUrl = values.image ? `${values.image.replace(/\.\w+$/, ".webp")}` : '';

      const data = {
        title: {
          pl: values.title,
          ua: translatedTitleUA,
          en: translatedTitleEN,
        },
        image: imageUrl,
        short_text: {
          pl: values.short_text,
          ua: translatedDescUA,
          en: translatedDescEN,
        },
        full_text: {
          pl: values.full_text,
          ua: translatedFullDescUA,
          en: translatedFullDescEN,
        },
        created_at: new Date(Date.now()),
      };

      const ref = collection(db, "news");
      await addDoc(ref, data);
      alert("Статтю успішно додано!");
      reset();
      setIsProcessing(false);
      router.replace("/admin/news");
    } catch (error) {
      if (mounted.current) {
        setIsProcessing(false);
        alert(error instanceof Error ? error.message : "An error occurred");
      }
    }
  };

  return (
    <div className="p-[24px]">
      <h1 className="mb-[24px] text-3xl font-bold">Додати статтю в актуальності</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[2rem] flex w-full flex-col items-start justify-start gap-4 space-y-2 md:mt-0"
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              errorText={errors.title?.message}
              placeholder="Заголовок статті польскою мовою"
            />
          )}
        />

        <Controller
          name="image"
          control={control}
          rules={{ required: "File is required" }}
          render={({ field: { onChange, value, ref } }) => (
            <div>
              <label htmlFor="file-upload" className="mr-4 text-sm font-medium">
                Завантажити фото
              </label>
              <Widget
                publicKey="ff76dce7219a0b044f12"
                value={value}
                onChange={(fileInfo) => {
                  onChange(fileInfo.cdnUrl);
                }}
                ref={ref}
              />
              {errors.image && (
                <span className="text-xs text-red-500">
                  {errors.image?.message}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name="short_text"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              errorText={errors.short_text?.message}
              placeholder="Короткий опис польскою мовою"
            />
          )}
        />

        <Controller
          name="full_text"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              errorText={errors.full_text?.message}
              placeholder="Повний опис польскою мовою"
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

export default AddNews;
