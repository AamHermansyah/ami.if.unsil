import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { redirect, RedirectType } from 'next/navigation';
import { getIndicatorAuditByIndicatorCodeAndPeriod } from '@/data/indicator-audit';
import { getStatusVariant } from '@/lib/utils';
import { auth } from '@/lib/auth';
import FormReview from '../../_components/form-review';
import { ExternalLink, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ kode: string }>
}

async function AuditReviewPage({ searchParams, params }: IProps) {
  const period = (await searchParams).period;
  const code = (await params).kode.replaceAll('-', '/');
  if (!period) return redirect('/404', 'replace' as RedirectType);

  const session = await auth();
  if (!session?.user) {
    throw new Error("User tidak ditemukan di session.");
  }

  if (session.user.role === 'AUDITEE') {
    return redirect('/404', 'replace' as RedirectType);
  }

  const res = await getIndicatorAuditByIndicatorCodeAndPeriod(code, period as string);
  if (res?.error) throw Error(res.message);
  if (!res?.data) return redirect('/404', 'replace' as RedirectType);

  const { Indicator: indicator, ...audit } = res.data;

  const { startDate, endDate, status } = audit.period;
  const now = new Date();

  if (status === 'NONACTIVE' || new Date(endDate) < now) {
    return redirect('/404', 'replace' as RedirectType);
  }

  if (new Date(startDate) > now) {
    return redirect('/404', 'replace' as RedirectType);
  }

  return (
    <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Informasi Indikator</CardTitle>
            <CardDescription>Periode: {period}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4>Kriteria:</h4>
              <p className="text-muted-foreground">
                {indicator.criteria.code} - {indicator.criteria.title}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4>Kode</h4>
                <span className="px-2 py-1 text-sm font-mono border rounded">
                  {indicator.code}
                </span>
              </div>
              <div>
                <h4>Jenis Indikator</h4>
                <p className="text-muted-foreground">
                  {indicator.type}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <h4>Indikator:</h4>
              <div className="prose prose-sm sm:prose-base max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                <div dangerouslySetInnerHTML={{ __html: indicator.title }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Auditor */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle>
              Hasil Keluaran
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 border rounded-md">
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">Capaian</h4>
                <span className="text-primary dark:text-secondary font-semibold">{audit.achievement}</span>
              </div>
              <div className="p-4 space-y-1 border-l">
                <h4 className="text-sm font-medium text-muted-foreground">Sebutan</h4>
                <Badge variant={getStatusVariant(audit.achievementLabel)} className="capitalize">
                  {audit.achievementLabel.toLowerCase().replaceAll('_', ' ')}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Dokumen Pendukung
                </h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>{audit.documentName || 'Tidak ada dokumen'}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Link Bukti Fisik
                </h4>
                {audit.documentLink ? (
                  <Link
                    href={audit.documentLink}
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
              <div>
                <h4 className="text-sm font-medium mb-1">
                  Pemonev
                </h4>
                <p className="text-sm text-muted-foreground">
                  {audit.pemonev || '-'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">
                  Sumber Data
                </h4>
                <p className="text-sm text-muted-foreground">
                  {audit.dataSource || '-'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Akar Penyebab</label>
              <div className="bg-red-500/10 p-3 rounded border-l-4 border-red-500">
                <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                  <div dangerouslySetInnerHTML={{ __html: audit.rootCause || 'Tidak ada' }} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Rencana Tindak Lanjut</label>
              <div className="bg-blue-500/10 p-3 rounded border-l-4 border-blue-500">
                <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                  <div dangerouslySetInnerHTML={{ __html: audit.plan || 'Tidak ada' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <FormReview
        data={audit}
        userId={session.user.id!}
        code={code.replaceAll('/', '-')}
        period={encodeURIComponent(period as string)}
        disabled={audit.achievementLabel === 'BELUM_DI_INPUT'}
      />
    </div>
  );
}

export default AuditReviewPage;