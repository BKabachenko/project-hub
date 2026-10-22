import prisma from '@/lib/prisma';
import { requireUserId } from '@/lib/session';
import { cache } from 'react';

export const getUserSubmittedApplications = async () => {
  const userId = await requireUserId();

  return await prisma.application.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      requirement: {
        select: {
          projectId: true,
          role: true,
          techStack: true,
          project: {
            select: {
              id: true,
              title: true,
              category: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
};

export const getMemberActiveProjects = cache(async () => {
  const userId = await requireUserId();

  return await prisma.project.findMany({
    where: {
      projectMembers: {
        some: {
          userId: userId,
          status: 'ACTIVE',
        },
      },
    },
    take: 50,
    orderBy: {createdAt: 'desc'},
    select: {
      id: true,
      title: true,
      status: true,
      category: true,
      type: true,
      projectMembers: {
        where: {
          userId: userId,
          status: 'ACTIVE',
        },
        select: {
          userId: true,
          status: true,
          updatedAt: true,
          requirement: {
            select: {
              role: true,
              updatedAt: true,
            },
          },
        },
      },
    },
  });
});
