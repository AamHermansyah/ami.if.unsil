'use server'

import db from "@/lib/prisma"
import { indicatorSchema, IndicatorValues } from "@/lib/schemas/indicator"
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
        message: `Kriteria dengan kode '${parsed.data.criteriaId}' tidak ditemukan.`,
      };
    }

    const code = `${criteria.code}/${parsed.data.codeLetter}/${parsed.data.codeNumber}`

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
        criteriaId: parsed.data.criteriaId,
        title: parsed.data.description,
        createdBy,
      },
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

// type UpdateCriteriaInput = CriteriaValues & {
//   id: string
//   updatedBy: string
// }

// export async function updateCriteria(input: UpdateCriteriaInput) {
//   const { id, title, code, updatedBy } = input

//   // Validasi input
//   const parsed = criteriaSchema.safeParse({ title, code })

//   if (!parsed.success) {
//     const tree = z.treeifyError(parsed.error)

//     return {
//       error: true,
//       message: tree.errors.join(', ')
//     }
//   }

//   try {
//     const existing = await db.criteria.findUnique({
//       where: { id }
//     })

//     if (!existing) {
//       return {
//         error: true,
//         message: 'Kriteria tidak ditemukan.'
//       }
//     }

//     const updatedCriteria = await db.criteria.update({
//       where: { id },
//       data: {
//         title: parsed.data.title,
//         code: parsed.data.code
//       }
//     })

//     // Tambahkan log aktivitas
//     await db.userActivityLog.create({
//       data: {
//         userId: updatedBy,
//         action: "UPDATE",
//         table: "CRITERIA",
//         recordId: updatedCriteria.id,
//         note: `Memperbarui kriteria '${existing.code}' → '${updatedCriteria.code}' dan judul '${existing.title}' → '${updatedCriteria.title}'`
//       }
//     })

//     return {
//       success: true,
//       data: updatedCriteria
//     }

//   } catch (error) {
//     return {
//       error: true,
//       message: (error as Error).message
//     }
//   }
// }