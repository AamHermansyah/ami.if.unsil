import React from 'react'
import { Criteria, Indicator } from '@/lib/generated/prisma';
import CriteriaCard from './criteria-card';

interface IProps {
  data: (Criteria & { totalIndicator: number })[];
  onClickEdit: (data: Indicator) => void;
}

function GroupedIndicatorLayout({ data, onClickEdit }: IProps) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <CriteriaCard
          key={item.code}
          item={item}
          onClickEdit={onClickEdit}
        />
      ))}
    </div>
  )
}

export default GroupedIndicatorLayout