import React from 'react'
import IndicatorLayout from './_layouts/indicator-layout'
import { getAllCriteriaWithIndicatorCount } from '@/data/criteria';
import { auth } from '@/lib/auth';

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function IndicatorManagementPage({ searchParams }: IProps) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("User tidak ditemukan di session.");
  }

  const view = (await searchParams).view;
  const viewMode = view === 'table' ? 'table' : 'grouped';

  const criterias = await getAllCriteriaWithIndicatorCount();
  if (criterias.error) throw Error(criterias.message);

  return (
    <IndicatorLayout
      data={criterias.data!}
      user={session.user}
      viewMode={viewMode}
    />
  )
}

export default IndicatorManagementPage