"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { generateSlug } from "@/helpers/generateSlug";
import { useRouter } from "@/i18n/routing";
import { db } from "@/lib/firebase";
import "@/styles/quill.css";
import { translateText } from "@/utils/translator";
import FirebaseUpload from "@/components/ui/firebase-upload";
import TextArea from "@/components/ui/text-area";
import TextInput from "@/components/ui/text-input";
import { TNewsScheme, newsSchema } from "./schema";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] w-full animate-pulse rounded-md bg-slate-100" />
  ),
});

const AddNews = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const mounted = useRef(true);
  // const [selectedImages, setSelectedImages] = useState<string[]>([]);

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
      images: "",
      short_text: "",
      full_text: "",
      youtubeUrl: "",
    },
  });

  const onSubmit: SubmitHandler<TNewsScheme> = async (values) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      if (
        !values.images ||
        (Array.isArray(values.images) && values.images.length === 0)
      ) {
        throw new Error("Будь ласка, виберіть хоча б одну картинку");
      }

      console.log("Submitting form with values:", values);
      console.log("Submitting form with images:", values.images);

      const translatedTitleUA = await translateText(values.title, "uk");
      const translatedDescUA = await translateText(values.short_text, "uk");
      const translatedFullDescUA = await translateText(values.full_text, "uk");
      const translatedTitleEN = await translateText(values.title, "en");
      const translatedDescEN = await translateText(values.short_text, "en");
      const translatedFullDescEN = await translateText(values.full_text, "en");

      // Firebase Storage URLs are already available in values.images
      const imageUrls = Array.isArray(values.images)
        ? values.images
        : [values.images];

      // Generate slug from Polish title (primary language)
      const slug = generateSlug(values.title);

      const data = {
        title: {
          pl: values.title,
          ua: translatedTitleUA,
          en: translatedTitleEN,
        },
        slug,
        images: imageUrls,
        youtubeUrl: values.youtubeUrl || "",
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
      <h1 className="mb-[24px] text-3xl font-bold">
        Додати статтю в актуальності
      </h1>
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
          name="images"
          control={control}
          rules={{ required: "File is required" }}
          render={({ field: { onChange, value } }) => (
            <div>
              <label htmlFor="file-upload" className="mr-4 text-sm font-medium">
                Завантажити фото
              </label>
              <FirebaseUpload
                folder="news"
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
              placeholder="URL відео на YouTube (необов'язково)"
            />
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
            <div className="w-[500px]">
              <ReactQuill
                {...field}
                theme="snow"
                placeholder="Повний опис польскою мовою"
                className={`${errors.full_text ? "quill-error" : ""}`}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                  ],
                }}
              />
              {errors.full_text && (
                <span className="text-xs text-red-500">
                  {errors.full_text?.message}
                </span>
              )}
            </div>
          )}
        />

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full min-w-[325px] rounded-[1rem] border px-4 py-2 transition-all hover:bg-gray-400/50 disabled:cursor-not-allowed disabled:opacity-50 md:w-[200px]`}
        >
          {isProcessing ? "Обробка" : "Додати"}
        </button>
      </form>
    </div>
  );
};

export default AddNews;
