'use client'

import React, { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Group, Table2 } from 'lucide-react';
import dynamic from 'next/dynamic'
import AddEditIndicatorDialog from '../../_components/add-edit-indicator-dialog';
import { Criteria, Indicator } from '@/lib/generated/prisma';
import { Session } from 'next-auth';

const GroupedIndicatorLayout = dynamic(() => import('../../_components/grouped-indicator-layout'))
const TableIndicatorLayout = dynamic(() => import('../../_components/table-indicator-layout'))

interface IProps {
  data: (Criteria & { totalIndicator: number })[];
  user: Session['user'];
}

function IndicatorLayout({ data, user }: IProps) {
  const [criterias, setCriterias] = useState(data);
  const [viewMode, setViewMode] = useState<'table' | 'grouped'>('grouped');
  const [addEditDialog, setAddEditDialog] = useState(false);
  const [typeAction, setTypeAction] = useState<'add' | 'edit'>('add');
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);

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
            Grup
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="rounded-md"
          >
            <Table2 className="h-4 w-4" />
            Tabel
          </Button>
        </div>
        <AddEditIndicatorDialog
          userId={user.id}
          criterias={criterias}
          open={addEditDialog}
          onOpenChange={(open) => {
            if (!open) {
              setTimeout(() => {
                setSelectedIndicator(null);
                setTypeAction('add');
              }, 200);
            };
            setAddEditDialog(open);
          }}
          onAddSuccess={(item) => {
            setCriterias((prev) => {
              return prev.map((criteria) => {
                return criteria.id === item.criteriaId ? { ...criteria, totalIndicator: criteria.totalIndicator + 1 } : criteria;
              });
            });
          }}
          onEditSuccess={() => null}
          type={typeAction}
          selectedIndicator={selectedIndicator}
        />
      </div>

      {/* Content */}
      {viewMode === 'grouped' ? (
        <GroupedIndicatorLayout
          data={criterias}
          onClickEdit={(data) => {
            setTypeAction('edit');
            setSelectedIndicator(data);
            setAddEditDialog(true);
          }}
        />
      ) : (
        <TableIndicatorLayout
          criterias={criterias}
          onClickEdit={(data) => {
            setTypeAction('edit');
            setSelectedIndicator(data);
            setAddEditDialog(true);
          }}
        />
      )}
    </div>
  );
};

export default IndicatorLayout;