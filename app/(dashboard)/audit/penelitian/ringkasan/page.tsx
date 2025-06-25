'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  BookOpen,
  Award,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Info,
  FileText,
  Target,
  XCircle,
  ClipboardCheck,
  AlertCircle,
  UserCheck,
} from 'lucide-react';
import Header from '../_layouts/header';
import { OverviewCard } from '@/components/shared/overview-card';

// TypeScript interfaces
interface DosenPublikasi {
  id: string;
  nama: string;
  nidn: string;
  jabatan: string;
  totalPublikasi: number;
  publikasiInternasional: number;
  publikasiNasional: number;
  totalSitasi: number;
  rataRataSitasi: number;
  produkDiterapkan: number;
  melibatkanMahasiswa: boolean;
  statusVerifikasi: 'Belum Diverifikasi' | 'Terverifikasi' | 'Perlu Revisi';
  terakhirUpdate: string;
}

interface VerifikasiItem {
  id: string;
  dosenId: string;
  dosenNama: string;
  jenisData: 'Publikasi' | 'Produk' | 'Kolaborasi';
  judul: string;
  tanggalSubmit: string;
  status: 'Menunggu' | 'Diverifikasi' | 'Ditolak' | 'Revisi';
  catatan?: string;
}

interface RingkasanIndikator {
  indikator: string;
  target: string;
  realisasi: string;
  persentase: number;
  status: 'Tercapai' | 'Belum Tercapai' | 'Mendekati Target';
}

