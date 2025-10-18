"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { CATEGORIES } from "@/constants/categories";
import { generateSlug } from "@/helpers/generateSlug";
import { useRouter } from "@/i18n/routing";
import { auth, db } from "@/lib/firebase";
import "@/styles/quill.css";
import { translateText } from "@/utils/translator";
import FirebaseUpload from "@/components/ui/firebase-upload";
import Multiselect from "@/components/ui/multi-select";
import TextArea from "@/components/ui/text-area";
import TextInput from "@/components/ui/text-input";
import { TGalleryScheme, gallerySchema } from "./schema";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] w-full animate-pulse rounded-md bg-slate-100" />
  ),
});

const AddGallery = () => {
  const router = useRouter();
  const t = useTranslations("Filters.categories");
  const [isProcessing, setIsProcessing] = useState(false);

  const options = Object.entries(CATEGORIES)
    .map(([key, value]) => ({
      value: key,
      label: t(value),
    }))
    .filter((option) => option.value !== "ALL");

  console.log(options);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TGalleryScheme>({
    resolver: zodResolver(gallerySchema),
    mode: "onChange",
    defaultValues: {
      car: "",
      categories: [],
      images: "",
      desc: "",
      fullDesc: "",
      youtubeUrl: "",
    },
  });

  const onSubmit: SubmitHandler<TGalleryScheme> = async (values) => {
    // Check authentication before proceeding
    if (!auth.currentUser) {
      alert("Ви повинні бути авторизовані для виконання цієї дії!");
      return;
    }

    try {
      setIsProcessing(true);

      if (!values.images || values.images.length === 0) {
        throw new Error("Будь ласка, виберіть хоча б одну картинку");
      }

      const translatedDescUA = await translateText(values.desc, "uk");
      const translatedFullDescUA = await translateText(values.fullDesc, "uk");
      const translatedDescEN = await translateText(values.desc, "en");
      const translatedFullDescEN = await translateText(values.fullDesc, "en");

      // Firebase Storage URLs are already available in values.images
      const imageUrls = Array.isArray(values.images) ? values.images : [];

      const data = {
        car: values.car,
        slug: generateSlug(values.car),
        categories: values.categories,
        images: imageUrls,
        desc: {
          pl: values.desc,
          ua: translatedDescUA,
          en: translatedDescEN,
        },
        fullDesc: {
          pl: values.fullDesc,
          ua: translatedFullDescUA,
          en: translatedFullDescEN,
        },
        youtubeUrl: values.youtubeUrl,
        created_at: new Date(Date.now()),
      };
      const ref = collection(db, "gallery");
      await addDoc(ref, data);
      alert("Статтю успішно додано!");
      reset();
      setIsProcessing(false);
      router.replace("/admin/gallery");
    } catch (error) {
      setIsProcessing(false);
      alert(error);
    }
  };

  return (
    <div className="p-[24px]">
      <h1 className="mb-[24px] text-3xl font-bold">Додати статтю в галерею</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[2rem] flex w-full flex-col items-start justify-start gap-4 space-y-2 md:mt-0"
      >
        <Controller
          name="car"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              errorText={errors.car?.message}
              placeholder="Марка автомобилю"
            />
          )}
        />

        <Controller
          name="categories"
          control={control}
          rules={{ required: "Please select at least one category" }}
          render={({ field: { onChange, value, ref, ...rest } }) => (
            <Multiselect
              {...rest}
              ref={ref}
              options={options}
              value={options.filter((option) => value?.includes(option.value))} // Transform string[] to MultiValue
              onChange={
                (selected) => onChange(selected.map((option) => option.value)) // Transform MultiValue to string[]
              }
              errorText={errors.categories?.message}
              placeholder="Категорії ремонту"
            />
          )}
        />

        <Controller
          name="images"
          control={control}
          rules={{ required: "File is required" }}
          render={({ field: { onChange, value } }) => (
            <div>
              <label htmlFor="file-upload" className="mr-4 text-sm font-medium">
                Завантажити фото
              </label>
              <FirebaseUpload
                folder="gallery"
                multiple={true}
                value={Array.isArray(value) ? value : value ? [value] : []}
                onChange={(urls) => {
                  onChange(urls);
                }}
              />
              {errors.images && (
                <span className="text-xs text-red-500">
                  {errors.images?.message}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name="youtubeUrl"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              errorText={errors.youtubeUrl?.message}
              placeholder="YouTube URL (опціонально)"
            />
          )}
        />

        <Controller
          name="desc"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              errorText={errors.desc?.message}
              placeholder="Короткий опис польскою мовою"
            />
          )}
        />

        <Controller
          name="fullDesc"
          control={control}
          render={({ field }) => (
            <div className="w-[500px]">
              <ReactQuill
                {...field}
                theme="snow"
                placeholder="Повний опис польскою мовою"
                className={`${errors.fullDesc ? "quill-error" : ""}`}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                  ],
                }}
              />
              {errors.fullDesc && (
                <span className="text-xs text-red-500">
                  {errors.fullDesc?.message}
                </span>
              )}
            </div>
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

export default AddGallery;
