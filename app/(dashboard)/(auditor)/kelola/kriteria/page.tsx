import React from 'react'
import CriteriaLayout from './_layouts/criteria-layout'
import { auth } from '@/lib/auth'

async function CriteriaManagementPage() {
  const session = await auth();

  return (
    <CriteriaLayout user={session?.user!} />
  )
}

export default CriteriaManagementPage