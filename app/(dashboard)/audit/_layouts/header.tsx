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

function Header() {
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
            <Select defaultValue="2020/2021">
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2020/2021">Tahun 2020/2021</SelectItem>
                <SelectItem value="2021/2022">Tahun 2021/2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header