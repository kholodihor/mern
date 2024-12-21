import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(1, "Заголовок є обов'язковим"),
  image: z.string().min(1, "Зображення є обов'язковим"),
  short_text: z.string().max(150, "Короткий опис має містити максимум 150 символів"),
  full_text: z.string().min(1, "Повний опис є обов'язковим"),
});

export type TNewsScheme = z.infer<typeof newsSchema>;