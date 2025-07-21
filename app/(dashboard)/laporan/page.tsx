import React from 'react'
import Header from '../_layouts/header'
import { auth } from '@/lib/auth';
import { getAllPeriods, getPeriodByName } from '@/data/period';
import NoPeriodAvailable from '../_layouts/no-period-available';
import { getAchievementPerCriteriaAudit } from '@/data/indicator-audit';
import ReportLayout from './_layouts/report-layout';

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

  const reports = await getAchievementPerCriteriaAudit(lastPeriod.id);
  if (reports?.error) throw Error(reports.message);

  return (
    <div className="space-y-4">
      <Header periods={res.data!.items} periodId={lastPeriod.id} />
      <ReportLayout data={reports.data!} />
    </div>
  )
}

export default LaporanPage