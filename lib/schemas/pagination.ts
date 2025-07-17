import z from "zod";

export const paginationSchema = z.object({
  q: z.string().trim().optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Page harus berupa angka positif",
    }),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => !isNaN(val) && val > 0 && val <= 100, {
      message: "Limit harus berupa angka antara 1 hingga 100",
    }),
});