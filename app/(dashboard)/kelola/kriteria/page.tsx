'use client'

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from './_layouts/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KriteriaData {
  id: string;
  kriteria: string;
  capaian: number;
  kondisiIdeal: number;
  code: string;
}

const AuditKriteriaPage: React.FC = () => {
  const [kriteriaData, setKriteriaData] = useState<KriteriaData[]>([
    {
      id: '1',
      kriteria: 'Kurikulum Program Studi',
      capaian: 0,
      kondisiIdeal: 0,
      code: 'K001'
    },
    {
      id: '2',
      kriteria: 'Dosen dan Tenaga Kependidikan',
      capaian: 0,
      kondisiIdeal: 0,
      code: 'K002'
    },
    {
      id: '3',
      kriteria: 'Mahasiswa dan Lulusan',
      capaian: 0,
      kondisiIdeal: 0,
      code: 'K003'
    },
    {
      id: '4',
      kriteria: 'Sarana dan Prasarana',
      capaian: 0,
      kondisiIdeal: 0,
      code: 'K004'
    },
    {
      id: '5',
      kriteria: 'Pembiayaan',
      capaian: 0,
      kondisiIdeal: 0,
      code: 'K005'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KriteriaData | null>(null);

  return (
    <div className="h-full space-y-4">
      <Header />

      <Card>
        <CardHeader className="border-b space-y-4">
          <CardTitle className="text-lg">Daftar Kriteria</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
              <Input
                placeholder="Cari kriteria atau kode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4" />
                  Tambah Kriteria
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? 'Edit Kriteria' : 'Tambah Kriteria Baru'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="kriteria">Kriteria</Label>
                    <Input
                      id="kriteria"
                      placeholder="Masukkan kriteria audit"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Kode</Label>
                    <Input
                      id="code"
                      placeholder="Masukkan kode (contoh: K001)"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Batal
                    </Button>
                    <Button>
                      {editingItem ? 'Update' : 'Simpan'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="w-32">Kode</TableHead>
                <TableHead className="min-w-64">Kriteria</TableHead>
                <TableHead className="w-32">Capaian</TableHead>
                <TableHead className="min-w-80">Kondisi Ideal</TableHead>
                <TableHead className="w-24">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {kriteriaData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    {searchTerm ? "Data tidak ditemukan" : "Belum ada data kriteria"}
                  </TableCell>
                </TableRow>
              ) : (
                kriteriaData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <code className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-mono">
                        {item.code}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{item.kriteria}</div>
                    </TableCell>
                    <TableCell>{item.capaian}</TableCell>
                    <TableCell>{item.kondisiIdeal}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditKriteriaPage;