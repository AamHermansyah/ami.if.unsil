import { z } from "zod";

export const indicatorSchema = z.object({
  criteriaId: z.string().min(1, { message: "Kriteria harus dipilih" }),
  type: z.enum(["UTAMA", "TAMBAHAN"]),
  numberCode: z
    .string()
    .min(1, { message: "Kode angka harus diisi" })
    .regex(/^\d+$/, { message: "Kode angka hanya boleh berisi angka" }),
  description: z
    .string()
    .min(50, { message: "Deskripsi terlalu pendek" }),
});

export type IndicatorValues = z.infer<typeof indicatorSchema>;
