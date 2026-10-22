import prisma from '@/lib/prisma';
import { requireUserId } from '@/lib/session';

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
