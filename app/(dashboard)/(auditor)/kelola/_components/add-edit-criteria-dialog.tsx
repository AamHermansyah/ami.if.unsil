import React, { useEffect, useState, useTransition } from 'react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { criteriaSchema, CriteriaValues } from '@/lib/schemas/criteria';
import { createCriteria, updateCriteria } from '@/actions/criteria';
import { toast } from 'sonner';
import { Criteria } from '@/lib/generated/prisma';
import { FormError } from '@/components/shared/form-error';
import { BarsLoader } from '@/components/core/loader';

interface IProps {
  userId: string;
  onAddSuccess: (data: Criteria) => void;
  onEditSuccess: (data: Criteria) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'edit' | 'add';
  selectedCriteria: Criteria | null;
}

function AddEditCriteriaDialog({
  userId,
  onAddSuccess,
  onOpenChange,
  open,
  selectedCriteria,
  type,
  onEditSuccess
}: IProps) {
  const [loading, startAction] = useTransition();
  const [error, setError] = useState('');

  const form = useForm<CriteriaValues>({
    resolver: zodResolver(criteriaSchema),
    defaultValues: {
      title: '',
      code: '',
    },
  });

  const onSubmit = (values: CriteriaValues) => {
    setError('');
    startAction(() => {
      if (type === 'add') {
        createCriteria({ ...values, createdBy: userId })
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
      } else if (selectedCriteria?.id) {
        updateCriteria({ ...values, updatedBy: userId, id: selectedCriteria.id })
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
  }

  useEffect(() => {
    if (type === 'edit') {
      form.setValue('code', selectedCriteria?.code || '');
      form.setValue('title', selectedCriteria?.title || '');
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
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === 'add' ? 'Tambah Kriteria Baru' : 'Edit Kriteria'}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Kriteria</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan kriteria audit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="code">Kode</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan kode (contoh: K001)" {...field} />
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

export default AddEditCriteriaDialog
