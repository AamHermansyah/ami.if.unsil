'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CalendarPlus, AlertTriangle } from 'lucide-react'
import { DateRangePicker } from '@/components/core/date-range-picker'
import { Separator } from '@/components/ui/separator'

const getAcademicYears = () => {
  const currentYear = new Date().getFullYear()
  return [
    `${currentYear - 1}/${currentYear}`,
    `${currentYear}/${currentYear + 1}`,
    `${currentYear + 1}/${currentYear + 2}`,
  ]
}

function AddSemesterDialog() {
  const tahunAkademikOptions = getAcademicYears()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CalendarPlus className="w-4 h-4" />
          Mulai Semester Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90svh] flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Semester</DialogTitle>
          <DialogDescription>
            Pilih tahun akademik dan periode semester yang akan digunakan.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 grid gap-4 py-2 overflow-y-auto">
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Peringatan</AlertTitle>
            <AlertDescription>
              <p>
                Mohon berhati-hati dalam mengelola semester.
                Dalam satu tahun ajaran hanya diperbolehkan maksimal <strong>2 semester</strong>: <em>Ganjil</em> dan <em>Genap</em>.
              </p>
            </AlertDescription>
          </Alert>

          <div className="grid gap-1">
            <Label>Tahun Akademik</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Tahun Akademik" />
              </SelectTrigger>
              <SelectContent>
                {tahunAkademikOptions.map((tahun) => (
                  <SelectItem key={tahun} value={tahun}>
                    {tahun}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1">
            <Label>Periode</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ganjil">Ganjil</SelectItem>
                <SelectItem value="Genap">Genap</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Separator className="my-1" />
            <span className="inline-block px-2 text-sm font-medium text-muted-foreground bg-background absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
              Jadwal Audit (Opsional)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Jadwal Date Range */}
            <div className="grid gap-1">
              <Label>Penginputan Data Auditee</Label>
              <DateRangePicker />
            </div>

            <div className="grid gap-1">
              <Label>Pengecekan Data Auditor</Label>
              <DateRangePicker />
            </div>

            <div className="grid gap-1">
              <Label>Penginputan Lanjutan</Label>
              <DateRangePicker />
            </div>

            <div className="grid gap-1">
              <Label>Fiksasi Nilai</Label>
              <DateRangePicker />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <DialogClose asChild>
            <Button variant="ghost">Batal</Button>
          </DialogClose>
          <Button>Mulai</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddSemesterDialog;
