"use client";

import * as z from "zod";
import { useState, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { defaultValues } from "./defaultValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "./validationSchema";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import TextInput from "../ui/TextInput";
import PasswordInput from "../ui/PasswordInput";

const Login = () => {
  const router = useRouter();
  const session = useSession();
  const [isProcessing, setIsProcessing] = useState(false);

  console.log(session);

  useEffect(() => {
    if (session.data && session?.status === "authenticated") {
      router.replace("/admin/applications");
    }
  }, [session, router]);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof loginScheme>>({
    resolver: zodResolver(loginScheme),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginScheme>> = async (
    values: z.infer<typeof loginScheme>
  ) => {
    try {
      setIsProcessing(true);
      const callback = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      setIsProcessing(false);
      if (callback?.ok) {
        router.replace("/admin/applications");
        router.refresh();
      }
    } catch (error: any) {
      setError("password", {
        message: "Невірний логін або пароль",
      });
    }
  };

  return (
    <section className="w-full min-h-[100vh] flex flex-col justify-center items-center">
      <div className=" flex flex-col justify-center items-center mb-[2rem]">
        <h1 className="text-3xl font-bold">Адміністрування сайту</h1>
        <p className="text-center text-sm">
          Для входу на панель адміністратора
          <br />
          підтвердіть свій акаунт
        </p>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[50vw] flex flex-col justify-center items-center gap-[1rem]"
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                title={`Введіть логін:`}
                {...field}
                errorText={errors.email?.message}
                placeholder="Логін"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                title={`Введіть пароль:`}
                {...field}
                errorText={errors.password?.message}
                placeholder="Пароль"
              />
            )}
          />
          <div>
            <button
              type="submit"
              disabled={isProcessing}
              className={`rounded-md border border-blue-700 shadow-sm shadow-blue-700 py-2 px-4 w-[250px] disabled:border-gray-200 disabled:shadow-none disabled:cursor-not-allowed mt-[2rem] ${
                !isValid
                  ? "border-blue-700 shadow-sm shadow-blue-700"
                  : "border-green-700 shadow-md hover:shadow-md shadow-green-700 hover:shadow-green-700"
              }`}
            >
              {isProcessing ? "Обробка запиту..." : "Увійти"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
