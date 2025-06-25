'use client'

import React, { useState } from 'react'
import Header from '../_layouts/header'
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
import {
  Award,
  BookOpen,
  Building,
  Edit,
  Eye,
  Globe,
  MapPin,
  Plus,
  Save,
  Target,
  Trash2,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import DatePicker from '@/components/core/date-picker'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

interface KegiatanPengembangan {
  id: string;
  jenisKegiatan: string;
  namaKegiatan: string;
  penyelenggara: string;
  lokasi: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  durasi: number; // dalam hari
  status: string;
  sertifikat: boolean;
  deskripsi: string;
  kategori: string;
  dokumen?: string;
}

const kegiatanPengembangan: KegiatanPengembangan[] = [
  {
    id: '1',
    jenisKegiatan: 'Konferensi',
    namaKegiatan: 'International Conference on Machine Learning',
    penyelenggara: 'IEEE Computer Society',
    lokasi: 'Jakarta, Indonesia',
    tanggalMulai: '2024-03-15',
    tanggalSelesai: '2024-03-17',
    durasi: 3,
    status: 'Selesai',
    sertifikat: true,
    deskripsi: 'Konferensi internasional tentang machine learning dan artificial intelligence',
    kategori: 'Internasional'
  },
  {
    id: '2',
    jenisKegiatan: 'Pelatihan',
    namaKegiatan: 'Advanced Python for Data Science',
    penyelenggara: 'Google Developer Indonesia',
    lokasi: 'Online',
    tanggalMulai: '2024-02-01',
    tanggalSelesai: '2024-02-28',
    durasi: 28,
    status: 'Selesai',
    sertifikat: true,
    deskripsi: 'Pelatihan intensif Python untuk data science dan machine learning',
    kategori: 'Nasional'
  },
  {
    id: '3',
    jenisKegiatan: 'Sertifikasi',
    namaKegiatan: 'AWS Certified Solutions Architect',
    penyelenggara: 'Amazon Web Services',
    lokasi: 'Jakarta, Indonesia',
    tanggalMulai: '2024-04-10',
    tanggalSelesai: '2024-04-10',
    durasi: 1,
    status: 'Selesai',
    sertifikat: true,
    deskripsi: 'Sertifikasi profesional AWS untuk arsitektur cloud solutions',
    kategori: 'Internasional'
  },
  {
    id: '4',
    jenisKegiatan: 'Seminar',
    namaKegiatan: 'Workshop Metodologi Penelitian',
    penyelenggara: 'LPPM Universitas Siliwangi',
    lokasi: 'Tasikmalaya, Indonesia',
    tanggalMulai: '2024-05-20',
    tanggalSelesai: '2024-05-22',
    durasi: 3,
    status: 'Akan Datang',
    sertifikat: true,
    deskripsi: 'Workshop metodologi penelitian untuk dosen muda',
    kategori: 'Institusional'
  }
];

function PengembanganKegiatanPage() {
  const [isAddingKegiatan, setIsAddingKegiatan] = useState(false);

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

  const getKategoriIcon = (kategori: string) => {
    switch (kategori) {
      case 'Internasional': return <Globe className="w-4 h-4" />;
      case 'Nasional': return <MapPin className="w-4 h-4" />;
      case 'Regional': return <Building className="w-4 h-4" />;
      case 'Institusional': return <Users className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <Header />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Kegiatan Pengembangan Keprofesian
              </CardTitle>
              <CardDescription>
                Daftar kegiatan pengembangan keprofesian berkelanjutan dalam 3 tahun terakhir
              </CardDescription>
            </div>
            <Dialog open={isAddingKegiatan} onOpenChange={setIsAddingKegiatan}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4" />
                  Tambah Kegiatan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Tambah Kegiatan Pengembangan</DialogTitle>
                  <DialogDescription>
                    Tambahkan kegiatan pengembangan keprofesian baru
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    <Label htmlFor="jenisKegiatan">Jenis Kegiatan *</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih jenis kegiatan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Studi Lanjut">Studi Lanjut</SelectItem>
                        <SelectItem value="Postdoc">Postdoc</SelectItem>
                        <SelectItem value="ARP">Academic Recharging Program</SelectItem>
                        <SelectItem value="Kursus Singkat">Kursus Singkat</SelectItem>
                        <SelectItem value="Magang">Magang</SelectItem>
                        <SelectItem value="Pelatihan">Pelatihan</SelectItem>
                        <SelectItem value="Sertifikasi">Sertifikasi</SelectItem>
                        <SelectItem value="Konferensi">Konferensi</SelectItem>
                        <SelectItem value="Seminar">Seminar</SelectItem>
                        <SelectItem value="Lokakarya">Lokakarya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kategori">Kategori *</Label>
                    <Select
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Internasional">Internasional</SelectItem>
                        <SelectItem value="Nasional">Nasional</SelectItem>
                        <SelectItem value="Regional">Regional</SelectItem>
                        <SelectItem value="Institusional">Institusional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="namaKegiatan">Nama Kegiatan *</Label>
                    <Input
                      id="namaKegiatan"
                      placeholder="International Conference on Machine Learning"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="penyelenggara">Penyelenggara</Label>
                    <Input
                      id="penyelenggara"
                      placeholder="IEEE Computer Society"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lokasi">Lokasi</Label>
                    <Input
                      id="lokasi"
                      placeholder="Jakarta, Indonesia"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tanggalMulai">Tanggal Mulai *</Label>
                    <DatePicker id="tanggalMulai" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tanggalSelesai">Tanggal Selesai</Label>
                    <DatePicker id="tanggalSelesai" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="durasi">Durasi (hari)</Label>
                    <Input
                      id="durasi"
                      type="number"
                      min="1"
                      placeholder="3"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Akan Datang">Akan Datang</SelectItem>
                        <SelectItem value="Sedang Berlangsung">Sedang Berlangsung</SelectItem>
                        <SelectItem value="Selesai">Selesai</SelectItem>
                        <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <Textarea
                      id="deskripsi"
                      placeholder="Deskripsi singkat tentang kegiatan"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2 md:col-span-2">
                    <Checkbox id="sertifikat" />
                    <Label htmlFor="sertifikat">Mendapat sertifikat</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingKegiatan(false)}>
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
                  <TableHead>Kegiatan</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Penyelenggara</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kegiatanPengembangan.map((kegiatan) => (
                  <TableRow key={kegiatan.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{kegiatan.namaKegiatan}</p>
                        <p className="text-sm text-muted-foreground">{kegiatan.lokasi}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{kegiatan.jenisKegiatan}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{kegiatan.penyelenggara}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{kegiatan.tanggalMulai}</p>
                        {kegiatan.tanggalSelesai !== kegiatan.tanggalMulai && (
                          <p className="text-muted-foreground">s/d {kegiatan.tanggalSelesai}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getKategoriIcon(kegiatan.kategori)}
                        <span className="text-sm">{kegiatan.kategori}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(kegiatan.status)}>
                          {kegiatan.status}
                        </Badge>
                        {kegiatan.sertifikat && (
                          <Award className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
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
        </CardContent>
      </Card>
    </div>
  )
}

export default PengembanganKegiatanPage