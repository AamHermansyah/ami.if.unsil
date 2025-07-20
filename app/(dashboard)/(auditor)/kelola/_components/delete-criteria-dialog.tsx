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
import { Criteria } from '@/lib/generated/prisma';
import { deleteCriteria } from '@/actions/criteria';

interface IProps {
  selectedCriteria: Criteria | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteSuccess: (id: string) => void;
}

export default function DeleteCriteriaDialog({ selectedCriteria, onOpenChange, open, onDeleteSuccess }: IProps) {
  const id = useId();
  const [inputValue, setInputValue] = useState('');
  const [loading, startAction] = useTransition();

  const handleDelete = () => {
    if (selectedCriteria) {
      startAction(() => {
        deleteCriteria(selectedCriteria.id)
          .then((res) => {
            if (res.success) {
              toast.warning(res.message);
              onDeleteSuccess(selectedCriteria.id);
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
              Setelah di hapus data kriteria tidak bisa di kembalikan
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Kode Kriteria</Label>
            <Input
              id={id}
              type="text"
              placeholder={`Tulis "${selectedCriteria?.code}" untuk konfirmasi`}
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
              disabled={loading || (inputValue !== selectedCriteria?.code)}
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
