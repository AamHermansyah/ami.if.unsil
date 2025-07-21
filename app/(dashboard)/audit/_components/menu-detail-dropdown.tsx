'use client'

import React, { useState } from 'react'
import {
  MoreVertical,
  Pencil,
  MessageSquareReply,
  Trash
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Session } from 'next-auth';
import { Indicator, IndicatorAudit } from '@/lib/generated/prisma';
import DeleteAuditDialog from './delete-audit-dialog';
import { useRouter } from 'next/navigation';

interface IProps {
  disabled: boolean;
  user: Session['user'];
  period: string;
  hrefCode: string;
  data: IndicatorAudit & {
    Indicator: Indicator;
  }
}

function MenuDetailDropdown({ disabled, user, hrefCode, period, data }: IProps) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const navigate = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={disabled ? '' : `/audit/${hrefCode}/edit?period=${encodeURIComponent(period)}`}>
            <DropdownMenuItem disabled={disabled}>
              <Pencil className="w-4 h-4" />
              Audit
            </DropdownMenuItem>
          </Link>
          {user.role === 'AUDITOR' && (
            <>
              <Link href={disabled ? '' : `/audit/${hrefCode}/review?period=${encodeURIComponent(period)}`}>
                <DropdownMenuItem disabled={disabled}>
                  <MessageSquareReply className="w-4 h-4" />
                  Beri Review (Auditor)
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setDeleteDialog(true)}
                disabled={disabled}
              >
                <Trash className="w-4 h-4 text-destructive" />
                Hapus Indikator Audit
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAuditDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        selectedAudit={data}
        onDeleteSuccess={() => navigate.replace('/audit')}
        userId={user.id!}
      />
    </>
  )
}

export default MenuDetailDropdown