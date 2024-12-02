import { z } from "zod";

export const testimonialScheme = z.object({
  name: z.string(),
  review: z.string().max(150, "Відгук має містити максимум 150 символів"),
  rating: z.string(),
});

export type TestimonialScheme = z.infer<typeof testimonialScheme>;
