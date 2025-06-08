import { House, FileText, Users, Settings, Bell, ClipboardList, BookOpen, FileCheck, MessageSquare } from "lucide-react"

export const navigations = {
  auditee: [
    {
      title: "Ringkasan",
      url: "/dashboard",
      icon: House,
      isActive: true,
    },
    {
      title: "Audit Saya",
      url: "/audits",
      icon: ClipboardList,
      isActive: false,
    },
    {
      title: "Form Audit",
      url: "/forms",
      icon: FileCheck,
      isActive: false,
    },
    {
      title: "Dokumen",
      url: "/documents",
      icon: FileText,
      isActive: false,
    },
    {
      title: "Laporan Audit",
      url: "/reports",
      icon: BookOpen,
      isActive: false,
    },
  ],
  auditor: [
    {
      title: "Ringkasan",
      url: "/dashboard",
      icon: House,
      isActive: true,
    },
    {
      title: "Manajemen Audit",
      url: "/audits",
      icon: ClipboardList,
      isActive: false,
    },
    {
      title: "SDM",
      url: "/sdm",
      icon: Users,
      isActive: false,
    },
    {
      title: "Penelitian & Pengabdian",
      url: "/research",
      icon: BookOpen,
      isActive: false,
    },
    {
      title: "Form & Checklist",
      url: "/forms",
      icon: FileCheck,
      isActive: false,
    },
    {
      title: "Dokumen",
      url: "/documents",
      icon: FileText,
      isActive: false,
    },
    {
      title: "Laporan Audit",
      url: "/reports",
      icon: BookOpen,
      isActive: false,
    },
    {
      title: "Manajemen Pengguna",
      url: "/users",
      icon: Users,
      isActive: false,
    },
    {
      title: "Pengaturan",
      url: "/settings",
      icon: Settings,
      isActive: false,
    },
  ],
};
