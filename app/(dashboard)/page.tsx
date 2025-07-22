import React from 'react'
import OverviewLayout from './_layouts/overview-layout'
import { auth } from '@/lib/auth'
import { getAllPeriods, getPeriodByName } from '@/data/period';
import Header from './_layouts/header';
import NoPeriodAvailable from './_layouts/no-period-available';
import { getDashboardSummary } from '@/data/dashboard';

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function OverviewPage({ searchParams }: IProps) {
  const session = await auth();
  if (!session?.user) throw new Error("User tidak ditemukan di session.");

  const period = (await searchParams).period as string;
  const resLastPeriod = await getPeriodByName(period || '');
  if (resLastPeriod?.error) throw Error(resLastPeriod.message);

  const res = await getAllPeriods();
  if (res?.error) throw Error(res.message);

  const lastPeriod = resLastPeriod.data ? resLastPeriod.data : res.data!.items.length > 0 ? res.data!.items[0] : null;

  if (!lastPeriod) {
    return (
      <div className="min-h-screen space-y-4">
        <Header type="dashboard" periods={res.data!.items} periodId="" />
        <NoPeriodAvailable user={session.user} />
      </div>
    )
  }

  const resSummary = await getDashboardSummary(lastPeriod.id);

  if (resSummary?.error) throw Error(resSummary.message);

  return (
    <OverviewLayout
      user={session.user}
      periods={res.data!.items}
      data={resSummary.data!}
      periodId={lastPeriod.id}
    />
  )
}

export default OverviewPage