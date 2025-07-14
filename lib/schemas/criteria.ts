import z from 'zod'

export const criteriaSchema = z.object({
  title: z
    .string()
    .min(10, { message: 'Kriteria minimal 10 karakter' }),
  code: z
    .string()
    .length(3, { message: 'Kode harus tepat 3 huruf' })
    .regex(/^[A-Za-z]{3}$/, { message: 'Kode hanya boleh berisi huruf tanpa angka' }),
})

export type CriteriaValues = z.infer<typeof criteriaSchema>
