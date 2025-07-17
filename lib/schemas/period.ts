import { z } from "zod";

export const periodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Nama periode wajib diisi" })
    .max(100, { message: "Nama periode tidak boleh lebih dari 100 karakter" }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
}).refine((data) => data.endDate > data.startDate, {
  message: "Tanggal selesai harus setelah tanggal mulai",
  path: ["endDate"],
});

export type InputPeriodValues = z.input<typeof periodSchema>
export type OutputPeriodValues = z.output<typeof periodSchema>
