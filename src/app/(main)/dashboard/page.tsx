import { Suspense } from 'react';

import {
  MemberProjectsBlock,
  OwnerProjectBlock,
  StatisticCardsBlock,
  UserApplicationsBlock,
  UserApplicationsBlockSkeleton,
} from '@/features/dashboard';
import prisma from '@/lib/prisma';
import { requireUser } from '@/lib/session';

const DashboardPage = async () => {
  const {userId, name} = await requireUser()

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { authorId: userId },
        {
          projectMembers: {
            some: {
              userId: userId,
              status: {
                in: ['ACTIVE'],
              },
            },
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      authorId: true,
      requirements: {
        where: {
          project: {
            authorId: userId,
          },
        },
        select: {
          id: true,
          projectId: true,
          requiredCount: true,
          role: true,
          applications: {
            where: {
              status: 'PENDING',
            },
            include: {
              user: {
                select: { id: true, name: true, updatedAt: true, image: true },
              },
              requirement: {
                select: { role: true, projectId: true, id: true },
              },
            },
          },
        },
      },
      projectMembers: {
        where: {
          status: 'ACTIVE',
        },
        select: {
          userId: true,
          projectId: true,
          status: true,
          requirement: {
            select: { role: true },
          },
        },
      },
    },
  });

  const userOwnedProjects = projects.filter((project) => project.authorId === userId);
  const userParticipantProjects = projects.filter((project) =>
    project.projectMembers.some((user) => user.userId === userId)
  );

  const userName = name?.split(' ')[0] ?? 'User';

  return (
    <div className={'flex flex-col gap-8 md:gap-12'}>
      <div className='flex flex-col gap-2'>
        <p className={'text-muted-foreground font-medium'}>DASHBOARD OVERVIEW</p>
        <h2 className={'text-4xl font-extrabold'}>Welcome back, {userName}!</h2>
      </div>
      <StatisticCardsBlock projects={projects} />
      <OwnerProjectBlock projects={userOwnedProjects} />
      <MemberProjectsBlock projects={userParticipantProjects} />
      <Suspense fallback={<UserApplicationsBlockSkeleton />}>
        <UserApplicationsBlock />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
