import React from 'react'
import CriteriaLayout from './_layouts/criteria-layout'
import { auth } from '@/lib/auth'

async function CriteriaManagementPage() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("User tidak ditemukan di session.");
  }

  return (
    <CriteriaLayout user={session.user} />
  )
}

export default CriteriaManagementPage