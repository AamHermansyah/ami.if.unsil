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
import { Edit, FileText, Info, Plus, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Perwalian {
  id: string;
  kelas: string;
  angkatan: string;
  semester: number;
  tahunAjaran: string;
  jumlahBimbingan: number;
  keterangan: string;
}

const perwalian: Perwalian[] = [
  {
    id: '1',
    kelas: 'A',
    angkatan: '2022',
    semester: 5,
    tahunAjaran: '2024/2025',
    jumlahBimbingan: 3,
    keterangan: 'Konsultasi akademik rutin'
  },
  {
    id: '2',
    kelas: 'B',
    angkatan: '2022',
    semester: 5,
    tahunAjaran: '2024/2025',
    jumlahBimbingan: 3,
    keterangan: 'Bimbingan pemilihan mata kuliah'
  }
];

function BebanKerjaPerwalianPage() {
  return (
    <div className="space-y-4">
      <Header />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Bimbingan Perwalian
              </CardTitle>
              <CardDescription>
                Kelola bimbingan perwalian kelas (minimal 3 kali per semester)
              </CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4" />
              Tambah Perwalian
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Angkatan</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Tahun Ajaran</TableHead>
                  <TableHead>Jumlah Perwalian</TableHead>
                  <TableHead>Keterangan</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {perwalian.map((wali) => (
                  <TableRow key={wali.id}>
                    <TableCell className="font-medium">{wali.kelas}</TableCell>
                    <TableCell>{wali.angkatan}</TableCell>
                    <TableCell>{wali.semester}</TableCell>
                    <TableCell>{wali.tahunAjaran}</TableCell>
                    <TableCell>
                      <Badge variant={wali.jumlahBimbingan >= 3 ? "default" : "destructive"}>
                        {wali.jumlahBimbingan} kali
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{wali.keterangan}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Alert variant="info" className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Dokumentasi:</strong> Bimbingan perwalian harus dilakukan minimal 3 kali per semester
              (Awal, Tengah, dan Akhir Pembelajaran) dan terdokumentasi dengan sangat baik.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

export default BebanKerjaPerwalianPage