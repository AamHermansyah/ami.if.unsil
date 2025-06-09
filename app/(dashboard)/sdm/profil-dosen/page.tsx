'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Search,
  Download,
  Upload,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertTriangle,
  User,
  GraduationCap,
  Award,
  Mail,
  Phone,
  Target,
  BarChart3,
  TrendingUp,
  FileText,
  Settings,
  Clock,
  Shield,
  MoreHorizontal
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const SDMProfilDosenPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data - dalam implementasi nyata akan dari API
  const dosenData = [
    {
      id: 1,
      nama: "Dr. Ahmad Fauzi, M.Kom",
      nidn: "0123456789",
      nip: "198501012018031001",
      status: "Tetap",
      jabfung: "Lektor",
      tmtJabfung: "2022-04-01",
      pendidikan: "S3 Teknik Informatika",
      universitas: "Institut Teknologi Bandung",
      tahunLulus: 2020,
      email: "ahmad.fauzi@unsil.ac.id",
      phone: "+62 812-3456-7890",
      sertifikat: true,
      status_data: "Lengkap",
      last_update: "2024-06-08",
      foto: null
    },
    {
      id: 2,
      nama: "Prof. Dr. Sarah Indira, M.T",
      nidn: "0234567890",
      nip: "197803152008122002",
      status: "Tetap",
      jabfung: "Guru Besar",
      tmtJabfung: "2020-01-01",
      pendidikan: "S3 Teknik Informatika",
      universitas: "Institut Teknologi Sepuluh Nopember",
      tahunLulus: 2018,
      email: "sarah.indira@unsil.ac.id",
      phone: "+62 813-4567-8901",
      sertifikat: true,
      status_data: "Lengkap",
      last_update: "2024-06-07",
      foto: null
    },
    {
      id: 3,
      nama: "Dr. Budi Santoso, M.Kom",
      nidn: "0345678901",
      nip: "198012102015031003",
      status: "Tetap",
      jabfung: "Lektor Kepala",
      tmtJabfung: "2021-10-01",
      pendidikan: "S3 Ilmu Komputer",
      universitas: "Universitas Indonesia",
      tahunLulus: 2019,
      email: "budi.santoso@unsil.ac.id",
      phone: "+62 814-5678-9012",
      sertifikat: true,
      status_data: "Lengkap",
      last_update: "2024-06-05",
      foto: null
    },
    {
      id: 4,
      nama: "Rini Marlina, M.Kom",
      nidn: "0456789012",
      nip: "198506201019032004",
      status: "Tetap",
      jabfung: "Asisten Ahli",
      tmtJabfung: "2019-03-01",
      pendidikan: "S2 Teknik Informatika",
      universitas: "Universitas Padjadjaran",
      tahunLulus: 2017,
      email: "rini.marlina@unsil.ac.id",
      phone: "+62 815-6789-0123",
      sertifikat: false,
      status_data: "Perlu Update",
      last_update: "2024-05-20",
      foto: null
    },
    {
      id: 5,
      nama: "Dr. Eko Prasetyo, M.T",
      nidn: "0567890123",
      nip: "197909152008121005",
      status: "Tetap",
      jabfung: "Lektor",
      tmtJabfung: "2023-01-01",
      pendidikan: "S3 Teknik Elektro",
      universitas: "Institut Teknologi Bandung",
      tahunLulus: 2021,
      email: "eko.prasetyo@unsil.ac.id",
      phone: "+62 816-7890-1234",
      sertifikat: true,
      status_data: "Lengkap",
      last_update: "2024-06-06",
      foto: null
    },
    {
      id: 6,
      nama: "Dian Permata, M.Kom",
      nidk: "8812345678",
      nip: "-",
      status: "NIDK",
      jabfung: "Asisten Ahli",
      tmtJabfung: "2023-08-01",
      pendidikan: "S2 Sistem Informasi",
      universitas: "Universitas Siliwangi",
      tahunLulus: 2022,
      email: "dian.permata@unsil.ac.id",
      phone: "+62 817-8901-2345",
      sertifikat: false,
      status_data: "Perlu Update",
      last_update: "2024-05-15",
      foto: null
    }
  ];

  // Calculate statistics
  const totalDosen = dosenData.length;
  const dosenTetap = dosenData.filter(d => d.status === "Tetap").length;
  const dosenNIDK = dosenData.filter(d => d.status === "NIDK").length;
  const dosenLektorKeAtas = dosenData.filter(d =>
    d.jabfung === "Lektor" || d.jabfung === "Lektor Kepala" || d.jabfung === "Guru Besar"
  ).length;
  const dosenBersertifikat = dosenData.filter(d => d.sertifikat).length;
  const persenLektorKeAtas = Math.round((dosenLektorKeAtas / totalDosen) * 100);
  const persenBersertifikat = Math.round((dosenBersertifikat / totalDosen) * 100);
  const persenNIDK = Math.round((dosenNIDK / totalDosen) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              Daftar Profil Dosen
            </h1>
            <p className="text-muted-foreground mt-1">
              Manajemen data profil dan kualifikasi dosen untuk audit mutu internal
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                Total: {totalDosen} Dosen
              </Badge>
              <Badge className="bg-green-50 text-green-700 border-green-200">
                Tetap: {dosenTetap}
              </Badge>
              <Badge className="bg-orange-50 text-orange-700 border-orange-200">
                NIDK: {dosenNIDK}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>
      </div>

      {/* Key Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="px-6 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground mb-1">Total Dosen</p>
                <p className="text-3xl font-bold text-blue-600">{totalDosen}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Target: ≥5 dosen</p>
            <div className="mt-2">
              <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Target Tercapai
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="px-6 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground mb-1">Lektor ke Atas</p>
                <p className="text-3xl font-bold text-green-600">{persenLektorKeAtas}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress value={persenLektorKeAtas} className="mt-3" />
            <p className="text-sm text-gray-500 mt-2">Target: ≥70%</p>
            <div className="mt-2">
              <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Target Tercapai
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="px-6 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground mb-1">Bersertifikat</p>
                <p className="text-3xl font-bold text-purple-600">{persenBersertifikat}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <Progress value={persenBersertifikat} className="mt-3" />
            <p className="text-sm text-gray-500 mt-2">Target: ≥50%</p>
            <div className="mt-2">
              <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Target Tercapai
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="px-6 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground mb-1">Rasio NIDK</p>
                <p className="text-3xl font-bold text-orange-600">{persenNIDK}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <Progress value={persenNIDK} className="mt-3" />
            <p className="text-sm text-gray-500 mt-2">Target: ≤10%</p>
            <div className="mt-2">
              <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Sesuai Target
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="px-6 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground mb-1">Rasio Dosen:Mhs</p>
                <p className="text-3xl font-bold text-indigo-600">1:32</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Target: {'<'}35 (eksakta)</p>
            <div className="mt-2">
              <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Sesuai Target
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Perhatian:</strong> 2 dosen belum melengkapi data profil.
            Pastikan semua data terisi untuk audit mutu internal.
          </AlertDescription>
        </Alert>

        <Alert className="border-blue-200 bg-blue-50">
          <Users className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Info:</strong> Semua indikator SDM sudah memenuhi target minimum.
            Pertahankan kualitas dan tingkatkan kompetensi dosen.
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="list">Daftar Dosen</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Laporan</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6">

            {/* Jabatan Fungsional Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Jabatan Fungsional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Guru Besar</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-purple-600">1</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-1/6 h-2 bg-purple-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lektor Kepala</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-blue-600">1</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-1/6 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lektor</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-green-600">2</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-2/6 h-2 bg-green-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Asisten Ahli</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-orange-600">2</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-2/6 h-2 bg-orange-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t text-center">
                  <p className="text-sm text-gray-600">Total Lektor ke Atas</p>
                  <p className="text-2xl font-bold text-green-600">{dosenLektorKeAtas}/6</p>
                  <p className="text-xs text-gray-500">({persenLektorKeAtas}% dari total)</p>
                </div>
              </CardContent>
            </Card>

            {/* Status Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Status Data Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-800">Data Lengkap</span>
                      <span className="text-2xl font-bold text-green-600">4</span>
                    </div>
                    <p className="text-sm text-green-600">Profil siap audit</p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-yellow-800">Perlu Update</span>
                      <span className="text-2xl font-bold text-yellow-600">2</span>
                    </div>
                    <p className="text-sm text-yellow-600">Memerlukan perbaikan</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">Total Dosen</span>
                      <span className="text-2xl font-bold text-gray-600">6</span>
                    </div>
                    <p className="text-sm text-gray-600">Seluruh dosen aktif</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress Kelengkapan</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-indigo-600" />
                  Aksi Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Data Dosen
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import dari Excel
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Rekapitulasi
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Validasi Data
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Laporan
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* List Tab */}
        <TabsContent value="list" className="space-y-6">

          <div className="w-full flex justify-end">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari nama, NIDN, atau NIDK..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Dosen Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {dosenData.map((dosen) => (
              <Card key={dosen.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold truncate">{dosen.nama}</h3>
                        <p className="text-sm text-gray-600">{dosen.nidn || dosen.nidk}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge
                        className={`text-xs ${dosen.status_data === "Lengkap"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }`}
                      >
                        {dosen.status_data === "Lengkap" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {dosen.status_data}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p className="font-medium">{dosen.status}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Jabatan Fungsional</p>
                      <p className="font-medium">{dosen.jabfung}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Pendidikan Terakhir</p>
                      <p className="font-medium">{dosen.pendidikan}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tahun Lulus</p>
                      <p className="font-medium">{dosen.tahunLulus}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 truncate">{dosen.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{dosen.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 truncate">{dosen.universitas}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {dosen.sertifikat && (
                        <Badge className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Bersertifikat
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="text-xs text-gray-500">
                    Terakhir update: {new Date(dosen.last_update).toLocaleDateString('id-ID')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {dosenData.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Tidak ada data dosen</h3>
                <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter yang dipilih.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Trend Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Trend Kualifikasi Dosen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 bg-muted rounded-lg border-2 border-dashed flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Grafik Trend Jabatan Fungsional</p>
                    <p className="text-xs text-gray-400 mt-1">Data 5 tahun terakhir</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">+3</div>
                    <div className="text-blue-600">Kenaikan Jabfung 2024</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">83%</div>
                    <div className="text-green-600">Target Tercapai</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Distribusi Pendidikan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">S3 (Doktor)</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-green-600">3</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-1/2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-500">50%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">S2 (Magister)</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-blue-600">3</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-1/2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-500">50%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <h4 className="font-medium">Asal Universitas</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Institut Teknologi Bandung</span>
                      <span className="font-semibold">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Universitas Indonesia</span>
                      <span className="font-semibold">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Institut Teknologi Sepuluh Nopember</span>
                      <span className="font-semibold">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Universitas Padjadjaran</span>
                      <span className="font-semibold">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Universitas Siliwangi</span>
                      <span className="font-semibold">1</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Pencapaian Target Indikator AMI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Jumlah Dosen</h4>
                  <p className="text-2xl font-bold text-green-600">{totalDosen}</p>
                  <p className="text-sm text-gray-600">Target: ≥5</p>
                  <Badge className="bg-green-50 text-green-700 border-green-200">Tercapai</Badge>
                </div>

                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Lektor ke Atas</h4>
                  <p className="text-2xl font-bold text-blue-600">{persenLektorKeAtas}%</p>
                  <p className="text-sm text-gray-600">Target: ≥70%</p>
                  <Badge className="bg-green-50 text-green-700 border-green-200">Tercapai</Badge>
                </div>

                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Bersertifikat</h4>
                  <p className="text-2xl font-bold text-purple-600">{persenBersertifikat}%</p>
                  <p className="text-sm text-gray-600">Target: ≥50%</p>
                  <Badge className="bg-green-50 text-green-700 border-green-200">Tercapai</Badge>
                </div>

                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Rasio NIDK</h4>
                  <p className="text-2xl font-bold text-orange-600">{persenNIDK}%</p>
                  <p className="text-sm text-gray-600">Target: ≤10%</p>
                  <Badge className="bg-green-50 text-green-700 border-green-200">Sesuai</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-6">
            {/* Report History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Riwayat Laporan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Rekapitulasi Profil Dosen</h4>
                      <Badge variant="outline" className="text-xs">PDF</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Data per Mei 2024</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">5 Juni 2024, 14:30</span>
                      <Button size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Analisis Jabatan Fungsional</h4>
                      <Badge variant="outline" className="text-xs">PDF</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Semester Genap 2023/2024</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">20 Mei 2024, 09:15</span>
                      <Button size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Data Kualifikasi Dosen</h4>
                      <Badge variant="outline" className="text-xs">Excel</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Update April 2024</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">15 April 2024, 16:45</span>
                      <Button size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Lihat Semua Riwayat
                </Button>
              </CardContent>
            </Card>
            {/* Generate Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Generate Laporan
                </CardTitle>
                <CardDescription>
                  Buat laporan profil dosen untuk keperluan audit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Rekapitulasi Profil Dosen (PDF)
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Data Kualifikasi Dosen (Excel)
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Analisis Jabatan Fungsional (PDF)
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Laporan Pencapaian Target (PDF)
                  </Button>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Template Laporan</h4>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Template Import Dosen (Excel)
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Form Biodata Dosen (PDF)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SDMProfilDosenPage;