import { z } from "zod";

const nonRussianLettersPattern =
  /^(?!.*\s{2,}|.*[.-]{2,})(?!.*[ЁёЫыЭэЪъ])[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻżІіЇїЄєҐґ\s`’'-]+$/;

const nonRussianLettersWithSymbolsAndDigitsPattern =
  /^(?!.*[ЁёЫыЭэЪъ])[\w\s`’'!"#$№%&()*+,\-–—./:;<=>?@[\\\]^_`{|}~A-Za-zА-Яа-яІіЇїЄєҐґĄąĆćĘęŁłŃńÓóŚśŹźŻż.]+$/;

const emailPattern =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

const phonePattern = /^[0-9()+-]+$/;

const englishUppercaseLettersAndDigitsPattern = /^[\dA-Z]+$/;

export const formValidation = z.object({
  name: z
    .string()
    .min(2, "errors.name_min")
    .refine((value) => nonRussianLettersPattern.test(value), {
      message: `errors.name`,
    }),
  vin: z
    .string()
    .min(17, "errors.vin_min")
    .max(17, "errors.vin_max")
    .refine((value) => englishUppercaseLettersAndDigitsPattern.test(value), {
      message: `errors.vin`,
    }),
  email: z
    .string()
    .min(1, { message: "errors.email_min" })
    .regex(emailPattern, {
      message: "errors.email",
    })
    .refine((value) => !/(.ru|.by)$/.test(value.split("@")[1]), {
      message: "errors.email",
    }),
  phone: z
    .string()
    .min(1, "errors.phone_required")
    .refine((value) => phonePattern.test(value), {
      message: `errors.phone`,
    }),
  message: z
    .string()
    .min(1, { message: "errors.message_required" })
    .refine(
      (value) => nonRussianLettersWithSymbolsAndDigitsPattern.test(value),
      {
        message: `errors.message`,
      }
    ),
});

export type TFormScheme = z.infer<typeof formValidation>;
