'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  Save,
  X,
  FileText,
  Link2,
  AlertCircle,
  CheckCircle2,
  Target
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Badge } from '@/components/ui/badge';

interface AuditEditData {
  id: number;
  indikator: string;
  capaian: string;
  sebutan: string;
  namaDokumen: string;
  linkBukti: string;
  akarPenyebab: string;
  rencanaAction: string;
}

const initialData: AuditEditData = {
  id: 1,
  indikator: "Standar Kompetensi Lulusan - Profil Lulusan",
  capaian: "85%",
  sebutan: "Baik",
  namaDokumen: "Dokumen Standar Kompetensi Lulusan 2024",
  linkBukti: "https://docs.google.com/document/d/example1",
  akarPenyebab: "Kurikulum belum sepenuhnya disesuaikan dengan kebutuhan industri",
  rencanaAction: "Melakukan review kurikulum dan kerjasama dengan industri"
};

export default function AuditEditPage() {
  return (
    <div className="space-y-4 grid items-start grid-cols-3 gap-4">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Informasi Indikator</CardTitle>
          <CardDescription>Tahun Akademik 2024/2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 border rounded-md bg-card">
            <div className="p-4 space-y-1">
              <h4>Capaian</h4>
              <span className="text-sm font-semibold text-green-500">3.0</span>
            </div>
            <div className="p-4 space-y-1 border-l">
              <h4>Sebutan</h4>
              <Badge>Baik</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-primary dark:text-secondary">
              Indikator:
            </h4>
            <p className="text-sm leading-relaxed">
              UPPS memiliki tendik dalam jumlah yang sangat memadai dan sangat relevan
              dengan kebutuhan UPPS dan PS, yang terdiri atas pustakawan, laboran,
              teknisi/operator yang sesuai bidang pendidikannya.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-primary dark:text-secondary">Kode:</h4>
            <span className="px-2 py-1 text-sm font-mono bg-blue-100 text-blue-700 rounded">
              VIS/U/03
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader className="border-b">
          <CardTitle>Form Edit Data Audit</CardTitle>
          <CardDescription>Tahun Akademik 2024/2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Nama Dokumen Pendukung */}
          <div className="space-y-2">
            <Label htmlFor="namaDokumen" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              Nama Dokumen Pendukung
            </Label>
            <Input
              id="namaDokumen"
              defaultValue={initialData.namaDokumen}
              placeholder="Masukkan nama dokumen pendukung..."
            />
          </div>

          {/* Link Bukti Fisik */}
          <div className="space-y-2">
            <Label htmlFor="linkBukti" className="flex items-center space-x-2">
              <Link2 className="w-4 h-4" />
              Link Bukti Fisik
            </Label>
            <Input
              id="linkBukti"
              type="url"
              defaultValue={initialData.linkBukti}
              placeholder="https://docs.google.com/document/..."
            />
            <p className="text-xs text-muted-foreground">
              Masukkan URL lengkap yang dapat diakses oleh auditor
            </p>
          </div>

          {/* Akar Penyebab */}
          <div className="space-y-2">
            <Label htmlFor="akarPenyebab" className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4" />
              Akar Penyebab
            </Label>
            <Textarea
              id="akarPenyebab"
              defaultValue={initialData.akarPenyebab}
              placeholder="Jelaskan akar penyebab masalah atau kondisi saat ini..."
            />
            <p className="text-xs text-muted-foreground">
              Identifikasi faktor-faktor yang menyebabkan kondisi saat ini
            </p>
          </div>

          {/* Rencana Tindak Lanjut */}
          <div className="space-y-2">
            <Label htmlFor="rencanaAction" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              Rencana Tindak Lanjut
            </Label>
            <Textarea
              id="rencanaAction"
              defaultValue={initialData.rencanaAction}
              placeholder="Jelaskan langkah-langkah yang akan diambil untuk perbaikan..."
            />
            <p className="text-xs text-muted-foreground">
              Rencana konkret dengan timeline dan penanggung jawab yang jelas
            </p>
          </div>

          <Button>
            <Save className="w-4 h-4" />
            Simpan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}