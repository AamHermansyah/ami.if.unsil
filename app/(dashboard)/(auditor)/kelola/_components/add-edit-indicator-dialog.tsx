import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const kriteriaData = [
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
]

function AddEditIndicatorDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Tambah
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Tambah Indikator Baru
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
          <DialogFooter>
            <DialogClose>Batal</DialogClose>
            <Button>
              Simpan
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditIndicatorDialog