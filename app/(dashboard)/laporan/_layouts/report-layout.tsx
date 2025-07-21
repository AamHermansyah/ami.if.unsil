'use client'

import React, { useState } from 'react'
import { ReportRadarChart } from '../_components/report-radar-chart';
import { Button } from '@/components/ui/button';
import { BarChart, Radar } from 'lucide-react';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((report) => (
          <ReportRadarChart
            key={report.criteriaAuditId}
            report={report}
            type={viewMode}
          />
        ))}
      </div>
    </>
  )
}

export default ReportLayout