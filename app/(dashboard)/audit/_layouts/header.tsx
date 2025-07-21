'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from '@/components/ui/card';
import { Period } from '@/lib/generated/prisma';

interface IProps {
  periods: Period[];
  periodId: string;
}

function Header({ periods, periodId }: IProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Audit</h1>
            <p className="text-muted-foreground">
              Kelola data audit mutu internal berdasarkan indikator yang telah ditentukan oleh auditor
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select
              defaultValue={periods.find((i) => i.id === periodId)?.name || 'null'}
              onValueChange={(period) => {
                window.location.replace(`/audit?period=${encodeURIComponent(period)}`);
              }}
            >
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.length > 0 ? periods.map((period, index) => (
                  <SelectItem
                    key={`period-${index}`}
                    value={period.name}
                  >
                    {period.name}
                  </SelectItem>
                )) : (
                  <SelectItem value="null" disabled>Periode masih kosong</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header