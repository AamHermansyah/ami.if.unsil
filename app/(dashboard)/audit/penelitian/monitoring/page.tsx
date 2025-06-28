import React from 'react'
import Header from '../_layouts/header'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { CheckCircle, Eye, MessageSquare, Search, Users, XCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const dosenList = [
  {
    id: '1',
    nama: 'Dr. Ahmad Fauzi, M.Kom',
    nidn: '0412089001',
    jabatan: 'Lektor',
    totalPublikasi: 3,
    publikasiInternasional: 1,
    publikasiNasional: 2,
    totalSitasi: 23,
    rataRataSitasi: 7.7,
    produkDiterapkan: 2,
    melibatkanMahasiswa: true,
    statusVerifikasi: 'Terverifikasi',
    terakhirUpdate: '2024-03-15'
  },
  {
    id: '2',
    nama: 'Dr. Siti Nurhaliza, M.T',
    nidn: '0415079201',
    jabatan: 'Lektor Kepala',
    totalPublikasi: 5,
    publikasiInternasional: 2,
    publikasiNasional: 3,
    totalSitasi: 45,
    rataRataSitasi: 9.0,
    produkDiterapkan: 1,
    melibatkanMahasiswa: true,
    statusVerifikasi: 'Terverifikasi',
    terakhirUpdate: '2024-03-18'
  },
  {
    id: '3',
    nama: 'Budi Santoso, M.Kom',
    nidn: '0420069301',
    jabatan: 'Asisten Ahli',
    totalPublikasi: 1,
    publikasiInternasional: 0,
    publikasiNasional: 1,
    totalSitasi: 3,
    rataRataSitasi: 3.0,
    produkDiterapkan: 0,
    melibatkanMahasiswa: false,
    statusVerifikasi: 'Perlu Revisi',
    terakhirUpdate: '2024-03-10'
  },
  {
    id: '4',
    nama: 'Dr. Dewi Sartika, M.T',
    nidn: '0418089101',
    jabatan: 'Lektor',
    totalPublikasi: 4,
    publikasiInternasional: 1,
    publikasiNasional: 3,
    totalSitasi: 36,
    rataRataSitasi: 9.0,
    produkDiterapkan: 2,
    melibatkanMahasiswa: true,
    statusVerifikasi: 'Belum Diverifikasi',
    terakhirUpdate: '2024-03-20'
  }
];

function AuditPenelitianMonitoringPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terverifikasi': case 'Diverifikasi': case 'Tercapai':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Belum Diverifikasi': case 'Menunggu': case 'Mendekati Target':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Perlu Revisi': case 'Revisi': case 'Belum Tercapai':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Ditolak':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <Header />

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Monitoring Data Penelitian Dosen
              </CardTitle>
              <CardDescription>
                Pantau pencapaian penelitian setiap dosen
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama/NIDN..."
                  className="pl-9 w-64"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-42">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="Terverifikasi">Terverifikasi</SelectItem>
                  <SelectItem value="Belum Diverifikasi">Belum Diverifikasi</SelectItem>
                  <SelectItem value="Perlu Revisi">Perlu Revisi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dosenList.map((dosen) => (
              <div key={dosen.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div>
                        <h4 className="font-medium">{dosen.nama}</h4>
                        <p className="text-sm text-muted-foreground">
                          {dosen.jabatan} • NIDN: {dosen.nidn}
                        </p>
                      </div>
                      <Badge className={getStatusColor(dosen.statusVerifikasi)}>
                        {dosen.statusVerifikasi}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Publikasi</p>
                        <p className="font-bold">{dosen.totalPublikasi}</p>
                        <p className="text-xs text-muted-foreground">
                          {dosen.publikasiInternasional} Int • {dosen.publikasiNasional} Nas
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Sitasi</p>
                        <p className="font-bold">{dosen.totalSitasi}</p>
                        <p className="text-xs text-muted-foreground">
                          Rata: {dosen.rataRataSitasi.toFixed(1)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Produk</p>
                        <p className="font-bold">{dosen.produkDiterapkan}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Kolaborasi</p>
                        <div>
                          {dosen.melibatkanMahasiswa ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Update</p>
                        <p className="text-xs">
                          {new Date(dosen.terakhirUpdate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link href="/audit/penelitian/monitoring/122423423">
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Detail
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuditPenelitianMonitoringPage