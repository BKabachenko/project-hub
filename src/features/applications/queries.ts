import { cache } from 'react';

import { type ProjectRequirement } from '@/generated/prisma';
import prisma from '@/lib/prisma';

export const getUserApplicationsForProject = cache(
  async (userId: string, requirements: ProjectRequirement[]) => {
    const requirementIds = requirements.map((req) => req.id);

    return await prisma.application.findMany({
      where: {
        userId,
        requirementId: { in: requirementIds },
      },
    });
  }
);

export const getApplicationForOwner = async (
  applicationId: string,
  userId: string
) => {
  return await prisma.application.findFirst({
    where: {
      id: applicationId,
      requirement: { project: { authorId: userId } },
    },
    include: {
      requirement: {
        include: {
          project: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          createdAt: true,
        },
      },
    },
  });
};
