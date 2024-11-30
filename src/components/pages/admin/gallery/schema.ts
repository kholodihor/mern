import { z } from "zod";

export const gallerySchema = z.object({
  car: z
    .string(),
  categories: z
    .array(z.string()),
  images: z.string(),
  desc: z
    .string()
    .max(150, "Короткий опис має містити максимум 150 символів"),
  fullDesc: z
    .string()
});

export type TGalleryScheme = z.infer<typeof gallerySchema>;
