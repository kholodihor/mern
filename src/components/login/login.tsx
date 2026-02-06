"use client";

import PasswordInput from "@/components/ui/password-input";
import TextInput from "@/components/ui/text-input";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/i18n/routing";
import { getAuthInstance } from "@/lib/firebase-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import type * as z from "zod";
import { loginScheme } from "./validationSchema";

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
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      router.push("/admin/applications");
    }
  }, [user, router]);

  const onSubmit: SubmitHandler<z.infer<typeof loginScheme>> = async (
    values: z.infer<typeof loginScheme>,
  ) => {
    try {
      const { email, password } = values;
      setIsProcessing(true);
      signInWithEmailAndPassword(getAuthInstance(), email, password).then(
        (userCredential) => {
          console.log(userCredential);
          setIsProcessing(false);
        },
      );
    } catch (error) {
      console.log(error);
      setError("password", {
        message: "Невірний логін або пароль",
      });
    }
  };

  return (
    <section className="flex min-h-[100vh] w-full flex-col items-center justify-center">
      <div className="mb-[2rem] flex flex-col items-center justify-center">
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
          className="flex w-[50vw] flex-col items-center justify-center gap-[1rem]"
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
              className={`mt-[2rem] w-[250px] rounded-[0.7rem] border border-white px-4 py-2 shadow-sm hover:bg-white/20 disabled:cursor-not-allowed disabled:border-gray-200 disabled:shadow-none ${
                !isValid
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
