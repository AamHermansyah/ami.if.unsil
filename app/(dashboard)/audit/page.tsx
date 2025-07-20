import React from 'react'
import Header from './_layouts/header'
import AuditLayout from './_layouts/audit-layout'
import { auth } from '@/lib/auth';
import { getAllPeriods } from '@/data/period';
import { getAllCriteriaWithIndicatorCount } from '@/data/criteria';

async function AuditPage() {
  const session = await auth();
  if (!session?.user) throw new Error("User tidak ditemukan di session.");

  const res = await getAllPeriods();
  if (res?.error) throw Error(res.message);

  const criterias = await getAllCriteriaWithIndicatorCount();
  if (criterias.error) throw Error(criterias.message);

  return (
    <div className="space-y-4">
      <Header periods={res.data!.items} />
      <AuditLayout
        user={session.user}
        criterias={criterias.data!}
        periods={res.data!.items}
      />
    </div>
  )
}

export default AuditPage