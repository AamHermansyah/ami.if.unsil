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
  Award,
  BookOpen,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Target,
  FileText,
  Download,
  Info,
  Trash2,
  Save,
  Upload,
  GraduationCap,
  Building,
  Globe,
  TrendingUp,
  Star,
  Clock,
  MapPin
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { OverviewCard } from '@/components/shared/overview-card';

// TypeScript interfaces
interface KegiatanPengembangan {
  id: string;
  jenisKegiatan: 'Studi Lanjut' | 'Postdoc' | 'ARP' | 'Kursus Singkat' | 'Magang' | 'Pelatihan' | 'Sertifikasi' | 'Konferensi' | 'Seminar' | 'Lokakarya';
  namaKegiatan: string;
  penyelenggara: string;
  lokasi: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  durasi: number; // dalam hari
  status: 'Selesai' | 'Sedang Berlangsung' | 'Akan Datang' | 'Dibatalkan';
  sertifikat: boolean;
  deskripsi: string;
  kategori: 'Nasional' | 'Internasional' | 'Regional' | 'Institusional';
  dokumen?: string;
}

interface SertifikatKompetensi {
  id: string;
  namaSertifikat: string;
  penerbit: string;
  nomorSertifikat: string;
  tanggalTerbit: string;
  tanggalBerlaku: string;
  kategori: 'Pendidik' | 'Profesional' | 'Teknis' | 'Manajemen' | 'Bahasa' | 'Lainnya';
  status: 'Aktif' | 'Kadaluarsa' | 'Dalam Proses';
  dokumen?: string;
}

const PengembanganDosenPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isAddingKegiatan, setIsAddingKegiatan] = useState<boolean>(false);
  const [isAddingSertifikat, setIsAddingSertifikat] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  // Sample data
  const [kegiatanPengembangan, setKegiatanPengembangan] = useState<KegiatanPengembangan[]>([
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
  ]);

  const [sertifikatKompetensi, setSertifikatKompetensi] = useState<SertifikatKompetensi[]>([
    {
      id: '1',
      namaSertifikat: 'Sertifikat Pendidik',
      penerbit: 'Kementerian Pendidikan dan Kebudayaan',
      nomorSertifikat: '12345678901234567890',
      tanggalTerbit: '2020-08-15',
      tanggalBerlaku: '2025-08-15',
      kategori: 'Pendidik',
      status: 'Aktif'
    },
    {
      id: '2',
      namaSertifikat: 'AWS Certified Solutions Architect',
      penerbit: 'Amazon Web Services',
      nomorSertifikat: 'AWS-CSA-2024-001',
      tanggalTerbit: '2024-04-10',
      tanggalBerlaku: '2027-04-10',
      kategori: 'Profesional',
      status: 'Aktif'
    },
    {
      id: '3',
      namaSertifikat: 'Certified Scrum Master',
      penerbit: 'Scrum Alliance',
      nomorSertifikat: 'CSM-2023-456',
      tanggalTerbit: '2023-09-20',
      tanggalBerlaku: '2025-09-20',
      kategori: 'Manajemen',
      status: 'Aktif'
    }
  ]);

  // Form states
  const [newKegiatan, setNewKegiatan] = useState<Partial<KegiatanPengembangan>>({});
  const [newSertifikat, setNewSertifikat] = useState<Partial<SertifikatKompetensi>>({});

  // Calculations
  const totalKegiatan = kegiatanPengembangan.length;
  const kegiatanSelesai = kegiatanPengembangan.filter(k => k.status === 'Selesai').length;
  const persentasePartisipasi = totalKegiatan > 0 ? (kegiatanSelesai / totalKegiatan) * 100 : 0;
  const targetPartisipasi = 60; // 60% sesuai indikator AMI

  const kegiatanInternasional = kegiatanPengembangan.filter(k => k.kategori === 'Internasional').length;
  const kegiatanNasional = kegiatanPengembangan.filter(k => k.kategori === 'Nasional').length;

  const sertifikatAktif = sertifikatKompetensi.filter(s => s.status === 'Aktif').length;

  const handleAddKegiatan = () => {
    if (newKegiatan.namaKegiatan && newKegiatan.jenisKegiatan && newKegiatan.tanggalMulai) {
      const kegiatan: KegiatanPengembangan = {
        id: Date.now().toString(),
        jenisKegiatan: newKegiatan.jenisKegiatan!,
        namaKegiatan: newKegiatan.namaKegiatan,
        penyelenggara: newKegiatan.penyelenggara || '',
        lokasi: newKegiatan.lokasi || '',
        tanggalMulai: newKegiatan.tanggalMulai,
        tanggalSelesai: newKegiatan.tanggalSelesai || newKegiatan.tanggalMulai,
        durasi: newKegiatan.durasi || 1,
        status: newKegiatan.status || 'Akan Datang',
        sertifikat: newKegiatan.sertifikat || false,
        deskripsi: newKegiatan.deskripsi || '',
        kategori: newKegiatan.kategori || 'Nasional'
      };
      setKegiatanPengembangan([...kegiatanPengembangan, kegiatan]);
      setNewKegiatan({});
      setIsAddingKegiatan(false);
    }
  };

  const handleAddSertifikat = () => {
    if (newSertifikat.namaSertifikat && newSertifikat.penerbit && newSertifikat.nomorSertifikat) {
      const sertifikat: SertifikatKompetensi = {
        id: Date.now().toString(),
        namaSertifikat: newSertifikat.namaSertifikat,
        penerbit: newSertifikat.penerbit,
        nomorSertifikat: newSertifikat.nomorSertifikat,
        tanggalTerbit: newSertifikat.tanggalTerbit || new Date().toISOString().split('T')[0],
        tanggalBerlaku: newSertifikat.tanggalBerlaku || '',
        kategori: newSertifikat.kategori || 'Lainnya',
        status: newSertifikat.status || 'Aktif'
      };
      setSertifikatKompetensi([...sertifikatKompetensi, sertifikat]);
      setNewSertifikat({});
      setIsAddingSertifikat(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-800 border-green-200';
      case 'Sedang Berlangsung': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Akan Datang': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Dibatalkan': return 'bg-red-100 text-red-800 border-red-200';
      case 'Aktif': return 'bg-green-100 text-green-800 border-green-200';
      case 'Kadaluarsa': return 'bg-red-100 text-red-800 border-red-200';
      case 'Dalam Proses': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getKategoriIcon = (kategori: string) => {
    switch (kategori) {
      case 'Internasional': return <Globe className="w-4 h-4" />;
      case 'Nasional': return <MapPin className="w-4 h-4" />;
      case 'Regional': return <Building className="w-4 h-4" />;
      case 'Institusional': return <Users className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>

      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Pengembangan Keprofesian Dosen</h1>
            <p className="text-muted-foreground">
              Kelola kegiatan pengembangan keprofesian berkelanjutan dan sertifikasi kompetensi
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
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* Alert & Info */}
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Indikator AMI:</strong> Minimal 60% dosen mengikuti kegiatan keprofesian berkelanjutan
          dalam 1 tahun terakhir, seperti studi lanjut, postdoc, ARP, kursus singkat, magang, pelatihan,
          sertifikasi, konferensi, seminar, dan lokakarya.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <div className="w-full overflow-x-auto">
          <TabsList className="min-w-max w-full flex md:grid grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="kegiatan">Kegiatan Pengembangan</TabsTrigger>
            <TabsTrigger value="sertifikat">Sertifikat & Kompetensi</TabsTrigger>
            <TabsTrigger value="laporan">Laporan & Analisis</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <OverviewCard
              label="Total Kegiatan"
              value={totalKegiatan}
              icon={<Calendar className="w-6 h-6 text-blue-600" />}
              color="blue"
              description={`Tahun ${selectedYear}`}
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

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Kegiatan Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {kegiatanPengembangan.slice(0, 5).map((kegiatan) => (
                  <div key={kegiatan.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getKategoriIcon(kegiatan.kategori)}
                      </div>
                      <div>
                        <p className="font-medium">{kegiatan.namaKegiatan}</p>
                        <p className="text-sm text-muted-foreground">
                          {kegiatan.penyelenggara} • {kegiatan.tanggalMulai}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(kegiatan.status)}>
                        {kegiatan.status}
                      </Badge>
                      {kegiatan.sertifikat && (
                        <Award className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Kegiatan Pengembangan Tab */}
        <TabsContent value="kegiatan" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Kegiatan Pengembangan Keprofesian
                  </CardTitle>
                  <CardDescription>
                    Daftar kegiatan pengembangan keprofesian berkelanjutan dalam 3 tahun terakhir
                  </CardDescription>
                </div>
                <Dialog open={isAddingKegiatan} onOpenChange={setIsAddingKegiatan}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Kegiatan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Tambah Kegiatan Pengembangan</DialogTitle>
                      <DialogDescription>
                        Tambahkan kegiatan pengembangan keprofesian baru
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      <div className="space-y-2">
                        <Label htmlFor="jenisKegiatan">Jenis Kegiatan *</Label>
                        <Select
                          value={newKegiatan.jenisKegiatan || ''}
                          onValueChange={(value) => setNewKegiatan({ ...newKegiatan, jenisKegiatan: value as any })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih jenis kegiatan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Studi Lanjut">Studi Lanjut</SelectItem>
                            <SelectItem value="Postdoc">Postdoc</SelectItem>
                            <SelectItem value="ARP">Academic Recharging Program</SelectItem>
                            <SelectItem value="Kursus Singkat">Kursus Singkat</SelectItem>
                            <SelectItem value="Magang">Magang</SelectItem>
                            <SelectItem value="Pelatihan">Pelatihan</SelectItem>
                            <SelectItem value="Sertifikasi">Sertifikasi</SelectItem>
                            <SelectItem value="Konferensi">Konferensi</SelectItem>
                            <SelectItem value="Seminar">Seminar</SelectItem>
                            <SelectItem value="Lokakarya">Lokakarya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="kategori">Kategori *</Label>
                        <Select
                          value={newKegiatan.kategori || ''}
                          onValueChange={(value) => setNewKegiatan({ ...newKegiatan, kategori: value as any })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Internasional">Internasional</SelectItem>
                            <SelectItem value="Nasional">Nasional</SelectItem>
                            <SelectItem value="Regional">Regional</SelectItem>
                            <SelectItem value="Institusional">Institusional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="namaKegiatan">Nama Kegiatan *</Label>
                        <Input
                          id="namaKegiatan"
                          value={newKegiatan.namaKegiatan || ''}
                          onChange={(e) => setNewKegiatan({ ...newKegiatan, namaKegiatan: e.target.value })}
                          placeholder="International Conference on Machine Learning"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="penyelenggara">Penyelenggara</Label>
                        <Input
                          id="penyelenggara"
                          value={newKegiatan.penyelenggara || ''}
                          onChange={(e) => setNewKegiatan({ ...newKegiatan, penyelenggara: e.target.value })}
                          placeholder="IEEE Computer Society"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lokasi">Lokasi</Label>
                        <Input
                          id="lokasi"
                          value={newKegiatan.lokasi || ''}
                          onChange={(e) => setNewKegiatan({ ...newKegiatan, lokasi: e.target.value })}
                          placeholder="Jakarta, Indonesia"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tanggalMulai">Tanggal Mulai *</Label>
                        <Input
                          id="tanggalMulai"
                          type="date"
                          value={newKegiatan.tanggalMulai || ''}
                          onChange={(e) => setNewKegiatan({ ...newKegiatan, tanggalMulai: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tanggalSelesai">Tanggal Selesai</Label>
                        <Input
                          id="tanggalSelesai"
                          type="date"
                          value={newKegiatan.tanggalSelesai || ''}
                          onChange={(e) => setNewKegiatan({ ...newKegiatan, tanggalSelesai: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="durasi">Durasi (hari)</Label>
                        <Input
                          id="durasi"
                          type="number"
                          min="1"
                          value={newKegiatan.durasi || ''}
                          onChange={(e) => setNewKegiatan({ ...newKegiatan, durasi: Number(e.target.value) })}
                          placeholder="3"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={newKegiatan.status || ''}
                          onValueChange={(value) => setNewKegiatan({ ...newKegiatan, status: value as any })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Akan Datang">Akan Datang</SelectItem>
                            <SelectItem value="Sedang Berlangsung">Sedang Berlangsung</SelectItem>
                            <SelectItem value="Selesai">Selesai</SelectItem>
                            <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="deskripsi">Deskripsi</Label>
                        <Textarea
                          id="deskripsi"
                          value={newKegiatan.deskripsi || ''}
                          onChange={(e) => setNewKegiatan({ ...newKegiatan, deskripsi: e.target.value })}
                          placeholder="Deskripsi singkat tentang kegiatan"
                          rows={3}
                        />
                      </div>

                      <div className="flex items-center space-x-2 md:col-span-2">
                        <Checkbox
                          id="sertifikat"
                          checked={newKegiatan.sertifikat || false}
                          onCheckedChange={(checked) =>
                            setNewKegiatan({ ...newKegiatan, sertifikat: !!checked })
                          }
                        />
                        <Label htmlFor="sertifikat">Mendapat sertifikat</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingKegiatan(false)}>
                        Batal
                      </Button>
                      <Button onClick={handleAddKegiatan}>
                        <Save className="w-4 h-4 mr-2" />
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
                      <TableHead>Kegiatan</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Penyelenggara</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kegiatanPengembangan.map((kegiatan) => (
                      <TableRow key={kegiatan.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{kegiatan.namaKegiatan}</p>
                            <p className="text-sm text-muted-foreground">{kegiatan.lokasi}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{kegiatan.jenisKegiatan}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{kegiatan.penyelenggara}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{kegiatan.tanggalMulai}</p>
                            {kegiatan.tanggalSelesai !== kegiatan.tanggalMulai && (
                              <p className="text-muted-foreground">s/d {kegiatan.tanggalSelesai}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getKategoriIcon(kegiatan.kategori)}
                            <span className="text-sm">{kegiatan.kategori}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(kegiatan.status)}>
                              {kegiatan.status}
                            </Badge>
                            {kegiatan.sertifikat && (
                              <Award className="w-4 h-4 text-yellow-600" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sertifikat & Kompetensi Tab */}
        <TabsContent value="sertifikat" className="w-full space-y-6">
          <Card className="w-full overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    Sertifikat & Kompetensi
                  </CardTitle>
                  <CardDescription>
                    Kelola sertifikat pendidik, profesional, dan kompetensi lainnya
                  </CardDescription>
                </div>
                <Dialog open={isAddingSertifikat} onOpenChange={setIsAddingSertifikat}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Sertifikat
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Tambah Sertifikat</DialogTitle>
                      <DialogDescription>
                        Tambahkan sertifikat atau kompetensi baru
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="namaSertifikat">Nama Sertifikat *</Label>
                        <Input
                          id="namaSertifikat"
                          value={newSertifikat.namaSertifikat || ''}
                          onChange={(e) => setNewSertifikat({ ...newSertifikat, namaSertifikat: e.target.value })}
                          placeholder="AWS Certified Solutions Architect"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="penerbit">Penerbit *</Label>
                        <Input
                          id="penerbit"
                          value={newSertifikat.penerbit || ''}
                          onChange={(e) => setNewSertifikat({ ...newSertifikat, penerbit: e.target.value })}
                          placeholder="Amazon Web Services"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nomorSertifikat">Nomor Sertifikat *</Label>
                        <Input
                          id="nomorSertifikat"
                          value={newSertifikat.nomorSertifikat || ''}
                          onChange={(e) => setNewSertifikat({ ...newSertifikat, nomorSertifikat: e.target.value })}
                          placeholder="AWS-CSA-2024-001"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tanggalTerbit">Tanggal Terbit</Label>
                          <Input
                            id="tanggalTerbit"
                            type="date"
                            value={newSertifikat.tanggalTerbit || ''}
                            onChange={(e) => setNewSertifikat({ ...newSertifikat, tanggalTerbit: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tanggalBerlaku">Tanggal Berlaku</Label>
                          <Input
                            id="tanggalBerlaku"
                            type="date"
                            value={newSertifikat.tanggalBerlaku || ''}
                            onChange={(e) => setNewSertifikat({ ...newSertifikat, tanggalBerlaku: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="kategoriSertifikat">Kategori</Label>
                        <Select
                          value={newSertifikat.kategori || ''}
                          onValueChange={(value) => setNewSertifikat({ ...newSertifikat, kategori: value as any })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pendidik">Pendidik</SelectItem>
                            <SelectItem value="Profesional">Profesional</SelectItem>
                            <SelectItem value="Teknis">Teknis</SelectItem>
                            <SelectItem value="Manajemen">Manajemen</SelectItem>
                            <SelectItem value="Bahasa">Bahasa</SelectItem>
                            <SelectItem value="Lainnya">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="statusSertifikat">Status</Label>
                        <Select
                          value={newSertifikat.status || ''}
                          onValueChange={(value) => setNewSertifikat({ ...newSertifikat, status: value as any })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Aktif">Aktif</SelectItem>
                            <SelectItem value="Kadaluarsa">Kadaluarsa</SelectItem>
                            <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingSertifikat(false)}>
                        Batal
                      </Button>
                      <Button onClick={handleAddSertifikat}>
                        <Save className="w-4 h-4 mr-2" />
                        Simpan
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sertifikat</TableHead>
                    <TableHead>Penerbit</TableHead>
                    <TableHead>Nomor</TableHead>
                    <TableHead>Tanggal Terbit</TableHead>
                    <TableHead>Berlaku Hingga</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sertifikatKompetensi.map((sertifikat) => (
                    <TableRow key={sertifikat.id}>
                      <TableCell className="font-medium">{sertifikat.namaSertifikat}</TableCell>
                      <TableCell>{sertifikat.penerbit}</TableCell>
                      <TableCell className="font-mono text-sm">{sertifikat.nomorSertifikat}</TableCell>
                      <TableCell>{sertifikat.tanggalTerbit}</TableCell>
                      <TableCell>{sertifikat.tanggalBerlaku || 'Tidak terbatas'}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{sertifikat.kategori}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sertifikat.status)}>
                          {sertifikat.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4" />
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

              <Alert variant="warning" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Reminder:</strong> Pastikan sertifikat yang akan kadaluarsa diperbaharui tepat waktu
                  untuk mempertahankan kredibilitas profesional.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Laporan & Analisis Tab */}
        <TabsContent value="laporan" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Ringkasan Tahunan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{totalKegiatan}</div>
                    <div className="text-sm text-blue-800">Total Kegiatan</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{kegiatanSelesai}</div>
                    <div className="text-sm text-green-800">Kegiatan Selesai</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">{sertifikatAktif}</div>
                    <div className="text-sm text-purple-800">Sertifikat Aktif</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-2xl font-bold text-orange-600">{kegiatanInternasional}</div>
                    <div className="text-sm text-orange-800">Kegiatan Global</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Progress vs Target
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Target AMI (≥60% partisipasi)</span>
                    <span className="font-medium">{persentasePartisipasi.toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(persentasePartisipasi, 100)} className="h-3" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Kegiatan Internasional</span>
                    <span className="font-medium">{kegiatanInternasional} kegiatan</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kegiatan Nasional</span>
                    <span className="font-medium">{kegiatanNasional} kegiatan</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sertifikat Profesional</span>
                    <span className="font-medium">{sertifikatKompetensi.filter(s => s.kategori === 'Profesional').length} sertifikat</span>
                  </div>
                </div>

                <Alert variant={persentasePartisipasi >= targetPartisipasi ? "default" : "destructive"}>
                  <Target className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Status AMI:</strong> {persentasePartisipasi >= targetPartisipasi ? 'Tercapai' : 'Belum tercapai'} -
                    Target partisipasi pengembangan keprofesian {targetPartisipasi}%
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Timeline Kegiatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kegiatanPengembangan
                  .sort((a, b) => new Date(b.tanggalMulai).getTime() - new Date(a.tanggalMulai).getTime())
                  .map((kegiatan, index) => (
                    <div key={kegiatan.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{kegiatan.namaKegiatan}</h4>
                          <Badge className={getStatusColor(kegiatan.status)} variant="outline">
                            {kegiatan.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {kegiatan.penyelenggara} • {kegiatan.lokasi}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{kegiatan.tanggalMulai}</span>
                          <span>•</span>
                          <span>{kegiatan.jenisKegiatan}</span>
                          <span>•</span>
                          <span>{kegiatan.kategori}</span>
                          {kegiatan.sertifikat && (
                            <>
                              <span>•</span>
                              <Award className="w-3 h-3 text-yellow-600" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Action Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          Generate Laporan
        </Button>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Simpan Semua Data
        </Button>
      </div>
    </div>
  );
};

export default PengembanganDosenPage;