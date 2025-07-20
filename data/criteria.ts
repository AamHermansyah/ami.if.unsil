'use server'

import db from '@/lib/prisma'

interface ConfigGet {
  q?: string;
}

export async function getAllCriteriaWithIndicatorCount(config?: ConfigGet) {
  const { q } = config || {};

  try {
    const criterias = await db.criteria.findMany({
      where: {
        deletedAt: null,
        ...(q && {
          OR: [
            { code: { contains: q, mode: 'insensitive' } },
            { title: { contains: q, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        _count: {
          select: {
            indicators: {
              where: { deletedAt: null }
            }
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const result = criterias.map((criteria) => {
      const { _count, ...others } = criteria;

      return {
        ...others,
        totalIndicator: _count.indicators,
      };
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
}

