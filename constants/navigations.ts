import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineBook,
  AiOutlineExperiment,
  AiOutlineHeart,
  AiOutlineFileText,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineNotification,
  AiOutlineQuestionCircle,
  AiOutlineUserAdd,
  AiOutlineClockCircle,
  AiOutlineTrophy,
  AiOutlineRise,
  AiOutlineUsergroupAdd,
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineFlag,
  AiOutlineEye,
  AiOutlineAlert,
  AiOutlineHistory,
  AiOutlineCloudUpload,
  AiOutlineGlobal,
  AiOutlineFileProtect,
  AiOutlineSafetyCertificate,
} from "react-icons/ai";

import {
  BiBookOpen,
  BiGroup,
  BiChart,
  BiCalendarCheck,
  BiTargetLock
} from "react-icons/bi";

import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaHandsHelping,
  FaAward,
  FaUserTie
} from "react-icons/fa";

import {
  MdOutlineScience,
  MdOutlineGroups,
  MdOutlineVerified,
  MdOutlineWork,
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
      title: "SDM",
      icon: AiOutlineTeam,
      children: [
        {
          title: "Profil Saya",
          url: "/sdm/profil-dosen/me",
          icon: AiOutlineUser,
        },
        {
          title: "Beban Kerja",
          url: "/sdm/beban-kerja",
          icon: AiOutlineClockCircle,
          children: [
            {
              title: "Mengajar",
              url: "/sdm/beban-kerja/mengajar",
              icon: FaChalkboardTeacher,
            },
            {
              title: "Pembimbingan",
              url: "/sdm/beban-kerja/pembimbingan",
              icon: FaUserGraduate,
            },
            {
              title: "Perwalian",
              url: "/sdm/beban-kerja/perwalian",
              icon: BiGroup,
            },
            {
              title: "Praktik Lapangan",
              url: "/sdm/beban-kerja/praktik-lapangan",
              icon: MdOutlineWork,
            },
          ],
        },
        {
          title: "Pengembangan Diri",
          url: "/sdm/pengembangan",
          icon: AiOutlineRise,
        },
        {
          title: "Sertifikasi",
          url: "/sdm/kualifikasi/sertifikasi",
          icon: AiOutlineSafetyCertificate,
        },
        {
          title: "Prestasi",
          url: "/sdm/kualifikasi/prestasi",
          icon: AiOutlineTrophy,
        },
      ],
    },
    {
      title: "Penelitian",
      icon: AiOutlineExperiment,
      children: [
        {
          title: "Publikasi Saya",
          url: "/penelitian/publikasi/me",
          icon: AiOutlineBook,
        },
        {
          title: "Produk Penelitian",
          url: "/penelitian/produk/me",
          icon: MdOutlineScience,
        },
        {
          title: "Kolaborasi",
          url: "/penelitian/kolaborasi/me",
          icon: MdOutlineGroups,
        },
        {
          title: "Sitasi",
          url: "/penelitian/sitasi/me",
          icon: AiOutlineRise,
        },
      ],
    },
    {
      title: "Pengabdian",
      icon: AiOutlineHeart,
      children: [
        {
          title: "Publikasi Pengabdian",
          url: "/pengabdian/publikasi/me",
          icon: BiBookOpen,
        },
        {
          title: "Produk Pengabdian",
          url: "/pengabdian/produk/me",
          icon: FaHandsHelping,
        },
        {
          title: "Kolaborasi",
          url: "/pengabdian/kolaborasi/me",
          icon: BiGroup,
        },
      ],
    },
    {
      title: "Dokumen",
      url: "/documents",
      icon: AiOutlineCloudUpload,
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
      title: "SDM",
      icon: AiOutlineTeam,
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
          children: [
            {
              title: "Jabatan Fungsional",
              url: "/sdm/kualifikasi/jabatan-fungsional",
              icon: FaAward,
            },
            {
              title: "Sertifikasi",
              url: "/sdm/kualifikasi/sertifikasi",
              icon: AiOutlineSafetyCertificate,
            },
            {
              title: "Prestasi",
              url: "/sdm/kualifikasi/prestasi",
              icon: AiOutlineTrophy,
            },
          ],
        },
        {
          title: "Beban Kerja",
          url: "/sdm/beban-kerja",
          icon: AiOutlineClockCircle,
          children: [
            {
              title: "Mengajar",
              url: "/sdm/beban-kerja/mengajar",
              icon: FaChalkboardTeacher,
            },
            {
              title: "Pembimbingan",
              url: "/sdm/beban-kerja/pembimbingan",
              icon: FaUserGraduate,
            },
            {
              title: "Perwalian",
              url: "/sdm/beban-kerja/perwalian",
              icon: BiGroup,
            },
            {
              title: "Praktik Lapangan",
              url: "/sdm/beban-kerja/praktik-lapangan",
              icon: MdOutlineWork,
            },
          ],
        },
        {
          title: "Pengembangan",
          url: "/sdm/pengembangan",
          icon: AiOutlineRise,
        },
        {
          title: "Tenaga Kependidikan",
          url: "/sdm/tendik",
          icon: AiOutlineUsergroupAdd,
        },
        {
          title: "Survei & Evaluasi",
          url: "/sdm/survei",
          icon: AiOutlineComment,
          children: [
            {
              title: "Kepuasan Dosen",
              url: "/sdm/survei/dosen",
              icon: AiOutlineLike,
            },
            {
              title: "Kepuasan Tendik",
              url: "/sdm/survei/tendik",
              icon: AiOutlineLike,
            },
            {
              title: "Kepuasan Manajemen",
              url: "/sdm/survei/manajemen",
              icon: AiOutlineLike,
            },
          ],
        },
      ],
    },
    {
      title: "Penelitian",
      icon: AiOutlineExperiment,
      children: [
        {
          title: "Publikasi",
          url: "/penelitian/publikasi",
          icon: AiOutlineBook,
          children: [
            {
              title: "Internasional",
              url: "/penelitian/publikasi/internasional",
              icon: AiOutlineGlobal,
            },
            {
              title: "Nasional",
              url: "/penelitian/publikasi/nasional",
              icon: AiOutlineFlag,
            },
          ],
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
    {
      title: "Laporan & Audit",
      icon: AiOutlineFileText,
      children: [
        {
          title: "Dashboard Laporan",
          url: "/laporan",
          icon: AiOutlineBarChart,
        },
        {
          title: "Laporan SDM",
          url: "/laporan/sdm",
          icon: AiOutlineTeam,
        },
        {
          title: "Laporan Penelitian",
          url: "/laporan/penelitian",
          icon: AiOutlineExperiment,
        },
        {
          title: "Laporan Pengabdian",
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