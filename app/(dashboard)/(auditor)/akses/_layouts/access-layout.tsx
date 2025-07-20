"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from './header'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical, Pencil, Trash, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Access, Status } from '@/lib/generated/prisma';
import { Session } from 'next-auth';
import { BarsLoader } from '@/components/core/loader';
import { useRouter, useSearchParams } from 'next/navigation';
import axios, { CancelTokenSource, isAxiosError } from 'axios';
import InputSearch from '@/components/shared/input-search';
import { toast } from 'sonner';
import AddEditAccessDialog from '../_components/add-edit-access-dialog';
import { updateStatusAccess } from '@/actions/access';
import { id } from 'date-fns/locale';
import DeleteAccessDialog from '../_components/delete-access-dialog';
import { Pagination } from '@/components/ui/pagination';

interface IProps {
  user: Session['user'];
}

function AccessLayout({ user }: IProps) {
  const [data, setData] = useState<Access[]>([]);
  const [addEditDialog, setAddEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [typeAction, setTypeAction] = useState<'add' | 'edit'>('add');
  const [selectedAccess, setSelectedAccess] = useState<Access | null>(null);
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
  const role = searchParams.get('role') || 'all';
  const navigate = useRouter();
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const fetch = useCallback((q: string, page: string, role: string) => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    cancelTokenSource.current = source;

    setLoading(true);

    axios
      .get(`/api/akses`, {
        params: {
          q,
          page,
          limit: pagination.limit,
          role: role !== 'all' ? role : undefined
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
      navigate.push(`?q=${value}&role=${role}`);
    }
  }

  const handleUpdateStatus = (value: string, email: string) => {
    toast.promise(updateStatusAccess(value as Status, email), {
      loading: 'Mengubah status...',
      error: (error) => error?.message || 'Internal server error',
      success: (res) => {
        if ('success' in res && res.success) {
          setData((prev) => {
            return prev.map((item) => {
              if (item.email === email) return { ...item, status: value as Status };
              return item;
            });
          });
          return value === 'ACTIVATE' ? 'Akun berhasil dinonaktifkan' : 'Akun berhasil diaktifkan';
        } else {
          throw Error(res.message);
        }
      }
    });
  }

  useEffect(() => {
    fetch(q, page, role);
  }, [q, page, role]);

  return (
    <div className="space-y-4">
      <Header />
      <Card>
        <CardHeader className="border-b space-y-4">
          <CardTitle>Daftar Email</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              <InputSearch
                defaultValue={q}
                placeholder="Cari email..."
                onChange={handleSearch}
              />
              <Select
                defaultValue={role}
                onValueChange={(value) => {
                  navigate.push(`?q=${q}&role=${value}`);
                }}
              >
                <SelectTrigger className="w-26">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="auditee">Auditee</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <AddEditAccessDialog
              open={addEditDialog}
              onOpenChange={(open) => {
                if (!open) {
                  setTimeout(() => {
                    setSelectedAccess(null);
                    setTypeAction('add');
                  }, 200);
                };
                setAddEditDialog(open);
              }}
              onAddSuccess={(data) => {
                if (!page || (page === '1')) setData((prev) => [data, ...prev]);
                else navigate.push('?page=1');
              }}
              onEditSuccess={(data) => {
                setData((prev) => {
                  return prev.map((item) => item.id === data.id ? data : item)
                });
              }}
              type={typeAction}
              selectedAccess={selectedAccess}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading ? (
                <>
                  {data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        {q.length > 0 ? "Data tidak ditemukan" : "Belum ada data akses"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((access) => (
                      <TableRow key={access.id}>
                        <TableCell>{access.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{access.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={access.status === 'ACTIVE' ? 'success' : 'destructive'}>
                            {access.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(access.createdAt, 'eeee, d MMMM y', { locale: id })}</TableCell>
                        <TableCell>
                          <div className="w-full flex justify-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="mx-auto"
                                  disabled={access.email === user.email}
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setTypeAction('edit');
                                    setSelectedAccess(access);
                                    setAddEditDialog(true);
                                  }}
                                >
                                  <Pencil className="w-4 h-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                  <DropdownMenuSubTrigger className="gap-2">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                    Status
                                  </DropdownMenuSubTrigger>
                                  <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                      <DropdownMenuRadioGroup
                                        value={access.status}
                                        onValueChange={(value) => {
                                          handleUpdateStatus(value, access.email);
                                        }}
                                      >
                                        <DropdownMenuRadioItem value="ACTIVE">
                                          Aktif
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="NONACTIVE">
                                          Nonaktif
                                        </DropdownMenuRadioItem>
                                      </DropdownMenuRadioGroup>
                                    </DropdownMenuSubContent>
                                  </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => {
                                    setSelectedAccess(access);
                                    setDeleteDialog(true);
                                  }}
                                >
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
      <DeleteAccessDialog
        email={selectedAccess?.email || ''}
        open={deleteDialog}
        onOpenChange={(open) => {
          if (!open) {
            setTimeout(() => {
              setSelectedAccess(null);
            }, 200);
          };
          setDeleteDialog(open);
        }}
        onDeleteSuccess={(email) => {
          setData((prev) => prev.filter((access) => access.email !== email));
        }}
      />
    </div>
  )
}

export default AccessLayout