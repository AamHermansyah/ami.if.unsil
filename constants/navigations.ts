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
  AiFillLock,
  AiFillCalendar,
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
      url: "/dashboard/auditee",
      icon: AiOutlineHome,
      isActive: true,
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
          title: "Beban Kerja",
          url: "/sdm/beban-kerja",
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
          title: "Ringkasan",
          url: "/penelitian/overview",
          icon: AiOutlineHome,
        },
        {
          title: "Publikasi",
          url: "/penelitian/publikasi",
          icon: AiOutlineBook,
        },
        {
          title: "Produk Penelitian",
          url: "/penelitian/produk",
          icon: MdOutlineScience,
        },
      ],
    },
    {
      title: "Pengabdian",
      icon: AiOutlineHeart,
      url: '/pengabdian',
    },
  ],
  auditor: [
    {
      title: "Ringkasan",
      url: "/dashboard/auditor",
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
          title: "Akses Email",
          url: "/manajemen/akses",
          icon: AiFillLock,
        },
        {
          title: "Semester",
          url: "/manajemen/semester",
          icon: AiFillCalendar,
        },
        {
          title: "Target Indikator",
          url: "/manajemen/target",
          icon: BiTargetLock,
        },
        {
          title: "Panduan & Dokumen",
          url: "/manajemen/panduan",
          icon: AiOutlineFileProtect,
        },
        {
          title: "Pengaturan Sistem",
          url: "/manajemen/sistem",
          icon: AiOutlineSetting,
        },
      ],
    },
  ],
};