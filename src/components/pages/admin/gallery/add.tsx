"use client"

import { useState } from "react"
import { useRouter } from "@/i18n/routing"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { gallerySchema, TGalleryScheme } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { db } from "@/lib/firebase"
import { addDoc, collection } from "firebase/firestore"
import { translateText } from "@/utils/translator"
import { getImageUrlsFromGroup } from '@/utils/imageFetcher';
import { CATEGORIES } from '@/constants/categories';
import { Widget } from "@uploadcare/react-widget";

import TextArea from "@/components/ui/text-area"
import TextInput from "@/components/ui/text-input"
import Multiselect from "@/components/ui/multi-select"

const AddGallery = () => {
  const router = useRouter()
  const t = useTranslations("Filters.categories")
  const [isProcessing, setIsProcessing] = useState(false)

  const options = Object.entries(CATEGORIES).map(([key, value]) => ({
    value: key,
    label: t(value),
  })).filter(option => option.value !== 'ALL');


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
      images: '',
      desc: "",
      fullDesc: "",
    },
  })


  const onSubmit: SubmitHandler<TGalleryScheme> = async (values) => {
    try {
      setIsProcessing(true);

      const translatedDescUA = await translateText(values.desc, 'uk');
      const translatedFullDescUA = await translateText(values.fullDesc, 'uk');
      const translatedDescEN = await translateText(values.desc, 'en');
      const translatedFullDescEN = await translateText(values.fullDesc, 'en');

      const images = await getImageUrlsFromGroup(values.images)
      const urls = images.map((image: any) => `https://ucarecdn.com/${image.file_id}/${image.filename}`)

      const data = {
        car: values.car,
        slug: values.car.toLowerCase().replace(/\s+/g, '-'),
        categories: values.categories,
        images: urls,
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
        created_at: new Date(Date.now()),
      };
      const ref = collection(db, 'gallery');
      await addDoc(ref, data);
      alert('Статтю успішно додано!')
      reset();
      setIsProcessing(false);
      router.push('/admin/gallery');
    } catch (error) {
      setIsProcessing(false);
      alert(error);
    }
  };

  return (
    <div className="p-[24px]">
      <h1 className="text-3xl font-bold mb-[24px]">Додати статтю в галерею</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 gap-4 flex flex-col 
  justify-start items-start w-full mt-[2rem] md:mt-0"
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
              onChange={(selected) =>
                onChange(selected.map((option) => option.value)) // Transform MultiValue to string[]
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
          render={({ field: { onChange, value, ref } }) => (
            <div>
              <label htmlFor="file-upload" className="text-sm font-medium mr-4">
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
            <TextArea
              {...field}
              errorText={errors.fullDesc?.message}
              placeholder="Повний опис польскою мовою"
            />
          )}
        />

        <button
          className={`w-full md:w-[200px] rounded-[1rem] min-w-[325px] border py-2 px-4 
      transition-all hover:bg-gray-400/50`}
          type="submit"
        >
          {isProcessing ? "Обробка" : "Додати"}
        </button>
      </form>
    </div>
  )
}

export default AddGallery
