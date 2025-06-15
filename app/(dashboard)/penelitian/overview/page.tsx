'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Award,
  Users,
  Target,
  Info,
  Globe,
  MapPin,
  BarChart3
} from 'lucide-react';
import Header from '../_layouts/header';
import Overview from '../_layouts/overview';

const PenelitianAuditeePage: React.FC = () => {
  // Calculations
  const totalPublikasi = 20;
  const publikasiInternasional = 7;
  const publikasiNasional = 13;
  const totalSitasi = 42;
  const rataRataSitasi = totalPublikasi > 0 ? totalSitasi / totalPublikasi : 0;
  const produkDiterapkan = 10;

  // Target sesuai indikator AMI
  const targetPublikasiInternasional = 1; // minimal 1
  const targetSitasi = 8; // minimal 8 per dosen
  const targetProduk = 3; // minimal 3 produk

  return (
    <div className="space-y-4">
      <Header />

      {/* Alert & Info */}
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Target AMI:</strong> Minimal 1 publikasi internasional bereputasi ATAU publikasi nasional terakreditasi
          sejumlah dosen, rata-rata sitasi ≥8 per dosen, dan minimal 3 produk diterapkan masyarakat.
        </AlertDescription>
      </Alert>

      <Overview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Status Target AMI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Publikasi Internasional (min: {targetPublikasiInternasional})</span>
                <span className={`font-medium ${publikasiInternasional >= targetPublikasiInternasional ? 'text-green-600' : 'text-red-600'}`}>
                  {publikasiInternasional >= targetPublikasiInternasional ? 'Tercapai' : 'Belum Tercapai'}
                </span>
              </div>
              <Progress
                value={Math.min((publikasiInternasional / targetPublikasiInternasional) * 100, 100)}
                className="h-3"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {publikasiInternasional} dari {targetPublikasiInternasional} minimal
              </p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Rata-rata Sitasi (min: {targetSitasi})</span>
                <span className={`font-medium ${rataRataSitasi >= targetSitasi ? 'text-green-600' : 'text-red-600'}`}>
                  {rataRataSitasi >= targetSitasi ? 'Tercapai' : 'Belum Tercapai'}
                </span>
              </div>
              <Progress
                value={Math.min((rataRataSitasi / targetSitasi) * 100, 100)}
                className="h-3"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {rataRataSitasi.toFixed(1)} dari {targetSitasi} minimal
              </p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Produk Diterapkan (min: {targetProduk})</span>
                <span className={`font-medium ${produkDiterapkan >= targetProduk ? 'text-green-600' : 'text-red-600'}`}>
                  {produkDiterapkan >= targetProduk ? 'Tercapai' : 'Belum Tercapai'}
                </span>
              </div>
              <Progress
                value={Math.min((produkDiterapkan / targetProduk) * 100, 100)}
                className="h-3"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {produkDiterapkan} dari {targetProduk} minimal
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Distribusi Publikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Internasional Bereputasi</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                  {publikasiInternasional} publikasi
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Nasional Terakreditasi</span>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  {publikasiNasional} publikasi
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-800">Produk Diterapkan</span>
                </div>
                <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                  {produkDiterapkan} produk
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-orange-800">Kolaborasi Mahasiswa</span>
                </div>
                <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                  2 publikasi
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PenelitianAuditeePage;