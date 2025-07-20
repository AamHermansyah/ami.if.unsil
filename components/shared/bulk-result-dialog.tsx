import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BulkResult } from "@/lib/types";
import { cn } from "@/lib/utils";

type BulkResultDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bulkResult?: BulkResult | null;
  description: string;
};

export function BulkResultDialog({
  open,
  onOpenChange,
  bulkResult,
  description
}: BulkResultDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Hasil Proses Bulk</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        {bulkResult && (
          <div className="space-y-2 text-sm">
            <p className="text-green-500">✔️ Sukses: {bulkResult.success}</p>
            <p className="text-yellow-500">⚠️ Sudah Ada: {bulkResult.skipped}</p>
            <p className="text-red-500">❌ Gagal: {bulkResult.failed}</p>

            <div className="mt-4 max-h-48 overflow-y-auto border p-2 rounded">
              {bulkResult.details.map((r, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex justify-between items-center text-xs py-1',
                    i > 0 && 'border-t'
                  )}
                >
                  <span className="font-mono">{r.id}</span>
                  <span
                    className={cn(
                      'capitalize',
                      r.status === "success"
                        ? "text-green-500"
                        : r.status === "skipped"
                          ? "text-yellow-500"
                          : "text-red-500"
                    )}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="pt-4">
          <Button onClick={() => onOpenChange(false)}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
