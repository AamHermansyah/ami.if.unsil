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
import { toast } from 'sonner';
import { Access } from '@/lib/generated/prisma';
import { FormError } from '@/components/shared/form-error';
import { BarsLoader } from '@/components/core/loader';
import { accessSchema, AccessValues } from '@/lib/schemas/access';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createAccess, updateAccess } from '@/actions/access';

type AccessType = Access & {
  user: {
    id: string;
    name: string;
  } | null;
}

interface IProps {
  onAddSuccess: (data: Access) => void;
  onEditSuccess: (data: AccessType) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'edit' | 'add';
  selectedAccess: AccessType | null;
}

function AddEditAccessDialog({
  onAddSuccess,
  onOpenChange,
  open,
  selectedAccess,
  type,
  onEditSuccess
}: IProps) {
  const [loading, startAction] = useTransition();
  const [error, setError] = useState('');

  const form = useForm<AccessValues>({
    resolver: zodResolver(accessSchema),
    defaultValues: {
      email: '',
      role: 'AUDITEE'
    },
  });

  const onSubmit = (values: AccessValues) => {
    setError('');
    startAction(() => {
      if (type === 'add') {
        createAccess(values)
          .then((res) => {
            if ('success' in res && res.success) {
              onAddSuccess(res.data);
              form.reset();
              onOpenChange(false);
            } else {
              setError(res.message!);
            }
          })
          .catch((err) => toast.error((err as Error).message))
      } else if (selectedAccess?.id) {
        updateAccess(values)
          .then((res) => {
            if ('success' in res && res.success) {
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
      form.setValue('email', selectedAccess?.email || '');
      form.setValue('role', selectedAccess?.role || 'AUDITEE');
    }
  }, [type]);

  return (
    <AlertDialog open={open} onOpenChange={(open) => {
      if (!open) {
        setTimeout(() => {
          setError('');
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
            {type === 'add' ? 'Tambah Akses Baru' : 'Edit Akses'}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan email"
                      disabled={type === 'edit'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih akses role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AUDITEE">Auditee</SelectItem>
                      <SelectItem value="AUDITOR">Auditor</SelectItem>
                    </SelectContent>
                  </Select>
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

export default AddEditAccessDialog
