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

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ kode: string }>
}

async function AuditEditPage({ searchParams, params }: IProps) {
  const period = (await searchParams).period;
  const code = (await params).kode.replaceAll('-', '/');
  if (!period) return redirect('/404', 'replace' as RedirectType);

  const session = await auth();
  if (!session?.user) {
    throw new Error("User tidak ditemukan di session.");
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
            <CardDescription>Tahun Akademik 2024/2025</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4>Kriteria:</h4>
              <p className="text-muted-foreground">
                {indicator.criteria.code} - {indicator.criteria.title}
              </p>
            </div>

            <div className="grid grid-cols-2 border rounded-md bg-card">
              <div className="p-4 space-y-1">
                <h4>Capaian</h4>
                <span className="text-primary dark:text-secondary font-semibold">{audit.achievement}</span>
              </div>
              <div className="p-4 space-y-1 border-l">
                <h4>Sebutan</h4>
                <Badge variant={getStatusVariant(audit.achievementLabel)} className="capitalize">
                  {audit.achievementLabel.toLowerCase().replaceAll('_', ' ')}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4>Kode:</h4>
              <span className="px-2 py-1 text-sm font-mono border rounded">
                {indicator.code}
              </span>
            </div>

            <div className="space-y-2">
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
              Review Auditor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">
                Status Temuan
              </h4>
              <Badge variant={getStatusVariant(audit.findingStatus)} className="capitalize">
                {audit.findingStatus.toLowerCase().replaceAll('_', ' ')}
              </Badge>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Rekomendasi</label>
              <p className="text-sm bg-green-500/10 p-3 rounded border-l-4 border-green-500">
                {audit.recomendation || '-'}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Catatan</label>
              <p className="text-sm bg-yellow-500/10 p-3 rounded border-l-4 border-yellow-500">
                {audit.note || '-'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <FormReview
        data={audit}
        userId={session.user.id!}
        code={code.replaceAll('/', '-')}
        period={encodeURIComponent(period as string)}
        disabled={audit.achievementLabel === 'BELUM_DI_AUDIT'}
      />
    </div>
  );
}

export default AuditEditPage;