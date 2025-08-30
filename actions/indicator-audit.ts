'use server'

import { Indicator } from "@/lib/generated/prisma"
import db from "@/lib/prisma"
import { indicatorAuditReviewSchema, IndicatorAuditReviewValues, indicatorAuditSchema, IndicatorAuditValues } from "@/lib/schemas/indicator-audit";
import { BulkResultItem } from "@/lib/types";
import { getAchievmentLabel } from "@/lib/utils";
import z from "zod";

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

type UpdateIndicatorAuditInput = IndicatorAuditValues & {
  id: string;
  updatedBy: string;
}

export async function updateIndicatorAudit(input: UpdateIndicatorAuditInput) {
  const { id, updatedBy, ...others } = input;

  const parsed = indicatorAuditSchema.safeParse(others);

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    return {
      error: true,
      message: tree.errors.join(", "),
    };
  }

  try {
    const existing = await db.indicatorAudit.findUnique({
      where: {
        id,
        deletedAt: null
      },
      include: {
        period: true
      }
    });

    if (!existing) {
      return {
        error: true,
        message: "Data indikator audit tidak ditemukan.",
      };
    }

    const { startDate, endDate, status } = existing.period;
    const now = new Date();

    if (status === 'NONACTIVE' || new Date(endDate) < now) {
      return {
        error: true,
        message: "Periode sudah berakhir, data audit tidak bisa diperbarui.",
      };
    }

    if (new Date(startDate) > now) {
      return {
        error: true,
        message: "Periode belum dimulai, data audit belum bisa diperbarui.",
      };
    }

    const updatedAudit = await db.indicatorAudit.update({
      where: { id },
      data: {
        ...parsed.data,
        achievement: +parsed.data.achievement,
        achievementLabel: getAchievmentLabel(+parsed.data.achievement)
      },
    });

    await db.userActivityLog.create({
      data: {
        userId: updatedBy,
        action: "UPDATE",
        table: "INDICATOR_AUDIT",
        recordId: updatedAudit.id,
        note: `Memperbarui data hasil keluaran`,
      },
    });

    return {
      success: true,
      data: updatedAudit,
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
}

type UpdateIndicatorAuditReviewInput = IndicatorAuditReviewValues & {
  id: string;
  updatedBy: string;
}

export async function updateIndicatorAuditReview(input: UpdateIndicatorAuditReviewInput) {
  const { id, updatedBy, ...others } = input;

  const parsed = indicatorAuditReviewSchema.safeParse(others);

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    return {
      error: true,
      message: tree.errors.join(", "),
    };
  }

  try {
    const existing = await db.indicatorAudit.findUnique({
      where: {
        id,
        deletedAt: null
      },
      include: {
        period: true
      }
    });

    if (!existing) {
      return {
        error: true,
        message: "Data indikator audit tidak ditemukan.",
      };
    }

    const { startDate, endDate, status } = existing.period;
    const now = new Date();

    if (status === 'NONACTIVE' || new Date(endDate) < now) {
      return {
        error: true,
        message: "Periode sudah berakhir, data audit tidak bisa diperbarui.",
      };
    }

    if (new Date(startDate) > now) {
      return {
        error: true,
        message: "Periode belum dimulai, data audit belum bisa diperbarui.",
      };
    }

    const updatedAudit = await db.indicatorAudit.update({
      where: { id },
      data: { ...parsed.data },
    });

    await db.userActivityLog.create({
      data: {
        userId: updatedBy,
        action: "UPDATE",
        table: "INDICATOR_AUDIT",
        recordId: updatedAudit.id,
        note: `Memberikan atau memperbarui review`,
      },
    });

    return {
      success: true,
      data: updatedAudit,
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
}

export async function deleteIndicatorAudit(id: string, deletedBy: string) {
  try {
    const existing = await db.indicatorAudit.findUnique({
      where: {
        id,
        deletedAt: null
      },
    });

    if (!existing || existing.deletedAt) {
      return {
        error: true,
        message: 'Indikator audit tidak ditemukan.',
      };
    }

    const deletedData = await db.indicatorAudit.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await db.userActivityLog.create({
      data: {
        userId: deletedBy,
        action: "DELETE",
        table: "INDICATOR_AUDIT",
        recordId: deletedData.id,
        note: `User dengan id "${deletedBy}" telah menghapus data audit`,
      },
    });

    return {
      success: true,
      message: 'Indikator audit berhasil dihapus.',
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
}
