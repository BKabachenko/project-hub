import type { Prisma } from '@/generated/prisma';
export type ProjectWithPositions = Prisma.ProjectGetPayload<{
  include: {
    projectPositions: true;
  };
}>;