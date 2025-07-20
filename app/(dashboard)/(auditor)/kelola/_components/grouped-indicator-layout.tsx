import React from 'react'
import { Criteria, Indicator } from '@/lib/generated/prisma';
import CriteriaCard from './criteria-card';

interface IProps {
  data: (Criteria & { totalIndicator: number })[];
  onClickEdit: (data: Indicator) => void;
  onClickDelete: (data: Indicator) => void;
  lastEditedIndicator: Indicator | null;
  lastDeletedIndicator: Indicator | null;
}

function GroupedIndicatorLayout({
  data,
  onClickEdit,
  onClickDelete,
  lastEditedIndicator,
  lastDeletedIndicator
}: IProps) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <CriteriaCard
          lastEditedIndicator={lastEditedIndicator}
          lastDeletedIndicator={lastDeletedIndicator}
          key={item.code}
          item={item}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      ))}
    </div>
  )
}

export default GroupedIndicatorLayout