const PenelitianAuditorPage: React.FC = () => {
  const [dosenList] = useState<DosenPublikasi[]>([
    {
      id: '1',
      nama: 'Dr. Ahmad Fauzi, M.Kom',
      nidn: '0412089001',
      jabatan: 'Lektor',
      totalPublikasi: 3,
      publikasiInternasional: 1,
      publikasiNasional: 2,
      totalSitasi: 23,
      rataRataSitasi: 7.7,
      produkDiterapkan: 2,
      melibatkanMahasiswa: true,
      statusVerifikasi: 'Terverifikasi',
      terakhirUpdate: '2024-03-15'
    },
    {
      id: '2',
      nama: 'Dr. Siti Nurhaliza, M.T',
      nidn: '0415079201',
      jabatan: 'Lektor Kepala',
      totalPublikasi: 5,
      publikasiInternasional: 2,
      publikasiNasional: 3,
      totalSitasi: 45,
      rataRataSitasi: 9.0,
      produkDiterapkan: 1,
      melibatkanMahasiswa: true,
      statusVerifikasi: 'Terverifikasi',
      terakhirUpdate: '2024-03-18'
    },
    {
      id: '3',
      nama: 'Budi Santoso, M.Kom',
      nidn: '0420069301',
      jabatan: 'Asisten Ahli',
      totalPublikasi: 1,
      publikasiInternasional: 0,
      publikasiNasional: 1,
      totalSitasi: 3,
      rataRataSitasi: 3.0,
      produkDiterapkan: 0,
      melibatkanMahasiswa: false,
      statusVerifikasi: 'Perlu Revisi',
      terakhirUpdate: '2024-03-10'
    },
    {
      id: '4',
      nama: 'Dr. Dewi Sartika, M.T',
      nidn: '0418089101',
      jabatan: 'Lektor',
      totalPublikasi: 4,
      publikasiInternasional: 1,
      publikasiNasional: 3,
      totalSitasi: 36,
      rataRataSitasi: 9.0,
      produkDiterapkan: 2,
      melibatkanMahasiswa: true,
      statusVerifikasi: 'Belum Diverifikasi',
      terakhirUpdate: '2024-03-20'
    }
  ]);

  // Data verifikasi pending
  const [verifikasiItems] = useState<VerifikasiItem[]>([
    {
      id: '1',
      dosenId: '4',
      dosenNama: 'Dr. Dewi Sartika, M.T',
      jenisData: 'Publikasi',
      judul: 'AI-Based Approach for Smart City Development',
      tanggalSubmit: '2024-03-20',
      status: 'Menunggu'
    },
    {
      id: '2',
      dosenId: '3',
      dosenNama: 'Budi Santoso, M.Kom',
      jenisData: 'Produk',
      judul: 'Sistem Informasi Desa Digital',
      tanggalSubmit: '2024-03-10',
      status: 'Revisi',
      catatan: 'Bukti penerapan kurang lengkap'
    }
  ]);

  // Ringkasan indikator AMI
  const ringkasanIndikator: RingkasanIndikator[] = [
    {
      indikator: 'Publikasi Internasional Bereputasi',
      target: 'Minimal 1 publikasi',
      realisasi: '4 publikasi',
      persentase: 100,
      status: 'Tercapai'
    },
    {
      indikator: 'Publikasi Nasional Terakreditasi',
      target: '28 publikasi (sesuai jumlah dosen)',
      realisasi: '9 publikasi',
      persentase: 32,
      status: 'Belum Tercapai'
    },
    {
      indikator: 'Rata-rata Sitasi per Dosen',
      target: '≥ 8 sitasi',
      realisasi: '7.2 sitasi',
      persentase: 90,
      status: 'Mendekati Target'
    },
    {
      indikator: 'Produk/Karya Diterapkan Masyarakat',
      target: 'Minimal 3 produk',
      realisasi: '5 produk',
      persentase: 100,
      status: 'Tercapai'
    },
    {
      indikator: 'Dosen Melibatkan Mahasiswa',
      target: '100% dosen',
      realisasi: '75% dosen',
      persentase: 75,
      status: 'Belum Tercapai'
    }
  ];

  // Calculations
  const totalDosen = dosenList.length;
  const dosenTerverifikasi = dosenList.filter(d => d.statusVerifikasi === 'Terverifikasi').length;
  const dosenPerluRevisi = dosenList.filter(d => d.statusVerifikasi === 'Perlu Revisi').length;
  const dosenBelumVerifikasi = dosenList.filter(d => d.statusVerifikasi === 'Belum Diverifikasi').length;

  const totalPublikasiAll = dosenList.reduce((sum, d) => sum + d.totalPublikasi, 0);
  const totalInternasional = dosenList.reduce((sum, d) => sum + d.publikasiInternasional, 0);
  const totalNasional = dosenList.reduce((sum, d) => sum + d.publikasiNasional, 0);
  const totalSitasiAll = dosenList.reduce((sum, d) => sum + d.totalSitasi, 0);
  const avgSitasiPerDosen = totalDosen > 0 ? totalSitasiAll / totalDosen : 0;
  const totalProdukDiterapkan = dosenList.reduce((sum, d) => sum + d.produkDiterapkan, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terverifikasi': case 'Diverifikasi': case 'Tercapai':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Belum Diverifikasi': case 'Menunggu': case 'Mendekati Target':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Perlu Revisi': case 'Revisi': case 'Belum Tercapai':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Ditolak':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Tercapai':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Mendekati Target':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'Belum Tercapai':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4">
      <Header />

      {/* Alert Status */}
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Perhatian:</strong> Terdapat {dosenBelumVerifikasi} dosen dengan data belum diverifikasi
          dan {dosenPerluRevisi} dosen yang memerlukan revisi data penelitian.
        </AlertDescription>
      </Alert>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          label="Total Publikasi"
          value={totalPublikasiAll}
          icon={<BookOpen className="w-6 h-6 text-blue-600" />}
          color="blue"
          description={`${totalInternasional} Int & ${totalNasional} Nas`}
        />

        <OverviewCard
          label="Rata-rata Sitasi"
          value={avgSitasiPerDosen.toFixed(1)}
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          color="green"
          description="Target: ≥8 per dosen"
        />

        <OverviewCard
          label="Produk Diterapkan"
          value={totalProdukDiterapkan}
          icon={<Award className="w-6 h-6 text-purple-600" />}
          color="purple"
          description="Target: ≥3 produk"
        />

        <OverviewCard
          label="Status Verifikasi"
          value={`${dosenTerverifikasi}/${totalDosen}`}
          icon={<UserCheck className="w-6 h-6 text-orange-600" />}
          color="orange"
          description={`${Math.round((dosenTerverifikasi / totalDosen) * 100)}% terverifikasi`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Status Pencapaian Target AMI */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Status Pencapaian Target AMI
            </CardTitle>
            <CardDescription>
              Ringkasan pencapaian indikator penelitian tahun 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ringkasanIndikator.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm font-medium">{item.indikator}</span>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  <Progress value={item.persentase} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: {item.target}</span>
                    <span>Realisasi: {item.realisasi}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Distribusi Status Verifikasi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-green-600" />
              Status Verifikasi Data
            </CardTitle>
            <CardDescription>
              Distribusi status verifikasi data penelitian dosen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg border">
                  <p className="text-2xl font-bold">{dosenBelumVerifikasi}</p>
                  <p className="text-sm text-muted-foreground">Belum Verifikasi</p>
                </div>
                <div className="text-center p-4 rounded-lg border">
                  <p className="text-2xl font-bold">{dosenPerluRevisi}</p>
                  <p className="text-sm text-muted-foreground">Perlu Revisi</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Item Menunggu Verifikasi</h4>
                <div className="space-y-2">
                  {verifikasiItems.filter(item => item.status === 'Menunggu').slice(0, 3).map((item) => (
                    <div key={item.id} className="flex flex-wrap gap-2 items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{item.judul}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.dosenNama} • {item.jenisData}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Lihat
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PenelitianAuditorPage;