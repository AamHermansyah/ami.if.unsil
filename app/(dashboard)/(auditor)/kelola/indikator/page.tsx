import React from 'react'
import IndicatorLayout from './_layouts/indicator-layout'
import { getAllCriteriaWithIndicatorCount } from '@/data/criteria';
import { auth } from '@/lib/auth';

async function IndicatorManagementPage() {
  const criterias = await getAllCriteriaWithIndicatorCount();
  if (criterias.error) throw Error(criterias.message);

  const session = await auth();

  if (!session?.user) {
    throw new Error("User tidak ditemukan di session.");
  }

  return (
    <IndicatorLayout
      data={criterias.data!}
      user={session.user}
    />
  )
}

export default IndicatorManagementPage