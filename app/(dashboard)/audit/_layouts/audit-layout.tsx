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
import { ExternalLink, Eye, MoreVertical, Pencil } from 'lucide-react';
import Link from 'next/link';
import { Session } from 'next-auth';
import { Criteria, Indicator, IndicatorAudit, Period } from '@/lib/generated/prisma';
import Filter from '../_components/filter';
import { useSearchParams } from 'next/navigation';
import axios, { CancelTokenSource, isAxiosError } from 'axios';
import { toast } from 'sonner';
import { BarsLoader } from '@/components/core/loader';
import { Badge } from '@/components/ui/badge';
import { getStatusVariant } from '@/lib/utils';

type IndicatorAuditType = IndicatorAudit & {
  Indicator: Indicator;
  period: Period;
}

interface IProps {
  user: Session['user'];
  criterias: Criteria[];
  periods: Period[];
}

function AuditLayout({ criterias, periods }: IProps) {
  const [data, setData] = useState<IndicatorAuditType[]>([]);
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
  const period = decodeURIComponent(searchParams.get('period') || '');

  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

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

    const findPeriod = periods.find((i) => i.name === (period || periods[0]?.name))?.id

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
    fetch(q, page, criteriaId, achievementLabel, findingStatus, period);
  }, [q, page, criteriaId, achievementLabel, findingStatus, period]);

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-lg">Data Audit Mutu Internal</CardTitle>
        <CardDescription>Periode: 2024/2025</CardDescription>
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
                  data.map((item, index) => (
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
                      <TableCell>{item.documentName || '-'}</TableCell>
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
                                href={`/audit/${encodeURIComponent(item.Indicator.code)}?period=${encodeURIComponent(period || periods[0]?.name || '')}`}
                              >
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Detail
                                </DropdownMenuItem>
                              </Link>
                              <Link
                                href={`/audit/${encodeURIComponent(item.Indicator.code)}/edit?period=${encodeURIComponent(period || periods[0]?.name || '')}`}
                              >
                                <DropdownMenuItem>
                                  <Pencil className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                              </Link>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
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
      </CardContent>
    </Card>
  );
}

export default AuditLayout;