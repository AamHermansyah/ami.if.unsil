import {
  AiOutlineHome,
  AiOutlineFileText,
  AiOutlineTeam,
  AiOutlineSearch,
  AiOutlineBarChart,
  AiOutlineAppstore,
  AiFillLock,
  AiOutlineForm,
  AiFillCalendar,
} from "react-icons/ai";
import { IconType } from "react-icons/lib";

export type NavigationItem = {
  title: string;
  url?: string;
  icon: IconType;
  parentPath?: string;
  children?: NavigationItem[];
};

export type NavigationRole = {
  [role: string]: NavigationItem[];
};

export const navigations: NavigationRole = {
  auditor: [
    {
      title: "Ringkasan",
      url: "/",
      icon: AiOutlineHome,
    },
    {
      title: "Audit",
      url: "/audit",
      icon: AiOutlineSearch, // lebih cocok untuk proses audit/pemeriksaan
    },
    {
      title: "Laporan",
      url: "/laporan",
      icon: AiOutlineBarChart, // cocok untuk data hasil berupa laporan
    },
  ],
  auditee: [
    {
      title: "Ringkasan",
      url: "/",
      icon: AiOutlineHome,
    },
    {
      title: "Audit",
      url: "/audit",
      icon: AiOutlineSearch,
    },
    {
      title: "Kelola",
      icon: AiOutlineAppstore,
      parentPath: "/kelola",
      children: [
        {
          title: "Kriteria",
          url: "/kelola/kriteria",
          icon: AiOutlineForm,
        },
        {
          title: "Indikator",
          url: "/kelola/indikator",
          icon: AiOutlineFileText,
        },
        {
          title: "Periode",
          url: "/kelola/periode",
          icon: AiFillCalendar,
        },
      ],
    },
    {
      title: "Laporan",
      url: "/laporan",
      icon: AiOutlineBarChart,
    },
    {
      title: "Akses Email",
      url: "/akses",
      icon: AiFillLock,
    },
  ],
};
