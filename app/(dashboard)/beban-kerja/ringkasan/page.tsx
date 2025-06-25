'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  Target,
  Info,
} from 'lucide-react'
import Header from '../_layouts/header'

const pembimbinganSkripsi = [
  {
    id: '1',
    namaMahasiswa: 'Ahmad Rizki',
    nim: '20210001',
    judulSkripsi: 'Implementasi Machine Learning untuk Prediksi Cuaca',
    tahapBimbingan: 'Bab 4',
    tanggalMulai: '2024-02-01',
    status: 'Aktif',
    jumlahBimbingan: 8
  },
  {
    id: '2',
    namaMahasiswa: 'Siti Nurhaliza',
    nim: '20210002',
    judulSkripsi: 'Sistem Informasi Manajemen Perpustakaan',
    tahapBimbingan: 'Proposal',
    tanggalMulai: '2024-03-15',
    status: 'Aktif',
    jumlahBimbingan: 4
  }
];

const bebanMengajar = [
  {
    id: '1',
    kode: 'IF101',
    namaMataKuliah: 'Algoritma dan Pemrograman',
    sks: 3,
    semester: 'Genap 2024/2025',
    tahunAjaran: '2024/2025',
    jumlahMahasiswa: 42,
    kelas: 'A, B, dan C',
    angkatan: '2021'
  },
  {
    id: '2',
    kode: 'IF201',
    namaMataKuliah: 'Struktur Data',
    sks: 3,
    semester: 'Genap 2024/2025',
    tahunAjaran: '2024/2025',
    jumlahMahasiswa: 38,
    kelas: 'E dan F',
    angkatan: '2021'
  },
  {
    id: '3',
    kode: 'IF301',
    namaMataKuliah: 'Machine Learning',
    sks: 3,
    semester: 'Genap 2024/2025',
    tahunAjaran: '2024/2025',
    jumlahMahasiswa: 25,
    kelas: 'A, B, D, dan G',
    angkatan: '2021'
  }
];

const BebanKerjaPage: React.FC = () => {
  const totalSKS = bebanMengajar.reduce((sum, mata) => sum + mata.sks, 0);
  const totalMahasiswaBimbingan = pembimbinganSkripsi.filter(p => p.status === 'Aktif').length;
  const totalMahasiswaPerwalian = 2;
  const rataRataBimbinganSkripsi = pembimbinganSkripsi.length > 0
    ? pembimbinganSkripsi.reduce((sum, p) => sum + p.jumlahBimbingan, 0) / pembimbinganSkripsi.length
    : 0;

  const StatusIndicator = ({ value, target, label, unit = '' }: {
    value: number;
    target: { min?: number; max?: number };
    label: string;
    unit?: string;
  }) => {
    let status: 'success' | 'warning' | 'danger' = 'success';
    let message = '';

    if (target.min && target.max) {
      if (value < target.min) {
        status = 'warning';
        message = `Di bawah target minimum (${target.min}${unit})`;
      } else if (value > target.max) {
        status = 'danger';
        message = `Melebihi target maksimum (${target.max}${unit})`;
      } else {
        message = `Sesuai target (${target.min}-${target.max}${unit})`;
      }
    } else if (target.max) {
      if (value > target.max) {
        status = 'danger';
        message = `Melebihi target maksimum (≤${target.max}${unit})`;
      } else {
        message = `Sesuai target (≤${target.max}${unit})`;
      }
    }

    const statusColors = {
      success: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      danger: 'bg-red-100 text-red-800 border-red-200'
    };

    const iconColors = {
      success: 'text-green-600',
      warning: 'text-yellow-600',
      danger: 'text-red-600'
    };

    const StatusIcon = status === 'success' ? CheckCircle : AlertTriangle;

    return (
      <div className={`p-4 rounded-lg border ${statusColors[status]}`}>
        <div className="flex items-center gap-2 mb-2">
          <StatusIcon className={`w-5 h-5 ${iconColors[status]}`} />
          <span className="font-semibold">{label}</span>
        </div>
        <div className="text-2xl font-bold mb-1">{value}{unit}</div>
        <div className="text-sm">{message}</div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Header />

      {/* Alert & Info */}
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Indikator AMI:</strong> Pastikan ekuivalensi waktu mengajar per semester dalam 1 tahun terakhir antara 12-16 SKS,
          rata-rata beban pembimbingan utama ≤6 orang, dan bimbingan perwalian minimal 3 kali per semester.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusIndicator
          value={totalSKS}
          target={{ min: 12, max: 16 }}
          label="Total SKS Mengajar"
          unit=" SKS"
        />
        <StatusIndicator
          value={totalMahasiswaBimbingan}
          target={{ max: 6 }}
          label="Bimbingan Skripsi"
          unit=" mahasiswa"
        />
        <StatusIndicator
          value={totalMahasiswaPerwalian}
          target={{ min: 3 }}
          label="Mahasiswa Perwalian"
          unit=" mahasiswa"
        />
        <StatusIndicator
          value={rataRataBimbinganSkripsi}
          target={{ min: 12 }}
          label="Rata-rata Bimbingan"
          unit=" kali"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Ringkasan Semester Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Mata Kuliah Diampu</span>
              <Badge variant="secondary">{bebanMengajar.length} mata kuliah</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Mahasiswa Kelas</span>
              <Badge variant="secondary">
                {bebanMengajar.reduce((sum, mk) => sum + mk.jumlahMahasiswa, 0)} mahasiswa
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Bimbingan Aktif</span>
              <Badge variant="secondary">
                {pembimbinganSkripsi.filter(p => p.status === 'Aktif').length} skripsi
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Mahasiswa Perwalian</span>
              <Badge variant="secondary">2 mahasiswa</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Status Indikator AMI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Beban Mengajar (12-16 SKS)</span>
                  <span className={`font-medium ${totalSKS >= 12 && totalSKS <= 16 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalSKS >= 12 && totalSKS <= 16 ? 'Sesuai' : 'Tidak Sesuai'}
                  </span>
                </div>
                <Progress
                  value={Math.min((totalSKS / 16) * 100, 100)}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Bimbingan Skripsi (≤6 mahasiswa)</span>
                  <span className={`font-medium ${totalMahasiswaBimbingan <= 6 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalMahasiswaBimbingan <= 6 ? 'Sesuai' : 'Melebihi'}
                  </span>
                </div>
                <Progress
                  value={Math.min((totalMahasiswaBimbingan / 6) * 100, 100)}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Frekuensi Bimbingan (≥12 kali)</span>
                  <span className={`font-medium ${rataRataBimbinganSkripsi >= 12 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {rataRataBimbinganSkripsi >= 12 ? 'Sesuai' : 'Perlu Ditingkatkan'}
                  </span>
                </div>
                <Progress
                  value={Math.min((rataRataBimbinganSkripsi / 12) * 100, 100)}
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BebanKerjaPage;