'use server'

import { Indicator } from "@/lib/generated/prisma"
import db from "@/lib/prisma"
import { BulkResultItem } from "@/lib/types";

export const addIndicatorAuditToCurrentPeriod = async (item: Indicator) => {
  try {
    const lastPeriod = await db.period.findFirst({
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' }
    });

    if (!lastPeriod) {
      return {
        error: true,
        message: 'Tidak ada periode yang aktif.'
      }
    }

    const indicator = await db.indicator.findFirst({
      where: {
        id: item.id,
        deletedAt: null,
      },
    });

    if (!indicator) {
      return {
        error: true,
        message: 'Indikator tidak valid atau sudah dihapus.',
      };
    }

    const existing = await db.indicatorAudit.findFirst({
      where: {
        indicatorId: indicator.id,
        periodId: lastPeriod.id,
        deletedAt: null
      }
    });

    if (existing) {
      return {
        success: true,
        isExist: true,
        message: 'Indikator telah ada di periode aktif.',
      };
    }

    const criteria = await db.criteria.findFirst({
      where: {
        id: item.criteriaId,
        deletedAt: null,
      },
    });

    if (!criteria) {
      return {
        error: true,
        message: 'Kriteria tidak valid atau sudah dihapus.',
      };
    }

    let criteriaAudit = await db.criteriaAudit.findFirst({
      where: {
        periodId: lastPeriod.id,
        criteriaId: criteria.id
      }
    });

    if (!criteriaAudit) {
      criteriaAudit = await db.criteriaAudit.create({
        data: {
          periodId: lastPeriod.id,
          criteriaId: criteria.id
        }
      });
    }

    await db.indicatorAudit.create({
      data: {
        indicatorId: indicator.id,
        criteriaAuditId: criteriaAudit.id,
        periodId: lastPeriod.id
      }
    });

    return {
      success: true,
      message: 'Indikator berhasil ditambahkan ke periode aktif'
    }
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

export const addIndicatorsAuditByCriteria = async (criteriaId: string) => {
  try {
    const lastPeriod = await db.period.findFirst({
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' }
    });

    if (!lastPeriod) {
      return {
        error: true,
        message: 'Tidak ada periode yang aktif.'
      };
    }

    const criteria = await db.criteria.findFirst({
      where: {
        id: criteriaId,
        deletedAt: null
      }
    });

    if (!criteria) {
      return {
        error: true,
        message: 'Kriteria tidak valid atau sudah dihapus.'
      };
    }

    let criteriaAudit = await db.criteriaAudit.findFirst({
      where: {
        periodId: lastPeriod.id,
        criteriaId: criteria.id
      }
    });

    if (!criteriaAudit) {
      criteriaAudit = await db.criteriaAudit.create({
        data: {
          periodId: lastPeriod.id,
          criteriaId: criteria.id
        }
      });
    }

    const items = await db.indicator.findMany({
      where: {
        criteriaId: criteria.id,
        deletedAt: null
      }
    });

    const results: BulkResultItem[] = [];

    for (const item of items) {
      const existing = await db.indicatorAudit.findFirst({
        where: {
          indicatorId: item.id,
          periodId: lastPeriod.id,
          deletedAt: null
        }
      });

      if (existing) {
        results.push({
          id: item.code,
          status: 'skipped',
          reason: 'Sudah ada di periode aktif.'
        });
        continue;
      }

      await db.indicatorAudit.create({
        data: {
          indicatorId: item.id,
          criteriaAuditId: criteriaAudit.id,
          periodId: lastPeriod.id
        }
      });

      results.push({
        id: item.code,
        status: 'success'
      });
    }

    return {
      success: true,
      message: 'Proses penambahan indikator selesai.',
      results
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    };
  }
};
