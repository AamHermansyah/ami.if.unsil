import React from 'react'
import { Criteria } from '@/lib/generated/prisma';
import CriteriaCard from './criteria-card';

interface IProps {
  data: (Criteria & { totalIndicator: number })[];
}

function GroupedIndicatorLayout({ data }: IProps) {

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <CriteriaCard key={item.code} item={item} />
      ))}
    </div>
  )
}

export default GroupedIndicatorLayout