import { AchievementLabel, FindingStatus, IndicatorType, Role } from "@/lib/generated/prisma"
import db from "@/lib/prisma"

export async function getDashboardSummary(periodId: string) {
  try {
    // 1. Total CriteriaAudit berdasarkan periode
    const totalCriteriaAudit = await db.criteriaAudit.count({
      where: { periodId },
    })

    // 2. Total IndicatorAudit berdasarkan periode
    const totalIndicatorAudit = await db.indicatorAudit.count({
      where: { periodId },
    })

    // 3. Total Auditee (yang punya user)
    const totalAuditee = await db.access.count({
      where: {
        role: Role.AUDITEE,
        userId: { not: null },
      },
    })

    // 4. Total Auditor (yang punya user)
    const totalAuditor = await db.access.count({
      where: {
        role: Role.AUDITOR,
        userId: { not: null },
      },
    })

    // 5. Progress Audit: IndicatorAudit yang labelnya !== BELUM_DI_AUDIT
    const completedIndicatorAudit = await db.indicatorAudit.count({
      where: {
        periodId,
        achievementLabel: { not: AchievementLabel.BELUM_DI_AUDIT },
        deletedAt: null
      },
    })

    const progressAudit = totalIndicatorAudit
      ? (completedIndicatorAudit / totalIndicatorAudit) * 100
      : 0

    // 6. Rata-rata capaian
    const averageAchievementData = await db.indicatorAudit.aggregate({
      where: {
        periodId,
        deletedAt: null
      },
      _avg: { achievement: true },
    })

    const averageAchievement = averageAchievementData._avg.achievement ?? 0

    // 7. Tingkat kesesuaian (jumlah SESUAI / total)
    const matchingCount = await db.indicatorAudit.count({
      where: {
        periodId,
        findingStatus: FindingStatus.SESUAI,
        deletedAt: null
      },
    })

    const matchingRate = totalIndicatorAudit
      ? (matchingCount / totalIndicatorAudit) * 100
      : 0

    // 8. Total IndicatorAudit berdasarkan FindingStatus
    const findingStatusGroup = await db.indicatorAudit.groupBy({
      by: ["findingStatus"],
      where: {
        periodId,
        deletedAt: null
      },
      _count: true,
    })

    const findingStatusSummary = {
      SESUAI: 0,
      OBSERVASI: 0,
      KTS_MINOR: 0,
      KTS_MAYOR: 0,
    }

    for (const item of findingStatusGroup) {
      findingStatusSummary[item.findingStatus] = item._count
    }

    // 9. Total IndicatorAudit berdasarkan AchievementLabel
    const achievementLabelGroup = await db.indicatorAudit.groupBy({
      by: ["achievementLabel"],
      where: {
        periodId,
        deletedAt: null
      },
      _count: true,
    })

    const achievementLabelSummary = {
      SANGAT_BAIK: 0,
      BAIK: 0,
      CUKUP: 0,
      KURANG: 0,
      SANGAT_KURANG: 0,
      BELUM_DI_AUDIT: 0,
    }

    for (const item of achievementLabelGroup) {
      achievementLabelSummary[item.achievementLabel] = item._count
    }

    return {
      success: true,
      data: {
        totalCriteriaAudit,
        totalIndicatorAudit,
        totalAuditee,
        totalAuditor,
        progressAudit: Number(progressAudit.toFixed(2)), // persen
        averageAchievement: Number(averageAchievement.toFixed(2)),
        matchingRate: Number(matchingRate.toFixed(2)), // persen
        findingStatusSummary,
        achievementLabelSummary,
        completedIndicatorAudit
      }
    }
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

export async function getCriteriaAuditValues(periodId: string) {
  try {
    // Ambil semua CriteriaAudit beserta relasi-relasi yang dibutuhkan
    const criteriaAudits = await db.criteriaAudit.findMany({
      where: { periodId },
      include: {
        criteria: true,
        indicatorAudits: {
          where: { deletedAt: null },
          include: {
            Indicator: true,
          },
        },
      },
    })

    // Transformasi ke array hasil yang diinginkan
    const result = criteriaAudits.map((criteriaAudit) => {
      const { criteria, indicatorAudits } = criteriaAudit

      const totalIndicators = indicatorAudits.length
      const totalAchievement = indicatorAudits.reduce(
        (sum, ia) => sum + ia.achievement,
        0
      )

      const totalTambahan = indicatorAudits.filter(
        (ia) => ia.Indicator.type === IndicatorType.TAMBAHAN
      ).length

      const totalUtama = indicatorAudits.filter(
        (ia) => ia.Indicator.type === IndicatorType.UTAMA
      ).length

      const idealScore = totalIndicators * 4
      const percentage = idealScore > 0 ? (totalAchievement / idealScore) * 100 : 0

      return {
        criteriaCode: criteria.code,
        criteriaTitle: criteria.title,
        idealScore,
        totalAchievement,
        percentage: Number(percentage.toFixed(2)),
        totalIndicatorTambahan: totalTambahan,
        totalIndicatorUtama: totalUtama,
      }
    })

    return {
      status: true,
      data: result
    }
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}
