'use client'

import React, { useState } from 'react'
import Header from '../_layouts/header'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table"
import { FileCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import VerifikasiTableAction from '../_components/verifikasi-table-action'

const verifikasiItems = [
  {
    id: '1',
    dosenId: '4',
    dosenNama: 'Dr. Dewi Sartika, M.T',
    jenisData: 'Publikasi',
    judul: 'AI-Based Approach for Smart City Development',
    tanggalSubmit: '2024-03-20',
    status: 'Menunggu'
  },
  {
    id: '2',
    dosenId: '3',
    dosenNama: 'Budi Santoso, M.Kom',
    jenisData: 'Produk',
    judul: 'Sistem Informasi Desa Digital',
    tanggalSubmit: '2024-03-10',
    status: 'Revisi',
    catatan: 'Bukti penerapan kurang lengkap'
  }
];

function AuditPenelitianVerifikasiPage() {
  const [showVerifikasiDialog, setShowVerifikasiDialog] = useState<boolean>(false);
  const [selectedVerifikasi, setSelectedVerifikasi] = useState<typeof verifikasiItems[0] | null>(null);

  const handleVerifikasi = (item: typeof verifikasiItems[0]) => {
    setSelectedVerifikasi(item);
    setShowVerifikasiDialog(true);
  };

  const handleUpdateVerifikasi = (status: 'Diverifikasi' | 'Ditolak' | 'Revisi', catatan?: string) => {
    // Handle update verifikasi
    console.log('Update verifikasi:', { status, catatan });
    setShowVerifikasiDialog(false);
  };

  return (
    <div className="space-y-4">
      <Header />

      <Card>
        <CardHeader className="w-full flex gap-4 justify-between items-end">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-orange-600" />
              Daftar Verifikasi
            </CardTitle>
            <CardDescription>
              Verifikasi dan validasi data penelitian yang disubmit dosen
            </CardDescription>
          </div>
          <Select defaultValue="semua">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua</SelectItem>
              <SelectItem value="Menunggu">Menunggu</SelectItem>
              <SelectItem value="Revisi">Revisi</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="publikasi">
            <TabsList className="min-w-[200]">
              <TabsTrigger value="publikasi">Publikasi</TabsTrigger>
              <TabsTrigger value="produk">Produk</TabsTrigger>
            </TabsList>
            <TabsContent value="publikasi">
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jenis Data</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Dosen</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Catatan</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verifikasiItems.filter((item) => item.jenisData === 'Publikasi').map(item => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Badge variant="outline">{item.jenisData}</Badge>
                        </TableCell>
                        <TableCell>{item.judul}</TableCell>
                        <TableCell className="text-muted-foreground">{item.dosenNama}</TableCell>
                        <TableCell>
                          {item.status === "Menunggu" ? (
                            <Badge variant="default">Menunggu</Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-800">Revisi</Badge>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate">
                          {item.catatan || "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <VerifikasiTableAction
                            onClickVerify={() => handleVerifikasi(item)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {verifikasiItems.length === 0 && (
                  <p className="text-sm text-center text-muted-foreground mt-4">Tidak ada data untuk status ini.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="produk">
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jenis Data</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Dosen</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Catatan</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verifikasiItems.filter((item) => item.jenisData === 'Produk').map(item => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Badge variant="outline">{item.jenisData}</Badge>
                        </TableCell>
                        <TableCell>{item.judul}</TableCell>
                        <TableCell className="text-muted-foreground">{item.dosenNama}</TableCell>
                        <TableCell>
                          {item.status === "Menunggu" ? (
                            <Badge variant="default">Menunggu</Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-800">Revisi</Badge>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate">
                          {item.catatan || "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <VerifikasiTableAction
                            onClickVerify={() => handleVerifikasi(item)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {verifikasiItems.length === 0 && (
                  <p className="text-sm text-center text-muted-foreground mt-4">Tidak ada data untuk status ini.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showVerifikasiDialog} onOpenChange={setShowVerifikasiDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verifikasi Data Penelitian</DialogTitle>
            <DialogDescription>
              Verifikasi dan berikan feedback untuk data penelitian
            </DialogDescription>
          </DialogHeader>
          {selectedVerifikasi && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedVerifikasi.judul}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedVerifikasi.dosenNama} • {selectedVerifikasi.jenisData}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Status Verifikasi</Label>
                <Select defaultValue="Diverifikasi">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diverifikasi">Diverifikasi</SelectItem>
                    <SelectItem value="Revisi">Perlu Revisi</SelectItem>
                    <SelectItem value="Ditolak">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Catatan (Opsional)</Label>
                <Textarea
                  placeholder="Berikan catatan atau feedback..."
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifikasiDialog(false)}>
              Batal
            </Button>
            <Button onClick={() => handleUpdateVerifikasi('Diverifikasi')}>
              Simpan Verifikasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AuditPenelitianVerifikasiPage