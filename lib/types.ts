import { AchievementLabel, FindingStatus } from "./generated/prisma";

export type BulkResultItem = {
  id: string;
  status: "success" | "skipped" | "failed";
  reason?: string;
};

export type BulkResult = {
  success: number;
  skipped: number;
  failed: number;
  details: BulkResultItem[];
};

export interface DashboardSummary {
  totalCriteriaAudit: number;
  totalIndicatorAudit: number;
  totalAuditee: number;
  totalAuditor: number;
  progressAudit: number;
  averageAchievement: number;
  matchingRate: number;
  completedIndicatorAudit: number;
  findingStatusSummary: Record<FindingStatus, number>;
  achievementLabelSummary: Record<AchievementLabel, number>;
}
