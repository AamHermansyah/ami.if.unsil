'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Header from './header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddEditCriteriaDialog from '../../_components/add-edit-criteria-dialog';
import { Criteria } from '@/lib/generated/prisma';
import { Session } from 'next-auth';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import InputSearch from '@/components/shared/input-search';
import axios, { CancelTokenSource, isAxiosError } from "axios";
import { toast } from 'sonner';
import { BarsLoader } from '@/components/core/loader';
import { useRouter, useSearchParams } from 'next/navigation';
import DeleteCriteriaDialog from '../../_components/delete-criteria-dialog';

interface IProps {
  user: Session['user'];
}

function CriteriaLayout({ user }: IProps) {
  const [addEditDialog, setAddEditDialog] = useState(false);
  const [criterias, setCriterias] = useState<(Criteria & { totalIndicator: number })[]>([]);
  const [typeAction, setTypeAction] = useState<'add' | 'edit'>('add');
  const [selectedCriteria, setSelectedCriteria] = useState<Criteria | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
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
      .get(`/api/kelola/kriteria`, {
        params: { q: keyword },
        cancelToken: source.token,
      })
      .then((res) => {
        setCriterias(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          setCriterias([]);
          setLoading(false);
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
      navigate.push(`?q=${value}`);
    }
  }

  useEffect(() => {
    fetch(q);
  }, [q]);

  return (
    <div className="h-full space-y-4">
      <Header />

      <Card>
        <CardHeader className="border-b space-y-4">
          <CardTitle className="text-lg">Daftar Kriteria</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <InputSearch
              defaultValue={q}
              placeholder="Cari kriteria atau kode..."
              onChange={handleSearch}
            />
            <AddEditCriteriaDialog
              open={addEditDialog}
              onOpenChange={(open) => {
                if (!open) {
                  setTimeout(() => {
                    setSelectedCriteria(null);
                    setTypeAction('add');
                  }, 200);
                };
                setAddEditDialog(open);
              }}
              userId={user.id!}
              onAddSuccess={(data) => setCriterias((prev) => [{ ...data, totalIndicator: 0 }, ...prev])}
              onEditSuccess={(data) => {
                setCriterias((prev) => {
                  return prev.map((item) => item.id === data.id ? {
                    ...item,
                    code: data.code,
                    title: data.title
                  } : item)
                });
              }}
              type={typeAction}
              selectedCriteria={selectedCriteria}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="w-32">Kode</TableHead>
                <TableHead className="min-w-64">Kriteria</TableHead>
                <TableHead className="text-center">Total Indikator</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {!loading ? (
                <>
                  {criterias.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        {q.length > 0 ? "Data tidak ditemukan" : "Belum ada data kriteria"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    criterias.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <code className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-mono">
                            {item.code}
                          </code>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{item.title}</div>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.totalIndicator}
                        </TableCell>
                        <TableCell>
                          {format(new Date(item.updatedAt), "dd MMMM yyyy, HH:mm", { locale: id })}
                        </TableCell>
                        <TableCell>
                          {format(new Date(item.createdAt), "dd MMMM yyyy, HH:mm", { locale: id })}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setTypeAction('edit');
                                setSelectedCriteria(item);
                                setAddEditDialog(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => {
                                setSelectedCriteria(item);
                                setDeleteDialog(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <BarsLoader fontSize={20} className="mx-auto" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <DeleteCriteriaDialog
        selectedCriteria={selectedCriteria}
        open={deleteDialog}
        onOpenChange={(open) => {
          if (!open) {
            setTimeout(() => {
              setSelectedCriteria(null);
            }, 200);
          };
          setDeleteDialog(open);
        }}
        onDeleteSuccess={(id) => {
          setCriterias((prev) => prev.filter((access) => access.id !== id));
        }}
      />
    </div>
  );
};

export default CriteriaLayout;