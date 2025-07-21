// schemas/indicator-audit-schema.ts
import { z } from "zod";
import { FindingStatus } from "../generated/prisma";

export const indicatorAuditSchema = z.object({
  achievement: z.enum(["0", "1", "2", "3", "4"]),
  documentName: z.string().optional(),
  documentLink: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Link harus berupa URL yang valid",
    }),
  rootCause: z.string().optional(),
  plan: z.string().optional(),
});

export type IndicatorAuditValues = z.infer<typeof indicatorAuditSchema>

export const indicatorAuditReviewSchema = z.object({
  findingStatus: z.enum(FindingStatus),
  note: z.string().optional(),
  recomendation: z.string().optional(),
});

export type IndicatorAuditReviewValues = z.infer<typeof indicatorAuditReviewSchema>