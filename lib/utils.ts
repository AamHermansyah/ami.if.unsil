import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPublicationStatusColor(status: string) {
  switch (status) {
    case 'Published': case 'Diterapkan': case 'Selesai': case 'Berjalan':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Accepted': case 'Dalam Pengembangan':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Under Review': case 'Proposal':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Draft': case 'Dihentikan':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};