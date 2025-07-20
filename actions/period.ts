'use server'

import db from "@/lib/prisma";
import { OutputPeriodValues } from "@/lib/schemas/period";

export async function createPeriod(input: OutputPeriodValues) {
  try {
    const existing = await db.period.findUnique({
      where: { name: input.name }
    })

    if (existing) {
      return {
        error: true,
        message: 'Nama periode sudah digunakan.'
      }
    }

    await db.period.updateMany({
      where: { status: 'ACTIVE' },
      data: { status: 'NONACTIVE' }
    })

    const period = await db.period.create({
      data: {
        ...input,
        name: input.name.trim(),
        status: 'ACTIVE'
      },
    })

    return {
      success: true,
      data: period
    }

  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

export async function updatePeriod(input: OutputPeriodValues & { id: string }) {
  try {
    const existing = await db.period.findUnique({
      where: { id: input.id }
    })

    if (!existing) {
      return {
        error: true,
        message: 'Periode tidak ditemukan.'
      }
    }

    const updatedAccess = await db.period.update({
      where: { id: input.id },
      data: {
        name: input.name.trim(),
        startDate: input.startDate,
        endDate: input.endDate
      }
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

export async function removePeriod(id: string) {
  try {
    const existing = await db.period.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            criteriaAudits: true,
          }
        }
      }
    })

    if (!existing) {
      return {
        error: true,
        message: 'Periode tidak ditemukan.',
      }
    }

    if (existing._count.criteriaAudits > 0) {
      return {
        error: true,
        message: 'Periode tidak bisa dihapus karena sudah memiliki data audit yang terkait.',
      }
    }

    await db.period.delete({ where: { id } })

    return {
      success: true,
      message: 'Periode telah dihapus.',
    }
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    }
  }
}