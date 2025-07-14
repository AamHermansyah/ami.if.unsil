import React from 'react'
import OverviewLayout from './_layouts/overview-layout'
import { auth } from '@/lib/auth'

async function OverviewPage() {
  const session = await auth();

  return (
    <OverviewLayout user={session?.user!} />
  )
}

export default OverviewPage