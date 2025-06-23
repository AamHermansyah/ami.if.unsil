'use client'

import React, { useState } from 'react'
import Header from '../_layouts/header'
import { Input } from '@/components/ui/input'
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
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertTriangle,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  CheckSquare,
  Clock,
  Edit,
  Eye,
  FileText,
  IdCard,
  Search,
  Users,
  XCircle
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BsExclamationCircle } from 'react-icons/bs'
import { cn } from '@/lib/utils'

const dosenBebanKerja = [
  {
    id: '1',
    nama: 'Dr. Ahmad Fauzi, M.Kom',
    nidn: '0123456789',
    statusKepegawaian: 'Tetap',
    semester: 'Genap 2024/2025',
    totalSKS: 14,
    targetSKS: { min: 12, max: 16 },
    jumlahMataKuliah: 3,
    totalMahasiswaKelas: 105,
    bimbinganSkripsi: 4,
    maxBimbinganSkripsi: 6,
    mahasiswaPerwalian: 8,
    minPerwalian: 3,
    praktikLapangan: 2,
    rataRataBimbingan: 15,
    minBimbingan: 12,
    statusKeseluruhan: 'Sesuai',
    terakhirUpdate: '2024-06-08',
    catatan: 'Semua indikator terpenuhi dengan baik'
  },
  {
    id: '2',
    nama: 'Dr. Sarah Indira, M.T',
    nidn: '0234567890',
    statusKepegawaian: 'Tetap',
    semester: 'Genap 2024/2025',
    totalSKS: 18,
    targetSKS: { min: 12, max: 16 },
    jumlahMataKuliah: 4,
    totalMahasiswaKelas: 145,
    bimbinganSkripsi: 7,
    maxBimbinganSkripsi: 6,
    mahasiswaPerwalian: 6,
    minPerwalian: 3,
    praktikLapangan: 1,
    rataRataBimbingan: 8,
    minBimbingan: 12,
    statusKeseluruhan: 'Tidak Sesuai',
    terakhirUpdate: '2024-06-05',
    catatan: 'Melebihi beban mengajar dan bimbingan, kurang frekuensi bimbingan'
  },
  {
    id: '3',
    nama: 'Prof. Bambang Sutrisno, Ph.D',
    nidn: '0345678901',
    statusKepegawaian: 'Tetap',
    semester: 'Genap 2024/2025',
    totalSKS: 10,
    targetSKS: { min: 12, max: 16 },
    jumlahMataKuliah: 2,
    totalMahasiswaKelas: 68,
    bimbinganSkripsi: 3,
    maxBimbinganSkripsi: 6,
    mahasiswaPerwalian: 5,
    minPerwalian: 3,
    praktikLapangan: 0,
    rataRataBimbingan: 18,
    minBimbingan: 12,
    statusKeseluruhan: 'Perlu Review',
    terakhirUpdate: '2024-06-10',
    catatan: 'Beban mengajar di bawah minimum'
  },
  {
    id: '4',
    nama: 'Dr. Rina Novita, M.Kom',
    nidn: '8812345678',
    statusKepegawaian: 'NIDK',
    semester: 'Genap 2024/2025',
    totalSKS: 12,
    targetSKS: { min: 12, max: 16 },
    jumlahMataKuliah: 3,
    totalMahasiswaKelas: 92,
    bimbinganSkripsi: 2,
    maxBimbinganSkripsi: 6,
    mahasiswaPerwalian: 4,
    minPerwalian: 3,
    praktikLapangan: 1,
    rataRataBimbingan: 14,
    minBimbingan: 12,
    statusKeseluruhan: 'Sesuai',
    terakhirUpdate: '2024-06-09',
    catatan: 'Memenuhi semua target dengan baik'
  }
];

