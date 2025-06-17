'use client'

import React, { useState } from 'react'
import Header from '../_layouts/header'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Edit, Eye, Info, Plus, Save, Trash, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getPublicationStatusColor } from '@/lib/utils';
import DetailProductSheet from '../_components/detail-product-sheet';
import FileUploader from '@/components/core/file-uploader';
import { Separator } from '@/components/ui/separator';
import RichtextEditor from '@/components/core/richtext-editor';

const produkPenelitian = [
  {
    id: '1',
    namaKarya: 'Aplikasi Monitoring Kualitas Air Sungai',
    jenisKarya: 'Aplikasi Mobile',
    deskripsi: 'Aplikasi mobile untuk monitoring kualitas air sungai secara real-time menggunakan IoT sensors',
    tahunPenyelesaian: 2024,
    kolaborator: ['Dinas Lingkungan Hidup Tasikmalaya', 'UPI Tasikmalaya'],
    institusiPengguna: 'Dinas Lingkungan Hidup Tasikmalaya',
    buktiPenerapan: 'Surat keterangan penggunaan dari Dinas LH',
    dampakPenerapan: 'Meningkatkan efisiensi monitoring kualitas air di 15 titik sungai',
    mahasiswaTerlibat: true,
    namaMahasiswa: ['Budi Santoso', 'Dewi Sartika'],
    status: 'Diterapkan'
  },
  {
    id: '2',
    namaKarya: 'Algoritma Optimasi Jadwal Kuliah',
    jenisKarya: 'Algoritma',
    deskripsi: 'Algoritma genetika untuk optimasi penjadwalan mata kuliah dengan constraint kompleks',
    tahunPenyelesaian: 2023,
    kolaborator: ['Bagian Akademik UNSIL'],
    institusiPengguna: 'Universitas Siliwangi',
    buktiPenerapan: 'Implementasi dalam sistem SIAKAD',
    dampakPenerapan: 'Mengurangi konflik jadwal sebesar 85%',
    mahasiswaTerlibat: true,
    namaMahasiswa: ['Rizki Ahmad'],
    status: 'Diterapkan'
  }
];

function ProdukPenelitianPage() {
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [detailProductOpen, setDetailProductOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Header />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Produk Penelitian
              </CardTitle>
              <CardDescription>
                Kelola karya/produk penelitian yang dimanfaatkan masyarakat
              </CardDescription>
            </div>
            <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4" />
                  Tambah Produk
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Tambah Produk Penelitian</DialogTitle>
                  <DialogDescription>
                    Tambahkan produk penelitian yang diterapkan masyarakat
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="namaKarya">Nama Karya/Produk *</Label>
                      <Input
                        id="namaKarya"
                        placeholder="Masukan nama karya/produk"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jenisKarya">Jenis Karya *</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih jenis" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Software">Software</SelectItem>
                          <SelectItem value="Aplikasi Mobile">Aplikasi Mobile</SelectItem>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Algoritma">Algoritma</SelectItem>
                          <SelectItem value="Model">Model</SelectItem>
                          <SelectItem value="Prototype">Prototype</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tahunPenyelesaian">Tahun Penyelesaian *</Label>
                      <Input
                        id="tahunPenyelesaian"
                        type="number"
                        min="2000"
                        max="2030"
                        placeholder="2XXX"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="deskripsi">Deskripsi</Label>
                      <Textarea
                        id="deskripsi"
                        placeholder="Deskripsi singkat tentang produk penelitian"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="institusiPengguna">Institusi Pengguna</Label>
                      <Input
                        id="institusiPengguna"
                        placeholder="Co: Dinas Lingkungan Hidup Tasikmalaya"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dana">Dana (Rupiah)</Label>
                      <Input
                        id="dana"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Diterapkan">Diterapkan</SelectItem>
                          <SelectItem value="Dalam Pengembangan">Dalam Pengembangan</SelectItem>
                          <SelectItem value="Selesai">Selesai</SelectItem>
                          <SelectItem value="Dihentikan">Dihentikan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="buktiPenerapan">Bukti Penerapan</Label>
                      <FileUploader
                        accept=""
                        description="Menerima format PDF, PNG, dan JPG (Max. 2MB)"
                        label="Upload file bukti penerapan"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="dampakPenerapan">Dampak Penerapan</Label>
                      <RichtextEditor
                        id="dampakPenerapan"
                        placeholder="Jelaskan secara rinci dampak hasil dari penelitian..."
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="luaran">Luaran</Label>
                      <RichtextEditor
                        id="luaran"
                        placeholder="Masukan luaran yang telah ditentukan..."
                      />
                    </div>

                    <div className="flex items-center space-x-2 md:col-span-2">
                      <input
                        type="checkbox"
                        id="mahasiswaTerlibatProduk"
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="mahasiswaTerlibatProduk">Melibatkan mahasiswa</Label>
                    </div>

                    <div className="p-4 border rounded-md space-y-2 md:col-span-2">
                      <Label>Data Mahasiswa</Label>
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-center">
                        <Input id="namaMahasiswa-1" placeholder="Nama" />
                        <Input id="npmMahasiswa-1" placeholder="NPM" />
                        <Button variant="ghost" size="icon" disabled>
                          <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-center">
                        <Input id="namaMahasiswa-2" placeholder="Nama" />
                        <Input id="npmMahasiswa-2" placeholder="NPM" />
                        <Button variant="ghost" size="icon">
                          <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>

                      <Separator />

                      {/* Tombol tambah mahasiswa */}
                      <Button variant="outline" size="sm" className="w-full">
                        Tambah Mahasiswa
                      </Button>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="peranMahasiswa">Peran Mahasiswa</Label>
                      <RichtextEditor
                        id="peranMahasiswa"
                        placeholder="Jelaskan peran mahasiswa dalam penelitian..."
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddProductOpen(false)}>
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
          <div className="space-y-4">
            {produkPenelitian.map((produk) => (
              <div key={produk.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{produk.namaKarya}</h4>
                      <Badge variant="outline">{produk.jenisKarya}</Badge>
                      <Badge className={getPublicationStatusColor(produk.status)}>
                        {produk.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {produk.deskripsi}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p><span className="font-medium">Institusi:</span> {produk.institusiPengguna}</p>
                      <p><span className="font-medium">Tahun:</span> {produk.tahunPenyelesaian}</p>
                      <p><span className="font-medium">Dana:</span> Rp 100.000.000</p>
                      <p><span className="font-medium">Mahasiswa:</span> 3 orang</p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => setDetailProductOpen(true)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded text-sm">
                  <p><span className="font-medium">Dampak:</span> {produk.dampakPenerapan}</p>
                </div>
              </div>
            ))}
          </div>

          <Alert variant="info" className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Target AMI:</strong> Minimal 3 karya/produk yang diinisiasi dosen dan mahasiswa
              diterapkan oleh masyarakat dengan bukti surat keterangan legal dari pengguna.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      <DetailProductSheet
        open={detailProductOpen}
        onOpenChange={setDetailProductOpen}
      />
    </div>
  )
}

export default ProdukPenelitianPage