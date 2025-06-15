'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"

interface IProps {
  trigger: React.ReactNode
  semester: {
    nama: string
    tahunAkademik: string
    periode: "Ganjil" | "Genap"
  }
}

export default function DetailSemesterSheet({ trigger, semester }: IProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="gap-4 overflow-y-auto w-[460px] sm:w-[540px]">
        <div className="sticky top-0 px-4 bg-background space-y-4 pt-4 z-10">
          <SheetHeader className="p-0">
            <SheetTitle className="text-xl">{semester.nama}</SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              Detail semester aktif dan jadwal proses pelaporan AMI.
            </SheetDescription>
          </SheetHeader>
          <Separator />
        </div>

        <div className="px-4 pb-6 space-y-6 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">
                Tahun Akademik
              </Label>
              <p className="font-medium text-sm">{semester.tahunAkademik}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Periode</Label>
              <p className="font-medium text-sm">{semester.periode}</p>
            </div>
          </div>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Jadwal Aktivitas Auditee
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CalendarIcon className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Penginputan Data Auditee</p>
                  <p className="text-xs text-muted-foreground">
                    01 Juli 2025 - 07 Juli 2025
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarIcon className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Pengecekan Data oleh Auditor</p>
                  <p className="text-xs text-muted-foreground">
                    08 Juli 2025 - 12 Juli 2025
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarIcon className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Revisi Penginputan Data</p>
                  <p className="text-xs text-muted-foreground">
                    13 Juli 2025 - 15 Juli 2025
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarIcon className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Fiksasi Skor</p>
                  <p className="text-xs text-muted-foreground">
                    16 Juli 2025 - 17 Juli 2025
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  )
}
