// schemas/edit-profile-schema.ts
import { z } from "zod"

export const editProfileSchema = z.object({
  name: z.string().min(3, "Nama lengkap wajib diisi"),
  nidn: z.string().min(1, "NIDN wajib diisi"),
  gender: z.enum(["L", "P"]),
  placeOfBirth: z.string().min(1, "Tempat lahir wajib diisi"),
  dateOfBirth: z.coerce.date(),
  religion: z.string().optional(),
  citizenship: z.string().optional(),
  email: z.email("Email tidak valid"),
  phone: z.string().min(8, "Nomor telepon tidak valid"),
  city: z.string().optional(),
  province: z.string().optional(),
  zipCode: z.string().optional(),
  address: z.string().optional(),
})

export type EditProfileInput = z.input<typeof editProfileSchema>
export type EditProfileOutput = z.output<typeof editProfileSchema>
