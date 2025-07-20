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