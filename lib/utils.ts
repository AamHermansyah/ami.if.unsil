import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AchievementLabel, FindingStatus } from "./generated/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  if (!name) return "";

  return name
    .trim()
    .split(/\s+/) // pisahkan berdasarkan spasi
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export const getStatusVariant = (status: FindingStatus | AchievementLabel) => {
  switch (status) {
    case 'OBSERVASI':
    case 'CUKUP':
      return 'info';
    case 'SESUAI':
    case 'BAIK':
    case 'SANGAT_BAIK':
      return 'success';
    case 'KTS_MINOR':
    case 'KURANG':
      return 'warning';
    case 'KTS_MAYOR':
    case 'SANGAT_KURANG':
      return 'destructive';
    case 'BELUM_DI_AUDIT':
    default:
      return 'default';
  }
}

export const getAchievmentLabel = (value: number): AchievementLabel => {
  switch (value) {
    case 4:
      return 'SANGAT_BAIK';
    case 3:
      return 'BAIK';
    case 2:
      return 'CUKUP';
    case 1:
      return 'KURANG';
    case 0:
    default:
      return 'SANGAT_KURANG';
  }
}