import React from 'react'
import Header from '../_layouts/header'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Briefcase, Calendar, Download, FileBarChart, MessageSquare, Save, Users } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

function AuditPenelitianLaporanPage() {
  return (
    <div className="space-y-4">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Generate Laporan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="w-5 h-5 text-indigo-600" />
              Generate Laporan Audit
            </CardTitle>
            <CardDescription>
              Buat laporan audit penelitian sesuai format AMI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Periode Laporan</Label>
                <Select defaultValue="2024">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">Tahun 2024</SelectItem>
                    <SelectItem value="2023">Tahun 2023</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Format Laporan</Label>
                <Select defaultValue="standard">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Laporan Standard AMI</SelectItem>
                    <SelectItem value="detail">Laporan Detail per Dosen</SelectItem>
                    <SelectItem value="summary">Ringkasan Eksekutif</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Komponen Laporan</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Capaian Indikator AMI</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Detail Publikasi</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Produk Penelitian</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Analisis Pencapaian</span>
                  </label>
                </div>
              </div>

              <Button className="w-full">
                <FileBarChart className="w-4 h-4 mr-2" />
                Generate Laporan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Riwayat Laporan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-600" />
              Riwayat Laporan
            </CardTitle>
            <CardDescription>
              Dokumen laporan audit yang telah dibuat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Laporan AMI Semester Ganjil 2023/2024</p>
                    <p className="text-xs text-muted-foreground">
                      Generated: 15 Jan 2024 • PDF • 2.4 MB
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Laporan AMI Semester Genap 2022/2023</p>
                    <p className="text-xs text-muted-foreground">
                      Generated: 20 Jul 2023 • PDF • 2.1 MB
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Laporan AMI Tahunan 2022</p>
                    <p className="text-xs text-muted-foreground">
                      Generated: 10 Jan 2023 • PDF • 3.8 MB
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Catatan Audit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Catatan & Rekomendasi Audit
          </CardTitle>
          <CardDescription>
            Tambahkan catatan dan rekomendasi untuk perbaikan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Masukkan catatan audit dan rekomendasi perbaikan..."
              rows={6}
              className="resize-none"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Jadwalkan Review
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-1" />
                  Tag Dosen
                </Button>
              </div>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Simpan Catatan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuditPenelitianLaporanPage