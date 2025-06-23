import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Download, Eye, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '../_layouts/header';

function AuditDosenLaporanPage() {
  return (
    <div className="space-y-4">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4">
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
                <p className="text-sm mb-2">Data per Mei 2024</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">5 Juni 2024, 14:30</span>
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
                <p className="text-sm mb-2">Semester Genap 2023/2024</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">20 Mei 2024, 09:15</span>
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
                <p className="text-sm mb-2">Update April 2024</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">15 April 2024, 16:45</span>
                  <Button size="sm">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>

            <Button size="sm" className="w-full">
              <Eye className="w-4 h-4" />
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
                <Download className="w-4 h-4" />
                Rekapitulasi Profil Dosen (PDF)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="w-4 h-4" />
                Data Kualifikasi Dosen (Excel)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="w-4 h-4" />
                Analisis Jabatan Fungsional (PDF)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="w-4 h-4" />
                Laporan Pencapaian Target (PDF)
              </Button>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Template Laporan</h4>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4" />
                  Template Import Dosen (Excel)
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4" />
                  Form Biodata Dosen (PDF)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AuditDosenLaporanPage