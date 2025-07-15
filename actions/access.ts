'use server'

import { Status } from "@/lib/generated/prisma";
import db from "@/lib/prisma"
import { accessSchema, AccessValues } from "@/lib/schemas/access"
import z from "zod"

export async function createAccess(input: AccessValues) {
  const parsed = accessSchema.safeParse(input);

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);

    return {
      error: true,
      message: tree.errors.join(', '),
    }
  }

  try {
    const existing = await db.access.findUnique({
      where: { email: parsed.data.email }
    })

    if (existing) {
      return {
        error: true,
        message: 'Email sudah terdaftar.'
      }
    }

    const access = await db.access.create({
      data: { ...parsed.data },
    })

    return {
      success: true,
      data: access
    }

  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

export async function updateAccess(input: AccessValues) {
  const parsed = accessSchema.safeParse(input)

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error)

    return {
      error: true,
      message: tree.errors.join(', ')
    }
  }

  try {
    const existing = await db.access.findUnique({
      where: { email: parsed.data.email }
    })

    if (!existing) {
      return {
        error: true,
        message: 'Email tidak ditemukan.'
      }
    }

    const updatedAccess = await db.access.update({
      where: { email: parsed.data.email },
      data: { role: parsed.data.role }
    });

    return {
      success: true,
      data: updatedAccess
    }

  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

export async function updateStatusAccess(status: Status, email: string) {
  try {
    const existing = await db.access.findUnique({
      where: { email }
    })

    if (!existing) {
      return {
        error: true,
        message: 'Email tidak ditemukan.'
      }
    }

    const updatedAccess = await db.access.update({
      where: { email },
      data: { status }
    });

    return {
      success: true,
      data: updatedAccess
    }
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

export async function removeAccess(email: string) {
  try {
    const existing = await db.access.findUnique({
      where: { email },
      include: { user: true }
    })

    if (!existing) {
      return {
        error: true,
        message: 'Email tidak ditemukan.'
      }
    }

    if (existing.user) {
      return {
        error: true,
        message: 'Email ini sudah pernah melakukan login.'
      }
    }

    await db.access.delete({ where: { email } });

    return {
      success: true,
      message: 'Email telah dihapus.'
    }
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}