import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  BookOpen,
  Users,
  Award,
  Clock,
  FileText,
  Heart,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Target,
  Bell
} from 'lucide-react';
import { OverviewCard } from '@/components/shared/overview-card';

const AuditeeDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar className="rounded-xl w-14 sm:w-16 h-14 sm:h-16 bg-muted">
              <AvatarImage src="https://avatars.githubusercontent.com/u/74630284?v=4&size=64" alt="Profile" />
              <AvatarFallback>KK</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                Dr. Ahmad Fauzi, M.Kom
              </h1>
              <p className="text-sm sm:text-base text-gray-600">NIDN: 0123456789 • Status: Dosen Tetap • Jabfung: Lektor</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                  Semester Genap 2024/2025
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs sm:text-sm text-gray-500">Terakhir login</p>
            <p className="text-sm sm:text-lg font-semibold">Hari ini, 14:30</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OverviewCard
          label="Progress Keseluruhan"
          value="87%"
          icon={<BarChart3 className="w-6 h-6 text-blue-600" />}
          color="blue"
          progress={87}
        />
        <OverviewCard
          label="Publikasi 2024"
          value={12}
          icon={<BookOpen className="w-6 h-6 text-green-600" />}
          color="green"
          description="5 Internasional, 7 Nasional"
        />
        <OverviewCard
          label="Mahasiswa Bimbingan"
          value={18}
          icon={<Users className="w-6 h-6 text-purple-600" />}
          color="purple"
          description="8 Skripsi, 10 Perwalian"
        />
        <OverviewCard
          label="Beban Mengajar"
          value={14}
          icon={<Clock className="w-6 h-6 text-orange-600" />}
          color="orange"
          description="SKS per semester"
        />
      </div>

      {/* Alerts & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Reminder:</strong>
            <p>
              Deadline pengisian data beban kerja semester ini adalah
              <b> 30 Juni 2025</b>. Sisa waktu: 21 hari.
            </p>
          </AlertDescription>
        </Alert>

        <Alert variant="info">
          <Bell className="h-4 w-4" />
          <AlertDescription>
            <strong>Info:</strong> Audit mutu internal akan dilaksanakan pada bulan Juli 2025.
            Pastikan semua data sudah terisi lengkap.
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column - Data Status */}
        <div className="lg:col-span-2 space-y-6">

          {/* SDM Section */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Sumber Daya Manusia</CardTitle>
                  <CardDescription>Status data profil dan kompetensi</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Profil Dosen</h4>
                  <p className="text-sm text-gray-600 mb-3">Data pribadi dan akademik lengkap</p>
                  <Button size="sm" variant="default" className="w-full">
                    <Eye className="w-4 h-4" />
                    Lihat Profile
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Beban Kerja</h4>
                  <p className="text-sm text-gray-600 mb-3">Perlu update data semester ini</p>
                  <Button size="sm" variant="default" className="w-full">
                    <Edit className="w-4 h-4" />
                    Update Data
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Sertifikasi</h4>
                  <p className="text-sm text-gray-600 mb-3">3 sertifikat terupload</p>
                  <Button size="sm" variant="default" className="w-full">
                    <Plus className="w-4 h-4" />
                    Tambah Sertifikat
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Pengembangan Diri</h4>
                  <p className="text-sm text-gray-600 mb-3">8 kegiatan tahun ini</p>
                  <Button size="sm" variant="default" className="w-full">
                    <Eye className="w-4 h-4" />
                    Lihat Detail
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Research Section */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Penelitian</CardTitle>
                    <CardDescription>Publikasi dan produk penelitian</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="p-4 border rounded-lg text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold">Publikasi</h4>
                  <p className="text-2xl font-bold text-blue-600 my-1">12</p>
                  <p className="text-sm text-gray-600">artikel tahun ini</p>
                  <Button size="sm" className="mt-2 w-full" variant="default">
                    <Plus className="w-4 h-4 mr-1" />
                    Tambah
                  </Button>
                </div>

                <div className="p-4 border rounded-lg text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold">Sitasi</h4>
                  <p className="text-2xl font-bold text-purple-600 my-1">94</p>
                  <p className="text-sm text-gray-600">total sitasi</p>
                  <Button size="sm" className="mt-2 w-full" variant="default">
                    <Eye className="w-4 h-4 mr-1" />
                    Lihat
                  </Button>
                </div>

                <div className="p-4 border rounded-lg text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold">Produk</h4>
                  <p className="text-2xl font-bold text-green-600 my-1">3</p>
                  <p className="text-sm text-gray-600">karya diterapkan</p>
                  <Button size="sm" className="mt-2 w-full" variant="default">
                    <Plus className="w-4 h-4 mr-1" />
                    Tambah
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Service Section */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Pengabdian Masyarakat</CardTitle>
                    <CardDescription>Kegiatan dan publikasi pengabdian</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Publikasi Pengabdian</h4>
                      <p className="text-sm text-gray-600">6 artikel tahun ini</p>
                    </div>
                  </div>
                  <Button size="sm" variant="default" className="w-full">
                    <Eye className="w-4 h-4" />
                    Kelola Publikasi
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Kolaborasi Mahasiswa</h4>
                      <p className="text-sm text-gray-600">4 kegiatan bersama</p>
                    </div>
                  </div>
                  <Button size="sm" variant="default" className="w-full">
                    <Plus className="w-4 h-4" />
                    Tambah Kegiatan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Actions & Calendar */}
        <div className="space-y-6">

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Aksi Cepat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4" />
                Tambah Publikasi
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Edit className="w-4 h-4" />
                Update Beban Kerja
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4" />
                Upload Dokumen
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Eye className="w-4 h-4" />
                Lihat Laporan Saya
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                Deadline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-medium text-orange-800">Update Beban Kerja</p>
                <p className="text-sm text-orange-600">30 Juni 2025 (21 hari lagi)</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-medium text-orange-800">Audit Mutu Internal</p>
                <p className="text-sm text-orange-600">15 Juli 2025 (36 hari lagi)</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-medium text-orange-800">Laporan Semester</p>
                <p className="text-sm text-orange-600">31 Juli 2025 (52 hari lagi)</p>
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Progress Indikator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>SDM</span>
                  <span>90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Penelitian</span>
                  <span>95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pengabdian</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuditeeDashboard;