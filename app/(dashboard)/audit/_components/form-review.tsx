'use client'

import React, { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button';
import {
  NotebookPen,
  Lightbulb,
  Search,
  Info,
  Notebook
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
import {
  Alert,
  AlertTitle,
  AlertDescription
} from '@/components/ui/alert';
import { FindingStatus, IndicatorAudit } from '@/lib/generated/prisma';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { indicatorAuditReviewSchema, IndicatorAuditReviewValues } from '@/lib/schemas/indicator-audit';
import RichTextEditor from '@/components/core/richtext-editor';
import { updateIndicatorAuditReview } from '@/actions/indicator-audit';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { BarsLoader } from '@/components/core/loader';
import { FormError } from '@/components/shared/form-error';

interface IProps {
  data: IndicatorAudit;
  userId: string;
  code: string;
  period: string;
  disabled: boolean;
}

const findingOpts = Object.values(FindingStatus);

function FormReview({ data, userId, code, period, disabled }: IProps) {
  const [loading, startAction] = useTransition();
  const [error, setError] = useState('');
  const navigate = useRouter();

  const form = useForm<IndicatorAuditReviewValues>({
    resolver: zodResolver(indicatorAuditReviewSchema),
    defaultValues: {
      findingStatus: data.findingStatus,
      note: data.note ?? "",
      recomendation: data.recomendation ?? "",
      additionalInformation: data.additionalInformation ?? "",
    },
  });

  const onSubmit = (values: IndicatorAuditReviewValues) => {
    if (!userId) return;

    setError('');
    startAction(() => {
      updateIndicatorAuditReview({ ...values, id: data.id, updatedBy: userId })
        .then((res) => {
          if ('success' in res && res.success) {
            navigate.push(`/audit/${code}?period=${period}`);
            toast.success('Review berhasil di perbarui.')
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
        <CardTitle>Edit Review</CardTitle>
        <CardDescription>Setiap input harus menyatakan data atau informasi yang jelas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {disabled && (
              <Alert variant="info">
                <Info className="h-4 w-4" />
                <AlertTitle>Indikator belum diinput oleh auditee</AlertTitle>
                <AlertDescription>
                  Review indikator hanya dapat dilakukan setelah auditee melengkapi data.
                </AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="findingStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Temuan
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full capitalize">
                        <SelectValue placeholder="Temuan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {findingOpts.map((value) => (
                        <SelectItem key={value} value={value} className="capitalize">
                          {value.toLowerCase().replaceAll('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Catatan Auditor */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <NotebookPen className="w-4 h-4" />
                    Catatan Auditor
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor
                      placeholder="Tuliskan catatan audit yang relevan dengan kondisi di lapangan..."
                      id={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Berisi observasi, catatan penting, atau klarifikasi tambahan dari auditor terkait indikator ini.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rekomendasi Auditor */}
            <FormField
              control={form.control}
              name="recomendation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Rekomendasi Auditor
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor
                      placeholder="Berikan saran atau solusi yang dapat diterapkan oleh unit terkait..."
                      id={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Rekomendasi yang membantu memperbaiki kondisi saat ini, dapat dilaksanakan, dan terukur.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Keterangan Auditor */}
            <FormField
              control={form.control}
              name="additionalInformation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Notebook className="w-4 h-4" />
                    Keterangan Auditor
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor
                      placeholder="Berikan tambahan keterangan..."
                      id={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error} />

            <Button type="submit" className="w-full" disabled={loading || disabled}>
              {loading && <BarsLoader className="h-4 w-auto" />}
              Simpan
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default FormReview