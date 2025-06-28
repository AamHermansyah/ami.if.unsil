import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineBook,
  AiOutlineExperiment,
  AiOutlineHeart,
  AiOutlineFileText,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineClockCircle,
  AiOutlineRise,
  AiOutlineEye,
  AiOutlineFileProtect,
  AiFillLock,
  AiFillCalendar,
  AiOutlineFileDone,
  AiOutlineCheckCircle,
  AiOutlineProfile,
  AiOutlineCalendar,
  AiOutlineSolution,
  AiOutlineUsergroupAdd,
  AiOutlineUserSwitch,
  AiOutlineRead,
} from "react-icons/ai";
import { BsPersonGear } from "react-icons/bs"
import { BiTargetLock } from "react-icons/bi";
import { MdOutlineScience } from "react-icons/md";
import { IconType } from "react-icons/lib";

export type NavigationItem = {
  title: string;
  url?: string;
  icon: IconType;
  isActive?: boolean;
  parentPath?: string;
  children?: NavigationItem[];
};

export type NavigationRole = {
  [role: string]: NavigationItem[];
};

export const navigations: NavigationRole = {
  mahasiswa: [
    {
      title: "Ringkasan",
      url: "/dashboard/mahasiswa",
      icon: AiOutlineHome,
      isActive: true,
    },
    {
      title: "Perwalian",
      url: "/aktivitas/perwalian",
      icon: AiOutlineUsergroupAdd,
    },
    {
      title: "Kerja Praktek",
      url: "/aktivitas/kp",
      icon: AiOutlineSolution,
    },
    {
      title: "Bimbingan",
      url: "/aktivitas/bimbingan",
      icon: MdOutlineScience,
    },
  ],
  dosen: [
    {
      title: "Ringkasan",
      url: "/dashboard/auditee",
      icon: AiOutlineHome,
      isActive: true,
    },
    {
      title: "Beban Kerja",
      icon: AiOutlineClockCircle,
      parentPath: "/beban-kerja",
      children: [
        {
          title: "Ringkasan",
          url: "/beban-kerja/ringkasan",
          icon: AiOutlineProfile,
        },
        {
          title: "Mengajar",
          url: "/beban-kerja/mengajar",
          icon: AiOutlineRead,
        },
        {
          title: "Bimbingan",
          url: "/beban-kerja/bimbingan",
          icon: AiOutlineUserSwitch,
        },
        {
          title: "Perwalian",
          url: "/beban-kerja/perwalian",
          icon: AiOutlineUsergroupAdd,
        },
        {
          title: "Kerja Praktek",
          url: "/beban-kerja/kerja-praktek",
          icon: AiOutlineSolution,
        },
      ],
    },
    {
      title: "Pengembangan",
      icon: AiOutlineRise,
      parentPath: "/pengembangan",
      children: [
        {
          title: "Ringkasan",
          url: "/pengembangan/ringkasan",
          icon: AiOutlineProfile,
        },
        {
          title: "Kegiatan",
          url: "/pengembangan/kegiatan",
          icon: AiOutlineCalendar,
        },
        {
          title: "Sertifikat",
          url: "/pengembangan/sertifikat",
          icon: AiOutlineFileDone,
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
      icon: BsPersonGear,
    },
    {
      title: "Audit Dosen",
      icon: AiOutlineTeam,
      parentPath: "/audit/dosen",
      children: [
        {
          title: "Ringkasan",
          url: "/audit/dosen/ringkasan",
          icon: AiOutlineFileText,
        },
        {
          title: "Monitoring",
          url: "/audit/dosen/monitoring",
          icon: AiOutlineEye,
        },
        {
          title: "Analisis",
          url: "/audit/dosen/analisis",
          icon: AiOutlineBarChart,
        },
        {
          title: "Laporan",
          url: "/audit/dosen/laporan",
          icon: AiOutlineFileDone,
        },
      ],
    },
    {
      title: "Audit Beban Kerja",
      icon: AiOutlineClockCircle,
      parentPath: "/audit/beban-kerja",
      children: [
        {
          title: "Ringkasan",
          url: "/audit/beban-kerja/ringkasan",
          icon: AiOutlineFileText,
        },
        {
          title: "Monitoring",
          url: "/audit/beban-kerja/monitoring",
          icon: AiOutlineEye,
        },
        {
          title: "Verifikasi",
          url: "/audit/beban-kerja/verifikasi",
          icon: AiOutlineCheckCircle,
        },
        {
          title: "Analisis",
          url: "/audit/beban-kerja/analisis",
          icon: AiOutlineBarChart,
        },
      ],
    },
    {
      title: "Audit Penelitian",
      icon: AiOutlineExperiment,
      parentPath: "/audit/penelitian",
      children: [
        {
          title: "Ringkasan",
          url: "/audit/penelitian/ringkasan",
          icon: AiOutlineFileText,
        },
        {
          title: "Monitoring",
          url: "/audit/penelitian/monitoring",
          icon: AiOutlineEye,
        },
        {
          title: "Verifikasi",
          url: "/audit/penelitian/verifikasi",
          icon: AiOutlineCheckCircle,
        },
        {
          title: "Laporan",
          url: "/audit/penelitian/laporan",
          icon: AiOutlineFileDone,
        },
      ],
    },
    {
      title: "Audit Pengabdian",
      icon: AiOutlineHeart,
      parentPath: "/audit/pengabdian",
      children: [
        {
          title: "Ringkasan",
          url: "/audit/pengabdian/ringkasan",
          icon: AiOutlineFileText,
        },
        {
          title: "Monitoring",
          url: "/audit/pengabdian/monitoring",
          icon: AiOutlineEye,
        },
        {
          title: "Verifikasi",
          url: "/audit/pengabdian/verifikasi",
          icon: AiOutlineCheckCircle,
        },
        {
          title: "Laporan",
          url: "/audit/pengabdian/laporan",
          icon: AiOutlineFileDone,
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