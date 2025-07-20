'use client';

import { useId, useState, useTransition } from 'react';
import { CircleAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BarsLoader } from '@/components/core/loader';
import { toast } from 'sonner';
import { Indicator } from '@/lib/generated/prisma';
import { deleteIndicator } from '@/actions/indicator';

interface IProps {
  selectedIndicator: (Indicator) | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteSuccess: (data: Indicator) => void;
}

export default function DeleteIndicatorDialog({ selectedIndicator, onOpenChange, open, onDeleteSuccess }: IProps) {
  const id = useId();
  const [inputValue, setInputValue] = useState('');
  const [loading, startAction] = useTransition();

  const handleDelete = () => {
    if (selectedIndicator) {
      startAction(() => {
        deleteIndicator(selectedIndicator.id)
          .then((res) => {
            if ('success' in res && res.success) {
              toast.warning(res.message);
              onDeleteSuccess(selectedIndicator);
              setInputValue('');
              onOpenChange(false);
            } else {
              toast.error(res.message);
            }
          })
          .catch((err) => toast.error((err as Error).message))
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) setInputValue('');
      if (!loading) onOpenChange(open);
    }}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Peringatan Konfirmasi
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Setelah di hapus data indikator tidak bisa di kembalikan
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Kode Indikator</Label>
            <Input
              id={id}
              type="text"
              placeholder={`Tulis "${selectedIndicator?.code}" untuk konfirmasi`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1" disabled={loading}>
                Batal
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              className="flex-1"
              disabled={loading || (inputValue !== selectedIndicator?.code)}
              onClick={handleDelete}
            >
              {loading && <BarsLoader className="h-4 w-auto" />}
              Hapus
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
