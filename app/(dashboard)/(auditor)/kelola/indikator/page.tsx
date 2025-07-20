import React from 'react'
import IndicatorLayout from './_layouts/indicator-layout'
import { getAllCriteriaWithIndicatorCount } from '@/data/criteria';
import { auth } from '@/lib/auth';

async function IndicatorManagementPage() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("User tidak ditemukan di session.");
  }

  const criterias = await getAllCriteriaWithIndicatorCount();
  if (criterias.error) throw Error(criterias.message);

  return (
    <IndicatorLayout
      data={criterias.data!}
      user={session.user}
    />
  )
}

export default IndicatorManagementPage