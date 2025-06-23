'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Eye,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Users,
  Target,
  BarChart3,
  TrendingUp,
  Info,
  RefreshCw
} from 'lucide-react';
import { OverviewCard } from '@/components/shared/overview-card';
import Header from '../_layouts/header';

// TypeScript interfaces
// interface DosenBebanKerja {
//   id: string;
//   nama: string;
//   nidn: string;
//   statusKepegawaian: 'Tetap' | 'NIDK';
//   semester: string;
//   totalSKS: number;
//   targetSKS: { min: number; max: number };
//   jumlahMataKuliah: number;
//   totalMahasiswaKelas: number;
//   bimbinganSkripsi: number;
//   maxBimbinganSkripsi: number;
//   mahasiswaPerwalian: number;
//   minPerwalian: number;
//   praktikLapangan: number;
//   rataRataBimbingan: number;
//   minBimbingan: number;
//   statusKeseluruhan: 'Sesuai' | 'Tidak Sesuai' | 'Perlu Review';
//   terakhirUpdate: string;
//   catatan?: string;
// }

// interface PendingApproval {
//   id: string;
//   dosenId: string;
//   namaDosen: string;
//   jenis: 'Beban Mengajar' | 'Bimbingan Skripsi' | 'Perwalian' | 'Praktik Lapangan';
//   deskripsi: string;
//   tanggalSubmit: string;
//   priority: 'Tinggi' | 'Sedang' | 'Rendah';
// }

