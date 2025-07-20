import React, { useCallback, useEffect, useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Target,
  MoreVertical,
  Pencil,
  RefreshCcw,
  Plus,
  Trash
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Criteria, Indicator } from '@/lib/generated/prisma';
import { BarsLoader } from '@/components/core/loader';
import axios, { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { addIndicatorAuditToCurrentPeriod, addIndicatorsAuditByCriteria } from '@/actions/indicator-audit';
import { BulkResultDialog } from '@/components/shared/bulk-result-dialog';
import { BulkResult } from '@/lib/types';

interface IProps {
  item: Criteria & { totalIndicator: number };
  onClickEdit: (data: Indicator) => void;
  onClickDelete: (data: Indicator) => void;
  lastEditedIndicator: Indicator | null;
  lastDeletedIndicator: Indicator | null;
}

function CriteriaCard({
  item,
  onClickEdit,
  onClickDelete,
  lastEditedIndicator,
  lastDeletedIndicator
}: IProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Indicator[]>([]);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [bulkResult, setBulkResult] = useState<BulkResult | null>(null);

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

  const handleBulkAdd = async () => {
    try {
      const loadingId = toast.loading('Menambahkan banyak data audit...');
      const res = await addIndicatorsAuditByCriteria(item.id);

      if ('success' in res && res.success) {
        const successCount = res.results.filter(r => r.status === 'success').length;
        const failedCount = res.results.filter(r => r.status === 'failed').length;
        const skippedCount = res.results.filter(r => r.status === 'skipped').length;

        toast.dismiss(loadingId);
        toast.success(res.message);
        setBulkResult({
          success: successCount,
          failed: failedCount,
          skipped: skippedCount,
          details: res.results
        });
        setResultDialogOpen(true);
      } else {
        toast.dismiss(loadingId);
        toast.error(res.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const fetch = useCallback((signal?: AbortSignal) => {
    setLoading(true);

    axios
      .get(`/api/kelola/indikator/${item.code}`, { signal })
      .then((res) => setData(res.data))
      .catch((error) => {
        if (axios.isCancel(error)) return;

        setData([]);
        if (isAxiosError(error)) {
          toast.error(JSON.stringify(error.response?.data) || error.message);
        } else {
          toast.error(error.message || 'Internal Error');
        }
      })
      .finally(() => setLoading(false));
  }, [item.code]);

  useEffect(() => {
    const controller = new AbortController();

    if (isExpanded) {
      fetch(controller.signal);
    }

    return () => {
      controller.abort();
    };
  }, [isExpanded, fetch]);

  useEffect(() => {
    if (lastEditedIndicator) {
      setData((prev) => prev.map((item) => item.id === lastEditedIndicator.id ? lastEditedIndicator : item));
    }
  }, [lastEditedIndicator]);

  useEffect(() => {
    if (!lastDeletedIndicator) return;

    setData((prev) => prev.filter((item) => item.id !== lastDeletedIndicator.id));
  }, [lastDeletedIndicator]);

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex sm:items-center justify-between gap-y-2">
          <div className="flex-1 flex items-center space-x-4">
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="cursor-pointer focus:outline-none"
            >
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-primary dark:text-secondary" />
              ) : (
                <ChevronRight className="h-5 w-5 text-primary dark:text-secondary" />
              )}
            </button>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-2">
              <div className="flex items-center justify-between">
                <code className="bg-primary w-max text-primary-foreground px-2 py-1 rounded-full text-xs sm:text-sm font-mono">
                  {item.code}
                </code>
                <div className="flex items-center gap-3 sm:hidden">
                  <Badge variant="outline">
                    {item.totalIndicator} Indikator
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => fetch()} disabled={!isExpanded}>
                        <RefreshCcw className="w-4 h-4" />
                        Refresh
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled={item.totalIndicator === 0} onClick={handleBulkAdd}>
                        <Plus className="w-4 h-4" />
                        Tambah ke Audit (Semua)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <h3 className="flex-1 sm:text-lg font-semibold">
                {item.title}
              </h3>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <Badge variant="outline" className="hidden sm:inline-flex">
              {item.totalIndicator} Indikator
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => fetch()} disabled={!isExpanded}>
                  <RefreshCcw className="w-4 h-4" />
                  Refresh
                </DropdownMenuItem>
                <DropdownMenuItem disabled={item.totalIndicator === 0} onClick={handleBulkAdd}>
                  <Plus className="w-4 h-4" />
                  Tambah ke Audit (Semua)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-4">
          {!loading ? (
            <div className="space-y-3">
              {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                  <Target className="w-12 h-12 mb-2" />
                  <p className="text-sm">Indikator masih kosong</p>
                </div>
              ) : data.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex gap-3 items-start justify-between p-4 border rounded-md"
                >
                  <div className="flex-1 flex items-start space-x-4">
                    <div className="hidden sm:block bg-foreground p-2 rounded-lg border border-gray-200">
                      <Target className="h-4 w-4 text-background" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <code className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-mono">
                          {item.code}
                        </code>
                      </div>
                      <div className="prose prose-sm lg:prose-base max-w-none text-foreground [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                        <div dangerouslySetInnerHTML={{ __html: item.title }} />
                      </div>
                    </div>
                  </div>
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
                      <DropdownMenuItem
                        onClick={() => onClickDelete(item)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash className="w-4 h-4 text-destructive" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-4">
              <BarsLoader fontSize={20} className="mx-auto" />
            </div>
          )}
        </CardContent>
      )}

      <BulkResultDialog
        open={resultDialogOpen}
        onOpenChange={setResultDialogOpen}
        bulkResult={bulkResult}
        description="Ringkasan penambahan indikator audit ke periode aktif."
      />
    </Card>
  )
}

export default CriteriaCard