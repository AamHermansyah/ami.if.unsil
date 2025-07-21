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
          Indicator: {
            include: { criteria: true }
          },
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
  periodName: string
) {
  try {
    const period = await db.period.findUnique({
      where: { name: periodName }
    });

    if (!period) {
      return {
        success: true,
        message: 'Periode tidak ditemukan',
        data: null
      }
    }

    const audit = await db.indicatorAudit.findFirst({
      where: {
        deletedAt: null,
        Indicator: {
          code: code,
        },
        periodId: period.id,
      },
      include: {
        Indicator: {
          include: { criteria: true }
        },
        period: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!audit) {
      return {
        success: false,
        message: "Indikator audit tidak ditemukan",
        data: null
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

export async function getIndicatorAuditLogs(indicatorAuditId: string) {
  try {
    // Ambil total log
    const totalLogs = await db.userActivityLog.count({
      where: {
        recordId: indicatorAuditId,
      },
    });

    // Ambil 10 log terbaru
    const logs = await db.userActivityLog.findMany({
      where: {
        recordId: indicatorAuditId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            access: true
          },
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    const remaining = totalLogs > 10 ? totalLogs - 10 : 0;

    return {
      success: true,
      data: {
        logs,
        remaining,
      },
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
}

export async function getAchievementPerCriteriaAudit(periodId: string) {
  try {
    const criteriaAudits = await db.criteriaAudit.findMany({
      where: {
        periodId,
        indicatorAudits: {
          some: {
            deletedAt: null,
          },
        },
      },
      include: {
        criteria: true,
        indicatorAudits: {
          where: {
            deletedAt: null,
          },
          include: {
            Indicator: true,
          },
        },
      },
    });

    const results = criteriaAudits.map((criteriaAudit) => ({
      criteriaAuditId: criteriaAudit.id,
      criteriaCode: criteriaAudit.criteria.code,
      criteriaTitle: criteriaAudit.criteria.title,
      indicators: criteriaAudit.indicatorAudits.map((indicatorAudit) => ({
        indicatorAuditId: indicatorAudit.id,
        indicatorCode: indicatorAudit.Indicator.code,
        indicatorTitle: indicatorAudit.Indicator.title,
        achievement: indicatorAudit.achievement,
      })),
    }))

    return {
      success: true,
      data: results
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}