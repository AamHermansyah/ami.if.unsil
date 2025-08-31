import React from 'react';
import {
  ExternalLink,
  FileText,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Alert,
  AlertTitle,
  AlertDescription
} from '@/components/ui/alert';
import { AlertTriangle, Info, Ban } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { redirect, RedirectType } from 'next/navigation';
import { getIndicatorAuditByIndicatorCodeAndPeriod } from '@/data/indicator-audit';
import { getStatusVariant } from '@/lib/utils';
import { auth } from '@/lib/auth';
import SidebarDetail from '../_layouts/sidebar-detail';
import MenuDetailDropdown from '../_components/menu-detail-dropdown';

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ kode: string }>
}

async function AuditDetailPage({ searchParams, params }: IProps) {
  const session = await auth();
  if (!session?.user) throw new Error("User tidak ditemukan di session.");

  const period = (await searchParams).period;
  const code = (await params).kode.replaceAll('-', '/');
  if (!period) return redirect('/404', 'replace' as RedirectType);

  const res = await getIndicatorAuditByIndicatorCodeAndPeriod(code, period as string);
  if (res?.error) throw Error(res.message);
  if (!res?.data) return redirect('/404', 'replace' as RedirectType);

  const data = res.data;
  const hrefCode = data.Indicator.code.replaceAll('/', '-');

  const { startDate, endDate, status } = data.period;
  const now = new Date();
  const isNonActive = status === 'NONACTIVE';
  const isExpired = new Date(endDate) < now;
  const isNotStarted = new Date(startDate) > now;
  const disabledOptions = isNonActive || isExpired || isNotStarted;

  return (
    <div className="h-full space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="border-b">
              <div className="w-full flex justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <CardTitle>Informasi Dasar</CardTitle>
                  <CardDescription>Tahun Akademik 2024/2025</CardDescription>
                </div>
                <MenuDetailDropdown
                  user={session.user}
                  disabled={disabledOptions}
                  hrefCode={hrefCode}
                  period={period as string}
                  data={res.data}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isNonActive && (
                <Alert variant="warning">
                  <Ban className="h-4 w-4" />
                  <AlertTitle>Periode Sudah Berakhir</AlertTitle>
                  <AlertDescription>
                    Periode ini sudah ditandai sebagai <strong>NONAKTIF</strong>. Data audit tidak dapat diperbarui.
                  </AlertDescription>
                </Alert>
              )}

              {isExpired && !isNonActive && (
                <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Periode Kadaluarsa</AlertTitle>
                  <AlertDescription>
                    Tanggal akhir periode sudah lewat. Anda tidak dapat lagi melakukan perubahan data audit. Auditor dapat memperpanjang tanggal audit!
                  </AlertDescription>
                </Alert>
              )}

              {isNotStarted && (
                <Alert variant="info">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Periode Belum Dimulai</AlertTitle>
                  <AlertDescription>
                    Periode ini belum dimulai. Anda belum bisa melakukan input data audit.
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Kriteria
                </h4>
                <p className="text-muted-foreground">
                  {data.Indicator.criteria.code} - {data.Indicator.criteria.title}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Kode
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {data.Indicator.code}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Jenis Indikator
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {data.Indicator.type}
                  </p>
                </div>
              </div>
              <div className="prose prose-sm sm:prose-base max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                <div dangerouslySetInnerHTML={{ __html: data.Indicator.title }} />
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border">
                <div className="w-full flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Capaian</span>
                    <span className="text-3xl font-bold text-primary dark:text-secondary">{data.achievement}</span>
                  </div>
                  <Badge variant={getStatusVariant(data.achievementLabel)} className="capitalize">
                    {data.achievementLabel.toLowerCase().replaceAll('_', ' ')}
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
                    <span>{data.documentName || 'Tidak ada dokumen'}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Link Bukti Fisik
                  </h4>
                  {data.documentLink ? (
                    <Link
                      href={data.documentLink}
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
                    {data.pemonev || '-'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">
                    Sumber Data
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {data.dataSource || '-'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Rencana Tindak Lanjut</label>
                <div className="text-sm bg-blue-500/10 p-3 rounded border-l-4 border-blue-500">
                  <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                    <div dangerouslySetInnerHTML={{ __html: data.plan || 'Tidak ada' }} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Akar Penyebab</label>
                <div className="text-sm bg-red-500/10 p-3 rounded border-l-4 border-red-500">
                  <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                    <div dangerouslySetInnerHTML={{ __html: data.rootCause || 'Tidak ada' }} />
                  </div>
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
                <Badge variant={getStatusVariant(data.findingStatus)} className="capitalize">
                  {data.findingStatus.toLowerCase().replaceAll('_', ' ')}
                </Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Rekomendasi</label>
                <div className="text-sm bg-green-500/10 p-3 rounded border-l-4 border-green-500">
                  <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                    <div dangerouslySetInnerHTML={{ __html: data.recomendation || 'Tidak ada' }} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Catatan</label>
                <div className="text-sm bg-yellow-500/10 p-3 rounded border-l-4 border-yellow-500">
                  <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                    <div dangerouslySetInnerHTML={{ __html: data.note || 'Tidak ada' }} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Keterangan</label>
                <div className="text-sm bg-purple-500/10 p-3 rounded border-l-4 border-purple-500">
                  <div className="prose prose-sm max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                    <div dangerouslySetInnerHTML={{ __html: data.additionalInformation || 'Tidak ada' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <SidebarDetail
          achievement={data.achievement}
          achievementLabel={data.achievementLabel}
          findingStatus={data.findingStatus}
          indicatorAuditId={data.id}
        />
      </div>
    </div>
  );
}

export default AuditDetailPage;