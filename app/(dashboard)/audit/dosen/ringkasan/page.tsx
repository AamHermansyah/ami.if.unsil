'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Download,
  Upload,
  Plus,
  Eye,
  Award,
  BarChart3,
  FileText,
  Settings,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Header from '../_layouts/header';

const AuditDosenRingkasanPage = () => {
  const dosenLektorKeAtas = 4;
  const persenLektorKeAtas = 67;

  return (
    <div className="space-y-4">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-4">
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
                <span className="text-sm text-muted-foreground">Guru Besar</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-purple-600">1</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-1/6 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Lektor Kepala</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-600">1</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-1/6 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Lektor</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-green-600">2</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-2/6 h-2 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Asisten Ahli</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-orange-600">2</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-2/6 h-2 bg-orange-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t text-center">
              <p className="text-sm text-muted-foreground">Total Lektor ke Atas</p>
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
                  <span className="text-2xl font-bold text-muted-foreground">6</span>
                </div>
                <p className="text-sm text-muted-foreground">Seluruh dosen aktif</p>
              </div>
            </div>
            <Separator />
            <div>
              <div className="flex justify-between text-sm mb-1 space-y-1">
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
              <Plus className="w-4 h-4" />
              Tambah Data Dosen
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Upload className="w-4 h-4" />
              Import dari Excel
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="w-4 h-4" />
              Export Rekapitulasi
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Eye className="w-4 h-4" />
              Validasi Data
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="w-4 h-4" />
              Generate Laporan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditDosenRingkasanPage;