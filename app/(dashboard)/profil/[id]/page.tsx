import React from 'react'
import ProfileLayout from '../_layouts/profile-layout'
import { getUserByAccessId } from '@/data/user';
import { redirect } from 'next/navigation';

interface IProps {
  params: Promise<{ id: string }>
}

async function ProfilePage({ params }: IProps) {
  const id = (await params).id;

  const access = await getUserByAccessId(id);
  if (!access) return redirect('/404');

  return (
    <ProfileLayout access={access} hiddenEdit />
  )
}

export default ProfilePage