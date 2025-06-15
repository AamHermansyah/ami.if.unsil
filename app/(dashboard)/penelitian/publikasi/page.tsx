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
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { BookOpen, Edit, ExternalLink, Eye, Plus, Save, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getPublicationStatusColor } from '@/lib/utils';

const publikasi = [
  {
    id: '1',
    judul: 'Machine Learning Approach for Sentiment Analysis in Indonesian Language',
    penulis: ['Ahmad Fauzi', 'Sarah Indira', 'Budi Santoso'],
    posisiPenulis: 'Pertama',
    jenisPublikasi: 'Jurnal',
    namaJurnal: 'IEEE Access',
    penerbit: 'IEEE',
    tahun: 2024,
    volume: '12',
    halaman: '45123-45135',
    doi: '10.1109/ACCESS.2024.1234567',
    kategori: 'Internasional',
    quartile: 'Q1',
    indexing: ['Scopus', 'Web of Science', 'IEEE Xplore'],
    sitasi: 8,
    status: 'Published',
    mahasiswaTerlibat: true,
    namaMahasiswa: ['Rizki Ahmad', 'Siti Nurhaliza']
  },
  {
    id: '2',
    judul: 'Deep Learning for Medical Image Segmentation',
    penulis: ['Ahmad Fauzi', 'Dr. Medical Expert'],
    posisiPenulis: 'Pertama',
    jenisPublikasi: 'Konferensi',
    namaJurnal: 'International Conference on Computer Vision',
    penerbit: 'Springer',
    tahun: 2024,
    kategori: 'Internasional',
    indexing: ['Scopus'],
    sitasi: 3,
    status: 'Published',
    mahasiswaTerlibat: false
  },
  {
    id: '3',
    judul: 'Sistem Informasi Manajemen Akademik Berbasis Web',
    penulis: ['Ahmad Fauzi', 'Tim Pengembang'],
    posisiPenulis: 'Pertama',
    jenisPublikasi: 'Jurnal',
    namaJurnal: 'Jurnal Teknik Informatika',
    penerbit: 'Universitas Indonesia',
    tahun: 2023,
    kategori: 'Nasional',
    sinta: 2,
    indexing: ['Sinta', 'Google Scholar'],
    sitasi: 12,
    status: 'Published',
    mahasiswaTerlibat: true,
    namaMahasiswa: ['Andi Wijaya']
  }
];

function PublikasiPage() {
  const [isAddingPublikasi, setIsAddingPublikasi] = useState(false);

  return (
    <div className="space-y-4">
      <Header />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Publikasi Penelitian
              </CardTitle>
              <CardDescription>
                Kelola publikasi jurnal, konferensi, dan karya ilmiah lainnya
              </CardDescription>
            </div>
            <Dialog open={isAddingPublikasi} onOpenChange={setIsAddingPublikasi}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4" />
                  Tambah Publikasi
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Tambah Publikasi</DialogTitle>
                  <DialogDescription>
                    Tambahkan publikasi penelitian baru
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="judul">Judul Publikasi *</Label>
                    <Input
                      id="judul"
                      placeholder="Machine Learning Approach for..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jenisPublikasi">Jenis Publikasi *</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih jenis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Jurnal">Jurnal</SelectItem>
                        <SelectItem value="Konferensi">Konferensi</SelectItem>
                        <SelectItem value="Book Chapter">Book Chapter</SelectItem>
                        <SelectItem value="Buku">Buku</SelectItem>
                        <SelectItem value="Paten">Paten</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kategori">Kategori *</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Internasional Bereputasi">Internasional Bereputasi</SelectItem>
                        <SelectItem value="Internasional">Internasional</SelectItem>
                        <SelectItem value="Nasional Terakreditasi">Nasional Terakreditasi</SelectItem>
                        <SelectItem value="Nasional">Nasional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="namaJurnal">Nama Jurnal/Konferensi *</Label>
                    <Input
                      id="namaJurnal"
                      placeholder="IEEE Access"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="penerbit">Penerbit</Label>
                    <Input
                      id="penerbit"
                      placeholder="IEEE"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tahun">Tahun *</Label>
                    <Input
                      id="tahun"
                      type="number"
                      min="2000"
                      max="2030"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="volume">Volume</Label>
                      <Input
                        id="volume"
                        placeholder="12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nomor">Nomor</Label>
                      <Input
                        id="nomor"
                        placeholder="3"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="halaman">Halaman</Label>
                    <Input
                      id="halaman"
                      placeholder="123-135"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doi">DOI</Label>
                    <Input
                      id="doi"
                      placeholder="10.1109/ACCESS.2024.1234567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quartile">Quartile (untuk internasional)</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih quartile" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Q1">Q1</SelectItem>
                        <SelectItem value="Q2">Q2</SelectItem>
                        <SelectItem value="Q3">Q3</SelectItem>
                        <SelectItem value="Q4">Q4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sinta">SINTA (untuk nasional)</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih SINTA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">SINTA 1</SelectItem>
                        <SelectItem value="2">SINTA 2</SelectItem>
                        <SelectItem value="3">SINTA 3</SelectItem>
                        <SelectItem value="4">SINTA 4</SelectItem>
                        <SelectItem value="5">SINTA 5</SelectItem>
                        <SelectItem value="6">SINTA 6</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sitasi">Jumlah Sitasi</Label>
                    <Input
                      id="sitasi"
                      type="number"
                      min="0"
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
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Accepted">Accepted</SelectItem>
                        <SelectItem value="Under Review">Under Review</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2 md:col-span-2">
                    <input
                      type="checkbox"
                      id="mahasiswaTerlibat"
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="mahasiswaTerlibat">Melibatkan mahasiswa</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingPublikasi(false)}>
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
                  <TableHead>Publikasi</TableHead>
                  <TableHead>Jurnal/Konferensi</TableHead>
                  <TableHead>Tahun</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Sitasi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publikasi.map((pub) => {
                  return (
                    <TableRow key={pub.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{pub.judul}</p>
                          <p className="text-xs text-muted-foreground">
                            {pub.penulis.join(', ')}
                          </p>
                          {pub.mahasiswaTerlibat && (
                            <Badge variant="secondary" className="mt-1">
                              <Users className="w-3 h-3 mr-1" />
                              Mahasiswa
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{pub.namaJurnal}</p>
                          <p className="text-xs text-muted-foreground">{pub.penerbit}</p>
                        </div>
                      </TableCell>
                      <TableCell>{pub.tahun}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge variant="outline">{pub.kategori}</Badge>
                          {pub.quartile && (
                            <Badge variant="secondary" className="mt-1">{pub.quartile}</Badge>
                          )}
                          {pub.sinta && (
                            <Badge variant="secondary" className="mt-1">SINTA {pub.sinta}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-600" />
                          <span className="font-medium">{pub.sitasi}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPublicationStatusColor(pub.status)}>
                          {pub.status}
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
                          {pub.doi && (
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                }
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PublikasiPage