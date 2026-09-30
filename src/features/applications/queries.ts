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
