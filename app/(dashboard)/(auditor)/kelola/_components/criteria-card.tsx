import React, { useCallback, useEffect, useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Target,
  MoreVertical,
  Pencil,
  Delete,
  RefreshCcw,
  Plus
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

interface IProps {
  item: Criteria & { totalIndicator: number };
  onClickEdit: (data: Indicator) => void;
}

function CriteriaCard({ item, onClickEdit }: IProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Indicator[]>([]);

  const fetch = useCallback(() => {
    setLoading(true);

    axios
      .get(`/api/kelola/indikator/${item.code}`)
      .then((res) => setData(res.data))
      .catch((error) => {
        setData([]);
        if (isAxiosError(error)) {
          toast.error(error.response?.data || error.message);
        } else {
          toast.error(error.message || 'Internal Error');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isExpanded) {
      fetch();
    }
  }, [isExpanded]);

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
                      <DropdownMenuItem onClick={fetch}>
                        <RefreshCcw className="w-4 h-4" />
                        Refresh
                      </DropdownMenuItem>
                      <DropdownMenuItem>
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
                <DropdownMenuItem onClick={fetch}>
                  <RefreshCcw className="w-4 h-4" />
                  Refresh
                </DropdownMenuItem>
                <DropdownMenuItem>
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
                      <DropdownMenuItem>
                        <Delete className="w-4 h-4" />
                        Hapus
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Plus className="w-4 h-4" />
                        Tambah ke Audit
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
    </Card>
  )
}

export default CriteriaCard