const BebanKerjaAuditorPage: React.FC = () => {
  // Sample data - Dalam implementasi nyata, ini akan dari API
  const dosenBebanKerja = [
    {
      id: '1',
      nama: 'Dr. Ahmad Fauzi, M.Kom',
      nidn: '0123456789',
      statusKepegawaian: 'Tetap',
      semester: 'Genap 2024/2025',
      totalSKS: 14,
      targetSKS: { min: 12, max: 16 },
      jumlahMataKuliah: 3,
      totalMahasiswaKelas: 105,
      bimbinganSkripsi: 4,
      maxBimbinganSkripsi: 6,
      mahasiswaPerwalian: 8,
      minPerwalian: 3,
      praktikLapangan: 2,
      rataRataBimbingan: 15,
      minBimbingan: 12,
      statusKeseluruhan: 'Sesuai',
      terakhirUpdate: '2024-06-08',
      catatan: 'Semua indikator terpenuhi dengan baik'
    },
    {
      id: '2',
      nama: 'Dr. Sarah Indira, M.T',
      nidn: '0234567890',
      statusKepegawaian: 'Tetap',
      semester: 'Genap 2024/2025',
      totalSKS: 18,
      targetSKS: { min: 12, max: 16 },
      jumlahMataKuliah: 4,
      totalMahasiswaKelas: 145,
      bimbinganSkripsi: 7,
      maxBimbinganSkripsi: 6,
      mahasiswaPerwalian: 6,
      minPerwalian: 3,
      praktikLapangan: 1,
      rataRataBimbingan: 8,
      minBimbingan: 12,
      statusKeseluruhan: 'Tidak Sesuai',
      terakhirUpdate: '2024-06-05',
      catatan: 'Melebihi beban mengajar dan bimbingan, kurang frekuensi bimbingan'
    },
    {
      id: '3',
      nama: 'Prof. Bambang Sutrisno, Ph.D',
      nidn: '0345678901',
      statusKepegawaian: 'Tetap',
      semester: 'Genap 2024/2025',
      totalSKS: 10,
      targetSKS: { min: 12, max: 16 },
      jumlahMataKuliah: 2,
      totalMahasiswaKelas: 68,
      bimbinganSkripsi: 3,
      maxBimbinganSkripsi: 6,
      mahasiswaPerwalian: 5,
      minPerwalian: 3,
      praktikLapangan: 0,
      rataRataBimbingan: 18,
      minBimbingan: 12,
      statusKeseluruhan: 'Perlu Review',
      terakhirUpdate: '2024-06-10',
      catatan: 'Beban mengajar di bawah minimum'
    },
    {
      id: '4',
      nama: 'Dr. Rina Novita, M.Kom',
      nidn: '8812345678',
      statusKepegawaian: 'NIDK',
      semester: 'Genap 2024/2025',
      totalSKS: 12,
      targetSKS: { min: 12, max: 16 },
      jumlahMataKuliah: 3,
      totalMahasiswaKelas: 92,
      bimbinganSkripsi: 2,
      maxBimbinganSkripsi: 6,
      mahasiswaPerwalian: 4,
      minPerwalian: 3,
      praktikLapangan: 1,
      rataRataBimbingan: 14,
      minBimbingan: 12,
      statusKeseluruhan: 'Sesuai',
      terakhirUpdate: '2024-06-09',
      catatan: 'Memenuhi semua target dengan baik'
    }
  ];

  const pendingApprovals = [
    {
      id: '1',
      dosenId: '2',
      namaDosen: 'Dr. Sarah Indira, M.T',
      jenis: 'Beban Mengajar',
      deskripsi: 'Update mata kuliah Algoritma Lanjut - 3 SKS',
      tanggalSubmit: '2024-06-09',
      priority: 'Sedang'
    },
    {
      id: '2',
      dosenId: '1',
      namaDosen: 'Dr. Ahmad Fauzi, M.Kom',
      jenis: 'Bimbingan Skripsi',
      deskripsi: 'Tambah bimbingan mahasiswa baru - Rizki Ahmad',
      tanggalSubmit: '2024-06-08',
      priority: 'Tinggi'
    },
    {
      id: '3',
      dosenId: '3',
      namaDosen: 'Prof. Bambang Sutrisno, Ph.D',
      jenis: 'Perwalian',
      deskripsi: 'Update data bimbingan perwalian semester ini',
      tanggalSubmit: '2024-06-07',
      priority: 'Rendah'
    }
  ];

  // Calculations
  const totalDosen = dosenBebanKerja.length;
  const dosenSesuai = dosenBebanKerja.filter(d => d.statusKeseluruhan === 'Sesuai').length;
  const dosenTidakSesuai = dosenBebanKerja.filter(d => d.statusKeseluruhan === 'Tidak Sesuai').length;
  const dosenPerluReview = dosenBebanKerja.filter(d => d.statusKeseluruhan === 'Perlu Review').length;
  const persentaseKepatuhan = totalDosen > 0 ? (dosenSesuai / totalDosen) * 100 : 0;

  const rataRataSKS = dosenBebanKerja.reduce((sum, d) => sum + d.totalSKS, 0) / totalDosen;
  const totalBimbinganSkripsi = dosenBebanKerja.reduce((sum, d) => sum + d.bimbinganSkripsi, 0);
  const dosenMelebihiBimbingan = dosenBebanKerja.filter(d => d.bimbinganSkripsi > d.maxBimbinganSkripsi).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sesuai': return 'bg-green-100 text-green-800 border-green-200';
      case 'Tidak Sesuai': return 'bg-red-100 text-red-800 border-red-200';
      case 'Perlu Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Header />

      {/* Alert & Info */}
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Monitoring AMI:</strong> Target beban mengajar 12-16 SKS per semester, maksimal 6 bimbingan skripsi,
          minimal 3 kali perwalian per semester, dan minimal 12 kali bimbingan tugas akhir.
        </AlertDescription>
      </Alert>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <OverviewCard
          label="Total Dosen"
          value={totalDosen}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          color="blue"
          description="Aktif semester ini"
        />
        <OverviewCard
          label="Kepatuhan"
          value={`${persentaseKepatuhan.toFixed(1)}%`}
          icon={<Target className="w-6 h-6 text-green-600" />}
          color="green"
          description={`${dosenSesuai} dari ${totalDosen} dosen`}
        />
        <OverviewCard
          label="Pending Approval"
          value={pendingApprovals.length}
          icon={<Clock className="w-6 h-6 text-orange-600" />}
          color="orange"
          description="Menunggu tindakan"
        />
        <OverviewCard
          label="Perlu Perhatian"
          value={dosenTidakSesuai + dosenPerluReview}
          icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
          color="red"
          description="Tidak sesuai target"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Status Kepatuhan Dosen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Sesuai Target</span>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  {dosenSesuai} dosen
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-red-800">Tidak Sesuai</span>
                </div>
                <Badge className="bg-red-100 text-red-800 border-red-300">
                  {dosenTidakSesuai} dosen
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Perlu Review</span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  {dosenPerluReview} dosen
                </Badge>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Total Kepatuhan</span>
                <span className="font-medium">{persentaseKepatuhan.toFixed(1)}%</span>
              </div>
              <Progress value={persentaseKepatuhan} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Ringkasan Beban Kerja
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{rataRataSKS.toFixed(1)}</div>
                <div className="text-sm text-blue-800">Rata-rata SKS</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">{totalBimbinganSkripsi}</div>
                <div className="text-sm text-green-800">Total Bimbingan</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">{dosenMelebihiBimbingan}</div>
                <div className="text-sm text-purple-800">Melebihi Bimbingan</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">
                  {dosenBebanKerja.filter(d => d.totalSKS < d.targetSKS.min || d.totalSKS > d.targetSKS.max).length}
                </div>
                <div className="text-sm text-orange-800">SKS Tidak Sesuai</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-purple-600" />
            Update Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dosenBebanKerja
              .sort((a, b) => new Date(b.terakhirUpdate).getTime() - new Date(a.terakhirUpdate).getTime())
              .slice(0, 5)
              .map((dosen) => (
                <div key={dosen.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{dosen.nama}</p>
                      <p className="text-sm text-muted-foreground">
                        Update terakhir: {dosen.terakhirUpdate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(dosen.statusKeseluruhan)}>
                      {dosen.statusKeseluruhan}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BebanKerjaAuditorPage;