'use client'

import React from 'react';
import {
  ExternalLink,
  Eye,
  FileText,
  User,
  Calendar,
  MoreVertical,
  Pencil
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AuditDetailData {
  id: number;
  indikator: string;
  capaian: string;
  sebutan: string;
  namaDokumen: string;
  linkBukti: string;
  akarPenyebab: string;
  rencanaAction: string;
  // Review Auditor
  temuan: 'Sesuai' | 'Observasi' | 'KTS Minor' | 'KTS Mayor';
  catatanAuditor: string;
  rekomendasi: string;
  auditor: string;
  tanggalReview: string;
}

const auditDetailData: AuditDetailData = {
  id: 1,
  indikator: "UPPS memiliki tendik dalam jumlah yang sangat memadai dan sangat relevan dengan kebutuhan UPPS dan PS, yang terdiri atas pustakawan, laboran /teknisi/operator yang sesuai bidang pendidikannya",
  capaian: "85%",
  sebutan: "Baik",
  namaDokumen: "Dokumen Standar Kompetensi Lulusan 2024",
  linkBukti: "https://docs.google.com/document/d/example1",
  akarPenyebab: "Kurikulum belum sepenuhnya disesuaikan dengan kebutuhan industri",
  rencanaAction: "Melakukan review kurikulum dan kerjasama dengan industri",
  temuan: "Observasi",
  catatanAuditor: "Dokumen standar kompetensi lulusan sudah lengkap dan sesuai dengan standar nasional. Namun, masih perlu peningkatan dalam hal kesesuaian dengan kebutuhan industri terkini. Profil lulusan sudah jelas namun perlu diperkuat dengan data tracer study yang lebih komprehensif.",
  rekomendasi: "1. Melakukan review berkala terhadap profil lulusan dengan melibatkan stakeholder industri\n2. Memperkuat sistem tracer study untuk mendapatkan feedback dari alumni dan pengguna lulusan\n3. Mengintegrasikan soft skills dan hard skills yang dibutuhkan industri 4.0 dalam profil lulusan",
  auditor: "Dr. Ahmad Fauzi, M.Kom",
  tanggalReview: "2024-03-15"
};

export default function AuditDetailPage() {
  return (
    <div className="h-full space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="border-b">
              <div className="w-full flex justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <CardTitle>Informasi Dasar</CardTitle>
                  <CardDescription>Tahun Akademik 2024/2025</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/audit/${encodeURIComponent('VIS/U/03')}/edit?tahun=2023/2024`}>
                      <DropdownMenuItem>
                        <Pencil className="w-4 h-4" />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {auditDetailData.indikator}
                </h3>
                <div className="bg-muted/50 p-4 rounded-lg border">
                  <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Capaian</span>
                      <span className="text-3xl font-bold text-primary dark:text-secondary">{auditDetailData.capaian}</span>
                    </div>
                    <Badge variant="success">
                      {auditDetailData.sebutan}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Dokumen Pendukung
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>{auditDetailData.namaDokumen}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Link Bukti Fisik
                  </h4>
                  <Link
                    href={auditDetailData.linkBukti}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm inline-flex items-center space-x-2 text-primary hover:text-primary/80 dark:text-secondary dark:hover:text-secondary/80"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Lihat Dokumen</span>
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Akar Penyebab
                </h4>
                <p className="text-sm text-muted-foreground border p-3 rounded-md">
                  {auditDetailData.akarPenyebab}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Rencana Tindak Lanjut
                </h4>
                <p className="text-sm text-muted-foreground border p-3 rounded-md">
                  {auditDetailData.rencanaAction}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Review Auditor */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle>
                Review Auditor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Status Temuan
                </h4>
                <Badge>Observasi</Badge>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Catatan Auditor
                </h4>
                <div className="p-4 rounded-md bg-card border">
                  <p className="text-sm">
                    {auditDetailData.catatanAuditor}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Rekomendasi
                </h4>
                <div className="p-4 rounded-md border bg-green-500/10">
                  <pre className="text-sm whitespace-pre-wrap font-sans">
                    {auditDetailData.rekomendasi}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Informasi Auditor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 border rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {auditDetailData.auditor}
                  </p>
                  <p className="text-xs text-muted-foreground">Auditor Internal</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 border rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {new Date(auditDetailData.tanggalReview).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">Tanggal Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Summary */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle>
                Ringkasan Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tingkat Capaian</span>
                <span className="text-sm font-medium">{auditDetailData.capaian}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Kategori</span>
                <Badge>{auditDetailData.sebutan}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status Audit</span>
                <Badge>{auditDetailData.temuan}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}