'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { InputPeriodValues, OutputPeriodValues, periodSchema } from '@/lib/schemas/period'
import { zodResolver } from '@hookform/resolvers/zod'
import { Period } from '@/lib/generated/prisma'
import { FormError } from "@/components/shared/form-error";
import { BarsLoader } from "@/components/core/loader";
import z from "zod"
import DatePicker from "@/components/core/date-picker"
import { createPeriod, updatePeriod } from "@/actions/period"
import { toast } from "sonner"

interface IProps {
  onAddSuccess: (data: Period) => void;
  onEditSuccess: (data: Period) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'edit' | 'add';
  selectedPeriod: Period | null;
}

function AddEditPeriodDialog({
  onAddSuccess,
  onOpenChange,
  open,
  selectedPeriod,
  type,
  onEditSuccess
}: IProps) {
  const [loading, startAction] = useTransition();
  const [error, setError] = useState('');

  const form = useForm<InputPeriodValues>({
    resolver: zodResolver(periodSchema),
    defaultValues: {
      name: '',
      endDate: '',
      startDate: ''
    },
  });

  const startDate = form.watch('startDate');

  const onSubmit = (values: OutputPeriodValues) => {
    setError('');
    startAction(() => {
      if (type === 'add') {
        createPeriod(values)
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
      } else if (selectedPeriod?.id) {
        updatePeriod({ ...values, id: selectedPeriod.id })
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
      form.setValue('name', selectedPeriod?.name || '');
      form.setValue('startDate', selectedPeriod?.startDate || '');
      form.setValue('endDate', selectedPeriod?.endDate || '');
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === 'add' ? 'Mulai Periode Baru' : 'Edit Periode'}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data as z.output<typeof periodSchema>))}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama periode"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="relative">
              <Separator className="my-1" />
              <span className="inline-block px-2 text-sm font-medium text-muted-foreground bg-background absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
                Waktu Periode
              </span>
            </div>

            <div className="grid items-start grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="grid gap-1">
                    <FormLabel>Mulai</FormLabel>
                    <DatePicker
                      id={field.name}
                      onChange={field.onChange}
                      value={field.value as Date}
                      disabled={
                        selectedPeriod?.startDate &&
                        new Date(selectedPeriod.startDate) <= new Date()
                      }
                      disabledDate={(date) => new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="grid gap-1">
                    <FormLabel>Selesai</FormLabel>
                    <DatePicker
                      id={field.name}
                      onChange={field.onChange}
                      value={field.value as Date}
                      disabled={selectedPeriod?.status === 'NONACTIVE' || !startDate}
                      disabledDate={(date) => {
                        if (startDate) return new Date(date).getTime() <= new Date(startDate as string).getTime();
                        return false;
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
              <Button disabled={loading}>
                {loading && <BarsLoader className="h-4 w-auto" />}
                {type === 'add' ? 'Mulai' : 'Update'}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddEditPeriodDialog;