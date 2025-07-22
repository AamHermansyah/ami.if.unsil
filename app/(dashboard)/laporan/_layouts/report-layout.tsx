'use client'

import React, { useState } from 'react'
import { ReportChart } from '../_components/report-chart';
import { Button } from '@/components/ui/button';
import { BarChart, FileWarning, Radar } from 'lucide-react';
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
  default: 2,
  768: 1,
}

interface IProps {
  data: {
    criteriaAuditId: string;
    criteriaCode: string;
    criteriaTitle: string;
    indicators: {
      indicatorAuditId: string;
      indicatorCode: string;
      indicatorTitle: string;
      achievement: number;
    }[];
  }[]
}

function ReportLayout({ data }: IProps) {
  const [viewMode, setViewMode] = useState<'radar' | 'bar'>('radar');

  return (
    <>
      <div className="w-max flex bg-card border rounded-lg p-1">
        <Button
          variant={viewMode === 'radar' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('radar')}
          className="rounded-md"
        >
          <Radar className="h-4 w-4" />
          Radar
        </Button>
        <Button
          variant={viewMode === 'bar' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('bar')}
          className="rounded-md"
        >
          <BarChart className="h-4 w-4" />
          Batang
        </Button>
      </div>
      {data.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-4"
        >
          {data.map((report) => (
            <ReportChart key={report.criteriaAuditId} report={report} type={viewMode} />
          ))}
        </Masonry>
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
          <FileWarning className="w-10 h-10 mb-4 text-muted-foreground" />
          <p className="text-sm">Tidak ada data laporan yang tersedia.</p>
        </div>
      )}
    </>
  )
}

export default ReportLayout