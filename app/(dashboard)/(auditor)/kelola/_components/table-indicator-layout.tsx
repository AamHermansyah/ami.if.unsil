import React, { useState } from 'react'
import {
  Edit,
  Trash2,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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

const kriteriaData: KriteriaData[] = [
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
];

const indikatorData: IndikatorData[] = [
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
];

function TableIndicatorLayout() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKriteria, setFilterKriteria] = useState('');

  const filteredData = indikatorData.filter(item => {
    const matchesSearch = item.namaIndikator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kodeIndikator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterKriteria === '' || item.kodeKriteria === filterKriteria;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card>
      <CardHeader>
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
      </CardHeader>
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
  )
}

export default TableIndicatorLayout