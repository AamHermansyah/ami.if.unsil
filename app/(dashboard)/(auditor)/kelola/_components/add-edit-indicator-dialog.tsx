import React, { useEffect, useState, useTransition } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Criteria, Indicator } from '@/lib/generated/prisma';
import { indicatorSchema, IndicatorValues } from '@/lib/schemas/indicator';
import RichTextEditor from '@/components/core/richtext-editor';
import { FormError } from '@/components/shared/form-error';
import { AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { BarsLoader } from '@/components/core/loader';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { createIndicator, updateIndicator } from '@/actions/indicator';
import { toast } from 'sonner';

interface IProps {
  userId?: string;
  criterias: Criteria[];
  onAddSuccess: (data: Indicator & { criteria: Criteria }) => void;
  onEditSuccess: (data: Indicator) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'edit' | 'add';
  selectedIndicator: Indicator | null;
}

function AddEditIndicatorDialog({
  criterias,
  onAddSuccess,
  onEditSuccess,
  onOpenChange,
  open,
  selectedIndicator,
  type,
  userId
}: IProps) {
  const [loading, startAction] = useTransition();
  const [error, setError] = useState('');

  const form = useForm<IndicatorValues>({
    resolver: zodResolver(indicatorSchema),
    defaultValues: {
      codeLetter: 'T',
      codeNumber: '',
      criteriaId: '',
      description: ''
    },
  });

  const onSubmit = (values: IndicatorValues) => {
    if (!userId) return;

    setError('');
    startAction(() => {
      if (type === 'add') {
        createIndicator({ ...values, createdBy: userId })
          .then((res) => {
            if (res.success) {
              onAddSuccess(res.data);
              form.reset();
              onOpenChange(false);
            } else {
              setError(res.message!);
            }
          })
          .catch((err) => toast.error((err as Error).message))
      } else if (selectedIndicator?.id) {
        updateIndicator({ ...values, id: selectedIndicator.id, updatedBy: userId })
          .then((res) => {
            if (res.success) {
              onEditSuccess(res.data);
              form.reset();
              onOpenChange(false);
            } else {
              setError(res.message!);
            }
          })
          .catch((err) => toast.error((err as Error).message))
      }
    })
  };

  useEffect(() => {
    if (type === 'edit' && selectedIndicator) {
      const [, letter, number] = selectedIndicator.code.split('/');
      form.setValue('codeLetter', letter as 'T' | 'U');
      form.setValue('codeNumber', number);
      form.setValue('description', selectedIndicator.title);
      form.setValue('criteriaId', selectedIndicator.criteriaId);
    }
  }, [type]);

  return (
    <AlertDialog open={open} onOpenChange={(open) => {
      if (!open) {
        setTimeout(() => {
          form.reset();
        }, 200);
      };
      onOpenChange(open);
    }}>
      <AlertDialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Tambah
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md flex flex-col max-h-[90vh]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            {type === 'add' ? 'Tambah Indikator Baru' : 'Edit Indikator'}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2 flex-1 overflow-y-auto">
            <FormField
              control={form.control}
              name="criteriaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kriteria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={type === 'edit'}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kriteria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {criterias.map((item) => (
                        <SelectItem key={item.code} value={item.id}>
                          {item.code} - {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Kode Indikator</Label>
              <div className="w-full flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="codeLetter"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Huruf" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="T">T</SelectItem>
                          <SelectItem value="U">U</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="codeNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Masukkan angka"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {form.formState.errors.codeLetter && (
                <p className="text-destructive text-sm">{form.formState.errors.codeLetter.message}</p>
              )}
              {form.formState.errors.codeNumber && (
                <p className="text-destructive text-sm">{form.formState.errors.codeNumber.message}</p>
              )}
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Indikator</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      placeholder="Masukkan kriteria audit"
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
            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
              <Button disabled={loading}>
                {loading && <BarsLoader className="h-4 w-auto" />}
                {type === 'add' ? 'Simpan' : 'Update'}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddEditIndicatorDialog