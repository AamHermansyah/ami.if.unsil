'use client'

import React, { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Group, Table2 } from 'lucide-react';
import dynamic from 'next/dynamic'
import AddEditIndicatorDialog from '../_components/add-edit-indicator-dialog';

const GroupedIndicatorLayout = dynamic(() => import('../_components/grouped-indicator-layout'))
const TableIndicatorLayout = dynamic(() => import('../_components/table-indicator-layout'))

const AuditIndikatorPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grouped'>('grouped');

  return (
    <div className="h-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Daftar Indikator</CardTitle>
          <CardDescription>Kelola indikator dari setiap kriteria dengan mudah</CardDescription>
        </CardHeader>
      </Card>

      <div className="w-full flex items-center justify-between gap-2">
        <div className="w-max flex bg-card border rounded-lg p-1">
          <Button
            variant={viewMode === 'grouped' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grouped')}
            className="rounded-md"
          >
            <Group className="h-4 w-4" />
            Grouped
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="rounded-md"
          >
            <Table2 className="h-4 w-4" />
            Table
          </Button>
        </div>
        <AddEditIndicatorDialog />
      </div>

      {/* Content */}
      {viewMode === 'grouped' ? (
        <GroupedIndicatorLayout />
      ) : (
        <TableIndicatorLayout />
      )}
    </div>
  );
};

export default AuditIndikatorPage;