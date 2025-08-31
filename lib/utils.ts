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
    case 'BELUM_DI_INPUT':
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

export function stripHtml(input: string): string {
  if (!input) return ""
  try {
    if (typeof window !== "undefined" && "DOMParser" in window) {
      const doc = new DOMParser().parseFromString(input, "text/html")
      return (doc.body.textContent || "")
        .replace(/[\u0000-\u001F\u007F]/g, "") // buang control chars
        .replace(/\s+/g, " ").trim()
    }
  } catch { }
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}
