import React from 'react';
import { CalendarPlus, AlertTriangle, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Session } from 'next-auth';

interface IProps {
  user: Session['user'];
}

function NoPeriodAvailable({ user }: IProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardContent className="flex flex-col items-center text-center p-8">
          {/* Icon */}
          <div className="w-20 h-20 bg-blue-500/20 border rounded-full flex items-center justify-center mb-6">
            <CalendarPlus className="w-10 h-10 text-blue-500" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold mb-3">
            Belum Ada Periode
          </h2>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Untuk memulai proses audit, auditor perlu membuat periode audit terlebih dahulu.
            Periode audit akan menentukan rentang waktu pelaksanaannya.
          </p>

          {/* Alert Info */}
          <div className="w-full bg-amber-500/10 border rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm text-amber-500 font-medium mb-1">
                Yang perlu dilakukan:
              </p>
              {user.role === 'AUDITOR' && (
                <ul className="text-sm list-disc pl-4 text-amber-500 space-y-1">
                  <li>Tentukan nama periode audit</li>
                  <li>Atur tanggal mulai dan berakhir</li>
                  <li>Pilih kriteria yang akan diaudit</li>
                </ul>
              )}
              {user.role === 'AUDITEE' && (
                <ul className="text-sm list-disc pl-4 text-amber-500 space-y-1">
                  <li>Tunggu auditor untuk membuat periode</li>
                  <li>Jika ada periode yang berjalan, halaman ini akan berubah dengan semestinya</li>
                  <li>Proses audit hanya bisa dilakukan jika tanggal mulai periode lebih dari sama dengan hari ini</li>
                </ul>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {user.role === 'AUDITOR' && (
              <Link href="/kelola/periode" className="w-full">
                <Button
                  className="w-full"
                  size="lg"
                >
                  <Plus className="w-4 h-4" />
                  Buat Periode Baru
                </Button>
              </Link>
            )}

            <Button
              variant="outline"
              className="w-full"
              size="lg"
              disabled
            >
              <FileText className="w-4 h-4" />
              Panduan (Coming soon)
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-muted-foreground mt-6">
            Setelah periode dibuat, anda dapat mulai melakukan audit indikator
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoPeriodAvailable;