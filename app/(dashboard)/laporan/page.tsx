import React from 'react'
import Header from '../_layouts/header'
import { ChartExample } from './_components/chart-example'
import { auth } from '@/lib/auth';
import { getAllPeriods, getPeriodByName } from '@/data/period';
import NoPeriodAvailable from '../_layouts/no-period-available';

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function LaporanPage({ searchParams }: IProps) {
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
        <Header periods={res.data!.items} periodId="" />
        <NoPeriodAvailable user={session.user} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Header periods={res.data!.items} periodId={lastPeriod.id} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartExample />
        <ChartExample />
        <ChartExample />
        <ChartExample />
      </div>
    </div>
  )
}

export default LaporanPage