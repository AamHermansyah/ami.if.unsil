'use client'

import React, { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Link2,
  AlertCircle,
  Target,
  Star,
  Building,
  Database
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { IndicatorAudit } from '@/lib/generated/prisma';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { indicatorAuditSchema, IndicatorAuditValues } from '@/lib/schemas/indicator-audit';
import RichTextEditor from '@/components/core/richtext-editor';
import { updateIndicatorAudit } from '@/actions/indicator-audit';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { BarsLoader } from '@/components/core/loader';
import { FormError } from '@/components/shared/form-error';

interface IProps {
  data: IndicatorAudit;
  userId: string;
  code: string;
  period: string;
}

function FormEdit({ data, userId, code, period }: IProps) {
  const [loading, startAction] = useTransition();
  const [error, setError] = useState('');
  const navigate = useRouter();

  const form = useForm<IndicatorAuditValues>({
    resolver: zodResolver(indicatorAuditSchema),
    defaultValues: {
      achievement: data.achievement.toString() as IndicatorAuditValues['achievement'],
      documentName: data.documentName ?? "",
      documentLink: data.documentLink ?? "",
      rootCause: data.rootCause ?? "",
      plan: data.plan ?? "",
      pemonev: data.pemonev ?? "",
      dataSource: data.dataSource ?? "",
    },
  });

  const onSubmit = (values: IndicatorAuditValues) => {
    if (!userId) return;

    setError('');
    startAction(() => {
      updateIndicatorAudit({ ...values, id: data.id, updatedBy: userId })
        .then((res) => {
          if ('success' in res && res.success) {
            navigate.push(`/audit/${code}?period=${period}`);
            toast.success('Data audit berhasil diperbarui.')
          } else {
            setError(res.message!);
          }
        })
        .catch((err) => toast.error((err as Error).message))
    })
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Edit Hasil Keluaran</CardTitle>
        <CardDescription>Setiap input harus menyatakan data atau informasi yang jelas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="achievement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Capaian
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Capaian" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0 (Sangat Kurang)</SelectItem>
                      <SelectItem value="1">1 (Kurang)</SelectItem>
                      <SelectItem value="2">2 (Cukup)</SelectItem>
                      <SelectItem value="3">3 (Baik)</SelectItem>
                      <SelectItem value="4">4 (Sangat Baik)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nama Dokumen */}
            <FormField
              control={form.control}
              name="documentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Nama Dokumen Pendukung
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan nama dokumen pendukung" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Link Bukti */}
            <FormField
              control={form.control}
              name="documentLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Link2 className="w-4 h-4" />
                    Link Bukti Fisik
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://drive.google.com/..." />
                  </FormControl>
                  <FormDescription>
                    Masukkan URL lengkap yang dapat diakses oleh auditor
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pemonev */}
            <FormField
              control={form.control}
              name="pemonev"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Pemonev
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih instansi pemonev" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="UPM">UPM</SelectItem>
                      <SelectItem value="GKM">GKM</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sumber Data */}
            <FormField
              control={form.control}
              name="dataSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Sumber Data
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih sumber data" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Program Studi">Program Studi</SelectItem>
                      <SelectItem value="Program Studi / Kemahasiswaan">Program Studi / Kemahasiswaan</SelectItem>
                      <SelectItem value="Fakultas">Fakultas</SelectItem>
                      <SelectItem value="Fakultas / Wakil Dekan Bidang Keuangan">Fakultas / Wakil Dekan Bidang Keuangan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Akar Penyebab */}
            <FormField
              control={form.control}
              name="rootCause"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Akar Penyebab
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor
                      placeholder="Jelaskan akar penyebab masalah atau kondisi saat ini..."
                      id={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Identifikasi faktor-faktor yang menyebabkan kondisi saat ini
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rencana Tindak Lanjut */}
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Rencana Tindak Lanjut
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor
                      placeholder="Jelaskan langkah-langkah yang akan diambil untuk perbaikan..."
                      id={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Rencana konkret dengan timeline dan penanggung jawab yang jelas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error} />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <BarsLoader className="h-4 w-auto" />}
              Simpan
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default FormEdit