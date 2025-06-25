import React from 'react'
import Header from '../_layouts/header'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Edit, Eye, GraduationCap, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PembimbinganSkripsi {
  id: string;
  namaMahasiswa: string;
  nim: string;
  judulSkripsi: string;
  tahapBimbingan: string;
  tanggalMulai: string;
  status: 'Aktif' | 'Selesai' | 'Ditunda';
  jumlahBimbingan: number;
}

const pembimbinganSkripsi: PembimbinganSkripsi[] = [
  {
    id: '1',
    namaMahasiswa: 'Ahmad Rizki',
    nim: '20210001',
    judulSkripsi: 'Implementasi Machine Learning untuk Prediksi Cuaca',
    tahapBimbingan: 'Bab 4',
    tanggalMulai: '2024-02-01',
    status: 'Aktif',
    jumlahBimbingan: 8
  },
  {
    id: '2',
    namaMahasiswa: 'Siti Nurhaliza',
    nim: '20210002',
    judulSkripsi: 'Sistem Informasi Manajemen Perpustakaan',
    tahapBimbingan: 'Proposal',
    tanggalMulai: '2024-03-15',
    status: 'Aktif',
    jumlahBimbingan: 4
  }
];

function BebanKerjaBimbinganPage() {
  return (
    <div className="space-y-4">
      <Header />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-600" />
                Pembimbingan Skripsi/Tugas Akhir
              </CardTitle>
              <CardDescription>
                Kelola bimbingan skripsi dan tugas akhir mahasiswa
              </CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4" />
              Tambah Bimbingan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mahasiswa</TableHead>
                  <TableHead>NIM</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Tahap</TableHead>
                  <TableHead>Bimbingan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pembimbinganSkripsi.map((bimbingan) => (
                  <TableRow key={bimbingan.id}>
                    <TableCell className="font-medium">{bimbingan.namaMahasiswa}</TableCell>
                    <TableCell>{bimbingan.nim}</TableCell>
                    <TableCell className="max-w-xs truncate">{bimbingan.judulSkripsi}</TableCell>
                    <TableCell>{bimbingan.tahapBimbingan}</TableCell>
                    <TableCell>
                      <Badge variant={bimbingan.jumlahBimbingan >= 12 ? "default" : "outline"}>
                        {bimbingan.jumlahBimbingan} kali
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={bimbingan.status === 'Aktif' ? 'default' : 'secondary'}
                      >
                        {bimbingan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Alert variant="warning" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Target AMI:</strong> Bimbingan minimal 12 kali per mahasiswa dan maksimal 6 mahasiswa bimbingan per semester.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

export default BebanKerjaBimbinganPage