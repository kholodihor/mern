"use client"

import { useState } from "react"
import { useRouter } from "@/i18n/routing"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { TestimonialScheme, testimonialScheme } from './schema'
import { zodResolver } from "@hookform/resolvers/zod"
import { db } from "@/lib/firebase"
import { addDoc, collection } from "firebase/firestore"

import TextArea from "@/components/ui/text-area"
import TextInput from "@/components/ui/text-input"

const AddTestimonial = () => {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)


  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TestimonialScheme>({
    resolver: zodResolver(testimonialScheme),
    mode: "onChange",
    defaultValues: {
      name: '',
      review: '',
      rating: '',
    },
  })


  const onSubmit: SubmitHandler<TestimonialScheme> = async (values) => {
    try {
      setIsProcessing(true);

      const data = {
        name: values.name,
        rating: parseInt(values.rating),
        review: values.review,
        created_at: new Date(Date.now()),
      };

      const ref = collection(db, 'testimonials');
      await addDoc(ref, data);
      alert('Відгук успішно додано!')
      reset();
      setIsProcessing(false);
      router.push('/admin/testimonials');
    } catch (error) {
      setIsProcessing(false);
      alert(error);
    }
  };

  return (
    <div className="p-[24px]">
      <h1 className="text-3xl font-bold mb-[24px]">Додати відгук</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 gap-4 flex flex-col 
  justify-start items-start w-full mt-[2rem] md:mt-0"
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

export default AddTestimonial

