import React from 'react'
import PeriodLayout from './_layouts/period-layout'
import db from '@/lib/prisma'

async function PeriodManagementPage() {
  const lastPeriod = await db.period.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <PeriodLayout lastData={lastPeriod} />
  )
}

export default PeriodManagementPage