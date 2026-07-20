import { cache } from 'react';

import prisma from '@/lib/prisma';

export const getProjectData = cache(async (projectId: string) => {
  return await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      authorUser: {
        select: {
          name: true,
          image: true,
        },
      },
      requirements: true,
      milestones: { orderBy: { order: 'asc' } },
      _count: {
        select: {
          projectMembers: { where: { status: 'ACTIVE' } },
        },
      },
    },
  });
});
