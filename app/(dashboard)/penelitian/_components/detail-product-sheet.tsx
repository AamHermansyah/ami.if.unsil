import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DetailProductSheet({ onOpenChange, open }: IProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg gap-4 p-4">
        <SheetHeader className="p-0">
          <SheetTitle>Detail Produk Penelitian</SheetTitle>
          <SheetDescription>Jenis Karya: Aplikasi Mobile</SheetDescription>
        </SheetHeader>
        <Separator />
        <div className="p-0 space-y-4 text-sm">
          <div>
            <h4 className="font-medium mb-1">Nama Karya</h4>
            <p>Aplikasi Monitoring Kualitas Air Sungai</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Deskripsi</h4>
            <p>Aplikasi untuk monitoring kualitas air sungai secara real-time menggunakan IoT sensors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Tahun Penyelesaian</h4>
              <p>2024</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Dana</h4>
              <p>Rp 100.000.000</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Status</h4>
              <Badge variant="success">Diterapkan</Badge>
            </div>
            <div>
              <h4 className="font-medium mb-1">Audit</h4>
              <Badge variant="info">Review</Badge>
            </div>
            <div>
              <h4 className="font-medium mb-1">Kolaborator</h4>
              <p>Dinas Lingkungan Hidup Tasikmalaya</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Institusi Pengguna</h4>
              <p>Dinas Lingkungan Hidup Tasikmalaya</p>
            </div>
            <div className="w-full flex flex-col gap-2">
              <h4 className="font-medium">Bukti Penerapan</h4>
              <Link
                href="/downloads/bukti-penerapan.pdf"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
                download
              >
                <Download className="w-4 h-4" /> Unduh Bukti
              </Link>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <h4 className="font-medium mb-1">Dampak Penerapan</h4>
            <p>Meningkatkan efisiensi monitoring kualitas air di 15 titik sungai</p>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-medium mb-1">Mahasiswa Terlibat (3)</h4>
            <ol className="list-inside list-decimal space-y-1">
              <li>Aam Hermansyah (227006009)</li>
              <li>Elisa Nuramanah (227006019)</li>
              <li>Jhon Doe (218094001)</li>
            </ol>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default DetailProductSheet