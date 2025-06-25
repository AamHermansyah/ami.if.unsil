'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  BookOpen,
  Award,
  TrendingUp,
  Users,
  AlertTriangle,
  Target,
  BarChart3,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Shield,
  Printer,
} from 'lucide-react';
import { OverviewCard } from '@/components/shared/overview-card';

const dosenDetail = {
  id: '1',
  nama: 'Dr. Ahmad Fauzi, M.Kom',
  nidn: '0412089001',
  email: 'ahmad.fauzi@unsil.ac.id',
  noTelepon: '08123456789',
  jabatanFungsional: 'Lektor',
  pendidikanTerakhir: 'S3 Ilmu Komputer',
  fakultas: 'Teknik',
  prodi: 'Informatika',
  statusKepegawaian: 'PNS'
};

const DetailPenelitianDosenPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Calculations
  const totalPublikasi = 10;
  const publikasiInternasional = 4;
  const totalSitasi = 32;
  const rataRataSitasi = 5.8;
  const publikasiTerverifikasi = 4;
  const publikasiBelumVerifikasi = 2;
  const produkDiterapkan = 5;
  const publikasiDenganMahasiswa = 7;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>

      {/* Dosen Info Card */}
      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{dosenDetail.nama}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    NIDN: {dosenDetail.nidn}
                  </span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    {dosenDetail.jabatanFungsional}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {dosenDetail.prodi}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Whatsapp
                </Button>
                <Button size="sm" variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Cetak CV
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{dosenDetail.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{dosenDetail.noTelepon}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                <span>{dosenDetail.pendidikanTerakhir}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span>{dosenDetail.statusKepegawaian}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <OverviewCard
          label="Total Publikasi"
          value={totalPublikasi}
          icon={<BookOpen className="w-5 h-5 text-blue-600" />}
          color="blue"
        />

        <OverviewCard
          label="Total Sitasi"
          value={totalSitasi}
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          color="green"
        />

        <OverviewCard
          label="Produk Diterapkan"
          value={produkDiterapkan}
          icon={<Award className="w-5 h-5 text-purple-600" />}
          color="purple"
        />

        <OverviewCard
          label="Kolaborasi Mhs"
          value={publikasiDenganMahasiswa}
          icon={<Users className="w-5 h-5 text-orange-600" />}
          color="orange"
        />
      </div>

      {/* Alert if there are unverified items */}
      {publikasiBelumVerifikasi > 0 && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Perhatian:</strong> Terdapat {publikasiBelumVerifikasi} publikasi yang belum diverifikasi.
            Mohon segera lakukan verifikasi untuk memastikan data valid.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-2">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="publikasi">Publikasi</TabsTrigger>
          <TabsTrigger value="produk">Produk</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Target Achievement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Pencapaian Target AMI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Publikasi Internasional Bereputasi</span>
                    <span className="font-medium text-green-600">
                      {publikasiInternasional} publikasi
                    </span>
                  </div>
                  <Progress value={100} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">Target minimal 1 tercapai</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Rata-rata Sitasi</span>
                    <span className={`font-medium ${rataRataSitasi >= 8 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {rataRataSitasi.toFixed(1)} sitasi
                    </span>
                  </div>
                  <Progress value={Math.min((rataRataSitasi / 8) * 100, 100)} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">Target minimal 8 sitasi</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Produk Diterapkan Masyarakat</span>
                    <span className="font-medium text-green-600">
                      {produkDiterapkan} produk
                    </span>
                  </div>
                  <Progress value={Math.min((produkDiterapkan / 3) * 100, 100)} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">Kontribusi untuk target prodi</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Melibatkan Mahasiswa</span>
                    <span className="font-medium text-green-600">
                      {((publikasiDenganMahasiswa / totalPublikasi) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={(publikasiDenganMahasiswa / totalPublikasi) * 100} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {publikasiDenganMahasiswa} dari {totalPublikasi} publikasi
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Publication Stats by Year */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Statistik Publikasi per Tahun
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[2024, 2023, 2022].map(year => {
                    return (
                      <div key={year} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{year}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">10 publikasi</Badge>
                          <Badge variant="secondary">
                            20 sitasi
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status Verifikasi</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="text-center p-2 border rounded-md">
                      <p className="text-lg font-bold">{publikasiTerverifikasi}</p>
                      <p className="text-xs text-muted-foreground">Terverifikasi</p>
                    </div>
                    <div className="text-center p-2 border rounded-md">
                      <p className="text-lg font-bold">{publikasiBelumVerifikasi}</p>
                      <p className="text-xs text-muted-foreground">Belum</p>
                    </div>
                    <div className="text-center p-2 border rounded-md">
                      <p className="text-lg font-bold">0</p>
                      <p className="text-xs text-muted-foreground">Revisi</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Publikasi Tab */}
        <TabsContent value="publikasi" className="space-y-4">
          Tabel Publikasi
        </TabsContent>

        {/* Produk Tab */}
        <TabsContent value="produk" className="space-y-4">
          Card Produk
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailPenelitianDosenPage;