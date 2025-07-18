'use server'

import { Prisma } from '@/lib/generated/prisma';
import db from '@/lib/prisma'

interface ConfigGet {
  q?: string;
  limit?: number;
  page?: number;
  criteriaId?: string;
}

export async function getAllIndicators(config?: ConfigGet) {
  const { q, limit = 10, page = 1, criteriaId } = config || {};

  const whereClause: Prisma.IndicatorWhereInput = {
    ...(q && {
      OR: [
        { code: { contains: q, mode: 'insensitive' } },
        { title: { contains: q, mode: 'insensitive' } },
      ],
    }),
    ...(criteriaId && { criteriaId }),
  };

  try {
    const [items, total] = await Promise.all([
      db.indicator.findMany({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { criteria: true }
      }),
      db.indicator.count({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      }),
    ]);

    return {
      success: true,
      data: {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
}

export async function getAllIndicatorsByCriteriaCode(criteriaCode: string) {
  try {
    const criteria = await db.criteria.findUnique({
      where: { code: criteriaCode },
      include: { indicators: true }
    });

    if (!criteria) {
      return {
        error: false,
        message: 'Kriteria tidak ditemukan'
      }
    }

    return {
      success: true,
      data: criteria.indicators,
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
}

