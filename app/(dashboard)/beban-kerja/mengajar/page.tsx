'use client'

import React, { useState } from 'react'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookOpen, Edit, Plus, Save, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface BebanMengajar {
  id: string;
  kode: string;
  namaMataKuliah: string;
  sks: number;
  semester: string;
  tahunAjaran: string;
  jumlahMahasiswa: number;
  kelas: string;
  angkatan: string;
}


const bebanMengajar: BebanMengajar[] = [
  {
    id: '1',
    kode: 'IF101',
    namaMataKuliah: 'Algoritma dan Pemrograman',
    sks: 3,
    semester: 'Genap 2024/2025',
    tahunAjaran: '2024/2025',
    jumlahMahasiswa: 42,
    kelas: 'A, B, dan C',
    angkatan: '2021'
  },
  {
    id: '2',
    kode: 'IF201',
    namaMataKuliah: 'Struktur Data',
    sks: 3,
    semester: 'Genap 2024/2025',
    tahunAjaran: '2024/2025',
    jumlahMahasiswa: 38,
    kelas: 'E dan F',
    angkatan: '2021'
  },
  {
    id: '3',
    kode: 'IF301',
    namaMataKuliah: 'Machine Learning',
    sks: 3,
    semester: 'Genap 2024/2025',
    tahunAjaran: '2024/2025',
    jumlahMahasiswa: 25,
    kelas: 'A, B, D, dan G',
    angkatan: '2021'
  }
];

function BebanKerjaMengajarPage() {
  const [isAddingData, setIsAddingData] = useState(false);
  const totalSKS = bebanMengajar.reduce((sum, mata) => sum + mata.sks, 0);

  return (
    <div className="space-y-4">
      <Header />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Beban Mengajar - Genap 2024/2025
              </CardTitle>
              <CardDescription>
                Kelola mata kuliah yang diampu dan ekuivalensi waktu mengajar
              </CardDescription>
            </div>
            <Dialog open={isAddingData} onOpenChange={setIsAddingData}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4" />
                  Tambah Mata Kuliah
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Tambah Mata Kuliah</DialogTitle>
                  <DialogDescription>
                    Tambahkan mata kuliah yang diampu pada semester ini
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="kode">Kode Mata Kuliah</Label>
                    <Input
                      id="kode"
                      placeholder="IF101"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="namaMataKuliah">Nama Mata Kuliah *</Label>
                    <Input
                      id="namaMataKuliah"
                      placeholder="Algoritma dan Pemrograman"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sks">SKS *</Label>
                      <Input
                        id="sks"
                        type="number"
                        min="1"
                        max="6"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kelas">Kelas</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="angkatan">Angkatan</Label>
                      <Input
                        id="angkatan"
                        type="number"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jumlahMahasiswa">Jumlah Mahasiswa</Label>
                      <Input
                        id="jumlahMahasiswa"
                        type="number"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingData(false)}>
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
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Mata Kuliah</TableHead>
                  <TableHead>SKS</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Angkatan</TableHead>
                  <TableHead>Mahasiswa</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bebanMengajar.map((mata) => (
                  <TableRow key={mata.id}>
                    <TableCell className="font-medium">{mata.kode}</TableCell>
                    <TableCell>{mata.namaMataKuliah}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{mata.sks} SKS</Badge>
                    </TableCell>
                    <TableCell>{mata.semester}</TableCell>
                    <TableCell>{mata.kelas}</TableCell>
                    <TableCell>{mata.angkatan}</TableCell>
                    <TableCell>{mata.jumlahMahasiswa}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="border rounded-md p-4">
                <div className="text-2xl font-bold">{bebanMengajar.length}</div>
                <div className="text-sm text-muted-foreground">Mata Kuliah</div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-2xl font-bold">{totalSKS}</div>
                <div className="text-sm text-muted-foreground">Total SKS</div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-2xl font-bold">
                  {bebanMengajar.reduce((sum, mk) => sum + mk.jumlahMahasiswa, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Mahasiswa</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BebanKerjaMengajarPage