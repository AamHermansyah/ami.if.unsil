import React from 'react'
import OverviewLayout from './_layouts/overview-layout'
import { auth } from '@/lib/auth'

async function OverviewPage() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("User tidak ditemukan di session.");
  }

  return (
    <OverviewLayout user={session.user} />
  )
}

export default OverviewPage