import React from 'react'
import AccessLayout from './_layouts/access-layout'
import { auth } from '@/lib/auth';

async function AccessPage() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("User tidak ditemukan di session.");
  }

  return (
    <AccessLayout user={session.user} />
  )
}

export default AccessPage