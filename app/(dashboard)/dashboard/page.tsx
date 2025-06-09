import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  BookOpen,
  Heart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  PieChart,
  Calendar,
  Eye,
  Download,
  UserCheck,
  UserX,
  Target,
  Award,
  Bell,
  Settings,
  Activity,
  Zap
} from 'lucide-react';

const AuditorDashboard = () => {
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
                AMI Prodi Informatika
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">Prof. Dr. Budi Santoso, M.T • Ketua Program Studi Informatika</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                  Semester Genap 2024/2025
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export Laporan
            </Button>
            <Button size="sm">
              <Settings className="w-4 h-4 mr-1" />
              Kelola Audit
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="px-4 md:px-6 py-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Dosen</p>
                <p className="text-3xl font-bold text-blue-600">28</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">25 Tetap, 3 NIDK</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="px-4 md:px-6 py-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1">Progress Audit</p>
                <p className="text-3xl font-bold text-green-600">84%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress value={84} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="px-4 md:px-6 py-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1">Indikator Tercapai</p>
                <p className="text-3xl font-bold text-purple-600">24/29</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">82.8% tercapai</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="px-4 md:px-6 py-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1">Pending Approval</p>
                <p className="text-3xl font-bold text-orange-600">7</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Perlu tindakan</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="px-4 md:px-6 py-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1">Alert</p>
                <p className="text-3xl font-bold text-red-600">3</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Perlu perhatian</p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Urgent:</strong>
            <p>
              3 dosen belum melengkapi data beban kerja. Deadline dalam <strong>21 hari</strong>.
            </p>
          </AlertDescription>
        </Alert>

        <Alert variant="warning">
          <Clock className="h-4 w-4" />
          <AlertDescription>
            <strong>Reminder:</strong>
            <p>
              Rasio dosen-mahasiswa saat ini 1:32. Target maksimal 1:35 untuk rumpun eksakta.
            </p>
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* SDM Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Sumber Daya Manusia</CardTitle>
                    <CardDescription>Overview kualifikasi dan kinerja dosen</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Detail
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <div className="text-sm text-gray-600 mt-1">Lektor ke atas</div>
                  <div className="text-xs text-green-600 mt-1">75% (Target: 70%)</div>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">1:32</div>
                  <div className="text-sm text-gray-600 mt-1">Rasio Dosen:Mhs</div>
                  <div className="text-xs text-blue-600 mt-1">Sesuai target</div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">22</div>
                  <div className="text-sm text-gray-600 mt-1">Bersertifikat</div>
                  <div className="text-xs text-purple-600 mt-1">79% (Target: 50%)</div>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">4.2</div>
                  <div className="text-sm text-gray-600 mt-1">Kepuasan</div>
                  <div className="text-xs text-orange-600 mt-1">Sangat Baik</div>
                </div>
              </div>

              {/* Progress by Category */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Profil Dosen Lengkap</span>
                  <span className="text-sm text-muted-foreground">28/28 (100%)</span>
                </div>
                <Progress value={100} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Beban Kerja Terupdate</span>
                  <span className="text-sm text-muted-foreground">25/28 (89%)</span>
                </div>
                <Progress value={89} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pengembangan Profesi</span>
                  <span className="text-sm text-muted-foreground">26/28 (93%)</span>
                </div>
                <Progress value={93} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Pending Approval
                <Badge className="bg-orange-50 text-orange-700 border-orange-200">7</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">Dr. Ahmad Fauzi</p>
                  <Badge variant="outline" className="text-xs">Publikasi</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Tambah artikel jurnal internasional</p>
                <div className="flex gap-2">
                  <Button size="sm" className="h-7 px-3 text-xs bg-green-600 hover:bg-green-700">
                    <UserCheck className="w-3 h-3 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 px-3 text-xs">
                    <UserX className="w-3 h-3 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">Dr. Sarah Indira</p>
                  <Badge variant="outline" className="text-xs">Beban Kerja</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Update data pembimbingan skripsi</p>
                <div className="flex gap-2">
                  <Button size="sm" className="h-7 px-3 text-xs bg-green-600 hover:bg-green-700">
                    <UserCheck className="w-3 h-3 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 px-3 text-xs">
                    <UserX className="w-3 h-3 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">Prof. Bambang S.</p>
                  <Badge variant="outline" className="text-xs">Pengabdian</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Upload sertifikat pengabdian</p>
                <div className="flex gap-2">
                  <Button size="sm" className="h-7 px-3 text-xs bg-green-600 hover:bg-green-700">
                    <UserCheck className="w-3 h-3 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 px-3 text-xs">
                    <UserX className="w-3 h-3 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>

              <Button variant="default" size="sm" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Lihat Semua (7)
              </Button>
            </CardContent>
          </Card>

          {/* Research & Publication */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Penelitian & Pengabdian</CardTitle>
                    <CardDescription>Publikasi dan produk karya dosen</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Research Stats */}
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Penelitian
                  </h4>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-800">Publikasi Internasional</p>
                        <p className="text-sm text-blue-600">Target: 1 minimal</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">8</p>
                        <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Tercapai
                        </Badge>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <div>
                        <p className="font-medium text-indigo-800">Publikasi Nasional</p>
                        <p className="text-sm text-indigo-600">Target: 28 (sesuai jml dosen)</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">34</p>
                        <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Tercapai
                        </Badge>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div>
                        <p className="font-medium text-purple-800">Rata-rata Sitasi</p>
                        <p className="text-sm text-purple-600">Target: ≥8 per dosen</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">12.3</p>
                        <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Tercapai
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Service Stats */}
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-600" />
                    Pengabdian
                  </h4>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-pink-50 border border-pink-200 rounded-lg">
                      <div>
                        <p className="font-medium text-pink-800">Publikasi Pengabdian</p>
                        <p className="text-sm text-pink-600">Target: 50% dari jml dosen</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-pink-600">16</p>
                        <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Tercapai
                        </Badge>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div>
                        <p className="font-medium text-orange-800">Produk Diterapkan</p>
                        <p className="text-sm text-orange-600">Target: minimal 3</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600">7</p>
                        <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Tercapai
                        </Badge>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-teal-50 border border-teal-200 rounded-lg">
                      <div>
                        <p className="font-medium text-teal-800">Kolaborasi Mahasiswa</p>
                        <p className="text-sm text-teal-600">Keterlibatan mahasiswa</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-teal-600">89%</p>
                        <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Tinggi
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trend Chart Placeholder */}
                <div className="space-y-4 md:col-span-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    Trend 2024
                  </h4>

                  <div className="p-4 bg-muted rounded-lg border-2 border-dashed text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Grafik Publikasi</p>
                    <p className="text-xs text-gray-400 mt-1">Trend publikasi bulanan</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Q1 2024</span>
                      <span className="font-medium text-green-600">+15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Q2 2024</span>
                      <span className="font-medium text-blue-600">+8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Target 2024</span>
                      <span className="font-medium text-purple-600">94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Dr. Ahmad Fauzi menambah publikasi</p>
                  <p className="text-xs text-gray-500">2 jam yang lalu</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">5 dosen update beban kerja</p>
                  <p className="text-xs text-gray-500">5 jam yang lalu</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-purple-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Dr. Sarah raih sertifikat baru</p>
                  <p className="text-xs text-gray-500">1 hari yang lalu</p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <Clock className="w-4 h-4 mr-2" />
                Riwayat Lengkap
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Aksi Cepat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Laporan AMI
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Kelola Data Dosen
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Set Target Indikator
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Kirim Reminder
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Database
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-600" />
                Deadline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-medium text-orange-800">Data Beban Kerja</p>
                <p className="text-sm text-orange-600">30 Juni 2025 (21 hari lagi)</p>
                <p className="text-xs text-gray-500 mt-1">3 dosen belum lengkap</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-medium text-orange-800">Audit Mutu Internal</p>
                <p className="text-sm text-orange-600">15 Juli 2025 (36 hari lagi)</p>
                <p className="text-xs text-gray-500 mt-1">Persiapan dokumentasi</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-medium text-orange-800">Laporan Semester</p>
                <p className="text-sm text-orange-600">31 Juli 2025 (52 hari lagi)</p>
                <p className="text-xs text-gray-500 mt-1">Compile semua data</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuditorDashboard;