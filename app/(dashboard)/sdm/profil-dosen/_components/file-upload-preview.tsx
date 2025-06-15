import { Button } from '@/components/ui/button';
import { formatBytes, getFileIcon } from '@/hooks/use-file-upload';
import { XIcon } from 'lucide-react';
import React from 'react'

interface IProps {
  file: File;
  label?: string;
}

function FileUploadPreview({ file, label }: IProps) {
  return (
    <div className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
          {getFileIcon({ file })}
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          {label && (
            <h4 className="text-xs text-muted-foreground">
              {label}
            </h4>
          )}
          <p className="truncate text-[13px] font-medium">
            {file instanceof File ? file.name : '-'}
          </p>
          <p className="text-muted-foreground text-xs">
            {formatBytes(file instanceof File ? file.size : 0)}
          </p>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
        // onClick={() => removeFile(file.id)}
        aria-label="Remove file"
      >
        <XIcon className="size-4" aria-hidden="true" />
      </Button>
    </div>
  )
}

export default FileUploadPreview