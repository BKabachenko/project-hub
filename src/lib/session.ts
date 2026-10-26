import { cache } from 'react';

import { redirect } from 'next/navigation';

import { auth, signIn } from '@/auth';

export const getAuthSession = cache(() => auth());

export async function requireUser() {
  const session = await getAuthSession();
  if (!session) {
    await signIn();
  }

  const user = session?.user;
  if (!user?.id) {
    redirect('/');
  }

  return { ...user, userId: user.id };
}

export async function requireUserId(): Promise<string> {
  const { userId } = await requireUser();
  return userId;
}