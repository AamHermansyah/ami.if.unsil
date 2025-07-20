import React from 'react'
import EditProfileLayout from './_layouts/edit-profile-layout'
import { redirect } from 'next/navigation';
import { getUserByEmail } from '@/data/user';
import { auth } from '@/lib/auth';

async function ProfilEditPage() {
  const session = await auth();
  if (!session?.user) return null;

  const access = await getUserByEmail(session.user.email!);
  if (!access) return redirect('/404');

  return (
    <EditProfileLayout user={session.user} access={access} />
  )
}

export default ProfilEditPage