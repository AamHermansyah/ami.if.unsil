import React from 'react'
import ProfileLayout from './_layouts/profile-layout'
import { auth } from '@/lib/auth';
import { getUserByEmail } from '@/data/user';
import { redirect } from 'next/navigation';

async function ProfilePage() {
  const session = await auth();
  if (!session?.user) return null;

  const access = await getUserByEmail(session.user.email!);
  if (!access) return redirect('/404');

  return (
    <ProfileLayout access={access} />
  )
}

export default ProfilePage