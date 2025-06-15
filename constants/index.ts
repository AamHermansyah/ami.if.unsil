import { Users, FileText, CheckCircle, Globe, User, Briefcase, GraduationCap, Award } from 'lucide-react';

export const featuresLogin = [
  {
    icon: Users,
    title: 'Manajemen SDM',
    description: 'Profil & Kualifikasi Dosen',
    iconBg: 'bg-blue-100',
    iconColor: 'text-primary',
  },
  {
    icon: FileText,
    title: 'Penelitian & Pengabdian',
    description: 'Publikasi & Sitasi',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-primary',
  },
  {
    icon: CheckCircle,
    title: 'Monitoring Mudah',
    description: 'Dashboard & Laporan',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    icon: Globe,
    title: 'Akses Terpusat',
    description: 'Single Sign-On Google',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
];

export const dosenFormSteps = [
  {
    id: 'personal',
    title: 'Informasi Pribadi',
    description: 'Data pribadi dan kontak',
    icon: User,
    completed: false
  },
  {
    id: 'employment',
    title: 'Informasi Kepegawaian',
    description: 'NIDN, status, dan jabatan',
    icon: Briefcase,
    completed: false
  },
  {
    id: 'education',
    title: 'Informasi Pendidikan',
    description: 'Riwayat pendidikan terakhir',
    icon: GraduationCap,
    completed: false
  },
  {
    id: 'additional',
    title: 'Informasi Tambahan',
    description: 'Keahlian',
    icon: Award,
    completed: false
  },
  {
    id: 'documents',
    title: 'Upload Dokumen',
    description: 'Foto, CV, dan dokumen pendukung',
    icon: FileText,
    completed: false
  }
];