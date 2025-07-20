'use server'

import db from "@/lib/prisma"
import { criteriaSchema, CriteriaValues } from "@/lib/schemas/criteria"
import { randomBytes } from "crypto"
import z from "zod"

type CreateCriteriaInput = CriteriaValues & {
  createdBy: string
}

export async function createCriteria(input: CreateCriteriaInput) {
  const { title, code, createdBy } = input

  // Validasi ulang dengan safeParse
  const parsed = criteriaSchema.safeParse({ title, code })

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);

    return {
      error: true,
      message: tree.errors.join(', '),
    }
  }

  try {
    const existing = await db.criteria.findUnique({
      where: { code: parsed.data.code },
    });

    if (existing) {
      return {
        error: true,
        message: `Kode '${parsed.data.code}' sudah digunakan.`,
      };
    }

    const newCriteria = await db.criteria.create({
      data: {
        title: parsed.data.title,
        code: parsed.data.code,
        createdBy,
      },
    })

    // Tambahkan log aktivitas
    await db.userActivityLog.create({
      data: {
        userId: createdBy,
        action: "CREATE",
        table: "CRITERIA",
        recordId: newCriteria.id,
        note: `Membuat kriteria baru dengan kode '${newCriteria.code}' dan judul '${newCriteria.title}'`
      }
    })

    return {
      success: true,
      data: newCriteria
    }

  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

type UpdateCriteriaInput = CriteriaValues & {
  id: string
  updatedBy: string
}

export async function updateCriteria(input: UpdateCriteriaInput) {
  const { id, title, code, updatedBy } = input

  // Validasi input
  const parsed = criteriaSchema.safeParse({ title, code })

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error)

    return {
      error: true,
      message: tree.errors.join(', ')
    }
  }

  try {
    const existing = await db.criteria.findUnique({
      where: { id }
    })

    if (!existing) {
      return {
        error: true,
        message: 'Kriteria tidak ditemukan.'
      }
    }

    const updatedCriteria = await db.criteria.update({
      where: { id },
      data: {
        title: parsed.data.title,
        code: parsed.data.code
      }
    })

    // Tambahkan log aktivitas
    await db.userActivityLog.create({
      data: {
        userId: updatedBy,
        action: "UPDATE",
        table: "CRITERIA",
        recordId: updatedCriteria.id,
        note: `Memperbarui kriteria '${existing.code}' → '${updatedCriteria.code}' dan judul '${existing.title}' → '${updatedCriteria.title}'`
      }
    })

    return {
      success: true,
      data: updatedCriteria
    }

  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

export async function deleteCriteria(id: string) {
  try {
    const existing = await db.criteria.findUnique({
      where: { id },
    });

    if (!existing || existing.deletedAt) {
      return {
        error: true,
        message: 'Kriteria tidak ditemukan.',
      };
    }

    const randomCode = `deleted-${randomBytes(4).toString('hex')}`;

    await db.criteria.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        code: randomCode
      },
    });

    return {
      success: true,
      message: 'Kriteria telah dihapus.',
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
}