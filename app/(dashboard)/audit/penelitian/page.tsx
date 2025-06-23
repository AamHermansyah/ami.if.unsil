'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  Eye,
  Download,
  BookOpen,
  Award,
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle,
  Info,
  Filter,
  Search,
  FileText,
  Target,
  BarChart3,
  CheckSquare,
  XCircle,
  MessageSquare,
  FileCheck,
  ClipboardCheck,
  Clock,
  AlertCircle,
  UserCheck,
  FileBarChart,
  Briefcase,
  Calendar,
  Save
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [searchDosen, setSearchDosen] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showVerifikasiDialog, setShowVerifikasiDialog] = useState<boolean>(false);
  const [selectedVerifikasi, setSelectedVerifikasi] = useState<VerifikasiItem | null>(null);

  // Sample data dosen
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
  const dosenMelibatkanMahasiswa = dosenList.filter(d => d.melibatkanMahasiswa).length;

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

  const filteredDosen = dosenList.filter(dosen => {
    const matchSearch = dosen.nama.toLowerCase().includes(searchDosen.toLowerCase()) ||
      dosen.nidn.includes(searchDosen);
    const matchFilter = filterStatus === 'all' || dosen.statusVerifikasi === filterStatus;
    return matchSearch && matchFilter;
  });

  const handleVerifikasi = (item: VerifikasiItem) => {
    setSelectedVerifikasi(item);
    setShowVerifikasiDialog(true);
  };

  const handleUpdateVerifikasi = (status: 'Diverifikasi' | 'Ditolak' | 'Revisi', catatan?: string) => {
    // Handle update verifikasi
    console.log('Update verifikasi:', { status, catatan });
    setShowVerifikasiDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Dashboard
        </Button>
      </div>

      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Audit Penelitian & Publikasi</h1>
            <p className="text-muted-foreground">
              Monitor dan verifikasi capaian penelitian Program Studi Informatika
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Laporan
            </Button>
          </div>
        </div>
      </div>

      {/* Alert Status */}
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Perhatian:</strong> Terdapat {dosenBelumVerifikasi} dosen dengan data belum diverifikasi
          dan {dosenPerluRevisi} dosen yang memerlukan revisi data penelitian.
        </AlertDescription>
      </Alert>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1">Total Publikasi</p>
                <p className="text-3xl font-bold text-blue-600">{totalPublikasiAll}</p>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-blue-600">{totalInternasional} Int</span> •
                  <span className="text-green-600"> {totalNasional} Nas</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1">Rata-rata Sitasi</p>
                <p className="text-3xl font-bold text-green-600">{avgSitasiPerDosen.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Target: ≥8 per dosen
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1">Produk Diterapkan</p>
                <p className="text-3xl font-bold text-purple-600">{totalProdukDiterapkan}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Target: ≥3 produk
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1">Status Verifikasi</p>
                <p className="text-3xl font-bold text-orange-600">
                  {dosenTerverifikasi}/{totalDosen}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((dosenTerverifikasi / totalDosen) * 100)}% terverifikasi
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring Dosen</TabsTrigger>
          <TabsTrigger value="verifikasi">Verifikasi Data</TabsTrigger>
          <TabsTrigger value="laporan">Laporan Audit</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Pencapaian Target AMI */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Status Pencapaian Target AMI
                </CardTitle>
                <CardDescription>
                  Ringkasan pencapaian indikator penelitian tahun {selectedYear}
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
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-2xl font-bold text-green-600">{dosenTerverifikasi}</p>
                      <p className="text-sm text-green-700">Terverifikasi</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-2xl font-bold text-yellow-600">{dosenBelumVerifikasi}</p>
                      <p className="text-sm text-yellow-700">Belum Verifikasi</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-2xl font-bold text-red-600">{dosenPerluRevisi}</p>
                      <p className="text-sm text-red-700">Perlu Revisi</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-3">Item Menunggu Verifikasi</h4>
                    <div className="space-y-2">
                      {verifikasiItems.filter(item => item.status === 'Menunggu').slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{item.judul}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.dosenNama} • {item.jenisData}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => handleVerifikasi(item)}>
                            Verifikasi
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top 5 Dosen */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Top 5 Dosen Berdasarkan Publikasi & Sitasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dosenList.sort((a, b) => b.totalPublikasi - a.totalPublikasi).slice(0, 5).map((dosen, index) => (
                  <div key={dosen.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{dosen.nama}</p>
                        <p className="text-sm text-muted-foreground">
                          {dosen.jabatan} • NIDN: {dosen.nidn}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-bold text-blue-600">{dosen.totalPublikasi}</p>
                        <p className="text-xs text-muted-foreground">Publikasi</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-green-600">{dosen.totalSitasi}</p>
                        <p className="text-xs text-muted-foreground">Sitasi</p>
                      </div>
                      <Badge className={getStatusColor(dosen.statusVerifikasi)}>
                        {dosen.statusVerifikasi}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitoring Dosen Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Monitoring Data Penelitian Dosen
                  </CardTitle>
                  <CardDescription>
                    Pantau pencapaian penelitian setiap dosen
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari nama/NIDN..."
                      value={searchDosen}
                      onChange={(e) => setSearchDosen(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="Terverifikasi">Terverifikasi</SelectItem>
                      <SelectItem value="Belum Diverifikasi">Belum Diverifikasi</SelectItem>
                      <SelectItem value="Perlu Revisi">Perlu Revisi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDosen.map((dosen) => (
                  <div key={dosen.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div>
                            <h4 className="font-medium">{dosen.nama}</h4>
                            <p className="text-sm text-muted-foreground">
                              {dosen.jabatan} • NIDN: {dosen.nidn}
                            </p>
                          </div>
                          <Badge className={getStatusColor(dosen.statusVerifikasi)}>
                            {dosen.statusVerifikasi}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Publikasi</p>
                            <p className="font-bold">{dosen.totalPublikasi}</p>
                            <p className="text-xs text-muted-foreground">
                              {dosen.publikasiInternasional} Int • {dosen.publikasiNasional} Nas
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Sitasi</p>
                            <p className="font-bold">{dosen.totalSitasi}</p>
                            <p className="text-xs text-muted-foreground">
                              Rata: {dosen.rataRataSitasi.toFixed(1)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Produk</p>
                            <p className="font-bold">{dosen.produkDiterapkan}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Kolaborasi</p>
                            <div>
                              {dosen.melibatkanMahasiswa ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Update</p>
                            <p className="text-xs">
                              {new Date(dosen.terakhirUpdate).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Detail
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Stats */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700">Target Publikasi</p>
                      <p className="text-2xl font-bold text-blue-800">
                        {totalInternasional >= 1 || totalNasional >= totalDosen ? 'Tercapai' : 'Belum'}
                      </p>
                    </div>
                    <CheckSquare className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700">Melibatkan Mahasiswa</p>
                      <p className="text-2xl font-bold text-green-800">
                        {dosenMelibatkanMahasiswa}/{totalDosen}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-700">Update Terakhir</p>
                      <p className="text-lg font-bold text-purple-800">
                        {new Date(Math.max(...dosenList.map(d => new Date(d.terakhirUpdate).getTime()))).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verifikasi Tab */}
        <TabsContent value="verifikasi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-orange-600" />
                Verifikasi Data Penelitian
              </CardTitle>
              <CardDescription>
                Verifikasi dan validasi data penelitian yang disubmit dosen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pending">
                    Menunggu ({verifikasiItems.filter(i => i.status === 'Menunggu').length})
                  </TabsTrigger>
                  <TabsTrigger value="revision">
                    Revisi ({verifikasiItems.filter(i => i.status === 'Revisi').length})
                  </TabsTrigger>
                  <TabsTrigger value="verified">
                    Terverifikasi ({verifikasiItems.filter(i => i.status === 'Diverifikasi').length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-3">
                  {verifikasiItems.filter(item => item.status === 'Menunggu').map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{item.jenisData}</Badge>
                            <span className="text-sm text-muted-foreground">
                              Disubmit: {new Date(item.tanggalSubmit).toLocaleDateString('id-ID')}
                            </span>
                          </div>
                          <h4 className="font-medium mb-1">{item.judul}</h4>
                          <p className="text-sm text-muted-foreground">{item.dosenNama}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                          <Button size="sm" onClick={() => handleVerifikasi(item)}>
                            Verifikasi
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="revision" className="space-y-3">
                  {verifikasiItems.filter(item => item.status === 'Revisi').map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{item.jenisData}</Badge>
                            <Badge className="bg-yellow-100 text-yellow-800">Perlu Revisi</Badge>
                          </div>
                          <h4 className="font-medium mb-1">{item.judul}</h4>
                          <p className="text-sm text-muted-foreground">{item.dosenNama}</p>
                          {item.catatan && (
                            <div className="mt-2 p-2 bg-yellow-50 rounded text-sm">
                              <p className="font-medium text-yellow-800">Catatan:</p>
                              <p className="text-yellow-700">{item.catatan}</p>
                            </div>
                          )}
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Lihat Revisi
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="verified" className="space-y-3">
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                    <p>Belum ada data yang terverifikasi</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Laporan Tab */}
        <TabsContent value="laporan" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Generate Laporan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileBarChart className="w-5 h-5 text-indigo-600" />
                  Generate Laporan Audit
                </CardTitle>
                <CardDescription>
                  Buat laporan audit penelitian sesuai format AMI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Periode Laporan</Label>
                    <Select defaultValue="2024">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">Tahun 2024</SelectItem>
                        <SelectItem value="2023">Tahun 2023</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Format Laporan</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Laporan Standard AMI</SelectItem>
                        <SelectItem value="detail">Laporan Detail per Dosen</SelectItem>
                        <SelectItem value="summary">Ringkasan Eksekutif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Komponen Laporan</Label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Capaian Indikator AMI</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Detail Publikasi</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Produk Penelitian</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Analisis Pencapaian</span>
                      </label>
                    </div>
                  </div>

                  <Button className="w-full">
                    <FileBarChart className="w-4 h-4 mr-2" />
                    Generate Laporan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Riwayat Laporan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  Riwayat Laporan
                </CardTitle>
                <CardDescription>
                  Dokumen laporan audit yang telah dibuat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Laporan AMI Semester Ganjil 2023/2024</p>
                        <p className="text-xs text-muted-foreground">
                          Generated: 15 Jan 2024 • PDF • 2.4 MB
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Laporan AMI Semester Genap 2022/2023</p>
                        <p className="text-xs text-muted-foreground">
                          Generated: 20 Jul 2023 • PDF • 2.1 MB
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Laporan AMI Tahunan 2022</p>
                        <p className="text-xs text-muted-foreground">
                          Generated: 10 Jan 2023 • PDF • 3.8 MB
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Catatan Audit */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Catatan & Rekomendasi Audit
              </CardTitle>
              <CardDescription>
                Tambahkan catatan dan rekomendasi untuk perbaikan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Masukkan catatan audit dan rekomendasi perbaikan..."
                  rows={6}
                  className="resize-none"
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      Jadwalkan Review
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="w-4 h-4 mr-1" />
                      Tag Dosen
                    </Button>
                  </div>
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Catatan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Verifikasi Dialog */}
      <Dialog open={showVerifikasiDialog} onOpenChange={setShowVerifikasiDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verifikasi Data Penelitian</DialogTitle>
            <DialogDescription>
              Verifikasi dan berikan feedback untuk data penelitian
            </DialogDescription>
          </DialogHeader>
          {selectedVerifikasi && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedVerifikasi.judul}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedVerifikasi.dosenNama} • {selectedVerifikasi.jenisData}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Status Verifikasi</Label>
                <Select defaultValue="Diverifikasi">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diverifikasi">Diverifikasi</SelectItem>
                    <SelectItem value="Revisi">Perlu Revisi</SelectItem>
                    <SelectItem value="Ditolak">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Catatan (Opsional)</Label>
                <Textarea
                  placeholder="Berikan catatan atau feedback..."
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifikasiDialog(false)}>
              Batal
            </Button>
            <Button onClick={() => handleUpdateVerifikasi('Diverifikasi')}>
              Simpan Verifikasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bottom Action Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button variant="outline">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Kirim Reminder
        </Button>
        <Button variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          Export Data
        </Button>
        <Button>
          <FileBarChart className="w-4 h-4 mr-2" />
          Generate Laporan AMI
        </Button>
      </div>
    </div>
  );
};

export default PenelitianAuditorPage;