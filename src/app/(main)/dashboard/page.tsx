import { Suspense } from 'react';

import {
  MemberProjectsBlock,
  MemberProjectsBlockSkeleton,
  OwnerProjectBlock,
  OwnerProjectBlockSkeleton,
  StatisticCardsBlock,
  StatisticCardsBlockSkeleton,
  UserApplicationsBlock,
  UserApplicationsBlockSkeleton,
} from '@/features/dashboard';
import { requireUser } from '@/lib/session';

const DashboardPage = async () => {
  const { name } = await requireUser();

  const userName = name?.split(' ')[0] ?? 'User';

  return (
    <div className={'flex flex-col gap-8 md:gap-12'}>
      <div className='flex flex-col gap-2'>
        <p className={'text-muted-foreground font-medium'}>DASHBOARD OVERVIEW</p>
        <h2 className={'text-4xl font-extrabold'}>Welcome back, {userName}!</h2>
      </div>
      <Suspense fallback={<StatisticCardsBlockSkeleton />}>
        <StatisticCardsBlock />
      </Suspense>

      <Suspense fallback={<OwnerProjectBlockSkeleton />}>
        <OwnerProjectBlock />
      </Suspense>

      <Suspense fallback={<MemberProjectsBlockSkeleton />}>
        <MemberProjectsBlock />
      </Suspense>

      <Suspense fallback={<UserApplicationsBlockSkeleton />}>
        <UserApplicationsBlock />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
