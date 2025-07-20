'use server'

import db from "@/lib/prisma"
import { indicatorSchema, IndicatorValues } from "@/lib/schemas/indicator"
import { randomBytes } from "crypto"
import z from "zod"

type CreateIndicatorInput = IndicatorValues & {
  createdBy: string
}

export async function createIndicator(input: CreateIndicatorInput) {
  const { createdBy, ...others } = input

  // Validasi ulang dengan safeParse
  const parsed = indicatorSchema.safeParse(others);

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);

    return {
      error: true,
      message: tree.errors.join(', '),
    }
  }

  try {
    const criteria = await db.criteria.findUnique({
      where: { id: parsed.data.criteriaId }
    })

    if (!criteria) {
      return {
        error: true,
        message: "Kriteria dengan tidak ditemukan.",
      };
    }

    const { codeLetter, codeNumber, description, criteriaId } = parsed.data
    const code = `${criteria.code}/${codeLetter.trim()}/${codeNumber.trim()}`;

    const existing = await db.indicator.findUnique({
      where: { code },
    });

    if (existing) {
      return {
        error: true,
        message: `Kode '${existing.code}' sudah digunakan.`,
      };
    }

    const newIndicator = await db.indicator.create({
      data: {
        code,
        criteriaId,
        title: description,
        createdBy,
      },
      include: { criteria: true }
    });

    // Tambahkan log aktivitas
    await db.userActivityLog.create({
      data: {
        userId: createdBy,
        action: "CREATE",
        table: "INDICATOR",
        recordId: newIndicator.id,
        note: `Membuat indikator baru dengan kode '${newIndicator.code}' dan judul '${newIndicator.title}'`
      }
    });

    return {
      success: true,
      data: newIndicator
    }

  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

type UpdateIndicatorInput = IndicatorValues & {
  id: string
  updatedBy: string
}

export async function updateIndicator(input: UpdateIndicatorInput) {
  const { id, updatedBy, ...others } = input;

  const parsed = indicatorSchema.safeParse(others)

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error)

    return {
      error: true,
      message: tree.errors.join(', ')
    }
  }

  try {
    const existing = await db.indicator.findUnique({
      where: { id }
    })

    if (!existing) {
      return {
        error: true,
        message: 'Indikator tidak ditemukan.'
      }
    }

    const { codeLetter, codeNumber, description } = parsed.data
    const criteriaCode = existing.code.split('/')[0];
    const code = `${criteriaCode}/${codeLetter.trim()}/${codeNumber.trim()}`;

    const othersIndicator = await db.indicator.findUnique({
      where: { code }
    });

    if (othersIndicator && (othersIndicator.id !== id)) {
      return {
        error: true,
        message: "Kode indikator telah digunakan",
      };
    }

    const updatedIndicator = await db.indicator.update({
      where: { id },
      data: {
        code,
        title: description
      }
    });

    // Tambahkan log aktivitas
    await db.userActivityLog.create({
      data: {
        userId: updatedBy,
        action: "UPDATE",
        table: "INDICATOR",
        recordId: updatedIndicator.id,
        note: `Memperbarui indikator '${existing.code}' → '${updatedIndicator.code}' dan judul '${existing.title}' → '${updatedIndicator.title}'`
      }
    });

    return {
      success: true,
      data: updatedIndicator
    }

  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

export async function deleteIndicator(id: string) {
  try {
    const existing = await db.indicator.findUnique({
      where: { id },
    });

    if (!existing || existing.deletedAt) {
      return {
        error: true,
        message: 'Indikator tidak ditemukan.',
      };
    }

    const randomCode = `deleted-${randomBytes(4).toString('hex')}`;

    await db.indicator.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        code: randomCode
      },
    });

    return {
      success: true,
      message: 'Indikator telah dihapus.',
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
}