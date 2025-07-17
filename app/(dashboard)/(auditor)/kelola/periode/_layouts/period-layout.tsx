"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarPlus, Edit, Trash2 } from "lucide-react"
import Header from "./header"
import InputSearch from "@/components/shared/input-search"
import AddEditPeriodDialog from "../../_components/add-edit-period-dialog"
import { useCallback, useEffect, useRef, useState } from "react"
import { Period } from "@/lib/generated/prisma"
import { useRouter, useSearchParams } from "next/navigation"
import axios, { CancelTokenSource, isAxiosError } from "axios"
import { toast } from "sonner"
import { Pagination } from "@/components/ui/pagination"
import { BarsLoader } from "@/components/core/loader"
import { id } from "date-fns/locale"
import { format } from "date-fns"
import DeletePeriodDialog from "../../_components/delete-period-dialog"

interface IProps {
  lastData: Period | null;
}

export default function PeriodLayout({ lastData }: IProps) {
  const [data, setData] = useState<Period[]>([]);
  const [lastPeriod, setLastPeriod] = useState(lastData);
  const [addEditDialog, setAddEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [typeAction, setTypeAction] = useState<'add' | 'edit'>('add');
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 0,
    limit: 10,
    totalPages: 0,
  });

  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const page = searchParams.get('page');
  const navigate = useRouter();
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const fetch = useCallback((keyword: string) => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    cancelTokenSource.current = source;

    setLoading(true);

    axios
      .get(`/api/kelola/periode`, {
        params: {
          q: keyword,
          limit: pagination.limit,
          page: typeof page === 'string' && !isNaN(+page) ? +page : 1
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
            toast.error(error.response?.data || error.message);
          } else {
            toast.error(error.message || 'Internal Error');
          }
        }
      });
  }, []);

  const handleSearch = (value: string) => {
    value = value.trim();
    if (q !== value) {
      navigate.push(`?q=${value}`);
    }
  }

  useEffect(() => {
    fetch(q);
  }, [q]);

  return (
    <div className="space-y-4">
      <Header />
      <Card>
        <CardHeader className="border-b space-y-4">
          <CardTitle>Daftar Periode</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <InputSearch
              defaultValue={q}
              placeholder="Cari nama..."
              onChange={handleSearch}
            />
            <Button
              onClick={() => {
                if (lastPeriod) {
                  const now = new Date();
                  const endDate = new Date(lastPeriod.endDate);

                  if (endDate < now) setAddEditDialog(true);
                  else toast.warning("Periode sebelumnya belum selesai.");
                } else {
                  setAddEditDialog(true);
                }
              }}
            >
              <CalendarPlus className="w-4 h-4" />
              Periode Baru
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Mulai</TableHead>
                <TableHead>Selesai</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading ? (
                <>
                  {data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        {q.length > 0 ? "Data tidak ditemukan" : "Belum ada data periode"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((period) => (
                      <TableRow key={period.id}>
                        <TableCell>{period.name}</TableCell>
                        <TableCell>{format(period.startDate, 'eeee, d MMMM y', { locale: id })}</TableCell>
                        <TableCell>{format(period.endDate, 'eeee, d MMMM y', { locale: id })}</TableCell>
                        <TableCell>
                          <Badge variant={period.status === 'ACTIVE' ? 'success' : 'destructive'}>
                            {period.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setTypeAction('edit');
                                setSelectedPeriod(period);
                                setAddEditDialog(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              disabled={period.status === 'NONACTIVE'}
                              onClick={() => {
                                setSelectedPeriod(period);
                                setDeleteDialog(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
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
      <AddEditPeriodDialog
        open={addEditDialog}
        onOpenChange={(open) => {
          if (!open) {
            setTimeout(() => {
              setSelectedPeriod(null);
              setTypeAction('add');
            }, 200);
          };
          setAddEditDialog(open);
        }}
        onAddSuccess={(data) => {
          setData((prev) => {
            if (prev.length === 0) setLastPeriod(data);
            return [data, ...prev]
          });
        }}
        onEditSuccess={(data) => {
          setData((prev) => {
            return prev.map((item) => item.id === data.id ? data : item)
          });
        }}
        type={typeAction}
        selectedPeriod={selectedPeriod}
      />
      <DeletePeriodDialog
        data={selectedPeriod}
        open={deleteDialog}
        onOpenChange={(open) => {
          if (!open) {
            setTimeout(() => {
              setSelectedPeriod(null);
            }, 200);
          };
          setDeleteDialog(open);
        }}
        onDeleteSuccess={(id) => {
          setData((prev) => {
            if (prev.length === 0) setLastPeriod(null);
            return prev.filter((period) => period.id !== id)
          });
        }}
      />
    </div>
  )
}