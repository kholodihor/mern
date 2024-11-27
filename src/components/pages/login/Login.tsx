/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "./validationSchema";

import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import TextInput from "@/components/ui/text-input";
import PasswordInput from "@/components/ui/password-input";

const Login = () => {
  const user = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof loginScheme>>({
    resolver: zodResolver(loginScheme),
    mode: "onChange",
    defaultValues: {
      email: '',
      password: ''
    },
  });

  useEffect(() => {
    if (user) {
      router.push("/admin/applications");
    }
  }, [user, router]);

  const onSubmit: SubmitHandler<z.infer<typeof loginScheme>> = async (
    values: z.infer<typeof loginScheme>
  ) => {
    try {
      const { email, password } = values
      setIsProcessing(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential)
          setIsProcessing(false);
        })
    } catch (error: any) {
      console.log(error)
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
              className={`rounded-[0.7rem] border border-white shadow-sm 
               py-2 px-4 w-[250px] disabled:border-gray-200 disabled:shadow-none 
               disabled:cursor-not-allowed mt-[2rem] hover:bg-white/20 ${!isValid
                  ? "border-white shadow-sm shadow-white"
                  : "border-green-700 shadow-md"
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
