'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  Plus,
  Edit,
  Eye,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  Target,
  FileText,
  Download,
  Info,
  Trash2,
  Save,
  Briefcase
} from 'lucide-react';

// TypeScript interfaces
interface BebanMengajar {
  id: string;
  kode: string;
  namaMataKuliah: string;
  sks: number;
  semester: string;
  tahunAjaran: string;
  jumlahMahasiswa: number;
  kelas: string;
  angkatan: string;
}

interface PembimbinganSkripsi {
  id: string;
  namaMahasiswa: string;
  nim: string;
  judulSkripsi: string;
  tahapBimbingan: string;
  tanggalMulai: string;
  status: 'Aktif' | 'Selesai' | 'Ditunda';
  jumlahBimbingan: number;
}

interface Perwalian {
  id: string;
  kelas: string;
  angkatan: string;
  semester: number;
  tahunAjaran: string;
  jumlahBimbingan: number;
  keterangan: string;
}

interface PraktikLapangan {
  id: string;
  namaMahasiswa: string;
  nim: string;
  tempatPraktik: string;
  periode: string;
  jumlahBimbingan: number;
  status: 'Aktif' | 'Selesai';
}

const BebanKerjaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isAddingData, setIsAddingData] = useState<boolean>(false);
  const [selectedSemester, setSelectedSemester] = useState<string>('Genap 2024/2025');

  // Sample data
  const [bebanMengajar, setBebanMengajar] = useState<BebanMengajar[]>([
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
  ]);

  const [pembimbinganSkripsi] = useState<PembimbinganSkripsi[]>([
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
  ]);

  const [perwalian] = useState<Perwalian[]>([
    {
      id: '1',
      kelas: 'A',
      angkatan: '2022',
      semester: 5,
      tahunAjaran: '2024/2025',
      jumlahBimbingan: 3,
      keterangan: 'Konsultasi akademik rutin'
    },
    {
      id: '2',
      kelas: 'B',
      angkatan: '2022',
      semester: 5,
      tahunAjaran: '2024/2025',
      jumlahBimbingan: 3,
      keterangan: 'Bimbingan pemilihan mata kuliah'
    }
  ]);

  const [praktikLapangan] = useState<PraktikLapangan[]>([
    {
      id: '1',
      namaMahasiswa: 'Andi Wijaya',
      nim: '20200001',
      tempatPraktik: 'PT. Technology Indonesia',
      periode: 'Feb - Apr 2024',
      jumlahBimbingan: 6,
      status: 'Selesai'
    }
  ]);

  // Calculations
  const totalSKS = bebanMengajar.reduce((sum, mata) => sum + mata.sks, 0);
  const totalMahasiswaBimbingan = pembimbinganSkripsi.filter(p => p.status === 'Aktif').length;
  const totalMahasiswaPerwalian = perwalian.length;
  const rataRataBimbinganSkripsi = pembimbinganSkripsi.length > 0
    ? pembimbinganSkripsi.reduce((sum, p) => sum + p.jumlahBimbingan, 0) / pembimbinganSkripsi.length
    : 0;

  // Form states
  const [newBebanMengajar, setNewBebanMengajar] = useState<Partial<BebanMengajar>>({});

  const handleAddBebanMengajar = () => {
    if (newBebanMengajar.namaMataKuliah && newBebanMengajar.sks) {
      const newData: BebanMengajar = {
        id: Date.now().toString(),
        kode: newBebanMengajar.kode || '',
        namaMataKuliah: newBebanMengajar.namaMataKuliah,
        sks: Number(newBebanMengajar.sks),
        semester: selectedSemester,
        tahunAjaran: '2024/2025',
        jumlahMahasiswa: Number(newBebanMengajar.jumlahMahasiswa) || 0,
        kelas: newBebanMengajar.kelas || 'A',
        angkatan: newBebanMengajar.angkatan || '2022'
      };
      setBebanMengajar([...bebanMengajar, newData]);
      setNewBebanMengajar({});
      setIsAddingData(false);
    }
  };

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
      </div>

      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Beban Kerja Dosen</h1>
            <p className="text-muted-foreground">
              Kelola dan monitor beban kerja mengajar, pembimbingan, dan perwalian
            </p>
          </div>
          <div className="flex items-center gap-3">
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
            <Button>
              <Download className="w-4 h-4" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* Alert & Info */}
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Indikator AMI:</strong> Pastikan ekuivalensi waktu mengajar per semester dalam 1 tahun terakhir antara 12-16 SKS,
          rata-rata beban pembimbingan utama ≤6 orang, dan bimbingan perwalian minimal 3 kali per semester.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mengajar">Beban Mengajar</TabsTrigger>
          <TabsTrigger value="pembimbingan">Pembimbingan</TabsTrigger>
          <TabsTrigger value="perwalian">Perwalian</TabsTrigger>
          <TabsTrigger value="praktik">Praktik Lapangan</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <Badge variant="secondary">{perwalian.length} mahasiswa</Badge>
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
        </TabsContent>

        {/* Beban Mengajar Tab */}
        <TabsContent value="mengajar" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Beban Mengajar - {selectedSemester}
                  </CardTitle>
                  <CardDescription>
                    Kelola mata kuliah yang diampu dan ekuivalensi waktu mengajar
                  </CardDescription>
                </div>
                <Dialog open={isAddingData} onOpenChange={setIsAddingData}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4" />
                      Tambah Mata Kuliah
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Tambah Mata Kuliah</DialogTitle>
                      <DialogDescription>
                        Tambahkan mata kuliah yang diampu pada semester ini
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="kode">Kode Mata Kuliah</Label>
                        <Input
                          id="kode"
                          value={newBebanMengajar.kode || ''}
                          onChange={(e) => setNewBebanMengajar({ ...newBebanMengajar, kode: e.target.value })}
                          placeholder="IF101"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="namaMataKuliah">Nama Mata Kuliah *</Label>
                        <Input
                          id="namaMataKuliah"
                          value={newBebanMengajar.namaMataKuliah || ''}
                          onChange={(e) => setNewBebanMengajar({ ...newBebanMengajar, namaMataKuliah: e.target.value })}
                          placeholder="Algoritma dan Pemrograman"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sks">SKS *</Label>
                          <Input
                            id="sks"
                            type="number"
                            min="1"
                            max="6"
                            value={newBebanMengajar.sks || ''}
                            onChange={(e) => setNewBebanMengajar({ ...newBebanMengajar, sks: Number(e.target.value) })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="kelas">Kelas</Label>
                          <Select
                            value={newBebanMengajar.kelas || 'A'}
                            onValueChange={(value) => setNewBebanMengajar({ ...newBebanMengajar, kelas: value })}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A">A</SelectItem>
                              <SelectItem value="B">B</SelectItem>
                              <SelectItem value="C">C</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="angkatan">Angkatan</Label>
                          <Input
                            id="angkatan"
                            type="number"
                            min="0"
                            value={newBebanMengajar.angkatan || ''}
                            onChange={(e) => setNewBebanMengajar({ ...newBebanMengajar, angkatan: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jumlahMahasiswa">Jumlah Mahasiswa</Label>
                          <Input
                            id="jumlahMahasiswa"
                            type="number"
                            min="0"
                            value={newBebanMengajar.jumlahMahasiswa || ''}
                            onChange={(e) => setNewBebanMengajar({ ...newBebanMengajar, jumlahMahasiswa: Number(e.target.value) })}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingData(false)}>
                        Batal
                      </Button>
                      <Button onClick={handleAddBebanMengajar}>
                        <Save className="w-4 h-4" />
                        Simpan
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kode</TableHead>
                      <TableHead>Mata Kuliah</TableHead>
                      <TableHead>SKS</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Angkatan</TableHead>
                      <TableHead>Mahasiswa</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bebanMengajar.map((mata) => (
                      <TableRow key={mata.id}>
                        <TableCell className="font-medium">{mata.kode}</TableCell>
                        <TableCell>{mata.namaMataKuliah}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{mata.sks} SKS</Badge>
                        </TableCell>
                        <TableCell>{mata.semester}</TableCell>
                        <TableCell>{mata.kelas}</TableCell>
                        <TableCell>{mata.angkatan}</TableCell>
                        <TableCell>{mata.jumlahMahasiswa}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{bebanMengajar.length}</div>
                    <div className="text-sm text-muted-foreground">Mata Kuliah</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{totalSKS}</div>
                    <div className="text-sm text-muted-foreground">Total SKS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {bebanMengajar.reduce((sum, mk) => sum + mk.jumlahMahasiswa, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Mahasiswa</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pembimbingan Tab */}
        <TabsContent value="pembimbingan" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                    Pembimbingan Skripsi/Tugas Akhir
                  </CardTitle>
                  <CardDescription>
                    Kelola bimbingan skripsi dan tugas akhir mahasiswa
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4" />
                  Tambah Bimbingan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mahasiswa</TableHead>
                      <TableHead>NIM</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Tahap</TableHead>
                      <TableHead>Bimbingan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pembimbinganSkripsi.map((bimbingan) => (
                      <TableRow key={bimbingan.id}>
                        <TableCell className="font-medium">{bimbingan.namaMahasiswa}</TableCell>
                        <TableCell>{bimbingan.nim}</TableCell>
                        <TableCell className="max-w-xs truncate">{bimbingan.judulSkripsi}</TableCell>
                        <TableCell>{bimbingan.tahapBimbingan}</TableCell>
                        <TableCell>
                          <Badge variant={bimbingan.jumlahBimbingan >= 12 ? "default" : "outline"}>
                            {bimbingan.jumlahBimbingan} kali
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={bimbingan.status === 'Aktif' ? 'default' : 'secondary'}
                          >
                            {bimbingan.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
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

              <Alert variant="warning" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Target AMI:</strong> Bimbingan minimal 12 kali per mahasiswa dan maksimal 6 mahasiswa bimbingan per semester.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Perwalian Tab */}
        <TabsContent value="perwalian" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Bimbingan Perwalian
                  </CardTitle>
                  <CardDescription>
                    Kelola bimbingan perwalian kelas (minimal 3 kali per semester)
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4" />
                  Tambah Perwalian
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Angkatan</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Tahun Ajaran</TableHead>
                      <TableHead>Jumlah Perwalian</TableHead>
                      <TableHead>Keterangan</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {perwalian.map((wali) => (
                      <TableRow key={wali.id}>
                        <TableCell className="font-medium">{wali.kelas}</TableCell>
                        <TableCell>{wali.angkatan}</TableCell>
                        <TableCell>{wali.semester}</TableCell>
                        <TableCell>{wali.tahunAjaran}</TableCell>
                        <TableCell>
                          <Badge variant={wali.jumlahBimbingan >= 3 ? "default" : "destructive"}>
                            {wali.jumlahBimbingan} kali
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{wali.keterangan}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Alert variant="info" className="mt-4">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Dokumentasi:</strong> Bimbingan perwalian harus dilakukan minimal 3 kali per semester
                  (Awal, Tengah, dan Akhir Pembelajaran) dan terdokumentasi dengan sangat baik.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Praktik Lapangan Tab */}
        <TabsContent value="praktik" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                    Bimbingan Praktik Lapangan
                  </CardTitle>
                  <CardDescription>
                    Kelola bimbingan PLP/KP (minimal 3 kali dalam 1 periode)
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4" />
                  Tambah Bimbingan PLP
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mahasiswa</TableHead>
                      <TableHead>NIM</TableHead>
                      <TableHead>Tempat Praktik</TableHead>
                      <TableHead>Periode</TableHead>
                      <TableHead>Jumlah Bimbingan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {praktikLapangan.map((praktik) => (
                      <TableRow key={praktik.id}>
                        <TableCell className="font-medium">{praktik.namaMahasiswa}</TableCell>
                        <TableCell>{praktik.nim}</TableCell>
                        <TableCell>{praktik.tempatPraktik}</TableCell>
                        <TableCell>{praktik.periode}</TableCell>
                        <TableCell>
                          <Badge variant={praktik.jumlahBimbingan >= 3 ? "default" : "destructive"}>
                            {praktik.jumlahBimbingan} kali
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={praktik.status === 'Aktif' ? 'default' : 'secondary'}
                          >
                            {praktik.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
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

              <div className="mt-4 text-center text-muted-foreground">
                {praktikLapangan.length === 0 && (
                  <div className="py-8">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p>Belum ada data bimbingan praktik lapangan</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Action Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button variant="outline">
          <FileText className="w-4 h-4" />
          Cetak Laporan
        </Button>
        <Button>
          <Save className="w-4 h-4" />
          Simpan Semua Perubahan
        </Button>
      </div>
    </div>
  );
};

export default BebanKerjaPage;