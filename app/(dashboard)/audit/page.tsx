'use client'

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, MoreVertical, Pencil } from 'lucide-react';
import Link from 'next/link';
import Header from './_layouts/header';

const initialData = [
  {
    id: 1,
    indikator: "Standar Kompetensi Lulusan - Profil Lulusan",
    capaian: "85%",
    sebutan: "Baik",
    namaDokumen: "Dokumen Standar Kompetensi Lulusan 2024",
    linkBukti: "https://docs.google.com/document/d/example1",
    akarPenyebab: "Kurikulum belum sepenuhnya disesuaikan dengan kebutuhan industri",
    rencanaAction: "Melakukan review kurikulum dan kerjasama dengan industri"
  },
  {
    id: 2,
    indikator: "Standar Isi Pembelajaran - Kurikulum",
    capaian: "78%",
    sebutan: "Cukup",
    namaDokumen: "Dokumen Kurikulum Prodi Informatika 2024",
    linkBukti: "https://docs.google.com/document/d/example2",
    akarPenyebab: "Beberapa mata kuliah belum memiliki RPS yang lengkap",
    rencanaAction: "Melengkapi dan memperbaiki seluruh RPS mata kuliah"
  },
  {
    id: 3,
    indikator: "Standar Proses Pembelajaran - Metode Pembelajaran",
    capaian: "82%",
    sebutan: "Baik",
    namaDokumen: "Dokumen Standar Proses Pembelajaran 2024",
    linkBukti: "https://docs.google.com/document/d/example3",
    akarPenyebab: "Variasi metode pembelajaran masih terbatas",
    rencanaAction: "Pelatihan dosen untuk metode pembelajaran inovatif"
  },
  {
    id: 4,
    indikator: "Standar Penilaian - Sistem Evaluasi",
    capaian: "90%",
    sebutan: "Sangat Baik",
    namaDokumen: "Dokumen Standar Penilaian 2024",
    linkBukti: "https://docs.google.com/document/d/example4",
    akarPenyebab: "Sistem penilaian sudah terstandarisasi dengan baik",
    rencanaAction: "Mempertahankan dan meningkatkan sistem penilaian"
  },
  {
    id: 5,
    indikator: "Standar Dosen - Kualifikasi Dosen",
    capaian: "75%",
    sebutan: "Cukup",
    namaDokumen: "Data Dosen Prodi Informatika 2024",
    linkBukti: "https://docs.google.com/document/d/example5",
    akarPenyebab: "Masih ada dosen yang belum memiliki kualifikasi S3",
    rencanaAction: "Mendorong dosen untuk melanjutkan studi S3"
  }
];

export default function AuditPage() {
  const getSebutanColor = (sebutan: string) => {
    switch (sebutan) {
      case 'Sangat Baik':
        return 'bg-green-100 text-green-800';
      case 'Baik':
        return 'bg-blue-100 text-blue-800';
      case 'Cukup':
        return 'bg-yellow-100 text-yellow-800';
      case 'Kurang':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <Header />
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Data Audit Mutu Internal</CardTitle>
          <CardDescription>Tahun Akademik 2024/2025</CardDescription>
        </CardHeader>

        <CardContent className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">No</TableHead>
                <TableHead className="min-w-[250px]">Indikator</TableHead>
                <TableHead className="w-20">Capaian</TableHead>
                <TableHead className="w-24">Sebutan</TableHead>
                <TableHead className="min-w-[200px]">Nama Dokumen Pendukung</TableHead>
                <TableHead className="text-center">Link Bukti Fisik</TableHead>
                <TableHead className="w-16 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {initialData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-center">{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.indikator}</TableCell>
                  <TableCell className="text-center font-semibold">{item.capaian}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSebutanColor(item.sebutan)}`}>
                      {item.sebutan}
                    </span>
                  </TableCell>
                  <TableCell>{item.namaDokumen}</TableCell>
                  <TableCell className="w-full flex justify-center">
                    <Link
                      href={item.linkBukti}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="icon">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="w-full flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="mx-auto">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/audit/${encodeURIComponent('VIS/U/03')}?tahun=2023/2024`}>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4" />
                              Detail
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/audit/${encodeURIComponent('VIS/U/03')}/edit?tahun=2023/2024`}>
                            <DropdownMenuItem>
                              <Pencil className="w-4 h-4" />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}