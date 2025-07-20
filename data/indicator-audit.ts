'use server'

import { AchievementLabel, FindingStatus, Prisma } from '@/lib/generated/prisma';
import db from '@/lib/prisma'

interface ConfigIndicatorAuditGet {
  q?: string;
  limit?: number;
  page?: number;
  criteriaId?: string;
  achievementLabel?: AchievementLabel;
  periodId: string;
  findingStatus?: FindingStatus;
}

export async function getAllIndicatorAudits(config?: ConfigIndicatorAuditGet) {
  const {
    q,
    limit = 10,
    page = 1,
    criteriaId,
    achievementLabel,
    periodId,
    findingStatus,
  } = config || {};

  const period = await db.period.findUnique({
    where: { id: periodId }
  });

  if (!period) {
    return {
      success: true,
      data: {
        items: [],
        total: 0,
        page,
        limit,
        totalPages: 1,
      },
    };
  }

  const whereClause: Prisma.IndicatorAuditWhereInput = {
    deletedAt: null,
    ...(q && {
      OR: [
        {
          Indicator: {
            title: { contains: q, mode: 'insensitive' },
          },
        },
        {
          Indicator: {
            code: { contains: q, mode: 'insensitive' },
          },
        },
      ],
    }),
    ...(criteriaId && {
      criteriaAudit: {
        criteriaId: criteriaId,
      },
    }),
    ...(achievementLabel && { achievementLabel }),
    ...(periodId && { periodId }),
    ...(findingStatus && { findingStatus }),
  };

  try {
    const [items, total] = await Promise.all([
      db.indicatorAudit.findMany({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
        orderBy: {
          Indicator: {
            code: 'desc'
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          Indicator: true,
          period: true,
        },
      }),
      db.indicatorAudit.count({
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

export async function getIndicatorAuditByIndicatorCodeAndPeriod(
  code: string,
  periodId: string
) {
  try {
    const audit = await db.indicatorAudit.findFirst({
      where: {
        deletedAt: null,
        Indicator: {
          code: code,
        },
        periodId: periodId,
      },
      include: {
        Indicator: true,
        period: true,
        criteriaAudit: {
          include: { criteria: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!audit) {
      return {
        success: false,
        message: "IndicatorAudit not found for given code and period.",
      };
    }

    return {
      success: true,
      data: audit,
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
}
