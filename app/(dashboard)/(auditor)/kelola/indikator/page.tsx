'use client'

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, ChevronDown, ChevronRight, Target, BookOpen, Table2, Group, MoreVertical, Pencil, Delete } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface KriteriaData {
  id: string;
  kriteria: string;
  capaian: number;
  kondisiIdeal: number;
  code: string;
}

interface IndikatorData {
  id: string;
  kodeIndikator: string;
  namaIndikator: string;
  kodeKriteria: string;
}

const AuditIndikatorPage: React.FC = () => {
  const [kriteriaData] = useState<KriteriaData[]>([
    {
      id: '1',
      kriteria: 'Kurikulum Program Studi',
      capaian: 0,
      kondisiIdeal: 100,
      code: 'K001'
    },
    {
      id: '2',
      kriteria: 'Dosen dan Tenaga Kependidikan',
      capaian: 0,
      kondisiIdeal: 100,
      code: 'K002'
    },
    {
      id: '3',
      kriteria: 'Mahasiswa dan Lulusan',
      capaian: 0,
      kondisiIdeal: 100,
      code: 'K003'
    },
    {
      id: '4',
      kriteria: 'Sarana dan Prasarana',
      capaian: 0,
      kondisiIdeal: 100,
      code: 'K004'
    },
    {
      id: '5',
      kriteria: 'Pembiayaan',
      capaian: 0,
      kondisiIdeal: 100,
      code: 'K005'
    }
  ]);

  const [indikatorData, setIndikatorData] = useState<IndikatorData[]>([
    {
      id: '1',
      kodeIndikator: 'I001',
      namaIndikator: 'Kesesuaian Kurikulum dengan Standar Kompetensi',
      kodeKriteria: 'K001',
    },
    {
      id: '2',
      kodeIndikator: 'I002',
      namaIndikator: 'Pemutakhiran Kurikulum Secara Berkala',
      kodeKriteria: 'K001',
    },
    {
      id: '3',
      kodeIndikator: 'I003',
      namaIndikator: 'Relevansi Kurikulum dengan Kebutuhan Industri',
      kodeKriteria: 'K001',
    },
    {
      id: '4',
      kodeIndikator: 'I004',
      namaIndikator: 'Kualifikasi Akademik Dosen',
      kodeKriteria: 'K002',
    },
    {
      id: '5',
      kodeIndikator: 'I005',
      namaIndikator: 'Rasio Dosen terhadap Mahasiswa',
      kodeKriteria: 'K002',
    },
    {
      id: '6',
      kodeIndikator: 'I006',
      namaIndikator: 'Kompetensi Tenaga Kependidikan',
      kodeKriteria: 'K002',
    },
    {
      id: '7',
      kodeIndikator: 'I007',
      namaIndikator: 'Tingkat Kelulusan Tepat Waktu',
      kodeKriteria: 'K003',
    },
    {
      id: '8',
      kodeIndikator: 'I008',
      namaIndikator: 'Prestasi Akademik Mahasiswa',
      kodeKriteria: 'K003',
    },
    {
      id: '9',
      kodeIndikator: 'I009',
      namaIndikator: 'Ketersediaan Laboratorium Komputer',
      kodeKriteria: 'K004',
    },
    {
      id: '10',
      kodeIndikator: 'I010',
      namaIndikator: 'Kondisi Perangkat Keras dan Lunak',
      kodeKriteria: 'K004',
    },
    {
      id: '11',
      kodeIndikator: 'I011',
      namaIndikator: 'Alokasi Anggaran Operasional',
      kodeKriteria: 'K005',
    },
    {
      id: '12',
      kodeIndikator: 'I012',
      namaIndikator: 'Transparansi Pengelolaan Keuangan',
      kodeKriteria: 'K005',
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterKriteria, setFilterKriteria] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grouped'>('grouped');
  const [expandedKriteria, setExpandedKriteria] = useState<string[]>(['K001', 'K002', 'K003', 'K004', 'K005']);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IndikatorData | null>(null);

  const filteredData = indikatorData.filter(item => {
    const matchesSearch = item.namaIndikator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kodeIndikator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterKriteria === '' || item.kodeKriteria === filterKriteria;
    return matchesSearch && matchesFilter;
  });

  const groupedData = filteredData.reduce((acc, item) => {
    const kriteriaCode = item.kodeKriteria;
    if (!acc[kriteriaCode]) {
      acc[kriteriaCode] = [];
    }
    acc[kriteriaCode].push(item);
    return acc;
  }, {} as Record<string, IndikatorData[]>);

  const toggleKriteriaExpansion = (kriteriaCode: string) => {
    setExpandedKriteria(prev =>
      prev.includes(kriteriaCode)
        ? prev.filter(code => code !== kriteriaCode)
        : [...prev, kriteriaCode]
    );
  };

  return (
    <div className="h-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Daftar Indikator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                <Input
                  placeholder="Cari indikator atau kode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterKriteria} onValueChange={setFilterKriteria}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by Kriteria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kriteria</SelectItem>
                  {kriteriaData.map(kriteria => (
                    <SelectItem key={kriteria.code} value={kriteria.code}>
                      {kriteria.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4" />
                  Tambah
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    {editingItem ? 'Edit Indikator' : 'Tambah Indikator Baru'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="kode" className="text-sm font-medium">Kode Indikator</Label>
                    <div className="w-full flex items-center gap-4">
                      <Select>
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Huruf" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="T">T</SelectItem>
                          <SelectItem value="U">U</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Masukkan angka"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kodeKriteria" className="text-sm font-medium">Kriteria</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kriteria" />
                      </SelectTrigger>
                      <SelectContent>
                        {kriteriaData.map(kriteria => (
                          <SelectItem key={kriteria.code} value={kriteria.code}>
                            {kriteria.code} - {kriteria.kriteria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deskripsi" className="text-sm font-medium">Deskripsi Indikator</Label>
                    <Input
                      id="deskripsi"
                      placeholder="Masukkan deskripsi indikator"
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
        </CardContent>
      </Card>

      <div className="w-max flex bg-card border rounded-lg p-1">
        <Button
          variant={viewMode === 'grouped' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('grouped')}
          className="rounded-md"
        >
          <Group className="h-4 w-4" />
          Grouped
        </Button>
        <Button
          variant={viewMode === 'table' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('table')}
          className="rounded-md"
        >
          <Table2 className="h-4 w-4" />
          Table
        </Button>
      </div>

      {/* Content */}
      {viewMode === 'grouped' ? (
        <div className="space-y-4">
          {Object.entries(groupedData).map(([kriteriaCode, indikators]) => {
            const kriteria = kriteriaData.find(k => k.code === kriteriaCode);
            const isExpanded = expandedKriteria.includes(kriteriaCode);

            return (
              <Card key={kriteriaCode}>
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleKriteriaExpansion(kriteriaCode)}
                >
                  <div className="w-full flex sm:items-center justify-between gap-y-2">
                    <div className="flex-1 flex items-center space-x-4">
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-primary dark:text-secondary" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-primary dark:text-secondary" />
                      )}
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-2">
                        <div className="flex items-center justify-between">
                          <code className="bg-primary w-max text-primary-foreground px-2 py-1 rounded-full text-xs sm:text-sm font-mono">
                            {kriteriaCode}
                          </code>
                          <Badge variant="outline" className="sm:hidden">
                            {indikators.length} Indikator
                          </Badge>
                        </div>
                        <h3 className="flex-1 sm:text-lg font-semibold">
                          {kriteria?.kriteria}
                        </h3>
                      </div>
                    </div>
                    <Badge variant="outline" className="hidden sm:inline-flex">
                      {indikators.length} Indikator
                    </Badge>
                  </div>
                </CardHeader>
                {isExpanded && (
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {indikators.map((indikator) => (
                        <div key={indikator.id} className="w-full flex gap-3 items-center justify-between p-4 border rounded-md">
                          <div className="flex-1 flex items-center space-x-4">
                            <div className="hidden sm:block bg-foreground p-2 rounded-lg border border-gray-200">
                              <Target className="h-4 w-4 text-background" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <code className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-mono">
                                  {indikator.kodeIndikator}
                                </code>
                              </div>
                              <p className="text-sm font-medium">{indikator.namaIndikator}</p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Pencil className="w-4 h-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Delete className="w-4 h-4" />
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead className="w-32">Kode Indikator</TableHead>
                  <TableHead className="w-32">Kode Kriteria</TableHead>
                  <TableHead className="min-w-64">Nama Kriteria</TableHead>
                  <TableHead className="w-24">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-sm">
                      {searchTerm || filterKriteria
                        ? "Data tidak ditemukan"
                        : "Belum ada data indikator"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item, index) => (
                    <TableRow key={item.id} className="transition-colors">
                      <TableCell className="text-sm font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <code className="px-2 py-1 rounded text-sm font-mono">
                          {item.kodeIndikator}
                        </code>
                      </TableCell>
                      <TableCell>
                        <code className="px-2 py-1 rounded text-sm font-mono">
                          {item.kodeKriteria}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{item.namaIndikator}</div>
                      </TableCell>
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
      )}
    </div>
  );
};

export default AuditIndikatorPage;