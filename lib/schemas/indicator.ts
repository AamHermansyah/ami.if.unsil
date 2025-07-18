import { z } from "zod";

export const indicatorSchema = z.object({
  criteriaId: z.string().min(1, { message: "Kriteria harus dipilih" }),
  codeLetter: z.enum(["T", "U"]),
  codeNumber: z.string().min(1, { message: "Kode angka harus diisi" }),
  description: z
    .string()
    .min(50, { message: "Deskripsi terlalu pendek" }),
});

export type IndicatorValues = z.infer<typeof indicatorSchema>;
