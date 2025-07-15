import z from 'zod'

export const accessSchema = z.object({
  email: z
    .email({ message: 'Format email tidak valid' })
    .refine((val) => val.endsWith('unsil.ac.id'), {
      message: 'Email harus menggunakan domain unsil.ac.id',
    }),
  role: z.enum(['AUDITEE', 'AUDITOR']),
})

export type AccessValues = z.infer<typeof accessSchema>
