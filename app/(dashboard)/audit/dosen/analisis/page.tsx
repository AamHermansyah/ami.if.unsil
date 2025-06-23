import React from 'react'
import Header from '../_layouts/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, BarChart3, Shield, Target, TrendingUp, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ChartUniversityOrigin } from '../_components/chart-university-origin';

function AuditDosenAnalisisPage() {
  const totalDosen = 6;
  const persenLektorKeAtas = 67;
  const persenBersertifikat = 67;
  const persenNIDK = 17;

  return (
    <div className="space-y-4">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

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
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm">Grafik Trend Jabatan Fungsional</p>
                <p className="text-xs text-muted-foreground mt-1">Data 5 tahun terakhir</p>
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
                <span className="text-sm text-muted-foreground">S3 (Doktor)</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-green-600">3</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div className="w-1/2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">50%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">S2 (Magister)</span>
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
              <ChartUniversityOrigin />
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
              <h4 className="font-semibold">Jumlah Dosen</h4>
              <p className="text-2xl font-bold text-green-600">{totalDosen}</p>
              <p className="text-sm text-muted-foreground">Target: ≥5</p>
              <Badge className="bg-green-50 text-green-700 border-green-200">Tercapai</Badge>
            </div>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold">Lektor ke Atas</h4>
              <p className="text-2xl font-bold text-blue-600">{persenLektorKeAtas}%</p>
              <p className="text-sm text-muted-foreground">Target: ≥70%</p>
              <Badge className="bg-green-50 text-green-700 border-green-200">Tercapai</Badge>
            </div>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold">Bersertifikat</h4>
              <p className="text-2xl font-bold text-purple-600">{persenBersertifikat}%</p>
              <p className="text-sm text-muted-foreground">Target: ≥50%</p>
              <Badge className="bg-green-50 text-green-700 border-green-200">Tercapai</Badge>
            </div>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-semibold">Rasio NIDK</h4>
              <p className="text-2xl font-bold text-orange-600">{persenNIDK}%</p>
              <p className="text-sm text-muted-foreground">Target: ≤10%</p>
              <Badge className="bg-green-50 text-green-700 border-green-200">Sesuai</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuditDosenAnalisisPage