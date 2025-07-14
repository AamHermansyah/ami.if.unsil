import z from 'zod'

export const accessSchema = z.object({
  email: z.email({ message: 'Format email tidak valid' }),
  role: z.enum(['AUDITEE', 'AUDITOR']),
})

export type AccessValues = z.infer<typeof accessSchema>
