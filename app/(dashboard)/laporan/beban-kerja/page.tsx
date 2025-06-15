'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Search,
  Eye,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Users,
  GraduationCap,
  Target,
  BarChart3,
  TrendingUp,
  UserCheck,
  UserX,
  Info,
  Edit,
  RefreshCw
} from 'lucide-react';
import { OverviewCard } from '@/components/shared/overview-card';

// TypeScript interfaces
interface DosenBebanKerja {
  id: string;
  nama: string;
  nidn: string;
  statusKepegawaian: 'Tetap' | 'NIDK';
  semester: string;
  totalSKS: number;
  targetSKS: { min: number; max: number };
  jumlahMataKuliah: number;
  totalMahasiswaKelas: number;
  bimbinganSkripsi: number;
  maxBimbinganSkripsi: number;
  mahasiswaPerwalian: number;
  minPerwalian: number;
  praktikLapangan: number;
  rataRataBimbingan: number;
  minBimbingan: number;
  statusKeseluruhan: 'Sesuai' | 'Tidak Sesuai' | 'Perlu Review';
  terakhirUpdate: string;
  catatan?: string;
}

interface PendingApproval {
  id: string;
  dosenId: string;
  namaDosen: string;
  jenis: 'Beban Mengajar' | 'Bimbingan Skripsi' | 'Perwalian' | 'Praktik Lapangan';
  deskripsi: string;
  tanggalSubmit: string;
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
}

const BebanKerjaAuditorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedSemester, setSelectedSemester] = useState<string>('Genap 2024/2025');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [selectedDosen, setSelectedDosen] = useState<DosenBebanKerja | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  // Sample data - Dalam implementasi nyata, ini akan dari API
  const [dosenBebanKerja] = useState<DosenBebanKerja[]>([
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
  ]);

  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([
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
  ]);

  // Calculations
  const totalDosen = dosenBebanKerja.length;
  const dosenSesuai = dosenBebanKerja.filter(d => d.statusKeseluruhan === 'Sesuai').length;
  const dosenTidakSesuai = dosenBebanKerja.filter(d => d.statusKeseluruhan === 'Tidak Sesuai').length;
  const dosenPerluReview = dosenBebanKerja.filter(d => d.statusKeseluruhan === 'Perlu Review').length;
  const persentaseKepatuhan = totalDosen > 0 ? (dosenSesuai / totalDosen) * 100 : 0;

  const rataRataSKS = dosenBebanKerja.reduce((sum, d) => sum + d.totalSKS, 0) / totalDosen;
  const totalBimbinganSkripsi = dosenBebanKerja.reduce((sum, d) => sum + d.bimbinganSkripsi, 0);
  const dosenMelebihiBimbingan = dosenBebanKerja.filter(d => d.bimbinganSkripsi > d.maxBimbinganSkripsi).length;

  // Filter functions
  const filteredDosen = dosenBebanKerja.filter(dosen => {
    const matchSearch = dosen.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dosen.nidn.includes(searchQuery);
    const matchStatus = statusFilter === 'Semua' || dosen.statusKeseluruhan === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sesuai': return 'bg-green-100 text-green-800 border-green-200';
      case 'Tidak Sesuai': return 'bg-red-100 text-red-800 border-red-200';
      case 'Perlu Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Sesuai': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Tidak Sesuai': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'Perlu Review': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Tinggi': return 'bg-red-100 text-red-800 border-red-200';
      case 'Sedang': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rendah': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleApprove = (approvalId: string) => {
    setPendingApprovals(prev => prev.filter(p => p.id !== approvalId));
    // In real implementation, make API call to approve
  };

  const handleReject = (approvalId: string) => {
    setPendingApprovals(prev => prev.filter(p => p.id !== approvalId));
    // In real implementation, make API call to reject
  };

  const openDetailModal = (dosen: DosenBebanKerja) => {
    setSelectedDosen(dosen);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke SDM
        </Button>
      </div>

      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Monitoring Beban Kerja Dosen</h1>
            <p className="text-muted-foreground">
              Dashboard monitoring dan evaluasi beban kerja seluruh dosen Program Studi Informatika
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Genap 2024/2025">Genap 2024/2025</SelectItem>
                <SelectItem value="Ganjil 2024/2025">Ganjil 2024/2025</SelectItem>
                <SelectItem value="Genap 2023/2024">Genap 2023/2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="w-full overflow-x-auto">
          <TabsList className="min-w-max grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring Dosen</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approval</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
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
                        <Button variant="outline" size="sm" onClick={() => openDetailModal(dosen)}>
                          <Eye className="w-4 h-4" />
                        </Button>
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
              <div className="w-full flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Monitoring Beban Kerja Dosen
                  </CardTitle>
                  <CardDescription>
                    Monitor dan evaluasi beban kerja seluruh dosen
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Cari dosen..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 flex-1 max-w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Semua">Semua Status</SelectItem>
                      <SelectItem value="Sesuai">Sesuai</SelectItem>
                      <SelectItem value="Tidak Sesuai">Tidak Sesuai</SelectItem>
                      <SelectItem value="Perlu Review">Perlu Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dosen</TableHead>
                      <TableHead>SKS</TableHead>
                      <TableHead>Bimbingan</TableHead>
                      <TableHead>Perwalian</TableHead>
                      <TableHead>Frekuensi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Update</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDosen.map((dosen) => (
                      <TableRow key={dosen.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{dosen.nama}</p>
                            <p className="text-sm text-muted-foreground">
                              {dosen.nidn} • {dosen.statusKepegawaian}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <Badge
                              variant={dosen.totalSKS >= dosen.targetSKS.min && dosen.totalSKS <= dosen.targetSKS.max ? "default" : "destructive"}
                            >
                              {dosen.totalSKS} SKS
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              Target: {dosen.targetSKS.min}-{dosen.targetSKS.max}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <Badge
                              variant={dosen.bimbinganSkripsi <= dosen.maxBimbinganSkripsi ? "default" : "destructive"}
                            >
                              {dosen.bimbinganSkripsi}/{dosen.maxBimbinganSkripsi}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">Skripsi</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <Badge
                              variant={dosen.mahasiswaPerwalian >= dosen.minPerwalian ? "default" : "destructive"}
                            >
                              {dosen.mahasiswaPerwalian}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">Mahasiswa</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <Badge
                              variant={dosen.rataRataBimbingan >= dosen.minBimbingan ? "default" : "destructive"}
                            >
                              {dosen.rataRataBimbingan}x
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">Min: {dosen.minBimbingan}x</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(dosen.statusKeseluruhan)}
                            <Badge className={getStatusColor(dosen.statusKeseluruhan)}>
                              {dosen.statusKeseluruhan}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{dosen.terakhirUpdate}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => openDetailModal(dosen)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                Menampilkan {filteredDosen.length} dari {totalDosen} dosen
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Approvals Tab */}
        <TabsContent value="approvals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Pending Approval
                <Badge className="bg-orange-50 text-orange-700 border-orange-200">
                  {pendingApprovals.length}
                </Badge>
              </CardTitle>
              <CardDescription>
                Daftar permintaan update data beban kerja yang menunggu persetujuan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium">{approval.namaDosen}</p>
                          <Badge variant="outline">{approval.jenis}</Badge>
                          <Badge className={getPriorityColor(approval.priority)}>
                            {approval.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {approval.deskripsi}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Disubmit: {approval.tanggalSubmit}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(approval.id)}
                      >
                        <UserCheck className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(approval.id)}
                      >
                        <UserX className="w-4 h-4" />
                        Reject
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                        Detail
                      </Button>
                    </div>
                  </div>
                ))}

                {pendingApprovals.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    <p className="text-muted-foreground">Tidak ada approval yang pending</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Distribusi Beban SKS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { range: '< 12 SKS', count: dosenBebanKerja.filter(d => d.totalSKS < 12).length, color: 'red' },
                    { range: '12-16 SKS', count: dosenBebanKerja.filter(d => d.totalSKS >= 12 && d.totalSKS <= 16).length, color: 'green' },
                    { range: '> 16 SKS', count: dosenBebanKerja.filter(d => d.totalSKS > 16).length, color: 'orange' }
                  ].map((item) => (
                    <div key={item.range} className="flex items-center justify-between">
                      <span className="text-sm">{item.range}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color === 'green' ? 'bg-green-500' :
                              item.color === 'red' ? 'bg-red-500' : 'bg-orange-500'
                              }`}
                            style={{ width: `${(item.count / totalDosen) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                  Distribusi Bimbingan Skripsi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { range: '0-2 mahasiswa', count: dosenBebanKerja.filter(d => d.bimbinganSkripsi <= 2).length, color: 'blue' },
                    { range: '3-6 mahasiswa', count: dosenBebanKerja.filter(d => d.bimbinganSkripsi >= 3 && d.bimbinganSkripsi <= 6).length, color: 'green' },
                    { range: '> 6 mahasiswa', count: dosenBebanKerja.filter(d => d.bimbinganSkripsi > 6).length, color: 'red' }
                  ].map((item) => (
                    <div key={item.range} className="flex items-center justify-between">
                      <span className="text-sm">{item.range}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color === 'green' ? 'bg-green-500' :
                              item.color === 'red' ? 'bg-red-500' : 'bg-blue-500'
                              }`}
                            style={{ width: `${(item.count / totalDosen) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Indikator AMI - Ringkasan Kepatuhan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">
                    {dosenBebanKerja.filter(d => d.totalSKS >= d.targetSKS.min && d.totalSKS <= d.targetSKS.max).length}
                  </div>
                  <div className="text-sm text-blue-800 mb-2">SKS Sesuai Target</div>
                  <div className="text-xs text-blue-600">
                    {((dosenBebanKerja.filter(d => d.totalSKS >= d.targetSKS.min && d.totalSKS <= d.targetSKS.max).length / totalDosen) * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">
                    {dosenBebanKerja.filter(d => d.bimbinganSkripsi <= d.maxBimbinganSkripsi).length}
                  </div>
                  <div className="text-sm text-green-800 mb-2">Bimbingan Sesuai</div>
                  <div className="text-xs text-green-600">
                    {((dosenBebanKerja.filter(d => d.bimbinganSkripsi <= d.maxBimbinganSkripsi).length / totalDosen) * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">
                    {dosenBebanKerja.filter(d => d.mahasiswaPerwalian >= d.minPerwalian).length}
                  </div>
                  <div className="text-sm text-purple-800 mb-2">Perwalian Sesuai</div>
                  <div className="text-xs text-purple-600">
                    {((dosenBebanKerja.filter(d => d.mahasiswaPerwalian >= d.minPerwalian).length / totalDosen) * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">
                    {dosenBebanKerja.filter(d => d.rataRataBimbingan >= d.minBimbingan).length}
                  </div>
                  <div className="text-sm text-orange-800 mb-2">Frekuensi Sesuai</div>
                  <div className="text-xs text-orange-600">
                    {((dosenBebanKerja.filter(d => d.rataRataBimbingan >= d.minBimbingan).length / totalDosen) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              <Alert variant={persentaseKepatuhan >= 80 ? "default" : "destructive"} className="mt-6">
                <Target className="h-4 w-4" />
                <AlertDescription>
                  <strong>Status Keseluruhan:</strong> {persentaseKepatuhan >= 80 ? 'Baik' : 'Perlu Perbaikan'} -
                  {persentaseKepatuhan.toFixed(1)}% dosen memenuhi seluruh indikator AMI beban kerja.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detail Beban Kerja - {selectedDosen?.nama}</DialogTitle>
            <DialogDescription>
              Informasi lengkap beban kerja dan status kepatuhan indikator AMI
            </DialogDescription>
          </DialogHeader>
          {selectedDosen && (
            <div className="space-y-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Informasi Dasar</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">NIDN:</span> {selectedDosen.nidn}</p>
                      <p><span className="font-medium">Status:</span> {selectedDosen.statusKepegawaian}</p>
                      <p><span className="font-medium">Semester:</span> {selectedDosen.semester}</p>
                      <p><span className="font-medium">Update Terakhir:</span> {selectedDosen.terakhirUpdate}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Beban Mengajar</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Total SKS:</span> {selectedDosen.totalSKS} SKS</p>
                      <p><span className="font-medium">Target SKS:</span> {selectedDosen.targetSKS.min}-{selectedDosen.targetSKS.max} SKS</p>
                      <p><span className="font-medium">Mata Kuliah:</span> {selectedDosen.jumlahMataKuliah} mata kuliah</p>
                      <p><span className="font-medium">Total Mahasiswa:</span> {selectedDosen.totalMahasiswaKelas} mahasiswa</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Bimbingan & Perwalian</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Bimbingan Skripsi:</span> {selectedDosen.bimbinganSkripsi}/{selectedDosen.maxBimbinganSkripsi} mahasiswa</p>
                      <p><span className="font-medium">Mahasiswa Perwalian:</span> {selectedDosen.mahasiswaPerwalian} mahasiswa</p>
                      <p><span className="font-medium">Praktik Lapangan:</span> {selectedDosen.praktikLapangan} mahasiswa</p>
                      <p><span className="font-medium">Rata-rata Bimbingan:</span> {selectedDosen.rataRataBimbingan} kali</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Status Kepatuhan</h4>
                    <div className="space-y-2">
                      <Badge className={getStatusColor(selectedDosen.statusKeseluruhan)}>
                        {selectedDosen.statusKeseluruhan}
                      </Badge>
                      {selectedDosen.catatan && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <span className="font-medium">Catatan:</span> {selectedDosen.catatan}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Detail Indikator AMI</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Beban Mengajar (12-16 SKS)</span>
                    <div className="flex items-center gap-2">
                      {selectedDosen.totalSKS >= selectedDosen.targetSKS.min && selectedDosen.totalSKS <= selectedDosen.targetSKS.max ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-sm font-medium">{selectedDosen.totalSKS} SKS</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Bimbingan Skripsi (≤6 mahasiswa)</span>
                    <div className="flex items-center gap-2">
                      {selectedDosen.bimbinganSkripsi <= selectedDosen.maxBimbinganSkripsi ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-sm font-medium">{selectedDosen.bimbinganSkripsi} mahasiswa</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Bimbingan Perwalian (≥3 mahasiswa)</span>
                    <div className="flex items-center gap-2">
                      {selectedDosen.mahasiswaPerwalian >= selectedDosen.minPerwalian ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-sm font-medium">{selectedDosen.mahasiswaPerwalian} mahasiswa</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Frekuensi Bimbingan (≥12 kali)</span>
                    <div className="flex items-center gap-2">
                      {selectedDosen.rataRataBimbingan >= selectedDosen.minBimbingan ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-sm font-medium">{selectedDosen.rataRataBimbingan} kali</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Tutup
            </Button>
            <Button>
              <FileText className="w-4 h-4" />
              Generate Laporan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BebanKerjaAuditorPage;