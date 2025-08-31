import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Criteria, Indicator } from '@/lib/generated/prisma';
import { useRouter, useSearchParams } from 'next/navigation';
import axios, { CancelTokenSource, isAxiosError } from 'axios';
import { toast } from 'sonner';
import InputSearch from '@/components/shared/input-search';
import { Pagination } from '@/components/ui/pagination';
import { BarsLoader } from '@/components/core/loader';
import { MoreVertical, Pencil, Plus, Trash } from 'lucide-react';
import { addIndicatorAuditToCurrentPeriod } from '@/actions/indicator-audit';

interface IProps {
  criterias: Criteria[];
  onClickEdit: (data: Indicator) => void;
  onClickDelete: (data: Indicator) => void;
  lastEditedIndicator: Indicator | null;
  lastDeletedIndicator: Indicator | null;
  addIndicatorCb: (cb: (data: IndicatorType) => void) => void;
}

type IndicatorType = Indicator & {
  criteria: Criteria;
}

function TableIndicatorLayout({
  criterias,
  onClickEdit,
  onClickDelete,
  lastEditedIndicator,
  lastDeletedIndicator,
  addIndicatorCb
}: IProps) {
  const [data, setData] = useState<IndicatorType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 0,
    limit: 10,
    totalPages: 0,
  });

  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const page = searchParams.get('page') || '1';
  const criteriaId = searchParams.get('criteriaId') || '';
  const view = searchParams.get('view') || '';
  const navigate = useRouter();
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const fetch = useCallback((q: string, page: string, criteriaId: string) => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    cancelTokenSource.current = source;

    setLoading(true);

    axios
      .get(`/api/kelola/indikator`, {
        params: {
          q,
          page,
          limit: pagination.limit,
          criteriaId: criteriaId || undefined
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

  const handleSearch = (value: string) => {
    value = value.trim();
    if (q !== value) {
      navigate.push(`?q=${value}&criteriaId=${criteriaId}${view ? `&view=${view}` : ''}`);
    }
  }

  const handleAddAudit = (item: Indicator) => {
    const loadingId = toast.loading('Menambahkan data audit...');

    addIndicatorAuditToCurrentPeriod(item)
      .then((res) => {
        toast.dismiss(loadingId);

        if (res?.error) toast.error(res.message);
        else if (res?.isExist) toast.warning(res.message);
        else toast.success(res.message);
      })
      .catch((err) => {
        toast.dismiss(loadingId);
        toast.error((err as Error).message);
      });
  }

  const handleAddIndicator = (data: IndicatorType) => {
    setData((prev) => [data, ...prev]);
  }

  addIndicatorCb(handleAddIndicator);

  useEffect(() => {
    fetch(q, page, criteriaId);
  }, [q, page, criteriaId]);

  useEffect(() => {
    if (!lastEditedIndicator) return;

    setData((prev) =>
      prev.map((item) =>
        item.id === lastEditedIndicator.id
          ? {
            ...lastEditedIndicator,
            criteria: item.criteria,
          }
          : item
      )
    );
  }, [lastEditedIndicator]);

  useEffect(() => {
    if (!lastDeletedIndicator) return;

    setData((prev) => prev.filter((item) => item.id !== lastDeletedIndicator.id));
  }, [lastDeletedIndicator]);

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4 flex-1">
          <InputSearch
            defaultValue={q}
            placeholder="Cari indikator atau kode..."
            onChange={handleSearch}
          />
          <Select
            defaultValue={criteriaId}
            onValueChange={(value) => {
              navigate.push(`?q=${q}${value !== 'all' ? `&criteriaId=${value}` : ''}${view ? `&view=${view}` : ''}`);
            }}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Kriteria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              {criterias.map(item => (
                <SelectItem key={item.code} value={item.id}>
                  {item.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead className="w-32">Kode Indikator</TableHead>
              <TableHead className="w-32">Kode Kriteria</TableHead>
              <TableHead className="min-w-64">Nama Kriteria</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!loading ? (
              <>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      {q.length > 0 ? "Data tidak ditemukan" : "Belum ada data indikator"}
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item, index) => (
                    <TableRow key={item.id} className="transition-colors">
                      <TableCell className="text-sm font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <code className="px-2 py-1 rounded text-sm font-mono">
                          {item.code}
                        </code>
                      </TableCell>
                      <TableCell>
                        <code className="px-2 py-1 rounded text-sm font-mono">
                          {item.criteria.code}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="prose prose-sm lg:prose-base max-w-none whitespace-normal text-justify text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                          <div dangerouslySetInnerHTML={{ __html: item.title }} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onClickEdit(item)}>
                                <Pencil className="w-4 h-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAddAudit(item)}>
                                <Plus className="w-4 h-4" />
                                Tambah ke Audit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onClickDelete(item)} className="text-destructive focus:text-destructive">
                                <Trash className="w-4 h-4 text-destructive" />
                                Hapus
                              </DropdownMenuItem>
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
                <TableCell colSpan={5} className="text-center py-8">
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
    </Card>
  )
}

export default TableIndicatorLayout