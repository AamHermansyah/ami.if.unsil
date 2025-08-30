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
import { removeAccess } from '@/actions/access';
import { toast } from 'sonner';

interface IProps {
  email: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteSuccess: (email: string) => void;
}

export default function DeleteAccessDialog({ email, onOpenChange, open, onDeleteSuccess }: IProps) {
  const id = useId();
  const [inputValue, setInputValue] = useState('');
  const [loading, startAction] = useTransition();

  const handleDelete = () => {
    startAction(() => {
      removeAccess(email)
        .then((res) => {
          if ('success' in res && res.success) {
            toast.warning(res.message);
            onDeleteSuccess(email);
            setInputValue('');
            onOpenChange(false);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => toast.error((err as Error).message))
    })
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
              Akses email bisa dihapus hanya ketika <span className="text-primary dark:text-secondary">{email}</span> belum pernah login ke website.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Email</Label>
            <Input
              id={id}
              type="text"
              placeholder={`Tulis "${email}" untuk konfirmasi`}
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
              disabled={loading || (inputValue !== email)}
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
