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
import { Briefcase, Edit, Eye, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PraktikLapangan {
  id: string;
  namaMahasiswa: string;
  nim: string;
  tempatPraktik: string;
  periode: string;
  jumlahBimbingan: number;
  status: 'Aktif' | 'Selesai';
}

const praktikLapangan: PraktikLapangan[] = [
  {
    id: '1',
    namaMahasiswa: 'Andi Wijaya',
    nim: '20200001',
    tempatPraktik: 'PT. Technology Indonesia',
    periode: 'Feb - Apr 2024',
    jumlahBimbingan: 6,
    status: 'Selesai'
  }
];

function BebanKerjaKerjaPraktekPage() {
  return (
    <div className="space-y-4">
      <Header />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-orange-600" />
                Bimbingan Praktik Lapangan
              </CardTitle>
              <CardDescription>
                Kelola bimbingan KP (minimal 3 kali dalam 1 periode)
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
                  <TableHead>Tempat Praktik</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead>Jumlah Bimbingan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {praktikLapangan.map((praktik) => (
                  <TableRow key={praktik.id}>
                    <TableCell className="font-medium">{praktik.namaMahasiswa}</TableCell>
                    <TableCell>{praktik.nim}</TableCell>
                    <TableCell>{praktik.tempatPraktik}</TableCell>
                    <TableCell>{praktik.periode}</TableCell>
                    <TableCell>
                      <Badge variant={praktik.jumlahBimbingan >= 3 ? "default" : "destructive"}>
                        {praktik.jumlahBimbingan} kali
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={praktik.status === 'Aktif' ? 'default' : 'secondary'}
                      >
                        {praktik.status}
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

          <div className="mt-4 text-center text-muted-foreground">
            {praktikLapangan.length === 0 && (
              <div className="py-8">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p>Belum ada data bimbingan praktik lapangan</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BebanKerjaKerjaPraktekPage