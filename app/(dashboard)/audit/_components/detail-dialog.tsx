import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { Criteria, Indicator, IndicatorAudit, Period } from '@/lib/generated/prisma';
import { getStatusVariant } from '@/lib/utils';
import Link from 'next/link';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface IProps {
  data: IndicatorAudit & {
    period: Period;
    Indicator: Indicator & {
      criteria: Criteria;
    };
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hrefPeriod: string;
  disabled?: boolean;
}

const DetailDialog: React.FC<IProps> = ({
  data,
  open,
  onOpenChange,
  hrefPeriod,
  disabled
}) => {
  if (!data) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md text-center space-y-4">
          <DialogHeader>
            <DialogTitle>Data Tidak Tersedia</DialogTitle>
            <DialogDescription>
              Data audit indikator belum tersedia atau terjadi kesalahan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const { Indicator: indicator, period, createdAt, updatedAt, ...indicatorAudit } = data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detail Audit Indikator
          </DialogTitle>
          <DialogDescription>
            Informasi lengkap audit untuk indikator {indicator.code}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 flex-1 overflow-y-auto">
          {/* Indicator Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Informasi Indikator</h3>
              <Badge variant="outline" className="text-sm capitalize">
                {indicator.type.toLowerCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Kode Indikator</label>
                <p className="text-sm font-mono border px-2 py-1 rounded">
                  {indicator.code}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Periode</label>
                <p className="text-sm border px-2 py-1 rounded">
                  {period.name}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Deskripsi Indikator</label>
              <div className="p-3 rounded border border-l-4 border-primary dark:border-secondary">
                <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                  <div dangerouslySetInnerHTML={{ __html: indicator.title }} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Kriteria</label>
              <p className="text-sm border px-2 py-1 rounded">
                {indicator.criteria.code} - {indicator.criteria.title}
              </p>
            </div>
          </div>

          <Separator />

          {/* Audit Results */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hasil Keluaran</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Capaian</label>
                <div className="text-2xl font-bold text-primary dark:text-secondary">
                  {indicatorAudit.achievement}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Sebutan</label>
                <Badge variant={getStatusVariant(indicatorAudit.achievementLabel)} className="capitalize">
                  {indicatorAudit.achievementLabel.toLowerCase().replaceAll('_', ' ')}
                </Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Status Temuan</label>
                <Badge variant={getStatusVariant(indicatorAudit.findingStatus)} className="capitalize">
                  {indicatorAudit.findingStatus.toLowerCase().replaceAll('_', ' ')}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Pemonev</label>
              <p className="text-sm border px-2 py-1 rounded">
                {indicatorAudit.pemonev || '-'}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Sumber Data</label>
              <p className="text-sm border px-2 py-1 rounded">
                {indicatorAudit.dataSource || '-'}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dokumen Pendukung</h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Nama Dokumen</label>
                <p className="text-sm px-2 py-1 rounded flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {indicatorAudit.documentName || 'Tidak ada dokumen'}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted-foreground">Link Dokumen</label>
                {indicatorAudit.documentLink ? (
                  <Link
                    href={indicatorAudit.documentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm">
                      <ExternalLink className="h-4 w-4" />
                      Buka Dokumen
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" disabled>
                    <ExternalLink className="h-4 w-4" />
                    Buka Dokumen
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Analysis Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Analisis Auditee</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Akar Penyebab</label>
              <div className="bg-red-500/10 p-3 rounded border-l-4 border-red-500">
                <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                  <div dangerouslySetInnerHTML={{ __html: indicatorAudit.rootCause || 'Tidak ada' }} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Rencana Tindak Lanjut</label>
              <div className="bg-blue-500/10 p-3 rounded border-l-4 border-blue-500">
                <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                  <div dangerouslySetInnerHTML={{ __html: indicatorAudit.plan || 'Tidak ada' }} />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Review Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Auditor</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Rekomendasi</label>
              <div className="bg-green-500/10 p-3 rounded border-l-4 border-green-500">
                <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                  <div dangerouslySetInnerHTML={{ __html: indicatorAudit.recomendation || 'Tidak ada' }} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Catatan</label>
              <div className="bg-yellow-500/10 p-3 rounded border-l-4 border-yellow-500">
                <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                  <div dangerouslySetInnerHTML={{ __html: indicatorAudit.note || 'Tidak ada' }} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Keterangan</label>
              <div className="bg-purple-500/10 p-3 rounded border-l-4 border-purple-500">
                <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                  <div dangerouslySetInnerHTML={{ __html: indicatorAudit.additionalInformation || 'Tidak ada' }} />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Metadata */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informasi Lainnya</h3>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Dibuat: {format(new Date(createdAt), "EEEE, dd MMMM yyyy HH:mm", { locale: id })}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Diperbarui: {format(new Date(updatedAt), "EEEE, dd MMMM yyyy HH:mm", { locale: id })}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col">
          <Link
            href={disabled ? '' : `/audit/${indicator.code.replaceAll('/', '-')}/edit?period=${hrefPeriod}`}
            className="w-full sm:w-auto"
          >
            <Button disabled={disabled} className="w-full">Edit</Button>
          </Link>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;