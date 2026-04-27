import type { ProjectWithDetails } from '../types';

import { auth } from '@/auth';

import StatisticCard from './StatisticCard';

interface StatisticCardsBlockProps {
  projects: ProjectWithDetails[];
}

const StatisticCardsBlock = async ({ projects }: StatisticCardsBlockProps) => {
  const session = await auth();
  if (!session) return null;
  const userId = session.user?.id;

  const totalOpenProjects = projects.length;

  const userProjects = projects.filter((project) => project.authorId === userId);

  const totalPending = userProjects
    .flatMap((project) => project.projectMembers)
    .filter((project) => project.status === 'PENDING').length;

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'>
      <StatisticCard value={totalOpenProjects} variant={'TOTAl'}>
        TOTAL PROJECTS
      </StatisticCard>
      <StatisticCard value={userProjects.length} variant={'ACTIVE'}>
        YOUR ACTIVE PROJECTS
      </StatisticCard>
      <StatisticCard value={totalPending} variant={'PENDING'}>
        PENDING APPLICATIONS
      </StatisticCard>
    </div>
  );
};

export default StatisticCardsBlock;
