'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, FastForward, MessageSquareReply, MoreVertical, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { Session } from 'next-auth';
import { Criteria, CriteriaAudit, Indicator, IndicatorAudit, Period } from '@/lib/generated/prisma';
import Filter from '../_components/filter';
import { useSearchParams } from 'next/navigation';
import axios, { CancelTokenSource, isAxiosError } from 'axios';
import { toast } from 'sonner';
import { BarsLoader } from '@/components/core/loader';
import { Badge } from '@/components/ui/badge';
import { getStatusVariant } from '@/lib/utils';
import DetailDialog from '../_components/detail-dialog';
import DeleteAuditDialog from '../_components/delete-audit-dialog';
import { Pagination } from '@/components/ui/pagination';

type IndicatorAuditType = IndicatorAudit & {
  Indicator: Indicator & {
    criteria: Criteria;
  };
  period: Period;
}

interface IProps {
  user: Session['user'];
  criterias: (CriteriaAudit & { criteria: Criteria })[];
  periods: Period[];
  lastPeriod: Period | null;
}

function AuditLayout({ criterias, periods, lastPeriod, user }: IProps) {
  const [data, setData] = useState<IndicatorAuditType[]>([]);
  const [selectedData, setSelectedData] = useState<IndicatorAuditType | null>(null);
  const [detailDialog, setDetailDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 0,
    limit: 10,
    totalPages: 0,
  });

  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const criteriaId = searchParams.get('criteriaId') || '';
  const page = searchParams.get('page') || '1';
  const achievementLabel = searchParams.get('achievementLabel') || '';
  const findingStatus = searchParams.get('findingStatus') || '';
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const getPeriodLabel = useCallback(() => {
    if (!lastPeriod) return '-';

    const { startDate, endDate, status } = lastPeriod;
    const now = new Date();

    if (status === 'NONACTIVE') {
      return `${lastPeriod.name} (Tidak Aktif)`
    } else if (new Date(endDate) < now) {
      return `${lastPeriod.name} (Kadaluarsa)`;
    } else if (new Date(startDate) > now) {
      return `${lastPeriod.name} (Belum Mulai)`;
    } else {
      return `${lastPeriod.name} (Aktif)`;
    }
  }, [lastPeriod]);

  const isDisabledOptions = useCallback(() => {
    if (!lastPeriod) return true;

    const { startDate, endDate, status } = lastPeriod;
    const now = new Date();
    const isNonActive = status === 'NONACTIVE';
    const isExpired = new Date(endDate) < now;
    const isNotStarted = new Date(startDate) > now;

    return isNonActive || isExpired || isNotStarted;
  }, [lastPeriod]);

  const disabledOptions = isDisabledOptions();

  const fetch = useCallback((
    q: string,
    page: string,
    criteriaId: string,
    achievementLabel: string,
    findingStatus: string,
    period: string,
  ) => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    cancelTokenSource.current = source;

    setLoading(true);

    const findPeriod = periods.find((i) => i.name === period)?.id

    axios
      .get(`/api/indikator-audit`, {
        params: {
          q,
          page,
          limit: pagination.limit,
          criteriaId: criteriaId || undefined,
          achievementLabel: achievementLabel || undefined,
          findingStatus: findingStatus || undefined,
          periodId: findPeriod
        },
        cancelToken: source.token,
      })
      .then((res) => {
        const { items, ...pagination } = res.data
        setData(items);
        setPagination(pagination);
        setLoading(false)
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          setData([]);
          setLoading(false)
          if (isAxiosError(error)) {
            toast.error(JSON.stringify(error.response?.data) || error.message);
          } else {
            toast.error(error.message || 'Internal Error');
          }
        }
      });
  }, []);

  useEffect(() => {
    fetch(q, page, criteriaId, achievementLabel, findingStatus, lastPeriod?.name || '');
  }, [q, page, criteriaId, achievementLabel, findingStatus]);

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-lg">Data Audit Mutu Internal</CardTitle>
        <CardDescription>
          Periode: {getPeriodLabel()}
        </CardDescription>
        <Filter criterias={criterias} />
      </CardHeader>

      <CardContent className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">No</TableHead>
              <TableHead>Kode</TableHead>
              <TableHead className="min-w-64">Indikator</TableHead>
              <TableHead className="w-20 text-center">Capaian</TableHead>
              <TableHead className="w-max text-center">Sebutan</TableHead>
              <TableHead className="max-w-[200px]">Nama Dokumen Pendukung</TableHead>
              <TableHead className="text-center">Link Bukti Fisik</TableHead>
              <TableHead className="w-max text-center">Temuan</TableHead>
              <TableHead className="w-16 text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!loading ? (
              <>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      {q.length > 0 ? "Data tidak ditemukan" : "Belum ada data audit"}
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item, index) => {
                    const query = `period=${encodeURIComponent(lastPeriod?.name || '')}`;

                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-center">{index + 1}</TableCell>
                        <TableCell className="font-medium">{item.Indicator.code}</TableCell>
                        <TableCell>
                          <div className="prose prose-sm lg:prose-base max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                            <div dangerouslySetInnerHTML={{ __html: item.Indicator.title }} />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{item.achievement}</TableCell>
                        <TableCell>
                          <div className="flex justify-center capitalize">
                            <Badge variant={getStatusVariant(item.achievementLabel)}>
                              {item.achievementLabel.toLowerCase().replaceAll('_', ' ')}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{item.documentName || 'Tidak ada'}</TableCell>
                        <TableCell>
                          <div className="flex justify-center items-center">
                            {item.documentLink ? (
                              <Link
                                href={item.documentLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button variant="outline" size="icon">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </Link>
                            ) : (
                              <Button variant="outline" size="icon" disabled>
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center capitalize">
                            <Badge variant={getStatusVariant(item.findingStatus)}>
                              {item.findingStatus.toLowerCase().replaceAll('_', ' ')}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="w-full flex justify-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="mx-auto">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <Link
                                  href={`/audit/${item.Indicator.code.replaceAll('/', '-')}?${query}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4" />
                                    Detail
                                  </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedData(item);
                                    setDetailDialog(true);
                                  }}
                                >
                                  <FastForward className="w-4 h-4" />
                                  Detail Cepat
                                </DropdownMenuItem>
                                {user.role === 'AUDITEE' ? (
                                  <>
                                    <Link
                                      href={disabledOptions ? '' : `/audit/${item.Indicator.code.replaceAll('/', '-')}/edit?${query}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <DropdownMenuItem disabled={disabledOptions}>
                                        <Pencil className="w-4 h-4" />
                                        Edit
                                      </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem
                                      disabled={disabledOptions}
                                      className="text-destructive focus:text-destructive"
                                      onClick={() => {
                                        setSelectedData(item);
                                        setDeleteDialog(true);
                                      }}
                                    >
                                      <Trash className="w-4 h-4 text-destructive" />
                                      Hapus Indikator Audit
                                    </DropdownMenuItem>
                                  </>
                                ) : (
                                  <Link
                                    href={disabledOptions ? '' : `/audit/${item.Indicator.code.replaceAll('/', '-')}/review?${query}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <DropdownMenuItem disabled={disabledOptions}>
                                      <MessageSquareReply className="w-4 h-4" />
                                      Beri Review (Auditor)
                                    </DropdownMenuItem>
                                  </Link>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <BarsLoader fontSize={20} className="mx-auto" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {pagination.totalPages > 1 && (
          <div className="w-full flex justify-end">
            <Pagination
              className="w-max mx-0"
              page={pagination.page}
              pages={pagination.totalPages}
            />
          </div>
        )}
      </CardContent>
      <DetailDialog
        open={detailDialog}
        onOpenChange={setDetailDialog}
        data={selectedData}
        hrefPeriod={encodeURIComponent(lastPeriod?.name || '')}
        disabled={disabledOptions}
      />
      <DeleteAuditDialog
        open={deleteDialog}
        onOpenChange={(open) => {
          if (!open) {
            setTimeout(() => {
              setSelectedData(null);
            }, 200);
          };
          setDeleteDialog(open);
        }}
        selectedAudit={selectedData}
        onDeleteSuccess={(data) => {
          setData((prev) => prev.filter((item) => item.id !== data.id));
        }}
        userId={user.id!}
      />
    </Card>
  );
}

export default AuditLayout;