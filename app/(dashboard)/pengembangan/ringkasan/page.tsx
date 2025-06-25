'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Award,
  Users,
  Calendar,
  Target,
  Info,
  Building,
  Globe,
  TrendingUp,
  Star,
  MapPin
} from 'lucide-react';
import { OverviewCard } from '@/components/shared/overview-card';
import Header from '../_layouts/header';

const PengembanganDosenPage: React.FC = () => {
  const kegiatanPengembangan = [
    {
      id: '1',
      jenisKegiatan: 'Konferensi',
      namaKegiatan: 'International Conference on Machine Learning',
      penyelenggara: 'IEEE Computer Society',
      lokasi: 'Jakarta, Indonesia',
      tanggalMulai: '2024-03-15',
      tanggalSelesai: '2024-03-17',
      durasi: 3,
      status: 'Selesai',
      sertifikat: true,
      deskripsi: 'Konferensi internasional tentang machine learning dan artificial intelligence',
      kategori: 'Internasional'
    },
    {
      id: '2',
      jenisKegiatan: 'Pelatihan',
      namaKegiatan: 'Advanced Python for Data Science',
      penyelenggara: 'Google Developer Indonesia',
      lokasi: 'Online',
      tanggalMulai: '2024-02-01',
      tanggalSelesai: '2024-02-28',
      durasi: 28,
      status: 'Selesai',
      sertifikat: true,
      deskripsi: 'Pelatihan intensif Python untuk data science dan machine learning',
      kategori: 'Nasional'
    },
    {
      id: '3',
      jenisKegiatan: 'Sertifikasi',
      namaKegiatan: 'AWS Certified Solutions Architect',
      penyelenggara: 'Amazon Web Services',
      lokasi: 'Jakarta, Indonesia',
      tanggalMulai: '2024-04-10',
      tanggalSelesai: '2024-04-10',
      durasi: 1,
      status: 'Selesai',
      sertifikat: true,
      deskripsi: 'Sertifikasi profesional AWS untuk arsitektur cloud solutions',
      kategori: 'Internasional'
    },
    {
      id: '4',
      jenisKegiatan: 'Seminar',
      namaKegiatan: 'Workshop Metodologi Penelitian',
      penyelenggara: 'LPPM Universitas Siliwangi',
      lokasi: 'Tasikmalaya, Indonesia',
      tanggalMulai: '2024-05-20',
      tanggalSelesai: '2024-05-22',
      durasi: 3,
      status: 'Akan Datang',
      sertifikat: true,
      deskripsi: 'Workshop metodologi penelitian untuk dosen muda',
      kategori: 'Institusional'
    }
  ];


  const totalKegiatan = kegiatanPengembangan.length;
  const kegiatanSelesai = kegiatanPengembangan.filter(k => k.status === 'Selesai').length;
  const persentasePartisipasi = totalKegiatan > 0 ? (kegiatanSelesai / totalKegiatan) * 100 : 0;
  const targetPartisipasi = 60; // 60% sesuai indikator AMI

  const kegiatanInternasional = kegiatanPengembangan.filter(k => k.kategori === 'Internasional').length;
  const kegiatanNasional = kegiatanPengembangan.filter(k => k.kategori === 'Nasional').length;

  const sertifikatAktif = 3;

  return (
    <div className="w-full space-y-6">
      <Header />

      {/* Alert & Info */}
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Indikator AMI:</strong> Minimal 60% dosen mengikuti kegiatan keprofesian berkelanjutan
          dalam 1 tahun terakhir, seperti studi lanjut, postdoc, ARP, kursus singkat, magang, pelatihan,
          sertifikasi, konferensi, seminar, dan lokakarya.
        </AlertDescription>
      </Alert>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <OverviewCard
          label="Total Kegiatan"
          value={totalKegiatan}
          icon={<Calendar className="w-6 h-6 text-blue-600" />}
          color="blue"
          description="Tahun 2024"
        />

        <OverviewCard
          label="Partisipasi"
          value={`${persentasePartisipasi.toFixed(1)}%`}
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          color="green"
          description={`Target: ${targetPartisipasi}%`}
        />

        <OverviewCard
          label="Sertifikat Aktif"
          value={sertifikatAktif}
          icon={<Award className="w-6 h-6 text-purple-600" />}
          color="purple"
          description="Kompetensi terkini"
        />

        <OverviewCard
          label="Internasional"
          value={kegiatanInternasional}
          icon={<Globe className="w-6 h-6 text-orange-600" />}
          color="orange"
          description="Kegiatan global"
        />
      </div>

      {/* Progress Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Status Indikator AMI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Partisipasi Pengembangan (Target: ≥60%)</span>
                <span className={`font-medium ${persentasePartisipasi >= targetPartisipasi ? 'text-green-600' : 'text-red-600'}`}>
                  {persentasePartisipasi >= targetPartisipasi ? 'Tercapai' : 'Belum Tercapai'}
                </span>
              </div>
              <Progress
                value={Math.min(persentasePartisipasi, 100)}
                className="h-3"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {persentasePartisipasi.toFixed(1)}% dari target {targetPartisipasi}%
              </p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Kegiatan Berkelanjutan</span>
                <span className="font-medium text-blue-600">
                  {kegiatanSelesai} dari {totalKegiatan} kegiatan
                </span>
              </div>
              <Progress
                value={totalKegiatan > 0 ? (kegiatanSelesai / totalKegiatan) * 100 : 0}
                className="h-3"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Sertifikat Kompetensi</span>
                <span className="font-medium text-purple-600">
                  {sertifikatAktif} sertifikat aktif
                </span>
              </div>
              <Progress
                value={Math.min((sertifikatAktif / 5) * 100, 100)}
                className="h-3"
              />
            </div>

            <Alert variant={persentasePartisipasi >= targetPartisipasi ? "success" : "destructive"}>
              <Target className="h-4 w-4" />
              <AlertDescription>
                <strong>Status AMI:</strong> {persentasePartisipasi >= targetPartisipasi ? 'Tercapai' : 'Belum tercapai'} -
                Target partisipasi pengembangan keprofesian {targetPartisipasi}%
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              Distribusi Kegiatan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Internasional</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                  {kegiatanInternasional} kegiatan
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Nasional</span>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  {kegiatanNasional} kegiatan
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-800">Regional</span>
                </div>
                <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                  {kegiatanPengembangan.filter(k => k.kategori === 'Regional').length} kegiatan
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-orange-800">Institusional</span>
                </div>
                <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                  {kegiatanPengembangan.filter(k => k.kategori === 'Institusional').length} kegiatan
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PengembanganDosenPage;