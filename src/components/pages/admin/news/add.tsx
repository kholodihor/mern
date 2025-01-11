"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Widget } from "@uploadcare/react-widget";
import { addDoc, collection } from "firebase/firestore";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { convertToWebp } from "@/helpers/convertToWebp";
import { getUploadcareUrls } from "@/helpers/getUploadcareUrls";
import { useRouter } from "@/i18n/routing";
import { db } from "@/lib/firebase";
import "@/styles/quill.css";
import { getImageUrlsFromGroup } from "@/utils/imageFetcher";
import { translateText } from "@/utils/translator";
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

      if (!values.images.length) {
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

      const images = await getImageUrlsFromGroup(values.images);
      const urls = getUploadcareUrls(images);

      const data = {
        title: {
          pl: values.title,
          ua: translatedTitleUA,
          en: translatedTitleEN,
        },
        images: convertToWebp(urls),
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
          render={({ field: { onChange, value, ref } }) => (
            <div>
              <label htmlFor="file-upload" className="mr-4 text-sm font-medium">
                Завантажити фото
              </label>
              <Widget
                publicKey="ff76dce7219a0b044f12"
                multiple={true}
                value={value}
                onChange={(fileInfo) => {
                  onChange(fileInfo.cdnUrl);
                }}
                ref={ref}
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
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? "Обробка..." : "Додати"}
        </button>
      </form>
    </div>
  );
};

export default AddNews;
