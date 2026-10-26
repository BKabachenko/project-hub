import { cache } from 'react';

import { type OwnerProjectViewModel } from './types';

import prisma from '@/lib/prisma';
import { requireUserId } from '@/lib/session';

export const getOwnerProjects = cache(async (): Promise<OwnerProjectViewModel[]> => {
  const userId = await requireUserId();

  const [projects, pendingApplications] = await Promise.all([
    prisma.project.findMany({
      where: {
        authorId: userId,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true,
        title: true,
        createdAt: true,
        requirements: {
          select: { requiredCount: true },
        },
        _count: {
          select: {
            projectMembers: { where: { status: 'ACTIVE' } },
          },
        },
      },
    }),

    prisma.application.findMany({
      where: {
        status: 'PENDING',
        requirement: {
          project: { authorId: userId },
        },
      },
      select: {
        id: true,
        userId: true,
        createdAt: true,
        requirement: {
          select: {
            id: true,
            role: true,
            projectId: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    }),
  ]);

  const applicationsByProject = new Map<string, typeof pendingApplications>();

  for (const app of pendingApplications) {
    const pId = app.requirement.projectId;
    const existing = applicationsByProject.get(pId) ?? [];
    existing.push(app);
    applicationsByProject.set(pId, existing);
  }

  return projects.map((p) => {
    const applicants = applicationsByProject.get(p.id) ?? [];
    return {
      id: p.id,
      title: p.title,
      createdAt: p.createdAt,
      approvedApplicants: p._count.projectMembers,
      projectPositions: p.requirements.reduce((sum, r) => sum + r.requiredCount, 0),
      numberOfApplicants: applicants.length,
      pendingApplicants: applicants,
    };
  });
});

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
    orderBy: { createdAt: 'desc' },
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

export const getUserSubmittedApplications = cache(async () => {
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
});
