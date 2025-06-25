'use client'

import React, { useState } from 'react'
import Header from '../_layouts/header'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { AlertTriangle, Award, Edit, Eye, Plus, Save, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DatePicker from '@/components/core/date-picker'
import { Badge } from '@/components/ui/badge'

interface SertifikatKompetensi {
  id: string;
  namaSertifikat: string;
  penerbit: string;
  nomorSertifikat: string;
  tanggalTerbit: string;
  tanggalBerlaku: string;
  kategori: string;
  status: string;
  dokumen?: string;
}

const sertifikatKompetensi: SertifikatKompetensi[] = [
  {
    id: '1',
    namaSertifikat: 'Sertifikat Pendidik',
    penerbit: 'Kementerian Pendidikan dan Kebudayaan',
    nomorSertifikat: '12345678901234567890',
    tanggalTerbit: '2020-08-15',
    tanggalBerlaku: '2025-08-15',
    kategori: 'Pendidik',
    status: 'Aktif'
  },
  {
    id: '2',
    namaSertifikat: 'AWS Certified Solutions Architect',
    penerbit: 'Amazon Web Services',
    nomorSertifikat: 'AWS-CSA-2024-001',
    tanggalTerbit: '2024-04-10',
    tanggalBerlaku: '2027-04-10',
    kategori: 'Profesional',
    status: 'Aktif'
  },
  {
    id: '3',
    namaSertifikat: 'Certified Scrum Master',
    penerbit: 'Scrum Alliance',
    nomorSertifikat: 'CSM-2023-456',
    tanggalTerbit: '2023-09-20',
    tanggalBerlaku: '2025-09-20',
    kategori: 'Manajemen',
    status: 'Aktif'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Selesai': return 'bg-green-100 text-green-800 border-green-200';
    case 'Sedang Berlangsung': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Akan Datang': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Dibatalkan': return 'bg-red-100 text-red-800 border-red-200';
    case 'Aktif': return 'bg-green-100 text-green-800 border-green-200';
    case 'Kadaluarsa': return 'bg-red-100 text-red-800 border-red-200';
    case 'Dalam Proses': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

function PengembanganSertifikatPage() {
  const [isAddingSertifikat, setIsAddingSertifikat] = useState(false);

  return (
    <div className="space-y-4">
      <Header />

      <Card className="w-full overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Sertifikat & Kompetensi
              </CardTitle>
              <CardDescription>
                Kelola sertifikat pendidik, profesional, dan kompetensi lainnya
              </CardDescription>
            </div>
            <Dialog open={isAddingSertifikat} onOpenChange={setIsAddingSertifikat}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4" />
                  Tambah Sertifikat
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Tambah Sertifikat</DialogTitle>
                  <DialogDescription>
                    Tambahkan sertifikat atau kompetensi baru
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="namaSertifikat">Nama Sertifikat *</Label>
                    <Input
                      id="namaSertifikat"
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="penerbit">Penerbit *</Label>
                    <Input
                      id="penerbit"
                      placeholder="Amazon Web Services"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nomorSertifikat">Nomor Sertifikat *</Label>
                    <Input
                      id="nomorSertifikat"
                      placeholder="AWS-CSA-2024-001"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tanggalTerbit">Tanggal Terbit</Label>
                      <DatePicker id="tanggalTerbit" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tanggalBerlaku">Tanggal Berlaku</Label>
                      <DatePicker id="tanggalBerlaku" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kategoriSertifikat">Kategori</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pendidik">Pendidik</SelectItem>
                        <SelectItem value="Profesional">Profesional</SelectItem>
                        <SelectItem value="Teknis">Teknis</SelectItem>
                        <SelectItem value="Manajemen">Manajemen</SelectItem>
                        <SelectItem value="Bahasa">Bahasa</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="statusSertifikat">Status</Label>
                    <Select
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Kadaluarsa">Kadaluarsa</SelectItem>
                        <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingSertifikat(false)}>
                    Batal
                  </Button>
                  <Button>
                    <Save className="w-4 h-4" />
                    Simpan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sertifikat</TableHead>
                <TableHead>Penerbit</TableHead>
                <TableHead>Nomor</TableHead>
                <TableHead>Tanggal Terbit</TableHead>
                <TableHead>Berlaku Hingga</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sertifikatKompetensi.map((sertifikat) => (
                <TableRow key={sertifikat.id}>
                  <TableCell className="font-medium">{sertifikat.namaSertifikat}</TableCell>
                  <TableCell>{sertifikat.penerbit}</TableCell>
                  <TableCell className="font-mono text-sm">{sertifikat.nomorSertifikat}</TableCell>
                  <TableCell>{sertifikat.tanggalTerbit}</TableCell>
                  <TableCell>{sertifikat.tanggalBerlaku || 'Tidak terbatas'}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{sertifikat.kategori}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(sertifikat.status)}>
                      {sertifikat.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
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

          <Alert variant="warning" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Reminder:</strong> Pastikan sertifikat yang akan kadaluarsa diperbaharui tepat waktu
              untuk mempertahankan kredibilitas profesional.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

export default PengembanganSertifikatPage