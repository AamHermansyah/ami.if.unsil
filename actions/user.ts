'use server'

import db from "@/lib/prisma"
import { EditProfileOutput } from "@/lib/schemas/profile"

export async function updateUser(input: EditProfileOutput, id: string) {
  try {
    const existing = await db.user.findUnique({
      where: { id }
    })

    if (!existing) {
      return {
        error: true,
        message: 'Pengguna tidak ditemukan.'
      }
    }

    const { email, ...payload } = input;

    const updatedUser = await db.user.update({
      where: { id },
      data: { ...payload }
    });

    return {
      success: true,
      data: updatedUser
    }

  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}