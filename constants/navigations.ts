import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineBook,
  AiOutlineExperiment,
  AiOutlineHeart,
  AiOutlineFileText,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineUserAdd,
  AiOutlineClockCircle,
  AiOutlineRise,
  AiOutlineUsergroupAdd,
  AiOutlineEye,
  AiOutlineAlert,
  AiOutlineHistory,
  AiOutlineCloudUpload,
  AiOutlineFileProtect,
} from "react-icons/ai";

import {
  BiBookOpen,
  BiGroup,
  BiChart,
  BiCalendarCheck,
  BiTargetLock
} from "react-icons/bi";

import {
  FaHandsHelping,
  FaUserTie
} from "react-icons/fa";

import {
  MdOutlineScience,
  MdOutlineGroups,
  MdOutlineVerified,
} from "react-icons/md";

export const navigations = {
  auditee: [
    {
      title: "Ringkasan",
      url: "/",
      icon: AiOutlineHome,
      isActive: true,
    },
    {
      title: "Dokumen",
      url: "/documents",
      icon: AiOutlineCloudUpload,
    },
    {
      title: "SDM",
      icon: AiOutlineTeam,
      parentPath: '/sdm',
      children: [
        {
          title: "Profil Dosen",
          url: "/sdm/profil-dosen",
          icon: FaUserTie,
        },
        {
          title: "Kualifikasi",
          url: "/sdm/kualifikasi",
          icon: MdOutlineVerified,
        },
        {
          title: "Beban Kerja",
          url: "/sdm/beban-kerja/auditor",
          icon: AiOutlineClockCircle,
        },
        {
          title: "Pengembangan",
          url: "/sdm/pengembangan",
          icon: AiOutlineRise,
        },
      ],
    },
    {
      title: "Penelitian",
      icon: AiOutlineExperiment,
      parentPath: '/penelitian',
      children: [
        {
          title: "Publikasi",
          url: "/penelitian/publikasi",
          icon: AiOutlineBook,
        },
        {
          title: "Sitasi & Impact",
          url: "/penelitian/sitasi",
          icon: AiOutlineRise,
        },
        {
          title: "Produk Penelitian",
          url: "/penelitian/produk",
          icon: MdOutlineScience,
        },
        {
          title: "Kolaborasi",
          url: "/penelitian/kolaborasi",
          icon: MdOutlineGroups,
        },
        {
          title: "Perencanaan",
          url: "/penelitian/renstra",
          icon: BiTargetLock,
        },
        {
          title: "Peningkatan Kompetensi",
          url: "/penelitian/peningkatan-kompetensi",
          icon: BiChart,
        },
      ],
    },
    {
      title: "Pengabdian",
      icon: AiOutlineHeart,
      parentPath: '/pengabdian',
      children: [
        {
          title: "Publikasi",
          url: "/pengabdian/publikasi",
          icon: BiBookOpen,
        },
        {
          title: "Produk Pengabdian",
          url: "/pengabdian/produk",
          icon: FaHandsHelping,
        },
        {
          title: "Kolaborasi",
          url: "/pengabdian/kolaborasi",
          icon: BiGroup,
        },
        {
          title: "Perencanaan",
          url: "/pengabdian/renstra",
          icon: BiTargetLock,
        },
        {
          title: "Peningkatan Kompetensi",
          url: "/pengabdian/peningkatan-kompetensi",
          icon: BiChart,
        },
      ],
    },
  ],
  auditor: [
    {
      title: "Ringkasan",
      url: "/dashboard",
      icon: AiOutlineHome,
      isActive: true,
    },
    {
      title: "Tenaga Kependidikan",
      url: "/tendik",
      icon: AiOutlineUsergroupAdd,
    },
    {
      title: "Laporan & Audit",
      icon: AiOutlineFileText,
      parentPath: '/laporan',
      children: [
        {
          title: "Dashboard",
          url: "/laporan",
          icon: AiOutlineBarChart,
        },
        {
          title: "Dosen",
          url: "/laporan/dosen",
          icon: AiOutlineTeam,
        },
        {
          title: "Beban Kerja",
          url: "/laporan/beban-kerja",
          icon: AiOutlineClockCircle,
        },
        {
          title: "Penelitian",
          url: "/laporan/penelitian",
          icon: AiOutlineExperiment,
        },
        {
          title: "Pengabdian",
          url: "/laporan/pengabdian",
          icon: AiOutlineHeart,
        },
        {
          title: "Export Laporan",
          url: "/laporan/export",
          icon: AiOutlineCloudUpload,
        },
      ],
    },
    {
      title: "Monitoring",
      icon: AiOutlineEye,
      parentPath: '/monitoring',
      children: [
        {
          title: "Progress Indikator",
          url: "/monitoring/progress",
          icon: BiCalendarCheck,
        },
        {
          title: "Alert & Peringatan",
          url: "/monitoring/alert",
          icon: AiOutlineAlert,
        },
        {
          title: "Audit Trail",
          url: "/audit/log",
          icon: AiOutlineHistory,
        },
      ],
    },
    {
      title: "Manajemen",
      icon: AiOutlineSetting,
      parentPath: '/manajemen',
      children: [
        {
          title: "Pengguna",
          url: "/settings/users",
          icon: AiOutlineUserAdd,
        },
        {
          title: "Target Indikator",
          url: "/settings/targets",
          icon: BiTargetLock,
        },
        {
          title: "Panduan & Dokumen",
          url: "/settings/documents",
          icon: AiOutlineFileProtect,
        },
        {
          title: "Pengaturan Sistem",
          url: "/settings",
          icon: AiOutlineSetting,
        },
      ],
    },
  ],
};