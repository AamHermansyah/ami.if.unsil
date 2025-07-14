import { auth } from '@/lib/auth';
import { redirect, RedirectType } from 'next/navigation';
import React from 'react'

async function AuditorLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session?.user.role === 'AUDITEE') redirect('/404', 'replace' as RedirectType);

  return children;
}

export default AuditorLayout