function AuditBebanKerjaMonitoringPage() {
  const [selectedDosen, setSelectedDosen] = useState<typeof dosenBebanKerja[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const totalDosen = dosenBebanKerja.length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Sesuai': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Tidak Sesuai': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'Perlu Review': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sesuai': return 'bg-green-100 text-green-800 border-green-200';
      case 'Tidak Sesuai': return 'bg-red-100 text-red-800 border-red-200';
      case 'Perlu Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  const openDetailModal = (dosen: typeof dosenBebanKerja[0]) => {
    setSelectedDosen(dosen);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-4">
      <Header />

      <Card>
        <CardHeader>
          <div className="w-full flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Monitoring Beban Kerja Dosen
              </CardTitle>
              <CardDescription>
                Monitor dan evaluasi beban kerja seluruh dosen
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari dosen..."
                  className="pl-10 flex-1 max-w-64"
                />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Semua">Semua Status</SelectItem>
                  <SelectItem value="Sesuai">Sesuai</SelectItem>
                  <SelectItem value="Tidak Sesuai">Tidak Sesuai</SelectItem>
                  <SelectItem value="Perlu Review">Perlu Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dosen</TableHead>
                  <TableHead>SKS</TableHead>
                  <TableHead>Bimbingan</TableHead>
                  <TableHead>Perwalian</TableHead>
                  <TableHead>Frekuensi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Update</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dosenBebanKerja.map((dosen) => (
                  <TableRow key={dosen.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{dosen.nama}</p>
                        <p className="text-sm text-muted-foreground">
                          {dosen.nidn} • {dosen.statusKepegawaian}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <Badge
                          variant={dosen.totalSKS >= dosen.targetSKS.min && dosen.totalSKS <= dosen.targetSKS.max ? "default" : "destructive"}
                        >
                          {dosen.totalSKS} SKS
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Target: {dosen.targetSKS.min}-{dosen.targetSKS.max}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <Badge
                          variant={dosen.bimbinganSkripsi <= dosen.maxBimbinganSkripsi ? "default" : "destructive"}
                        >
                          {dosen.bimbinganSkripsi}/{dosen.maxBimbinganSkripsi}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Skripsi</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <Badge
                          variant={dosen.mahasiswaPerwalian >= dosen.minPerwalian ? "default" : "destructive"}
                        >
                          {dosen.mahasiswaPerwalian}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Mahasiswa</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <Badge
                          variant={dosen.rataRataBimbingan >= dosen.minBimbingan ? "default" : "destructive"}
                        >
                          {dosen.rataRataBimbingan}x
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Min: {dosen.minBimbingan}x</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(dosen.statusKeseluruhan)}
                        <Badge className={getStatusColor(dosen.statusKeseluruhan)}>
                          {dosen.statusKeseluruhan}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{dosen.terakhirUpdate}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openDetailModal(dosen)}>
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

          <div className="mt-4 text-sm text-muted-foreground">
            Menampilkan {dosenBebanKerja.length} dari {totalDosen} dosen
          </div>
        </CardContent>
      </Card>
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-xl font-bold">
              Detail Beban Kerja
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Informasi lengkap beban kerja dan status kepatuhan indikator AMI
            </DialogDescription>
          </DialogHeader>

          {selectedDosen && (
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] pr-2">
              {/* Header Section with Lecturer Info */}
              <div className="relative bg-gradient-to-r from-card to-background rounded-xl p-4 mb-4 border">
                <Badge className={cn(
                  getStatusColor(selectedDosen.statusKeseluruhan),
                  'absolute top-4 right-4 text-xs rounded-full'
                )}>
                  {selectedDosen.statusKeseluruhan}
                </Badge>
                <h2 className="text-xl font-bold mb-2">{selectedDosen?.nama}</h2>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mt-3">
                  <span className="flex items-center gap-1">
                    <IdCard className="w-4 h-4" />
                    NIDN: {selectedDosen.nidn}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {selectedDosen.statusKepegawaian}
                  </span>
                  <span className="col-span-2 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Semester {selectedDosen.semester}
                  </span>
                </div>
                <span className="block mt-2 text-xs text-muted-foreground">
                  Update: {selectedDosen.terakhirUpdate}
                </span>
              </div>

              {/* Main Content */}
              <div className="space-y-4 mb-4">
                {/* Beban Mengajar Card */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-card rounded-lg">
                      <BookOpen className="w-4 h-4 text-green-600" />
                    </div>
                    <h4 className="font-semibold">Beban Mengajar</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-card border rounded-lg">
                      <div className="text-lg font-bold">{selectedDosen.totalSKS}</div>
                      <div className="text-xs text-muted-foreground">Total SKS</div>
                    </div>
                    <div className="p-2 bg-card border rounded-lg">
                      <div className="text-lg font-semibold">
                        {selectedDosen.targetSKS.min}-{selectedDosen.targetSKS.max}
                      </div>
                      <div className="text-xs text-muted-foreground">Target SKS</div>
                    </div>
                    <div className="p-2 bg-card border rounded-lg">
                      <div className="text-lg font-bold">{selectedDosen.jumlahMataKuliah}</div>
                      <div className="text-xs text-muted-foreground">Mata Kuliah</div>
                    </div>
                    <div className="p-2 bg-card border rounded-lg">
                      <div className="text-lg font-bold">{selectedDosen.totalMahasiswaKelas}</div>
                      <div className="text-xs text-muted-foreground">Mahasiswa</div>
                    </div>
                  </div>
                </div>

                {/* Bimbingan & Perwalian Card */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg">
                      <Users className="w-4 h-4 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">Bimbingan & Perwalian</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-card border rounded-lg">
                      <div className="text-lg font-bold">
                        {selectedDosen.bimbinganSkripsi}/{selectedDosen.maxBimbinganSkripsi}
                      </div>
                      <div className="text-xs">Skripsi</div>
                    </div>
                    <div className="p-2 bg-card border rounded-lg">
                      <div className="text-lg font-bold">{selectedDosen.mahasiswaPerwalian}</div>
                      <div className="text-xs">Perwalian</div>
                    </div>
                    <div className="p-2 bg-card border rounded-lg">
                      <div className="text-lg font-bold">{selectedDosen.praktikLapangan}</div>
                      <div className="text-xs">Praktik</div>
                    </div>
                    <div className="p-2 bg-card border rounded-lg">
                      <div className="text-lg font-bold">{selectedDosen.rataRataBimbingan}</div>
                      <div className="text-xs">Rata Bimbingan</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Catatan Section */}
              {selectedDosen.catatan && (
                <Alert variant="warning">
                  <BsExclamationCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Catatan:</strong>
                    <p>{selectedDosen.catatan}</p>
                  </AlertDescription>
                </Alert>
              )}

              {/* Status Indikator AMI */}
              <div className="mt-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg">
                    <CheckSquare className="w-4 h-4 text-orange-600" />
                  </div>
                  <h4 className="font-semibold">Status Indikator AMI</h4>
                </div>

                <div className="space-y-4">
                  {/* Beban Mengajar Indicator */}
                  <div className="bg-card flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${selectedDosen.totalSKS >= selectedDosen.targetSKS.min && selectedDosen.totalSKS <= selectedDosen.targetSKS.max
                        ? 'bg-green-500/10'
                        : 'bg-red-500/10'
                        }`}>
                        {selectedDosen.totalSKS >= selectedDosen.targetSKS.min && selectedDosen.totalSKS <= selectedDosen.targetSKS.max ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">Beban Mengajar</div>
                        <div className="text-sm text-muted-foreground">Target: 12-16 SKS</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{selectedDosen.totalSKS}</div>
                      <div className="text-sm text-muted-foreground">SKS</div>
                    </div>
                  </div>

                  {/* Bimbingan Skripsi Indicator */}
                  <div className="bg-card flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${selectedDosen.bimbinganSkripsi <= selectedDosen.maxBimbinganSkripsi
                        ? 'bg-green-500/10'
                        : 'bg-red-500/10'
                        }`}>
                        {selectedDosen.bimbinganSkripsi <= selectedDosen.maxBimbinganSkripsi ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">Bimbingan Skripsi</div>
                        <div className="text-sm text-muted-foreground">Maksimal: 6 mahasiswa</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{selectedDosen.bimbinganSkripsi}</div>
                      <div className="text-sm text-muted-foreground">mahasiswa</div>
                    </div>
                  </div>

                  {/* Bimbingan Perwalian Indicator */}
                  <div className="bg-card flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${selectedDosen.mahasiswaPerwalian >= selectedDosen.minPerwalian
                        ? 'bg-green-500/10'
                        : 'bg-red-500/10'
                        }`}>
                        {selectedDosen.mahasiswaPerwalian >= selectedDosen.minPerwalian ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">Bimbingan Perwalian</div>
                        <div className="text-sm text-muted-foreground">Minimal: 3 mahasiswa</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{selectedDosen.mahasiswaPerwalian}</div>
                      <div className="text-sm text-muted-foreground">mahasiswa</div>
                    </div>
                  </div>

                  {/* Frekuensi Bimbingan Indicator */}
                  <div className="bg-card flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${selectedDosen.rataRataBimbingan >= selectedDosen.minBimbingan
                        ? 'bg-green-500/10'
                        : 'bg-red-500/10'
                        }`}>
                        {selectedDosen.rataRataBimbingan >= selectedDosen.minBimbingan ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">Frekuensi Bimbingan</div>
                        <div className="text-sm text-muted-foreground">Minimal: 12 kali</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{selectedDosen.rataRataBimbingan}</div>
                      <div className="text-sm text-muted-foreground">kali</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-3 border-t rounded-b-lg">
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Tutup
            </Button>
            <Button className="text-white shadow-sm">
              <FileText className="w-4 h-4 mr-2" />
              Generate Laporan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AuditBebanKerjaMonitoringPage